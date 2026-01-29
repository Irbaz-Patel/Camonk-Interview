import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogApi";
import { Badge } from "./ui/badge";
import { X, Clock, Calendar, BookOpen } from "lucide-react";
import { Blog } from "../types/blog";
import { Skeleton } from "./skeleton";

interface BlogViewProps {
  blogId: number | null;
}

const BlogView = ({ blogId }: BlogViewProps) => {
  const { data, isLoading, error } = useQuery<Blog>({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(blogId),
    enabled: !!blogId,
  });

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/30 dark:to-purple-950/30 p-8 rounded-3xl mb-6 border border-violet-200 dark:border-violet-800">
          <BookOpen className="w-20 h-20 text-violet-600 dark:text-violet-400 mx-auto" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
          Select an article to read
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          Choose any article from the list to start your reading journey
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-red-600 font-medium">Error loading article</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <article className="max-w-4xl w-full mx-auto box-border">
        {data.coverImage && (
          <div className="mb-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src={data.coverImage}
              alt={data.title}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="px-8 pb-8">
          <div className="mb-8">
            <Badge className="mb-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-1.5 text-sm font-semibold">
              {data.category}
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 pb-6 border-b-2 border-slate-200 dark:border-slate-800">
              {data.date && (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4 text-violet-600" />
                  <span className="font-medium">{data.date}</span>
                </div>
              )}
              {data.readTime && (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-violet-600" />
                  <span className="font-medium">{data.readTime}</span>
                </div>
              )}
            </div>
          </div>

          {data.description && (
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-l-4 border-violet-500 p-6 rounded-r-xl mb-10">
              <p className="text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-serif break-words overflow-wrap-anywhere">
              {data.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogView;
