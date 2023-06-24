import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '@/components/Layout.module.css'
import bg from './bg.png'
import Image from 'next/image'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div>
    <div style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          objectFit: 'contain',
          width: '100vw',
          height: '100vh'

        }} >
    <Header />
    <div className={styles.layout}>{props.children}</div>
    </div>
  </div>
)

export default Layout
