import { useEffect, useState } from "react"

export const useLoader = (isLoading: boolean) =>{
    const [loading, setLoading] = useState(isLoading);

    useEffect(() =>{
        setLoading(isLoading);
    }, [isLoading]);

    return loading;
}