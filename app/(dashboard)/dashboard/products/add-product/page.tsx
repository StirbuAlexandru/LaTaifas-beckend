import ProductForm from '../../../../../dashboard/forms/ProductForm'
import BreadcrumbComponent from '../../../../../components/others/Breadcrumb'
import React from 'react'

const AddProductPage = () => {
  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent 
        links={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/products', label: 'Products' }
        ]} 
        pageText='Add Product'
      />
      <ProductForm />
    </div>
  )
}

export default AddProductPage