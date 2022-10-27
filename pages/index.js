//任何需要身份验证状态的组件
import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Code, Heading, Text } from '@chakra-ui/core';

export default function Index() {
  //获取身份验证状态并在其更改时重新渲染
  const auth = useAuth();
  const { email, name, photoUrl, provider, uid } = auth.user ?? {};
  return (
    <div>
      <main>
        <Heading fontWeight="600">Fast Feedback</Heading>
        <Text>
          Current user:<Code>{auth.user ? auth.user.email : <br />}</Code>
        </Text>
        {/* 用户授权为true则读取并显示用户email,button显示“sign out” */}
        {auth.user ? (
          <div>
            <img src={photoUrl} width="60px" height="60px"></img>
            <p>
              uid:{uid} {name}
            </p>
            <p>Email: {email}</p>
            <p>provider: {provider}</p>
            {/* 点击按钮调用signout函数清理用户数据 */}
            <Button onClick={() => auth.signout()}>Sign Out</Button>
          </div>
        ) : (
          //点击按钮调用signinWithGitHub函数读取用户数据

          <Button onClick={() => auth.signinWithGitHub()}>Sign In</Button>
        )}

        {/* <button onClick={(e) => auth().signinWithGithub()}>Sign In</button>
        <div>{auth?.user?.email}</div>
        {auth?.user && (
          <button onClick={(e) => auth().signout()}>Sign Out</button>
        )} */}
      </main>
    </div>
  );
}
