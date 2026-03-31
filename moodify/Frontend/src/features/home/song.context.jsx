import { Children, createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children}) =>{

    const [song,setSong] = useState({
         "url": "https://ik.imagekit.io/6d8dyvw6l/songs/Tera_Mera_Viah_PagalWorld.com.se__fcf6wwZ93.mp3",
        "postUrl": "https://ik.imagekit.io/6d8dyvw6l/songs/Tera_Mera_Viah_PagalWorld.com.se__bLiRmwal5.jpeg",
        "title": "Tera Mera Viah(PagalWorld.com.se)",
        "mood": "happy",
    })

    const [loading,setLoading] = useState(false)
    return (
        <SongContext.Provider
         value={{loading,setLoading,song,setSong}}>
            {children}
        </SongContext.Provider>
    )
}