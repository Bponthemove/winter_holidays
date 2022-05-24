import React from 'react'
import { KidsSki } from './KidsSki'
import useGlobalContext from '../../hooks/useGlobalContext'
import styles from './Family.module.css'

export const FamilySection = () => {
  const {gondelRef, gondelTopVis, gondelBtmVis, desktop} = useGlobalContext()

  return (
    <section 
      className={ styles.familySection }
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
