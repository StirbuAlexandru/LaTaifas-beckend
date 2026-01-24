'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageName: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageName }) => {
  const getPageUrl = (page: number) => {
    return `/${pageName}?page=${page}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={getPageUrl(currentPage - 1)}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous
        </Link>
        <Link
          href={getPageUrl(currentPage + 1)}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              href={getPageUrl(currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-gray-50'
              } ring-1 ring-inset ring-gray-300`}
            >
              <span className="sr-only">Previous</span>
              &larr;
            </Link>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={getPageUrl(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === page
                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            ))}
            
            <Link
              href={getPageUrl(currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-50'
              } ring-1 ring-inset ring-gray-300`}
            >
              <span className="sr-only">Next</span>
              &rarr;
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;