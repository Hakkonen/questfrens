import React, { useState, useEffect } from 'react';

import FrenCard from "./frenCard"

import Grid from '@mui/material/Grid';

import { useNavigate } from "react-router-dom";
import LazyLoad from 'react-lazyload' //https://github.com/twobin/react-lazyload

export default function Feed(props) {
    const [ cardlist, setCardlist ] = useState([])
    console.log("FEED")

    useEffect(async () => {
        const res = await getFeed()
        
        setCardlist(res)
    }, [])

    useEffect(() => {
        console.log(cardlist)
    }, [cardlist])

    return (
        <Grid container justify="center" spacing={2}>
            {cardlist.map((item, i) => (
                <Grid item xs={12}
                    sx={{ display: "flex", alignContent: "center", justifyContent: "center"}}
                >
                <LazyLoad height={200}>
                    <FrenCard 
                        item={item}
                    />
                </LazyLoad>
                </Grid>
            ))}
        </Grid>
    )
}

const getFeed = async () => {
    const response = await fetch('https://frenzone.net/questfrens/masterlist/masterlist.json');
    const feed = await response.json();


    //Reverse feed for chronology 
    feed.reverse()
    console.log(feed)
    return feed
}