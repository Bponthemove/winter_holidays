import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Piste.module.css'
import skiAM from '../../../public/images/skiAM.webp'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import useGlobalContext from '../../hooks/useGlobalContext'

export const PisteSection = () => {
  const {desktop} = useGlobalContext()
  const skiRef = useRef(null);
  const [top, setTop] = useState(false);
  const intersectorTop = useIntersectionObserver(skiRef, {rootMargin: '0% 0% -80% 0%'});

  useEffect(() => {
    if (!intersectorTop?.isIntersecting || top) return;
    setTop(true); 
  }, [intersectorTop, top])

  return (
    <section  className={ top ? [styles.pisteSection, styles.pisteSectionActive].join(' ') : styles.pisteSection }
              ref={skiRef}
    >
      <div  className={ top && desktop ? [styles.imgContainer, styles.imgContainerHidden].join(' ') : styles.imgContainer }>
        <h2 className={styles.h2}>
          K2 Mindbender 99Ti Women’s freeride ski
        </h2>
        <Image 
          src={ skiAM }
          alt='snow and ski' 
          layout='responsive'
        />
      </div>
      <div className={ top ? [styles.btmContainer, styles.btmContainerActive].join(' ') : styles.btmContainer}>
      {desktop &&
        <div  className={ top ? [styles.secImgContainer, styles.secImgContainerActive].join(' ') : styles.secImgContainer }>
          <Image 
            src={ skiAM }
            alt='snow and ski' 
            layout='responsive'
          />
        </div>      
      }
        <div className={ top ? [styles.textContainer, styles.textContainerActive].join(' ') : styles.textContainer}>
          The <span>K2 Mindbender 99Ti Women’s freeride ski</span><span><img src="/images/arrows.png" alt="arrows" /></span> is built for women who demand ultimate versatility from their skis. Our Titanal Y-Beam construction keeps things damp and stable when speeds are high and conditions are choppy, while the All-Terrain Rocker profile and moderate waist width maintain quickness and agility when you find yourself in tight spots or technical terrain. 
        </div>
      </div>
      <a className={styles.arrowContainer}>
        <img src="/images/arrowRightGreen.png" alt="arrow right" />
      </a>
    </section>
  )
}
