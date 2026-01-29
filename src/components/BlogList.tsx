import { ArrowRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { Blog } from "../types/blog";
import { getBlogs } from "../api/blogApi";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./skeleton";

interface BlogListProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const BlogList = ({ selectedId, onSelect }: BlogListProps) => {
  const { data, isLoading, error } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 border rounded-xl space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-red-600 font-medium">Failed to load blogs</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 z-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          <TrendingUp className="w-6 h-6 text-violet-600" />
          Latest Articles
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {data?.length || 0} Articles
        </p>
      </div>

      {/* Scroll Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
        {data?.length === 0 ? (
          <p className="text-center text-slate-500 py-10">No articles found</p>
        ) : (
          data?.map((blog) => (
            <Card
              key={blog.id}
              onClick={() => onSelect(blog.id)}
              className={cn(
                "cursor-pointer border transition-all rounded-xl overflow-hidden",
                "hover:shadow-md hover:border-violet-400",
                selectedId === blog.id
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20 shadow"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900",
              )}
            >
              <div className="p-4 flex flex-col gap-3">
                {/* Category + Time */}
                <div className="flex items-center justify-between">
                  <Badge
                    className={cn(
                      "text-[11px] px-3 py-0.5 rounded-full font-semibold tracking-wide",
                      selectedId === blog.id
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
                    )}
                  >
                    {blog.category}
                  </Badge>

                  {blog.readTime && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    "text-sm text-left font-semibold leading-snug line-clamp-2",
                    selectedId === blog.id
                      ? "text-violet-700 dark:text-violet-300"
                      : "text-slate-900 dark:text-slate-100",
                  )}
                >
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-left text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {blog.description}
                </p>

                {/* Date + Arrow */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  {blog.date && (
                    <span className="flex items-center gap-1 truncate">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      {blog.date}
                    </span>
                  )}

                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform flex-shrink-0",
                      selectedId === blog.id
                        ? "text-violet-600"
                        : "text-slate-400 group-hover:translate-x-1 group-hover:text-violet-600",
                    )}
                  />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
