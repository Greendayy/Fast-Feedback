import * as firebase from 'firebase/app';
import 'firebase/auth';

if(!firebase.getApps.length){
    firebase.initializeApp({
        apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAhv-X4HBTc-NJKjDzu5mDMmerzF8VONX4,
        authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fast-feedback-demo-aceba.firebaseapp.com,
        projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID=fast-feedback-demo-aceba

    })
}

export default firebase; 