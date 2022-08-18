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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                    <Box sx={{ p: 1 }}>
                        <Grid container xs={12}>
                            <Grid container xs={12}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                { props.width < 450
                                                    ? null
                                                    : <TableCell>Status</TableCell>
                                                }
                                                
                                                <TableCell>Source</TableCell>
                                                <TableCell>Stock</TableCell>
                                                <TableCell sx={{ textAlign: "right" }}>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                    { (dispensers.slice(0, dispCount)).map((dispenser) => {
                                        return (
                                            <TableRow
                                                key={dispenser.source}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                {   props.width < 450 
                                                    ? null
                                                    : <TableCell component="th" scope="row">
                                                    { parseInt(dispenser.status) === 10 
                                                        ? <Typography textAlign="left" sx={{ color: "rgb(155,155,155)" }}>Closed</Typography>
                                                        : <Typography textAlign="left" sx={{ color: "rgb(254,254,254)" }}>Open</Typography>
                                                    }
                                                    </TableCell>
                                                }
                                                
                                                <TableCell component="th" scope="row">
                                                <a 
                                                    href={`https://xchain.io/tx/${dispenser.tx_hash}`} target="_blank" style={{ textDecoration: "none", color: "rgb(65,102,128)" }}
                                                >
                                                    <Typography textAlign="left" color="warning">{dispenser.source.substring(0, 6)}...</Typography>
                                                </a>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                <a href={`https://xchain.io/tx/${dispenser.tx_hash}`} target="_blank" style={{ textDecoration: "none" }}>
                                                    {
                                                        dispenser.give_remaining > 0 ?
                                                        <Typography sx={{ color: "rgb(254,254,255)" }}>
                                                            {dispenser.give_quantity} / {dispenser.give_remaining}
                                                        </Typography>
                                                        : <Typography sx={{ color: "rgb(155,155,157)" }}>0 / 0</Typography>
                                                    }
                                                </a>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Typography textAlign="right">{dispenser.satoshirate / 100000000} BTC</Typography>
                                                </TableCell>
                                            </TableRow>
                                            
                                        )})}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                        {
                                            dispensers.length > dispCount
                                            ?   <Box sx={{ width: "100%" }}>
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