import { useCallback, useEffect, useRef, useState } from "react"
import styles from "../assets/style/modules/loader.module.scss"

export function InfinityScroll({
    children,
    cb,
    isHasMore
}) {

    const [isLoad, setIsLoad] = useState(false);
    const [isEror, setIsEror] = useState(false);
    const observer = useRef();


    const endElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && isHasMore) {
                load();
            }
        })
        if (node) observer.current.observe(node);
    },
        [isLoad, isHasMore, cb],
    )

    const load = async () => {
        if (!isHasMore || isEror || isLoad) return;
        try {
            setIsLoad(true);
            await cb();
            setIsLoad(false);
        } catch (e) {
            setIsEror(true);
        }
    }



    useEffect(() => {
        if (!isHasMore || isEror) setIsLoad(false);
    }, [isHasMore, isEror])



    return (
        <>
            {children}
            <div style={{ paddingBottom: 1, paddingTop: 1 }} ref={endElementRef} />
            {
                (isLoad || isHasMore) &&
                <div className="flex-center">
                    <div className={`${styles.loader1}`}><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </>
    )
}