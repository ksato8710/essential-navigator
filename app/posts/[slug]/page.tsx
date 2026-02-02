import { getPostBySlug, getAllPosts, CATEGORIES } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} | Essential Navigator`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cat = CATEGORIES[post.category] || { label: post.category, color: '#6B7280', icon: '📦' };

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-slate-300">ホーム</a>
        <span className="mx-2">›</span>
        <a href={`/category/${post.category}`} className="hover:text-slate-300">{cat.icon} {cat.label}</a>
      </nav>

      {/* Title area - Wirecutter style */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: cat.color + '22', color: cat.color }}>
            {cat.icon} {cat.label}
          </span>
          <span className="text-xs text-slate-500">
            {post.readTime}分で読める
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          {post.description}
        </p>
        <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span>Essential Navigator 編集部</span>
        </div>
      </header>

      {/* Article body */}
      <div className="article-content"
           dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }} />

      {/* Footer CTA */}
      <div className="mt-12 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
        <p className="text-sm text-slate-400 mb-3">この記事が参考になりましたか？</p>
        <a href={`/category/${post.category}`} 
           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors">
          {cat.icon} {cat.label}の記事をもっと見る
        </a>
      </div>
    </article>
  );
}
