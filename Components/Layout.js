import React, { useState } from 'react'
import Navbar from './Navbar'

export default function Layout({children}) {
  
  return (
    <div >
        <Navbar/>
        {children}
    </div>
  )
}
