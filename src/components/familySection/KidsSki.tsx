import React from 'react'
import Image, { StaticImageData } from 'next/image';
import styles from './Family.module.css';
import skiOne from '../../../public/images/k2_1920_fatty_tops.webp';
import skiTwo from '../../../public/images/k2_2021_disruption-jr_top.webp';
import skiThree from '../../../public/images/k2_2021_Luvbug_top.webp';
import skiOneRotated from '../../../public/images/k2_1920_fatty_tops_rotated.webp';
import skiTwoRotated from '../../../public/images/k2_2021_disruption-jr_top_rotated.webp';
import skiThreeRotated from '../../../public/images/k2_2021_Luvbug_top_rotated.webp';
import useGlobalContext from '../../hooks/useGlobalContext';

export const KidsSki = ({ski, vis}: {ski: string, vis: boolean | undefined}) => {
    
    class kidsSki {
        im: StaticImageData | string;
        imRot: StaticImageData | string;
        title: string;
        descr: string;
        public constructor(im: StaticImageData | string = '', imRot: StaticImageData | string = '', title: string = '', descr: string = ''){
            this.im = im
            this.imRot = imRot
            this.title = title
            this. descr = descr
        }
    }
    const {desktop} = useGlobalContext()
    const fatty = new kidsSki(skiOne, skiOneRotated, 'K2 Fatty Tops', 'It’s impossible to step into these bad boys and not have a good time. They’re 88 centimeters of pure shred potential. Park tricks? Only limited by your imagination. Hard-charging big mountain? Hell yeah. There are two types of people in the world: those who have Fatties and those who need them. Decide which one you wanna be, because it’s time to party.');
    const disruption = new kidsSki(skiTwo, skiTwoRotated, 'K2 Disruption Jr', 'Made for kids who know how to rail a turn. For those on the racecourse or chasing Mom and Dad on early-morning groomer missions, the Disruption Jr is the piste ski your little ripper needs.')
    const luvBug = new kidsSki(skiThree, skiThreeRotated, 'K2 Luv Bug', 'Pass your love of skiing on to your little girl with the Luv Bug. If your little one is ready to click into her very own pair of skis, you’re in the right place. The Luv Bug is purpose-built and sturdy with a composite core, so it will stand up to years of fun on the hill.')

    return (
        <div className={vis && desktop ? [styles.skiContainer, styles.skiContainerActive].join(' ') : styles.skiContainer}>
            <div className={styles.imgContainer}>
                { desktop ? 
                <Image 
                    src={ski === 'one' ? fatty.im : ski === 'two' ? disruption.im : luvBug.im} 
                    alt='kids ski'
                    layout='fill' 
                    objectFit='contain' 
                    objectPosition='centre'
                />
                :
                <Image 
                    src={ski === 'one' ? fatty.imRot : ski === 'two' ? disruption.imRot : luvBug.imRot} 
                    alt='kids ski'
                    layout='fill' 
                    objectFit='contain' 
                    objectPosition='centre'
                />
                }
            </div>
            <h3>{ski === 'one' ? fatty.title : ski === 'two' ? disruption.title: luvBug.title}</h3>
            <p>{ski === 'one' ? fatty.descr : ski === 'two' ? disruption.descr : luvBug.descr}</p>
            <a className={styles.arrowContainer}>
                <img src="/images/arrowRightGreen.png" alt="arrow right" />
            </a>
        </div>
    )
}
