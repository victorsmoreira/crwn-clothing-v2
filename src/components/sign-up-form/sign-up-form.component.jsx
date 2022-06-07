import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      } else (
        console.log('erro ao criar usuário', error.message)
      )
    }
  }


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div>
    <h1>Sign up with your email and password</h1>
    <form onSubmit={handleSubmit}>
      <FormInput label="Display Name"     required onChange={handleChange} name="displayName"     value={displayName} />
      <FormInput label="Email"            required onChange={handleChange} name="email"           value={email} />
      <FormInput label="Password"         required onChange={handleChange} name="password"        value={password} />
      <FormInput label="Confirm Password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
      <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;
