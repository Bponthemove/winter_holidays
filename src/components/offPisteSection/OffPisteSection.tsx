import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './OffPiste.module.css'
import helmetImg from '../../../public/images/helmet.webp'
import useGlobalContext from '../../hooks/useGlobalContext'
import useScrollDirection from '../../hooks/useScrollDirection'

export const OffPisteSection = () => {
  const {scroll, gondelTopVis, desktop} = useGlobalContext();
  const [videoLocked, setVideoLocked] = useState(false);
  const videoRef = useRef(null);
  const helmetTopRef = useRef(null);
  const entryRef = useRef(0);
  const middleRef = useRef(0);
  const btmRef = useRef(0);
  const video = useIntersectionObserver(videoRef, {});
  const entry = useIntersectionObserver(helmetTopRef, {rootMargin: '0% 0% -75% 0%'});
  const exit = gondelTopVis;
  const direction = useScrollDirection();

  useEffect(() => {
    if (scroll === undefined || videoLocked) return;
    if(video?.isIntersecting) setVideoLocked(true)
  }, [scroll, videoLocked, video])

  useEffect(() => {
    if (scroll === undefined) return;
    if (direction === 'up'){
      //when scrolling back up it needs to move back and stay in same position
      if (entryRef.current !== 0 && scroll < entryRef.current) entryRef.current = 0;
      if (middleRef.current !== 0 && scroll < entryRef.current + middleRef.current) middleRef.current = 0;
      if (btmRef.current !== 0 && scroll < btmRef.current + entryRef.current) btmRef.current = 0;
    }
    else if (direction === 'down'){
      //detect entry than set entry point to its ref
      if (entry?.isIntersecting && entryRef.current === 0) entryRef.current = scroll;
      //detect if it has travelled all the way to the right and lock its x movement
      if (entryRef.current !== 0 && middleRef.current === 0){
        if (scroll - entryRef.current > window.innerWidth * 0.45 && middleRef.current === 0) middleRef.current = scroll - entryRef.current + 100
      }
      if (exit?.isIntersecting && btmRef.current === 0) btmRef.current = scroll- entryRef.current;
    }
  }, [scroll, entry, exit])
  
  return (
    <section className={ styles.offPisteSection }>
      <div 
        className={ styles.iframeContainer}
        ref={videoRef}
      >
        {
          videoLocked &&
          <iframe 
            width={desktop ? "560" : '380'} 
            height={desktop ? "315" : '213'}
            src="https://www.youtube.com/embed/h33C8LH6yqI?controls=0&showinfo=0" 
            title="YouTube video player" 
            allow="accelerometer; modestbranding; encrypted-media; gyroscope; picture-in-picture, autoplay"
          />        
        }
      </div>
      <div 
        className={styles.bottomContainer }
        ref={helmetTopRef}
      >
        <div 
          className={styles.imgContainer}
          style={
            scroll !== undefined && btmRef.current !== 0 ? {transform: `translate3d(${middleRef.current * 0.88}px, ${btmRef.current * 0.88}px, 0px)`}
            : scroll !== undefined && middleRef.current !== 0 ? {transform: `translate3d(${middleRef.current * 0.88}px, ${(scroll - entryRef.current) / 1.2}px, 0px)`}
            : scroll !== undefined && entryRef.current !== 0 ? {transform: `translate3d(${(scroll - entryRef.current)}px, ${(scroll - entryRef.current) / 1.4}px, 0px)`}
            : {}}
        >
          <Image  src={ helmetImg }
                  alt='helmet' 
                  layout='responsive' 
                  />
        </div>
        <div className={ styles.textContainer }>
          At high speed and with danger all around, the <span>K2 PHASE MIPS HELMET</span><span><img src="/images/arrows.png" alt="arrows" /></span> is exactly what you need to protect yourself.
        </div>
      </div>
      <div  className={styles.appearingTextContainer}
            style={middleRef.current !== 0 && scroll !== undefined ? {opacity: (1 - ((entryRef.current + middleRef.current + 225) / scroll)) * 50} : {}}
      >
        Spin in the perfect fit with the <span>Phase helmet</span>, now available with an optional MIPS liner for increased protection. Subtle contouring and perfectly placed Active Matrix ventilation combine for under-the-radar styling, functional fit, and supreme comfort.
      </div>
      <a className={styles.arrowContainer}>
        <img src="/images/arrowRightGreen.png" alt="arrow right" />
      </a>
    </section>
  )
}
