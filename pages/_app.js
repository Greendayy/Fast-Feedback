import { useEffect } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

import MDXComponents from '@/components/MDXComponents';
import { AuthProvider } from '@/lib/auth';
import customTheme from '@/styles/theme';

import SEO from '../next-seo.config';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};
const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        includedDomains: ['fastfeedback.io']
      });
    }
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <GlobalStyle />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
// import React from 'react';
// import { ThemeProvider, CSSReset } from '@chakra-ui/core';
// import { Global, css } from '@emotion/core';
// import { AuthProvider } from '@/lib/auth';
// import theme from '@/styles/theme';

// const GlobalStyle = ({ children }) => {
//   return (
//     <>
//       <CSSReset />
//       <Global
//         styles={css`
//           html {
//             min-width: 360px;
//             scroll-behavior: smooth;
//             background-color: #edf2f7;
//           }

//           #_next {
//             display: flex;
//             flex-direction: column;
//             min-neight: 100vh;
//           }
//         `}
//       />
//       {children}
//     </>
//   );
// };

// //顶级组件App
// const App = ({ Component, pageProps }) => {
//   return (
//     //将主题添加到应用程序中ThemeProvider，将theme对象作为道具传递
//     <ThemeProvider theme={theme}>
//       <AuthProvider>
//         <GlobalStyle />
//         {/* 路由组件 */}
//         <Component {...pageProps} />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// };

// export default App;
