import React, { useEffect } from 'react'
import { KidsSki } from './KidsSki'
import useGlobalContext from '../../hooks/useGlobalContext'
import styles from './Family.module.css'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

export const FamilySection = () => {
  const {gondelRef, desktop, familySection} = useGlobalContext()
  const gondelTopVis = useIntersectionObserver(gondelRef, {})
  const gondelBtmVis = useIntersectionObserver(gondelRef, {rootMargin: '0% 0% -90% 0%'})

  return (
    <section 
      className={familySection ?  [styles.familySection, styles.familySectionActive].join(' ') : styles.familySection}
      ref={gondelRef}
    >
      {gondelTopVis?.isIntersecting && 
        <div className={gondelBtmVis?.isIntersecting && desktop ? [styles.familyContainer, styles.familyContainerActive].join(' ') : styles.familyContainer}>
          <KidsSki ski='one' vis={gondelBtmVis?.isIntersecting}/>
          <KidsSki ski='two' vis={gondelBtmVis?.isIntersecting}/>
          <KidsSki ski='three' vis={gondelBtmVis?.isIntersecting}/>
        </div>      
      }
    </section>
  )
}
