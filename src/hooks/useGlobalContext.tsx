import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw Error('data in context is undefined')
    } else
    return (
        context
    );
};

export default useGlobalContext;