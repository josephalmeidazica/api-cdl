import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/Header.module.css'
import logo from './logo.png'
import Image from 'next/image'
import { GrAddCircle } from 'react-icons/gr';
import { BiRightTopArrowCircle } from 'react-icons/bi'

const Footer: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

    return (
      <div style={{position:"absolute",right: 0 }}>
        <GrAddCircle size={70} />
      </div>
        
    )
}

export default Footer
