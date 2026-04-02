import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { X, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: {
    url: string;
  } | null;
  publishedAt: string;
}

interface BlogsModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function BlogsModal({ isOpen, closeModal }: BlogsModalProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && blogs.length === 0) {
      fetchBlogs();
    }
  }, [isOpen]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.posts);
      } else {
        setError(data.error || "Failed to load blogs.");
      }
    } catch (err) {
      setError("An error occurred while fetching blogs.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-3xl bg-background/90 text-foreground border border-border/50 p-6 text-left align-middle shadow-2xl transition-all glass-island">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50">
                  <DialogTitle as="h3" className="text-4xl font-bold font-heading">
                    My Writings
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-full hover:scale-[90%] transition-all duration-200 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="min-h-[300px] max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                      <Loader2 className="w-10 h-10 animate-spin text-primary" />
                      <p className="text-muted-foreground animate-pulse">Loading latest articles from Hashnode...</p>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-full py-12">
                      <p className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="flex items-center justify-center h-full py-12">
                      <p className="text-muted-foreground">No articles found right now. Check back later!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogs.map((blog) => (
                        <a
                          key={blog.id}
                          href={`https://aiunderthehood.hashnode.dev/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col bg-card/40 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm cursor-pointer"
                        >
                          {/* Date badge floating at the top left of the card */}
                          <div className="absolute flex items-center gap-1 top-3 left-3 z-20 bg-background/70 backdrop-blur-sm p-2 rounded-full border border-border/50">
                            <Calendar className="w-3 h-3" />
                            <span className="font-medium text-xs">{formatDate(blog.publishedAt)}</span>
                          </div>

                          {blog.coverImage?.url && (
                            <div className="relative w-full aspect-1200/630 overflow-hidden">
                              <Image
                                src={blog.coverImage.url}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />

                            </div>
                          )}

                          <div className="p-5 flex flex-col grow relative pb-12">
                            <h4 className="text-lg font-extrabold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 pr-2">
                              {blog.title}
                            </h4>

                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {blog.brief}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
