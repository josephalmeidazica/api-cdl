import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import styles from '@/components/Header.module.css'
import logo from './logo.png'
import Image from 'next/image'
import { FcHome } from 'react-icons/fc';

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav>
      <div className={styles.left}>
          <Image
            src={logo}
            width={103}
            height={38}
            alt="Picture of the author"
          />
      </div>
      <div className={styles.right}>
        <a onClick={() => Router.push('/')}> <FcHome /> Home</a>
      </div>
    </nav>
  )
}

export default Header
