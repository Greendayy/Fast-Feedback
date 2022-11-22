import React, { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';

import firebase from './firebase';
import { createUser } from './db';

//初始化应用程序并与firebase建立连接，抽象在:./firebase.js文件,抽象实际的身份验证提供程序（Firebase），使将来更改提供程序变得超级容易。

//创建授权访问上下文（共享状态，而不必通过组件树的多个级别向下传递）
const authContext = createContext();

//提供授权children访问值（任何子项都可以访问此挂钩）
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  //封装应用程序，并制作身份验证对象的提供程序组件，可用于任何调用useAuth()的子组件
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

/*
钩子组件以获取授权对象，并在它改变时重新渲染。
不是让useAuth钩子的每个实例都获取当前用户，钩子只是简单地调用useContext以从组件树中更远的地方获取数据。
*/
export const useAuth = () => {
  return useContext(authContext);
};

//封装所有的身份验证方法（实际定义我们想要的功能）
export function useProvideAuth() {
  //为授权对象提供状态管理
  const [user, setUser] = useState(null);

  //封装任何想要使用的firebase方法，确保将用户保存到状态

  //处理用户
  const handleUser = (rawUser) => {
    //如果有用户，则获取用户数据
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      //当我们得到格式化用户时，继续创建用户将传递用户id和其他类型数据
      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('fast-feedback-auth', true, {
        expires: 1
      });

      return user;
    } else {
      Router.push('/');
      setUser(false);
      cookie.remove('fast-feedback-auth');
      return false;
    }
  };

  //GitHub登陆
  const signinWithGitHub = () => {
    Router.push('/dashboard');

    return (
      firebase
        .auth()
        //弹窗登陆
        .signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then((response) => handleUser(response.user))
    );
  };

  const signinWithGoogle = () => {
    Router.push('/dashboard');

    return (
      firebase
        .auth()
        //弹窗登陆
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((response) => handleUser(response.user))
    );
  };

  //退出登陆
  const signout = () => {
    Router.push('/');
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  //在挂载时订阅用户，因为这会在回调中设置状态，所以会导致任何使用该钩子的重新渲染最新的身份验证对象
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    //卸载时的取消订阅
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout
  };
}

//格式化用户数据
const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
