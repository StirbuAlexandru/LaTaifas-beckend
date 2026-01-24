import BannerForm from '../../../../../dashboard/forms/BannerForm'
// Fixed import issue
import BreadcrumbComponent from '../../../../../components/others/Breadcrumb'
import React from 'react'

const AddBannerPage = () => {
  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent 
        links={[{ href: '/dashboard', label: 'Dashboard' }, { href: '/dashboard/banners', label: 'Banners' }]}
        pageText='Add Banner'
      />
      <BannerForm />
    </div>
  )
}

export default AddBannerPage