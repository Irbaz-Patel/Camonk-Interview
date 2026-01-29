import type { Blog } from "@/types/blog";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

// GET: All Blogs
export const getBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get<Blog[]>(`${BASE_URL}/blogs`);
  return res.data;
};

// GET: Blog By ID
export const getBlogById = async (id: number): Promise<Blog> => {
  const res = await axios.get<Blog>(`${BASE_URL}/blogs/${id}`);
  return res.data;
};

// POST: Create Blog
export const createBlog = async (blogData: Blog): Promise<Blog> => {
  const res = await axios.post<Blog>(`${BASE_URL}/blogs`, blogData);
  return res.data;
};
