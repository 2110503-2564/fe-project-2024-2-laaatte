'use client'
import { useWindowListener } from "@/hooks/useWindowListener"
import { useRef, useEffect, useState } from "react"  

export default function VlogPlayer({vdoSrc, isPlaying} : {vdoSrc:string, isPlaying:boolean}) {

    const vdoRef = useRef<HTMLVideoElement>(null)
    
    useEffect(()=> {
        // alert('width is ' + vdoRef.current?.videoWidth)
        if(isPlaying) {
            console.log('Play VDO')
            vdoRef.current?.play()
        }else {
            console.log('Pause VDO')
            vdoRef.current?.pause()
        }
    }, [isPlaying])

    useWindowListener("resize",(e)=>{ alert("window width : " + (e.target as Window).innerWidth) })

    return (
        <video className="w-[40%]"
        src={vdoSrc}
        ref={vdoRef}
        controls loop muted/>
    )
}