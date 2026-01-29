export interface Blog {
  id: number;
  title: string;
  category: string;
  description: string;
  coverImage?: string;
  content: string;
  date?: string;
  readTime?: string;
}
