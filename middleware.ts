import { next } from '@vercel/edge'

/**
 * Vercel Edge Middleware — Basic 認証でサイト全体にパスワードをかける。
 *
 * - 全パス（静的アセット含む）を対象にする
 * - 認証情報は環境変数で管理（コードにパスワードを書かない）
 *     SITE_USER     … ユーザー名（未設定なら 'portfolio'）
 *     SITE_PASSWORD … パスワード（Vercel の Environment Variables に設定）
 *
 * 注意: このミドルウェアは Vercel 上でのみ動作する。ローカルの
 * `npm run dev`（Vite）では実行されないため、開発はパスワード無しで行える。
 */
export const config = {
  // 全ルートを保護。ただし favicon など一部を除外したい場合はここを調整する。
  matcher: '/:path*',
}

export default function middleware(req: Request) {
  const expectedUser = process.env.SITE_USER || 'portfolio'
  const expectedPassword = process.env.SITE_PASSWORD

  // パスワード未設定なら誤って全公開しないよう、安全側に倒して 401 を返す。
  if (expectedPassword) {
    const header = req.headers.get('authorization')
    if (header?.startsWith('Basic ')) {
      const decoded = atob(header.slice('Basic '.length))
      const sep = decoded.indexOf(':')
      const user = decoded.slice(0, sep)
      const password = decoded.slice(sep + 1)

      if (user === expectedUser && password === expectedPassword) {
        return next() // 認証 OK → 通常どおり配信
      }
    }
  }

  // 未認証 → ブラウザにログインダイアログを出す
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Portfolio", charset="UTF-8"',
    },
  })
}
