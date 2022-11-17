import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Redirect({ to }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (to) {
            navigate(to);
        }
    }, [to])




    return <div />
}