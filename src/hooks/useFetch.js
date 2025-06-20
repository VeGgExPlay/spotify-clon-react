import { useEffect, useState } from "react";

export function useFetch(){
    const [songs, setSongs] = useState(undefined)
    const [artists, setArtists] = useState(undefined)

    useEffect(() => {
        fetch('/api/data.json')
        .then(res => res.json())
        .then(data => setSongs(data))
    }, [])

    useEffect(() => {
        fetch('/api/artists.json')
        .then(res => res.json())
        .then(data => setArtists(data))
    }, [])

    return {songs, artists}
}