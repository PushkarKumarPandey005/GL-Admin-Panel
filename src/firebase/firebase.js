// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../config/config";

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
