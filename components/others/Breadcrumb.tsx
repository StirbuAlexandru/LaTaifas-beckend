'use client'

import React from 'react'
import Link from 'next/link'

interface BreadcrumbLink {
  href: string;
  label: string;
}

interface BreadcrumbProps {
  links: BreadcrumbLink[]
  pageText: string
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ links, pageText }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
      <Link href="/dashboard" className="hover:text-gray-700 dark:hover:text-gray-300">
        Dashboard
      </Link>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <span className="mx-2">/</span>
          <Link 
            href={link.href} 
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            {link.label}
          </Link>
        </React.Fragment>
      ))}
      <span className="mx-2">/</span>
      <span className="text-gray-900 dark:text-white">{pageText}</span>
    </nav>
  )
}

export default BreadcrumbComponent