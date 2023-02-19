import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth as SupabaseAuthUI, ThemeMinimal } from '@supabase/auth-ui-react'
import Account from './Account'

export default function AuthUI() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="h-96 w-80 rounded-md border border-gray-200/30 bg-gray-200/10 p-4 shadow-lg backdrop-blur-lg">
      {!session ? (
        <SupabaseAuthUI
          supabaseClient={supabase}
          appearance={{
            theme: ThemeMinimal,
            className: {},
            style: {
              label: {
                color: 'gray',
                fontSize: '1rem',
              },
              button: {
                margin: 'auto',
                width: '50%',
                color: '',
                background: 'rgb(99,102,241)',
                border: '1px',
                borderRadius: '0.375rem',
                boxShadow: '0 10px 8px rgb(0 0 0 / 0.04)',
              },
            },
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
  )
}
