import { useEffect, useRef, useState } from "react"

export function useDebounce(cb, valueDebounce, dellay = 2000) {

    const debounceRef = useRef();
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            runCallBack()
        }, dellay);

        return () => {
            clearTimeout(debounceRef.current);
            setIsLoad(false);
        }
    }, [valueDebounce])

    const runCallBack = async () => {
        await cb();
        setIsLoad(false);
    }

    return isLoad
}