import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/Header.module.css'
import logo from './logo.png'
import Image from 'next/image'

const Footer: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

    return (
        <div style={{ position: "absolute", bottom: 0, width:"100%" }}>
            <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6" >
                © Oracle Corp. All rights reserved.
    </div>
        </div>
    )
}

export default Footer
