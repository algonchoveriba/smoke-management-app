import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth as SupabaseAuthUI, ThemeMinimal } from '@supabase/auth-ui-react'
import { Account } from './Account'

export const AuthUI = () => {
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
                color: 'whitesmoke',
                fontSize: '1rem',
                textShadow: '0 2px 5px rgba(0 0 0 / .2)',
              },
              input: {
                paddingLeft: '1rem',
                color: 'whitesmoke',
                borderRadius: '0.125rem',
                borderWidth: '.5px',
                borderColor: 'rgb(229 231 235 / 0.3)',
                backgroundColor: 'rgb(229 231 235 / .1)',
                textShadow: '0 2px 5px rgba(0 0 0 / .1)',
                boxShadow: '0 2px 10px rgba(0 0 0 / .3);',
              },
              button: {
                margin: 'auto',
                width: '40%',
                color: 'whitesmoke',
                background: 'rgba(99 102 241 / .8)',
                border: '1px',
                borderRadius: '0.375rem',
                textShadow: '0 2px 5px rgba(0 0 0 / .3)',
                boxShadow: '0 2px 5px rgba(0 0 0 / .3)',
              },
              anchor: {
                color: 'darkgray',
                textDecoration: 'underline',
                fontSize: '0.95rem',
              },
              message: {
                color: 'orangered',
                textShadow: '0 2px 5px rgba(0 0 0 / .3)',
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
