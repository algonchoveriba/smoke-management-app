# 喫煙管理アプリ

## URL

### Vercel

https://smoke-management-app.vercel.app/

認証画面：
email と password を登録後メールが届くのでアカウント認証

## 使用技術

- 言語
  - Typescript (4.9.5)
- フレームワーク
  - Next.js (13.1.6)
  - React (18.2.0)(ライブラリ)
- バックエンド
  - supabase/supabase-js (2.8.0)
- ライブラリ
  - zustand (4.3.5)
  - tailwindcss (3.2.7)
  - ~react-chartjs-2 (5.2.0)~
- 環境
  - Vercel (デプロイ)
  - GitHub (ソースコード管理)
  - MacOS/Visual Studio Code

## 実装済み

- サインアップ・サインイン・サインアウト (supabase)
- プロフィール登録・編集
- 喫煙本数登録・編集
- 銘柄登録・編集

## 実装予定

- グラフ機能 (react-chartjs-2)
- カレンダー機能 (flatpickr? react-datepicker?)
- レスポンシブデザイン (tailwindcss)
