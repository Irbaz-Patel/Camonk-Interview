import { BookOpen, PenSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import BlogList from "../components/BlogList";
import BlogView from "../components/BlogView";
import CreateBlog from "../components/CreateBlog";

const BlogApp = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-x-hidden bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 dark:from-slate-950 dark:via-violet-950/20 dark:to-purple-950/20">
      {/* Header */}
      <header className="p-6 flex-shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-2xl shadow-lg shadow-violet-500/30">
                <BookOpen className="w-10 h-10 text-white" />
              </div>

              <div>
                <h1 className="text-4xl pb-1 text-left font-bold tracking-tight bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Blog Platform
                </h1>

                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Discover and share amazing stories
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="gap-2 h-14 px-8 bg-gradient-to-r cursor-pointer from-violet-500 to-purple-600 text-white shadow-lg"
            >
              <PenSquare className="w-5 h-5" />
              New Article
            </Button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="grid grid-cols-12 gap-6 h-full overflow-hidden">
          {/* Left Panel */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full overflow-hidden">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 h-full overflow-hidden flex flex-col">
              <BlogList selectedId={selectedId} onSelect={setSelectedId} />
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full overflow-hidden">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 h-full overflow-hidden">
              <BlogView blogId={selectedId} />
            </div>
          </div>
        </div>
      </main>

      {showForm && <CreateBlog onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default BlogApp;
