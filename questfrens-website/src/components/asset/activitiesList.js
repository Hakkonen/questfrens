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

export default function ActivitiesList(props) {
    const [ activities, setActivities ] = useState([])
    const [ activitiesCount, setActivitiesCount ] = useState(24)
    
    // Get activities
    const getActivities = () => fetch(`https://goraredb.herokuapp.com/get_txs?name=${props.name}&rich=true`).then(response => response.json()).catch(e => {console.error(e)})

    useEffect(() => {
        (async () => {
            const res = await getActivities()
            console.log(res)

            // Parse holder list, sort by new and cut at 25
            if (res.length > 0) {
                let sortedHolders = res.sort(function(a, b) {
                    return parseFloat(b.tx_index) - parseFloat(parseInt(a.tx_index));
                });

                // append number to assets
                let count = 1
                for (let activity of sortedHolders) {
                    activity.id = count
                    count += 1
                }
                setActivities(sortedHolders)
            }
        })();
    }, [])

    // useEffect(() => {
    //     // Parse holder list, sort by new and cut at 25
    //     if (activities.length > 0) {
    //         let sortedHolders = activities.sort(function(a, b) {
    //             return parseFloat(b.tx_index) - parseFloat(parseInt(a.tx_index));
    //         });

    //         // append number to assets
    //         let count = 1
    //         for (let activity of sortedHolders) {
    //             activity.id = count
    //             count += 1
    //         }
    //         setActivities(activities)
    //     }
    // }, [activities])
    const handleMore = () => {
        if (activitiesCount < activities.length) {
            setActivitiesCount(activitiesCount + 10)
        }
    }

    return (
        <Card
        sx={{ width: "100%", border: "1px solid rgba(155,155,155, 0.1)", p: 0, m: 0 }}
        >
            <Properties title="Activity" bgColor="rgb(19,22,25)" // Properties box
                content={
                    <Box sx={{ p: 1 }}>
                        <Grid container xs={12}>
                            <Grid container xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Block Index</TableCell>
                                            <TableCell>Destination</TableCell>
                                            <TableCell textAlign="right">Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {( 
                                        activities.slice(0, activitiesCount)).map((activity) => {
                                            console.log(activity)
                                        return (
                                        <TableRow
                                            key={activity.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                        >

                                        <TableCell component="th" scope="row">
                                            <Typography textAlign="left">{activity.block_index}</Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography textAlign="left" sx={{ color: "rgb(155,155,155)", overflow: "hidden" }}>
                                                { 
                                                    props.width < 450
                                                    ? activity.destination.substring(0,10)
                                                    : activity.destination
                                                }
                                                </Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography textAlign="right">{activity.dispense_quantity}</Typography>
                                        </TableCell>

                                        </TableRow>
                                    )})}
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                                    {
                                        activities.length > activitiesCount
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