import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogApi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Sparkles, X } from "lucide-react";
import { Blog } from "../types/blog";

interface CreateBlogProps {
  onClose: () => void;
}

const CreateBlog = ({ onClose }: CreateBlogProps) => {
  const qc = useQueryClient();

  const [form, setForm] = useState<Omit<Blog, "id">>({
    title: "",
    category: "",
    description: "",
    coverImage: "",
    content: "",
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      qc.invalidateQueries(["blogs"]);
      onClose();
    },
  });

  const submit = (e) => {
    e.preventDefault();

    mutation.mutate({
      ...form,
      date: new Date().toDateString(),
      readTime: "5 Mins",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-6 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Create New Article
            </h2>
            <p className="text-violet-100 text-sm mt-1">
              Share your thoughts with the world
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-10 w-10 p-0 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 text-white border-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form
          onSubmit={submit}
          className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-100px)]"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
              Title
            </label>
            <Input
              placeholder="Enter an engaging title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="h-12 text-lg border-slate-300 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
              Category
            </label>
            <Input
              placeholder="e.g., Technology, Lifestyle, Business"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="h-12 border-slate-300 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
              Cover Image URL
            </label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              className="h-12 border-slate-300 focus:border-violet-500 focus:ring-violet-500"
            />
            {form.coverImage && (
              <div className="mt-3 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg">
                <img
                  src={form.coverImage}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
              Description
            </label>
            <Textarea
              placeholder="Write a compelling summary..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              required
              className="border-slate-300 focus:border-violet-500 focus:ring-violet-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
              Content
            </label>
            <Textarea
              placeholder="Tell your story..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              required
              className="border-slate-300 focus:border-violet-500 focus:ring-violet-500 resize-none font-serif"
            />
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 h-12 cursor-pointer bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/30 font-semibold"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Publish Article
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-12 px-8 cursor-pointer border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </Button>
          </div>

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              Failed to create article. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
