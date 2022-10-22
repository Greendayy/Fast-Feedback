import { AuthProvider } from '../lib/auth';

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;

// import { ProvideAuth } from '../lib/auth';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   return (
//     <ProvideAuth>
//       <Component {...pageProps} />
//     </ProvideAuth>
//   );
// }

// export default MyApp;
