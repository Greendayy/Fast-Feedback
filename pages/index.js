//任何需要身份验证状态的组件;
import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Flex, Text, Icon, Link, Box } from '@chakra-ui/core';
import LoginButtons from '@/components/LoginButtons';

// const SITE_ID = '12x3r7Ok643R6haLZCFV';

// export async function getStaticProps(context) {
//   const { feedback } = await getAllFeedback(SITE_ID);

//   return {
//     props: {
//       allFeedback: feedback || []
//     },
//     revalidate: 1
//   };
// }

const Home = ({ allFeedback }) => {
  //获取身份验证状态并在其更改时重新渲染
  const {user} = useAuth();
  console.log('index auth:', user);
  // const { email, name, photoUrl, provider, uid } = auth.user ?? {};
  return (
    <>
      <Box bg="gray.100" py={16} px={4}>
        <Flex
          as="main"
          direction="column"
          align="center"
          justify="center"
          h="100vh"
          maxW="400px"
          margin="0 auto"
        >
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
            if (document.cookie && document.cookie.includes('fast-feedback-auth')){
              window.location.href="/dashboard"
            }`
              }}
            />
            <title fontWeight="600">Fast Feedback</title>
          </Head>

          {/*  */}
          {/* <Text>
        Current user:<Code>{auth.user ? auth.user.email : <br />}</Code>
      </Text> */}
          {/* 用户授权为true则读取并显示用户email,button显示“sign out” */}
          {/* {auth.user ? (
        <img src={photoUrl} width="60px" height="60px"></img>
      <p>
            uid:{uid} {name}
          </p>
          <p>Email: {email}</p>
          <p>provider: {provider}</p>
        点击按钮调用signout函数清理用户数据
        <Dashboard />
      ) : (
        <Button onClick={() => auth.signout()}>Sign Out</Button>

       点击按钮调用signinWithGitHub函数读取用户数据 */}

          <Icon color="black" name="logo" size="64px" mb={2} />
          <Text mb={4} fontSize="lg" p={6}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>
            {' was built as part of '}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025
            </Link>
            {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
          </Text>
          {user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="white"
              color="gray.900"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
    </>
  );
};
export default Home;
