import React, {useState} from 'react'
import { Footer } from './Footer'
import Image from 'next/image'
import styles from './Nav.module.css'
import menuIcon from '../../../public/icons/k2-logo-green.png'
import useGlobalContext from '../../hooks/useGlobalContext'

export const Nav = () => {
  const {menu, openMenu} = useGlobalContext()
  const [footer, openFooter] = useState(false)

  return (
    <div  className={
                        menu && footer ? [styles.container, styles.containerActive, styles.containerAndFooterActive].join(' ') 
                        : menu ? [styles.container, styles.containerActive].join(' ')
                        : styles.container}>
      <div  className={ menu ? [styles.menuIcon, styles.menuIconActive].join(' ') : styles.menuIcon }
            onMouseEnter={() => openMenu(true)}
            onMouseLeave={() => openMenu(false)}
      >
        <Image src={ menuIcon } alt='k2 logo' width='75%' height='75%'/>
      </div>
      <nav  className={ menu ? [styles.nav, styles.navActive].join(' ') : styles.nav }
            onMouseEnter={() => openMenu(true)}
            onMouseLeave={() => openMenu(false)}
      >
        <div className={styles.links}>
          <a href='#'>
            Home
          </a>
          <a href='#'>
            all mountain
          </a>
          <a href='#'>
            helmets
          </a>
          <a href='#'>
            Kids
          </a>
        </div>
        <footer 
          className={styles.footer}
          onMouseEnter={() => openFooter(true)}
          onMouseLeave={() => openFooter(false)}
        >
          contact and more
          <Footer open={footer}/>
      </footer>
      </nav>
    </div>
  )
}
