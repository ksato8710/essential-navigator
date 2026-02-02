import { getCategoryWithPosts, CATEGORIES } from '@/lib/posts';

export default function Home() {
  const categories = getCategoryWithPosts();
  const totalPosts = categories.reduce((sum, c) => sum + c.posts.length, 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            しっかり調べて、納得して選ぶ。
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            家電・生活用品を徹底比較。口コミ原文、スペック比較、条件別おすすめで
            あなたの「最適な1台」が見つかるサイト。
          </p>
          <div className="flex justify-center gap-8 mt-8 text-sm text-slate-400">
            <div><span className="text-2xl font-bold text-white">{totalPosts}</span><br/>記事数</div>
            <div><span className="text-2xl font-bold text-white">{categories.length}</span><br/>カテゴリ</div>
            <div><span className="text-2xl font-bold text-white">7</span><br/>ソースから調査</div>
          </div>
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="bg-slate-900 border-b border-slate-800 py-4 px-4 sticky top-14 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(({ category, icon, label, posts }) => (
              <a key={category} href={`#cat-${category}`}
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
                <span>{icon}</span>
                <span>{label}</span>
                <span className="text-slate-500">({posts.length})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections - RTINGS style */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {categories.map(({ category, icon, label, color, posts }) => (
          <section key={category} id={`cat-${category}`} className="scroll-mt-32">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <span className="text-xl font-bold text-white">{label}</span>
                <span className="text-xs text-slate-500 ml-2">{posts.length}件</span>
              </h2>
              <a href={`/category/${category}`} className="text-xs text-blue-400 hover:text-blue-300">
                すべて見る →
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Featured card - large */}
              {posts[0] && (
                <a href={`/posts/${posts[0].slug}`} className="lg:col-span-1 group">
                  <div className="rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                      {posts[0].image ? (
                        <img src={posts[0].image} alt={posts[0].title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-20">{icon}</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: color + '22', color }}>
                          {label}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 flex-1">
                        {posts[0].title}
                      </h3>
                      <div className="mt-2 text-xs text-slate-500">
                        {posts[0].readTime}分 ・ {new Date(posts[0].date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </a>
              )}

              {/* List items - compact */}
              <div className="lg:col-span-2 flex flex-col gap-2">
                {posts.slice(1, 6).map((post) => (
                  <a key={post.slug} href={`/posts/${post.slug}`} className="group flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors truncate">
                        {post.title}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {post.readTime}分 ・ {new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <span className="text-slate-600 text-xs">→</span>
                  </a>
                ))}
                {posts.length > 6 && (
                  <a href={`/category/${category}`} className="text-xs text-slate-500 hover:text-blue-400 pl-3 py-2">
                    + あと{posts.length - 6}件
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
