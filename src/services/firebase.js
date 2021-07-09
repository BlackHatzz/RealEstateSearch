import firebase from "firebase/app"; // <-- This must be first
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/messaging";

try {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

// const messaging = firebase.messaging();

export const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  firestore: firebase.firestore(),
  googleAuth: new firebase.auth.GoogleAuthProvider(),
  // messaging: firebase.messaging(),
};

// export const getToken = (setTokenFound) => {
//   return messaging
//     .getToken({
//       vapidKey:
//         "BLJINxH_ZrHfiPYaPnJza3ULLB2_Irpmt2F7EnZg4ifFWnxYuaPD1nbS2rW8bv01bAWTXYXru9ULDJTZAutSbyI",
//     })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log("current token for client: ", currentToken);
//         setTokenFound(true);
//       } else {
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         setTokenFound(false);
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//     });
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });
