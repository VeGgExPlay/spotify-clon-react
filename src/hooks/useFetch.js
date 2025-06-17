import { useEffect, useState } from "react";

export function useFetch(){
    const [songs, setSongs] = useState(undefined)

    useEffect(() => {
        fetch('/api/data.json')
        .then(res => res.json())
        .then(data => setSongs(data))
    }, [])

    return songs
}