import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7PEMZcIuibtmFKLD7sOs4gDtcpwRTI38",
  authDomain: "crwn-clothing-db-a6aa0.firebaseapp.com",
  projectId: "crwn-clothing-db-a6aa0",
  storageBucket: "crwn-clothing-db-a6aa0.appspot.com",
  messagingSenderId: "146434045765",
  appId: "1:146434045765:web:92b43804cc42179485302c",
};

const firebaseApp = initializeApp(firebaseConfig);

// IN ORDER TO USE THE GOOGLEAUTH, WE NEED TO INITIALIZE A PROVIDER
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
}
