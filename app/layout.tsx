import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Essential Navigator — しっかり調べて、納得して選ぶ。",
  description: "家電・生活用品を徹底比較。口コミ原文、スペック比較、条件別おすすめであなたの「最適な1台」が見つかるサイト。",
  openGraph: {
    title: "Essential Navigator",
    description: "しっかり調べて、納得して選ぶ。家電・生活用品を徹底比較。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 text-slate-200" style={{ fontFamily: "'Noto Sans JP', 'Inter', sans-serif" }}>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800" style={{ backgroundColor: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <a href="/" className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white">
                  Essential<span className="text-blue-400">Navigator</span>
                </span>
              </a>
              <nav className="hidden sm:flex items-center gap-5 text-sm">
                <a href="/category/robot-vacuum" className="text-slate-400 hover:text-white transition-colors">🤖 ロボット掃除機</a>
                <a href="/category/air-purifier" className="text-slate-400 hover:text-white transition-colors">🌬️ 空気清浄機</a>
                <a href="/category/humidifier" className="text-slate-400 hover:text-white transition-colors">💨 加湿器</a>
                <a href="/category/wireless-earphones" className="text-slate-400 hover:text-white transition-colors">🎧 イヤホン</a>
              </nav>
              <div className="sm:hidden flex items-center gap-2 text-xs">
                <a href="/category/robot-vacuum" className="text-slate-400">🤖</a>
                <a href="/category/air-purifier" className="text-slate-400">🌬️</a>
                <a href="/category/humidifier" className="text-slate-400">💨</a>
                <a href="/category/wireless-earphones" className="text-slate-400">🎧</a>
                <a href="/category/protein" className="text-slate-400">💪</a>
              </div>
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-16 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <p className="text-lg font-bold text-white mb-2">Essential<span className="text-blue-400">Navigator</span></p>
              <p className="text-sm text-slate-500">しっかり調べて、納得して選ぶ。</p>
              <p className="text-xs text-slate-600 mt-4">
                当サイトはアフィリエイトプログラムに参加しています。
                記事内のリンクから商品を購入された場合、当サイトに紹介料が支払われることがあります。
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
