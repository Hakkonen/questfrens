import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import Properties from "../asset/properties"

export default function PriceInfo(props) {

    const [ usdValue, setUsdValue ] = useState(0.0)
    const [ lastSoldBTC, setLastSoldBTC ] = useState(0.0)
    console.log(props)

    // Get USD value
    const getUSD = () => fetch(`https://xchain.io/api/network`).then(response => response.json())
    useEffect(() => {
        // If floor then use floor as cost base
        (async () => {
            if (props.floor > 0.0) {
                try {
                    const usdRes = await getUSD()
                    console.log(props.floor)
                    const value = Math.round(usdRes.currency_info[0].price_usd * props.floor)
                    setUsdValue(value)
                } catch(e) {
                    console.log(e)
                }
            } else if (props.lastSold > 0.0) {
                try {
                    const usdRes = await getUSD()
                    console.log(props.lastSold)
                    const value = Math.round(usdRes.currency_info[0].price_usd * props.lastSold)
                    setUsdValue(value)
                } catch(e) {
                    console.error(e)
                }
            }
        })();
    }, [props])
    // If no open dispenser, get last sold tx
    const getTxs = () => fetch(`https://questfrens.herokuapp.com/get_txs?name=${props.assetInfo.name}`).then(response => response.json())
    useEffect(() => {
        let closed = true
        for (const dispenser of props.dispensers) {
            if (dispenser.status == 0) {
                closed = false
            }
        }
        if (closed) {
            (async () => {
                if (props.dispensers !== undefined && props.dispensers.length > 0) {
                    console.log("CHECK HESE CLOSED DISPS")
                    console.log("CLSOED DISP")
                    console.log(props.dispensers)
                    
                    // Get prior txs
                    const txRes = await getTxs()

                    // Get highest tx_index
                    let highestIndex = 0
                    let lastSoldTx
                    for (const dispense of txRes) {
                        if (dispense.tx_index > highestIndex) {
                            lastSoldTx = dispense
                        }
                    }

                    // Correlate to dispenser src and price
                    for (const dispenser of props.dispensers) {
                        if (dispenser.tx_hash === lastSoldTx.dispenser_tx_hash) {
                            const lastSoldBTCCalc = ((dispenser.satoshirate / 100000000) / dispenser.give_quantity) * lastSoldTx.dispense_quantity
                            setLastSoldBTC(lastSoldBTCCalc)
                        }
                    }
                    
                } else {
                    // reset var
                    setLastSoldBTC(0.0)
                }
            })();
        }
    }, [props])

    return(
        <Card
            sx={{ width: "100%", border: "1px solid rgba(155,155,155, 0.1)", p: 0, m: 0 }}
        >
            <Grid container xs={12} sx={{ p: 2 }}>
                                    
                <Grid // unlisted / price
                    item xs={12} sm={6} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
                >
                        <Box sx={{ textAlign: "left" }}>
                            <Typography 
                                variant="caption" 
                                sx={{ color: "rgb(155,155,155)" }}
                            >
                                Floor Price
                            </Typography>
                            {
                                props.floor > 0
                                ?  <Typography variant="h5" sx={{ fontWeight: 500 }}>
                                        ₿ {props.floor}
                                        <Typography 
                                            variant="caption"
                                            sx={{ pl: 1, color: "rgb(155,155,155)" }}
                                        >(${usdValue})</Typography>
                                    </Typography>
                                :   <Typography variant="h5" sx={{ fontWeight: 500 }}>
                                        ₿ {lastSoldBTC}
                                        <Typography 
                                            variant="caption"
                                            sx={{ pl: 1, color: "rgb(155,155,155)" }}
                                        >(${usdValue})</Typography>
                                    </Typography>
                                }

                            <Typography 
                                variant="caption" 
                                sx={{ color: "rgb(155,155,155)" }}
                            >
                                Last Closed Price
                            </Typography>
                            <Typography>
                                ₿ {props.lastSold}
                            </Typography>
                        </Box>
                </Grid>
                <Grid // dispenser button
                    item xs={12} sm={6} sx={{ display: "flex", justifyContent: "right", alignItems: "top" }}
                >
                    {
                        props.floor > 0.0
                        ?   <Link href={`https://xchain.io/tx/${props.floorDispenser}`} target="_blank" sx={{ textDecoration: "none" }}>
                                <Button color="secondary" variant="outlined">Buy Now</Button>
                            </Link>
                        : <Box><Button color="secondary" variant="outlined" disabled={true}>Make Offer</Button></Box>
                    }
                </Grid>
                
            </Grid>
        </Card>
    )
}