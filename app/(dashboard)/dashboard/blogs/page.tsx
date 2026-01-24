import BlogActions from "../../../../dashboard/blog/BlogActions";
import SearchBlogs from "../../../../dashboard/blog/SearchBlogs";
import React from "react";

const BlogsPage = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blogs</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your blog posts and articles
          </p>
        </div>
        <BlogActions />
      </div>
      <SearchBlogs />
    </div>
  );
};

export default BlogsPage;
