import React, { createContext, useState, useRef, PropsWithChildren } from "react";
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
    familySection: boolean
    openFamilySection: React.Dispatch<React.SetStateAction<boolean>>
};

export const GlobalContext = createContext<ProviderProps | undefined>(undefined);

export const GlobalContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const desktop = useMediaQuery('(min-width: 1024px)');
    const mobile = useMediaQuery('(max-width: 1024px)');
    const scroll = useScroll();
    const [menu, openMenu] = useState<boolean>(false);
    const [familySection, openFamilySection] = useState(false);
    const gondelRef = useRef(null)

    const value: ProviderProps = {
        desktop, mobile, menu, openMenu, scroll, gondelRef, openFamilySection, familySection
    };

    return (
        <GlobalContext.Provider value={ value }>
            { children }
        </GlobalContext.Provider>
    )
}