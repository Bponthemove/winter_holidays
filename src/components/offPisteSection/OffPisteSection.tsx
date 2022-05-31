import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import styles from './OffPiste.module.css'
import helmetImg from '../../../public/images/helmet.webp'
import lineFront from '../../../public/images/line2Front.png'
import lineBack from '../../../public/images/line2Back.jpg'
import useGlobalContext from '../../hooks/useGlobalContext'
import useScrollDirection from '../../hooks/useScrollDirection'

export const OffPisteSection = () => {
  const {scroll, desktop, openFamilySection} = useGlobalContext();
  const [videoLocked, setVideoLocked] = useState(false);
  const videoRef = useRef(null);
  const helmetTopRef = useRef(null);
  const arrowRef = useRef(null);
  const entryRef = useRef(0);
  const middleRef = useRef(0);
  const btmRef = useRef(0);
  const counterRef = useRef(0);
  const video = useIntersectionObserver(videoRef, {});
  const entry = useIntersectionObserver(helmetTopRef, {rootMargin: desktop ? '0% 0% -50% 0%' : '0% 0% -100% 0%'});
  const exit = useIntersectionObserver(arrowRef, {rootMargin: '0% 0% -10% 0%'})
  const direction = useScrollDirection();

  useEffect(() => {
    if (scroll === undefined || videoLocked) return;
    if(video?.isIntersecting) setVideoLocked(!videoLocked)
  }, [scroll, videoLocked, video])

  useEffect(() => {
    console.log(window.innerWidth)
    //setting reference points for moving helmet sideways and down 
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
        if (scroll - entryRef.current > window.innerWidth * 0.35 && middleRef.current === 0 && !desktop) middleRef.current = scroll - entryRef.current + 100;
        if (scroll - entryRef.current > window.innerWidth * 0.5 && middleRef.current === 0) middleRef.current = scroll - entryRef.current + 100;
      }
      if (exit?.isIntersecting && btmRef.current === 0) btmRef.current = scroll- entryRef.current;
    }
  }, [scroll, entry, exit, direction, desktop])

  useEffect(() => {
    //setting mask for tracks in snow overlay
    if (!exit?.isIntersecting) return;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.onscroll = () => {
      console.log(scrollTop, scroll)
      if (counterRef.current < 125) {
        counterRef.current++;
        window.scrollTo(0, scrollTop);
        document.body.style.setProperty('--mask', `linear-gradient(to top, transparent ${100 - counterRef.current*1.2}%, black)`);
      } else{
        window.onscroll = () => {};
        openFamilySection(true);
      }
    }  
  }, [exit])
  
  return (
    <section className={ styles.offPisteSection }>
      <div 
        className={ styles.iframeContainer}
        ref={videoRef}
      >
        {
          videoLocked &&
          <iframe 
            width='100%' 
            height='45.20%'
            src="https://www.youtube.com/embed/h33C8LH6yqI?controls=0&showinfo=0&autoplay=1&mute=1&loop=1&playlist=h33C8LH6yqI" 
            title="YouTube video player" 
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
            scroll !== undefined && btmRef.current !== 0 ? {transform: `translate3d(${middleRef.current * 0.88}px, ${btmRef.current * 0.88}px, 0px) scale(${desktop ? 0.75 : 0.9})`}
            : scroll !== undefined && middleRef.current !== 0 ? {transform: `translate3d(${middleRef.current * 0.88}px, ${(scroll - entryRef.current) / 1.2}px, 0px) scale(${desktop ? 0.75 : 0.9})`}
            : scroll !== undefined && entryRef.current !== 0 ? {transform: `translate3d(${(scroll - entryRef.current)}px, ${(scroll - entryRef.current) / 1.4}px, 0px) scale(${desktop ? 0.75 : 0.9})`}
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
      <div className={styles.appearingContainer}>
        <div className={[styles.appearingImgContainer, styles.appearingImgContainerBack].join(' ')}>
          <Image  src={lineBack} 
                  alt='snow and ski' 
                  layout='fill' 
                  objectFit='cover' 
                  objectPosition='centre'
        />
        </div>
        <div 
          className={[styles.appearingImgContainer, styles.appearingImgContainerFront].join(' ')}>
          <div  className={styles.appearingTextContainer}
          >
            Spin in the perfect fit with the <span>Phase helmet</span>, now available with an optional MIPS liner for increased protection. Subtle contouring and perfectly placed Active Matrix ventilation combine for under-the-radar styling, functional fit, and supreme comfort.
          </div>
          <Image  src={lineFront} 
                  alt='snow and ski' 
                  layout='fill' 
                  objectFit='cover' 
                  objectPosition='centre'
          />
        </div>
      </div>
      <a 
        className={styles.arrowContainer}
        ref={arrowRef}
      >
        <img src="/images/arrowRightGreen.png" alt="arrow right" />
      </a>
    </section>
  )
}
