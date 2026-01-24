'use client'

import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="h-[80px] w-[80px]">
        <img 
          src="/images/logo.png" 
          alt="Restaurant Logo" 
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  )
}

export default Logo