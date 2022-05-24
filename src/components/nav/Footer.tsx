import React from 'react'
import styles from './Nav.module.css'

export const Footer = ({open}: {open: boolean}) => {
  return (
    <div className={open ? [styles.footerMenu, styles.footerMenuOpen].join(' ') : styles.footerMenu}>
      <div className={styles.footerMain}>
        <div className={styles.footerMenus}>
          <h5>Follow us</h5>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Linkedin</p>
          <p>twitter</p>
        </div>
        <div>
          <h5>Company</h5>
          <p>About us</p>
          <p>Careers</p>
          <p>Sustainability</p>
          <p>B2B</p>
        </div>
      </div>  
      <div>
        <p>© 2022 K2 Snow EU</p>
        <p>All Rights Reserved. | K2 Skis and K2 Snowboarding | View Impressum/Imprint | View Privacy Policy | View Terms of Use</p>
      </div>
    </div>
  )
}
