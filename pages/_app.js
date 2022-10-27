import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';

//顶级组件App
const App = ({ Component, pageProps }) => {
  return (
    //将主题添加到应用程序中ThemeProvider，将theme对象作为道具传递
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        {/* 路由组件 */}
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
