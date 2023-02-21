import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-purple-500 to-purple-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
