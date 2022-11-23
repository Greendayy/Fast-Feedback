import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
            background-color: #edf2f7;
          }

          #_next {
            display: flex;
            flex-direction: column;
            min-neight: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

//顶级组件App
const App = ({ Component, pageProps }) => {
  return (
    //将主题添加到应用程序中ThemeProvider，将theme对象作为道具传递
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        {/* 路由组件 */}
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
