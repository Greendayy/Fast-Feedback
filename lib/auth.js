import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// 初始化firebase
console.log(firebase.getApps(), !firebase.getApps().length);
console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
if (!firebase.getApps().length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })
}
console.log(firebase.getApps(), !firebase.getApps().length);

// 创建授权上下文
const authContext = createContext();

// 生成一个auth provider
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}


// 具体的provider实现
function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth(), GithubAuthProvider())
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };


    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout
    }
}
