import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

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

// Custom import
import Properties from './properties';

export default function DispenserList(props) {

    const [ dispensers, setDispensers ] = useState([])
    const [ dispCount, setDispCount ] = useState(24)
    useEffect(() => {
        // Parse Dispenser list, sort by new and cut at 25
        if (props.assetInfo.dispensers.length > 0) {
            let sortedDisp = props.assetInfo.dispensers.sort(function(a, b) {
                return parseFloat(b.tx_index) - parseFloat(parseInt(a.tx_index));
            });
            console.log(sortedDisp)

            // append number to assets
            let count = 1
            for (let dispenser of dispensers) {
                dispenser.id = count
                count += 1
            }
            setDispensers(sortedDisp)
        }
    }, [props])
    const handleMore = () => {
        if (dispCount < dispensers.length) {
            setDispCount(dispCount + 10)
        }
    }

    return (
        <Card
        sx={{ width: "100%", border: "1px solid rgba(155,155,155, 0.1)", p: 0, m: 0 }}
        >
            <Properties title="Dispensers" bgColor="rgb(19,22,25)" // Properties box
                content={
                    <Box sx={{ p: 2 }}>
                        <Grid container xs={12}>
                            <Grid container xs={12}>
                                    { (dispensers.slice(0, dispCount)).map((dispenser) => {
                                        return (
                                            <Grid container xs={12}>
                                                <Grid item xs={4}>
                                                    { parseInt(dispenser.status) === 10 
                                                        ? <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Closed</Typography>
                                                        : <Typography textAlign="left" sx={{ color: "rgb(254,254,254)" }}>Open</Typography>
                                                    }
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <a href={`https://xchain.io/tx/${dispenser.tx_hash}`} target="_blank" style={{ textDecoration: "none", color: "rgb(65,102,128)" }}>
                                                        <Typography textAlign="left" color="warning">{dispenser.source.substring(0, 7)}</Typography>
                                                    </a>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography textAlign="right">{dispenser.satoshirate / 100000000} BTC</Typography>
                                                </Grid>
                                            </Grid>
                                        )})}
                                        {
                                            dispensers.length > dispCount
                                            ?   <Box sx={{ width: "100%" }}>
                                                <Grid item xs={12} sx={{ borderBottom: "1px solid rgb(155,155,155)", pb: 1}}></Grid>
                                                <Stack spacing={0} direction="row" sx={{ pt: 1 }}>
                                                    <Button variant='text' color="warning" onClick={handleMore}>More</Button>
                                                </Stack>
                                                </Box>
                                            : null
                                        }

                            </Grid>
                        </Grid>
                    </Box>
                }
            >
            </Properties>
        </Card>
    )
}