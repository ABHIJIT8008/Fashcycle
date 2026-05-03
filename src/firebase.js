import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ⚠️  SETUP REQUIRED: Replace these placeholder values with your Firebase project config.
// Go to Firebase Console → Project Settings → General → Your apps → Web app → SDK setup
const firebaseConfig = {
  apiKey: "AIzaSyBVfEjJhXiV2QM0csTQidWpjkukBZhJONs",
  authDomain: "fashcycle-f06c8.firebaseapp.com",
  projectId: "fashcycle-f06c8",
  storageBucket: "fashcycle-f06c8.firebasestorage.app",
  messagingSenderId: "613973033052",
  appId: "1:613973033052:web:8743cbfa4c27cb4cd66699"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
