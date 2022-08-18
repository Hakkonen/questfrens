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

export default function HolderList(props) {
    
    const [ holders, setHolders ] = useState([])
    const [ holderCount, setHolderCount ] = useState(24)
    useEffect(() => {
        // Parse holder list, sort by new and cut at 25
        if (props.assetHolders.length > 0) {
            let sortedHolders = props.assetHolders.sort(function(a, b) {
                return parseFloat(b.address_quantity) - parseFloat(parseInt(a.address_quantity));
            });

            // append number to assets
            let count = 1
            for (let holder of holders) {
                holder.id = count
                count += 1
            }
            setHolders(sortedHolders)
        }
    }, [props])
    const handleMore = () => {
        if (holderCount < holders.length) {
            setHolderCount(holderCount + 10)
        }
    }

    // Controls substring length

    return (
        <Card
        sx={{ width: "100%", border: "1px solid rgba(155,155,155, 0.1)", p: 0, m: 0 }}
        >
            <Properties title="Holders" bgColor="rgb(19,22,25)" // Properties box
                content={
                    <Box sx={{ p: 1 }}>
                        <Grid container xs={12}>
                            <Grid container xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Source</TableCell>
                                            <TableCell>Stock</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { (holders.slice(0, holderCount)).map((holder) => {
                                        return (
                                        <TableRow
                                            key={holder.source}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                        <TableCell component="th" scope="row">
                                            <Typography textAlign="left" sx={{ color: "rgb(155,155,155)", overflow: "hidden" }}>
                                                { props.width < 450
                                                    ? holder.address.substring(0,10)
                                                    : holder.address
                                                }
                                                
                                                </Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography textAlign="right">{holder.address_quantity}</Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography textAlign="right">{Math.round((holder.address_quantity / props.supply)*100)}% </Typography>
                                        </TableCell>

                                        </TableRow>
                                            // <Grid container xs={12} key={holder.address}>
                                            //     <Grid item xs={6} sm={8}>
                                            //         <Typography textAlign="left" sx={{ color: "rgb(155,155,155)", overflow: "hidden" }}>{holder.address}</Typography>
                                            //     </Grid>
 
                                            //     <Grid item xs={3} sm={2}>
                                            //         <Typography textAlign="right" sx={{  }}>{holder.address_quantity}</Typography>
                                            //     </Grid>

                                            //     <Grid item xs={3} sm={2}>
                                            //         <Typography textAlign="right" sx={{  }}>       {Math.round((holder.address_quantity / props.supply)*100)}%
                                            //         </Typography>
                                            //     </Grid>
                                            // </Grid>
                                        )})}
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                                        {
                                            holders.length > holderCount
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