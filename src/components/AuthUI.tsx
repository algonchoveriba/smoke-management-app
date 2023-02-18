import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth as SupabaseAuthUI, ThemeMinimal } from '@supabase/auth-ui-react'
import Account from './Account'

export default function AuthUI() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="">
      <div className="container mx-4 w-full pt-8 sm:mx-auto sm:w-1/2 sm:pt-32">
        {!session ? (
          <SupabaseAuthUI
            supabaseClient={supabase}
            appearance={{
              theme: ThemeMinimal,
              className: {
                container: 'm-2 p-4 rounded-lg bg-gray-500',
              },
              style: {},
            }}
            localization={{
              lang: 'ja',
              variables: {
                sign_in: {
                  email_label: 'メールアドレス',
                  email_input_placeholder: 'example@smoke.com',
                  password_label: 'パスワード',
                  password_input_placeholder: 'Password',
                  button_label: 'サインイン',
                  loading_button_label: 'ロード中...',
                  link_text: 'アカウントを既にお持ちですか？サインイン',
                },
                sign_up: {
                  email_label: 'メールアドレス',
                  email_input_placeholder: 'example@smoke.com',
                  password_label: 'パスワード',
                  password_input_placeholder: 'Password',
                  button_label: 'サインアップ',
                  loading_button_label: 'ロード中...',
                  link_text: 'アカウントをお持ちではありませんか？サインアップ',
                },
                forgotten_password: {
                  email_label: 'メールアドレス',
                  email_input_placeholder: 'example@smoke.com',
                  button_label: '送信する',
                  link_text: 'パスワードを忘れた',
                },
              },
            }}
          />
        ) : (
          <Account session={session} />
        )}
      </div>
    </div>
  )
}
