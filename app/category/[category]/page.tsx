import { getPostsByCategory, getCategories, CATEGORIES } from '@/lib/posts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) return { title: 'Not Found' };
  return {
    title: `${cat.icon} ${cat.label} | Essential Navigator`,
    description: `${cat.label}の比較・レビュー記事一覧。口コミ原文、スペック比較、条件別おすすめ。`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const cat = CATEGORIES[category];
  if (!cat) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-slate-300">ホーム</a>
        <span className="mx-2">›</span>
        <span>{cat.icon} {cat.label}</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-white mb-2">
        {cat.icon} {cat.label}
      </h1>
      <p className="text-sm text-slate-400 mb-8">{posts.length}件の記事</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <a key={post.slug} href={`/posts/${post.slug}`} className="group">
            <div className="rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all h-full flex flex-col">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-20">{cat.icon}</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 flex-1">
                  {post.title}
                </h2>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2">{post.description}</p>
                <div className="mt-3 text-xs text-slate-500">
                  {post.readTime}分 ・ {new Date(post.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
