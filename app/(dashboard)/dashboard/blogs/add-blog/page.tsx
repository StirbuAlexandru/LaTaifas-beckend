import AddBlogForm from '@/dashboard/forms/BlogForm'
import BreadcrumbComponent from '@/components/others/Breadcrumb'
import React from 'react'

const AddBlogPage = () => {
  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent 
        links={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/blogs', label: 'Blogs' }
        ]} 
        pageText='add blog'
      />
      <AddBlogForm />
    </div>
  )
}

export default AddBlogPage