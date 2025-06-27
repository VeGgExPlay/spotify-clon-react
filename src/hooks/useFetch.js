import { useEffect, useState } from "react";

export function useFetch(){
    const [songs, setSongs] = useState(undefined)
    const [artists, setArtists] = useState(undefined)

    useEffect(() => {
        const fetchSongs = async () => {
            try{
                const res = await fetch('/api/data.json')
                const data = await res.json()
                setSongs(data)
            } catch (error){
                console.error("Error fetching songs:", error)
            }
        }

        fetchSongs()
    }, [])

    useEffect(() => {
        const fetchArtists = async () => {
            try{
                const res = await fetch('/api/artists.json')
                const data = await res.json()
                setArtists(data)
            } catch (error){
                console.error("Error fetching artists:", error)
            }
        }

        fetchArtists()
    }, [])

    return {songs, artists}
}