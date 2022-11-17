import { useState } from "react";

export function useArray(firstArray = []) {
    const [array, setArray] = useState(firstArray);

    const filterById = (id) => {
        setArray(prev => prev.filter(item => item.id !== id))
    }

    const filterByKey = (key, value) => {
        setArray(prev => prev.filter(item => item[key] !== value))
    }

    const filterByIdx = (idx) => {
        setArray(prev => prev.filter((_, i) => i !== idx))
    }

    const add = (arrayItem) => {
        setArray(prev => [...prev, arrayItem])
    }

    const addArray = (arrayItems) => {
        setArray(prev => [...prev, ...arrayItems])
    }

    const updateByIdx = (idx, updatedItem) => {
        setArray(prev => prev.map((arrayItem, i) => (
            idx === i ? updatedItem : arrayItem
        )))
    }


    const arrayActions = {
        set: setArray,
        filterById,
        filterByKey,
        filterByIdx,
        add,
        addArray,
        updateByIdx
    }

    return [array, arrayActions]
}