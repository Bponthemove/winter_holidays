import React, { createContext, useEffect, useState, useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useMediaQuery from "../hooks/useMediaQuery";
import useScroll from '../hooks/useScroll';

type ProviderProps = {
    desktop: boolean
    mobile: boolean
    menu: boolean
    openMenu: React.Dispatch<React.SetStateAction<boolean>>
    scroll: number | undefined
    gondelRef: React.RefObject<HTMLDivElement>
    gondelTopVis: IntersectionObserverEntry | undefined
    gondelBtmVis: IntersectionObserverEntry | undefined
};


export const GlobalContext = createContext<ProviderProps | undefined>(undefined);

export const GlobalContextProvider: React.FC = ({ children }) => {
    const desktop = useMediaQuery('(min-width: 1024px)');
    const mobile = useMediaQuery('(max-width: 1024px)');
    const scroll = useScroll();
    const [menu, openMenu] = useState<boolean>(false);
    const gondelRef = useRef(null)
    const gondelTopVis = useIntersectionObserver(gondelRef, {})
    const gondelBtmVis = useIntersectionObserver(gondelRef, {rootMargin: '0% 0% -90% 0%'})


    const value: ProviderProps = {
        desktop, mobile, menu, openMenu, scroll, gondelRef, gondelTopVis, gondelBtmVis
    };

    return (
        <GlobalContext.Provider value={ value }>
            { children }
        </GlobalContext.Provider>
    )
}