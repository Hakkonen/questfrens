import React, { useState, useEffect } from 'react';

import FrenCard from "./frenCard"

import Grid from '@mui/material/Grid';

import { useNavigate } from "react-router-dom";
import LazyLoad from 'react-lazyload' //https://github.com/twobin/react-lazyload
import axios from "axios"

export default function Account(props) {
    const [ cardlist, setCardlist ] = useState([])
    console.log("My Frens")

    useEffect(async () => {
        // If address is not blank
        if(props.address != "") {
            console.log("Address: " + props.address)
            const res = await getFeed(props.address)
        
            setCardlist(res)
        }

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

const getFeed = async (address) => {
    // Time loads
    let start = Date.now()

    // Get masterlist
    const response = await fetch('https://frenzone.net/questfrens/masterlist/masterlist.json');
    const feed = await response.json();
    console.log("FEED:")
    console.log(feed)

    // const daddyURL = "https://public.coindaddy.io:4001/api/" // rpc 1234
    // const assetResponse = await axios.post(daddyURL, {
    //     "method": "get_balances",
    //     "params": {
    //         "filters": 
    //             [
    //                 {"field": "address", "op": "==", "value": address},
    //                 {"field": "quantity", "op": ">", "value": "0"}
    //             ],
    //         "filterop": "AND"
    //     },
    //     "jsonrpc": "2.0",
    //     "id": 0
    // },
    // { auth: {
    //     username: "rpc",
    //     password: "1234"
    // }})

    // const assetResults = assetResponse.data.result
    // console.log("asset results:")
    // console.log(assetResults)

    // Parse results for address owned
    let parsedFeed = []
    for(let card of feed) {
        console.log(card)
        if(card.mint_address == address) {
            parsedFeed.push(card)
        }
    }

    parsedFeed.reverse()
    return parsedFeed
}