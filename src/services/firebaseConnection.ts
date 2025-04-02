import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAyqro1J5CywC365BVp7mznNxHlya7p02A",
  authDomain: "webcarros-be8e9.firebaseapp.com",
  projectId: "webcarros-be8e9",
  storageBucket: "webcarros-be8e9.firebasestorage.app",
  messagingSenderId: "633763882727",
  appId: "1:633763882727:web:d523fcf7c65610da19e442"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { db, auth, storage};