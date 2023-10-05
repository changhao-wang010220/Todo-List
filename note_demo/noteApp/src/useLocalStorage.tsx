import { useEffect, useState } from "react";

//value: can be T or a function that returns type T
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    
    //function form of useState
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if(jsonValue === null) {
            if(typeof initialValue === "function") {
                //return initialValue() will give error because ts don't know the function will return T, 
                //we need to cast it to () => T
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    //tell ts the return type
    return [value, setValue] as [T, typeof setValue];
}