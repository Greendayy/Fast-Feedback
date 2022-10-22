import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const signinWithGitHub = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signout
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
//2.0

// import React, { useState, useEffect, useContext, createContext } from 'react';
// import firebase from './firebase';
// //初始化应用程序并与firebase建立连接，抽象在:./firebase.js

// //创建授权访问上下文（共享状态，而不必通过组件树的多个级别向下传递）
// const authContext = createContext();

// //提供授权children访问值（任何子项都可以访问此挂钩）
// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// //创建自定义钩子，封装功能到一个共享位置
// export const useAuth = () => {
//   return useContext(authContext);
// };

// //实际定义我们想要的功能
// function useProvideAuth() {
//   //在获得用户后将其置于状态
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleUser = (rawUser) => {
//     if (rawUser) {
//       const user = formatUser(rawUser);

//       setLoading(false);
//       setUser(user);
//       return user;
//     } else {
//       setLoading(false);
//       setUser(false);
//       return false;
//     }
//   };
//   //登陆方法
//   const signinWithGitHub = () => {
//     setLoading(true);
//     return (
//       firebase
//         .auth()
//         //弹窗登陆
//         .signInWithPopup(new firebase.auth.GithubAuthProvider())
//         .then((response) => handleUser(response.user))
//     );
//   };
//   //退出登陆
//   const signout = () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => handleUser(false));
//   };

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

//     return () => unsubscribe();
//   }, []);

//   return {
//     user,
//     loading,
//     signinWithGitHub,
//     signout
//   };
// }

// const formatUser = (user) => {
//   return {
//     uid: user.uid,
//     email: user.email,
//     name: user.displayName,
//     provider: user.providerData[0].providerId,
//     photoUrl: user.photoURL
//   };
// };

//1.0

// import React, { useState, useEffect, useContext, createContext } from 'react';

// const authContext = createContext();

// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export const useAuth = () => {
//   return useContext(authContext);
// };

// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signinWithGithub = () => {
//     return firebase
//       .auth()
//       .signInWithPopup(new firebase(), auth, GithubAuthProvider())
//       .then((response) => {
//         setUser(response.user);
//         return response.user;
//       });
//   };

//   const signout = () => {
//     return firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         setUser(false);
//       });
//   };

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);
