import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBvWhZ4YuKmBV0L5yOsGfCFrlOFQiEhjHE",
  authDomain: "crwn-clothing-db-bd4bb.firebaseapp.com",
  projectId: "crwn-clothing-db-bd4bb",
  storageBucket: "crwn-clothing-db-bd4bb.appspot.com",
  messagingSenderId: "328155128032",
  appId: "1:328155128032:web:363e5d8bc0a9bba5b83085"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('erro ao criar usuário', error.message)
    }
  }

  return userDocRef;
}
