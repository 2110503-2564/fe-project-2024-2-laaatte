'use client'
import Link from "next/link";
import Card from "./Card";
import { useReducer } from "react";

export default function CardPanel() {

    const startMap = new Map();

    startMap.set("The Bloom Pavilion",0);
    startMap.set("Spark Space",0);
    startMap.set("The Grand Table",0);

    const valueReducer = (valuelist:Map<string,number>, 
        action:{type:string, venueName:string, newValue: number}) => 
    {
        switch (action.type) {
            case "add" : {
                valuelist.set(action.venueName,action.newValue != null ? action.newValue : 0);
                return new Map(valuelist);
            }
            case "remove" : {
                valuelist.delete(action.venueName)
                return new Map(valuelist);
            }
            default :
                return valuelist;
        }
    }

    const venueArray = [
        {vid : '001', name : 'The Bloom Pavilion', img : '/img/bloom.jpg'},
        {vid : '002', name : 'Spark Space', img : '/img/sparkspace.jpg'},
        {vid : '003', name : 'The Grand Table', img : '/img/grandtable.jpg'}
    ]

    const [valuelist, dispatchValue ] = useReducer(valueReducer, startMap );

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row",
                    flexWrap:"wrap", justifyContent:"space-around",alignContent:"space-around"
                  }}>
                    {
                        venueArray.map((venueitem) => (
                            <Link href={`/venue/${venueitem.vid}`} className="w-1/5">                           
                            <Card venueName={venueitem.name} imgSrc={venueitem.img} 
                            onChange={ (venue:string,value:number) => dispatchValue ({type:'add',venueName:venue,newValue:value})}/>
                            </Link>
                        ))
                    }
            </div>  
            <div className="w-full text-xl font-medium py-2">
                Venue List with Ratings : { valuelist.size }
            </div>
            <div>
                {Array.from(valuelist).map (
                    ([venue,value]) => 
                    <div key={venue}
                        data-testid = {venue}
                        onClick={() => dispatchValue ({type:'remove',venueName:venue,newValue:value}) }
                    >
                        {venue + " : " + value}
                    </div>
                )}
            </div>
        </div>
    );
}