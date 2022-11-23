import admin from 'firebase-admin';
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://fast-feedback-demo-aceba-default-rtdb.firebaseio.com'
  });
}
// console.log("admin.apps",admin.auth());

const db = admin.firestore();
const auth = admin.auth();
const getUID = async (token) => await auth.verifyIdToken(token);


export  { db, auth, getUID };
