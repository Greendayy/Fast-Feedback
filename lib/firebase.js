// //导入firebase使用
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/functions';
// import 'firebase/firestore';

// //初始化应用程序并与firebase建立连接,因只需建立一次连接，所以用if声明
// if (!firebase.apps.length) {
//   //添加我的firebase凭据
//   firebase.initializeApp({
//     //next.js方法:process.env，读取.env.local文件中的本地环境
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
//   });
// }

// export default firebase;
// //导出firebase在其他地方使用
