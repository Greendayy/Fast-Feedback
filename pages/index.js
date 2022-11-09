//任何需要身份验证状态的组件
import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Code, Flex, Text, Icon } from '@chakra-ui/core';
import Dashboard from './dashboard';

export default function Index() {
  //获取身份验证状态并在其更改时重新渲染
  const auth = useAuth();

  // const { email, name, photoUrl, provider, uid } = auth.user ?? {};
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title fontWeight="600">Fast Feedback</title>
      </Head>

      {/*  */}
      {/* <Text>
        Current user:<Code>{auth.user ? auth.user.email : <br />}</Code>
      </Text> */}
      {/* 用户授权为true则读取并显示用户email,button显示“sign out” */}
      {auth.user ? (
        /* <img src={photoUrl} width="60px" height="60px"></img> */
        /* <p>
            uid:{uid} {name}
          </p>
          <p>Email: {email}</p>
          <p>provider: {provider}</p> */
        /* 点击按钮调用signout函数清理用户数据 */
        <Dashboard />
      ) : (
        // <Button onClick={() => auth.signout()}>Sign Out</Button>

        //点击按钮调用signinWithGitHub函数读取用户数据
        <>
          <Icon color="black" name="logo" size="64px" />
          <Button mt={4} size="sm" onClick={() => auth.signinWithGitHub()}>
            Sign In
          </Button>
        </>
      )}
    </Flex>
  );
}
