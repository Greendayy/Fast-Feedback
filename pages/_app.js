import React from 'react';
import { AuthProvider } from '../lib/auth';

//顶级组件App
const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      {/* 路由组件 */}
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
