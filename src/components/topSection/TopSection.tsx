import React, {useEffect, useState, useRef} from 'react';
import Image from 'next/image';
import styles from './TopSection.module.css';
import backgroundDesktop from '../../../public/images/powder.webp'
import backgroundPlaceholder from '../../../public/images/powderPlaceholder.webp'
import menuIcon from '../../../public/icons/k2-logo-white.png'
import inset from '../../../public/images/powderCap.webp'
import useGlobalContext from '../../hooks/useGlobalContext';

export const TopSection = () => {
  const { desktop, menu, scroll } = useGlobalContext();
  const [h1, loadH1] = useState(false);
  const firstRenderRef = useRef(false);
  
  useEffect(() => {
    //only load the inline styles after first render otherwise server and client side do not match and you get an error
    firstRenderRef.current = true;
  }, [])

  return (
    <section  className={ styles.topSection }>
    { !firstRenderRef.current &&
      <div className={styles.imgContainer} style={{backgroundColor: 'white'}}>
        <Image  src={backgroundPlaceholder} 
                alt='snow and ski' 
                layout='fill' 
                objectFit='cover' 
                objectPosition='centre'
                priority
        />
      </div>
    }
    { firstRenderRef.current &&
    <>
      <div  className={h1 ? [styles.h1Container, styles.h1ContainerAnimate].join(' ') : styles.h1Container}
            style={scroll !== undefined ? {transform: `translateY(${desktop ? scroll/5 : scroll/1.8}%)`} : {}}
      >
        <h1 className={menu ? [styles.h1, styles.h1Grey, styles.h1Active].join(' ') : [styles.h1, styles.h1Grey].join(' ')}
            style={scroll !== undefined ? {opacity: 1-(scroll/300)} : {opacity: 1}}
        >
          BACKCOUNTRY
        </h1>
        <h1 className={menu ? [styles.h1, styles.h1White, styles.h1Active].join(' ') : [styles.h1, styles.h1White].join(' ')}
            style={scroll !== undefined ? {opacity: scroll/300} : {opacity: 0}}
        >
          <span>
            <Image src={ menuIcon } alt='k2 logo' width='75%' height='75%'/>          
          </span>
          THE NEW FACE OF FREERIDE        
        </h1>
      </div>      
      <div  className={menu ? [styles.imgContainer, styles.imgContainerActive].join(' ') : styles.imgContainer}
            style={scroll !== undefined ? {opacity: `${1 -(scroll/500)}`} : {}}
      >
        <Image  src={backgroundDesktop} 
                alt='snow and ski' 
                layout='fill' 
                objectFit='cover' 
                objectPosition='centre'
                priority
                onLoadingComplete={() => loadH1(true)}
        />
        <Image  src={inset} 
                alt='snow and ski' 
                layout='fill' 
                objectFit='cover' 
                objectPosition='centre'
                priority
        />
      </div>
      <div 
        className={styles.subTitleMovingUp} 
        style={scroll !== undefined ? {transform: `translateY(-${scroll/22}%)`} : {}}
      >
        Come on... You know you want to! Dreaming of powder days under a bluebird sky? Get ready for your next adventure!
      </div>
    </>}
    </section>
  );
};
