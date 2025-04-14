
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCcZYNPtBna3kZcVR6I-ry4aoGoOzoqd5s",
  authDomain: "webcarros-6b3d0.firebaseapp.com",
  projectId: "webcarros-6b3d0",
  storageBucket: "webcarros-6b3d0.firebasestorage.app",
  messagingSenderId: "641116559720",
  appId: "1:641116559720:web:df29db324b2042e5019edd"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage =getStorage(app)

export {db, auth, storage}