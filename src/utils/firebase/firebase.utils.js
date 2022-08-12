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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // CHECKING IF THE USER DOES NOT EXIST
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //   IF THE USER EXISTS
  return userDocRef;
};
