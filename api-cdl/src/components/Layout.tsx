import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '@/components/Layout.module.css'
import bg from './bg.png'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div style={{
    backgroundImage: `url(${bg.src})`,
    width: '100%',
    height: '100%',
  }}>
    <Header />
    <div className={styles.layout}>{props.children}</div>
  </div>
)

export default Layout
