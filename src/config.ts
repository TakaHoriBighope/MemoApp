import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };

// EXPO_PUBLIC_FB_API_KEY=AIzaSyDG1XhaysqB_mZ_MD6tXbcU-78allSBZN8
// EXPO_PUBLIC_FB_AUTH_DOMAIN=memoapp-53e2b.firebaseapp.com
// EXPO_PUBLIC_FB_PROJECT_ID=memoapp-53e2b
// EXPO_PUBLIC_FB_STORAGE_BUCKET=memoapp-53e2b.appspot.com
// EXPO_PUBLIC_FB_MESSAGING_SENDER_ID=224624434920
// EXPO_PUBLIC_FB_APP_ID=1:224624434920:web:955f81bb8c6a2e42bc335d
