import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body className="my-20 h-auto items-center justify-center bg-gradient-to-b from-gray-500 to-gray-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
