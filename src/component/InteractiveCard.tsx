'use client'
import React from "react";

export default function InteractiveCard({children} : {children : React.ReactNode}) {

    function CardHover(event : React.SyntheticEvent) {
        if (event.type == 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg')
            event.currentTarget.classList.add('shadow-2xl')
            //color
            event.currentTarget.classList.remove('bg-white')
            event.currentTarget.classList.add('bg-neutral-200')
        } else {
            event.currentTarget.classList.remove('shadow-2xl')
            event.currentTarget.classList.add('shadow-lg')
            //color
            event.currentTarget.classList.remove('bg-neutral-200')
            event.currentTarget.classList.add('bg-white')
        }
    }

    return (
        <div className="w-full h-[300px] rounded-lg shadow-lg bg-white"
        onMouseOver={(e)=>CardHover(e)}
        onMouseOut={(e)=>CardHover(e)}
        >
            {children}
        </div>
    );
}