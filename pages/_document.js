import Document, { Html, Head, Main, NextScript } from 'next/document';

//自定义文档通常用于扩充应用程序的<html>和<body>标签。这是必要的，因为 Next.js 页面跳过了周围文档标记的定义。
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>My new cool app</title>

          <link rel="icon" />
          {/* 加载自定义字体 Inter */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
