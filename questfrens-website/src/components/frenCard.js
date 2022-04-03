import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FrenCard(props) {

    // Get cookies

    return (
        <Box>
            <Card sx={{ width: "auto", minHeight: 560, backgroundColor: "black" }}>
                <CardContent>
                    <iframe 
                        style={{border:"0"}}
                        width="400" height="560" 
                        src={`../card/index.html?fren=${props.item.name}`}
                    ></iframe> 

                    <Typography sx={{ textAlign: "left" }} color="bisque" gutterBottom>
                        QUESTFREN #{props.item.name}
                    </Typography>

                    <Typography sx={{ textAlign: "left" }} color="bisque" gutterBottom>
                        {props.item.alias}
                    </Typography>

                    <Typography sx={{ textAlign: "left" }} color="bisque" gutterBottom>
                        {props.item.mint_address}
                    </Typography>

                    <Typography sx={{ textAlign: "left" }} color="bisque" gutterBottom>
                        { getDate(props.item.mint_time) }
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="small"><a href={"https://xchain.io/asset/QUESTFREN." + props.item.name} target="_blank">XCHAIN</a></Button>
                </CardActions>
            </Card>
        </Box>
    )
}

// Timestamp to date
function getDate(timestamp) {
    // Convert timestamp to time
    const date = new Date(timestamp*1000)
    const readableDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()

    return readableDate
}