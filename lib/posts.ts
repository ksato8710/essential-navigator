import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  categoryName: string;
  description: string;
  readTime: number;
  image?: string;
  content?: string;
  htmlContent?: string;
}

export const CATEGORIES: Record<string, { label: string; color: string; icon: string }> = {
  'robot-vacuum': { label: 'ロボット掃除機', color: '#3B82F6', icon: '🤖' },
  'dehumidifier': { label: '除湿機', color: '#06B6D4', icon: '💧' },
  'humidifier': { label: '加湿器', color: '#8B5CF6', icon: '💨' },
  'air-purifier': { label: '空気清浄機', color: '#10B981', icon: '🌬️' },
  'wireless-earphones': { label: 'ワイヤレスイヤホン', color: '#F59E0B', icon: '🎧' },
  'mobile-battery': { label: 'モバイルバッテリー', color: '#EF4444', icon: '🔋' },
  'protein': { label: 'プロテイン', color: '#22C55E', icon: '💪' },
  'electric-blanket': { label: '電気毛布', color: '#F97316', icon: '🛏️' },
  'electronics': { label: '家電・ガジェット', color: '#6366F1', icon: '⚡' },
  'lifestyle': { label: '生活・暮らし', color: '#EC4899', icon: '🏠' },
  'health-fitness': { label: '健康・フィットネス', color: '#14B8A6', icon: '🏃' },
  'kafunsho': { label: '花粉症対策', color: '#A855F7', icon: '🌸' },
  'seasonal': { label: '季節・暮らし', color: '#F43F5E', icon: '🗓️' },
  'nyugaku': { label: '入学準備', color: '#0EA5E9', icon: '🎒' },
  'shinseikatsu': { label: '新生活準備', color: '#84CC16', icon: '🌱' },
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDirectory)) return [];
  
  const filenames = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md'));
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: data.slug || filename.replace(/\.md$/, ''),
      title: data.title || '',
      date: data.date || '',
      category: data.category || 'electronics',
      categoryName: data.categoryName || '',
      description: data.description || '',
      readTime: data.readTime || 5,
      image: data.image,
    };
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(p => p.category === category);
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map(p => p.category));
  return Array.from(cats);
}

export function getCategoryWithPosts(): { category: string; label: string; icon: string; color: string; posts: Post[] }[] {
  const allPosts = getAllPosts();
  const catMap = new Map<string, Post[]>();
  
  for (const post of allPosts) {
    const existing = catMap.get(post.category) || [];
    existing.push(post);
    catMap.set(post.category, existing);
  }
  
  return Array.from(catMap.entries())
    .map(([cat, posts]) => {
      const info = CATEGORIES[cat] || { label: cat, color: '#6B7280', icon: '📦' };
      return { category: cat, ...info, posts };
    })
    .sort((a, b) => b.posts.length - a.posts.length);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(contentDirectory)) return null;
  
  const filenames = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md'));
  
  for (const filename of filenames) {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const postSlug = data.slug || filename.replace(/\.md$/, '');
    if (postSlug === slug) {
      const processedContent = await remark().use(html).process(content);
      
      return {
        slug: postSlug,
        title: data.title || '',
        date: data.date || '',
        category: data.category || 'electronics',
        categoryName: data.categoryName || '',
        description: data.description || '',
        readTime: data.readTime || 5,
        image: data.image,
        content,
        htmlContent: processedContent.toString(),
      };
    }
  }
  return null;
}
