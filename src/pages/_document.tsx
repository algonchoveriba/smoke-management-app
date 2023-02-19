import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-violet-800 via-pink-700 to-orange-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
