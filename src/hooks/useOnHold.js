import { useState, useRef, useEffect } from 'react';

export function useOnHold(cb) {
    const timerRef = useRef();
    const [isHold, setIsHold] = useState();
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isHold) {
            intervalRef.current = setInterval(() => {
                cb();
            }, 100)
        } else {
            clearInterval(intervalRef.current);
        }
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [isHold])


    function startHoldTimer() {
        setIsHold(false);
        timerRef.current = setTimeout(() => {
            setIsHold(true);
        }, 500)
    }

    function handleOnClick(e) {
        setIsHold(false)
    }

    function handleOnMouseDown() {
        setIsHold(false)
        startHoldTimer();
    }

    function handleOnMouseUp() {
        setIsHold(false)
        clearTimeout(timerRef.current);
    }

    function handleOnTouchStart() {
        setIsHold(false)
        startHoldTimer();
    }

    function handleOnTouchEnd() {
        setIsHold(false)
        clearTimeout(timerRef.current);
    }

    return {
        onClick: handleOnClick,
        onMouseDown: handleOnMouseDown,
        onMouseUp: handleOnMouseUp,
        onTouchStart: handleOnTouchStart,
        onTouchEnd: handleOnTouchEnd
    }

}