import { useState } from "react";

export function useToggle(startedValue = false) {

    const [bool, setBool] = useState(startedValue);

    const toggleBool = (value) => {
        if (value === undefined) setBool(prev => !prev);
        else setBool(value);
    }

    return [bool, toggleBool]
}