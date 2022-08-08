import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { address } from 'bitcoinjs-lib';

export default function SplashCard() {
    const number = "1"
    const address = "1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5"

    return (
        <Card sx={{ border: "1px solid rgba(150,150,150,0.15)" }}>
            <CardContent style={{ textAlign: "left" }}>

                <Box sx={{ width: "100%" }}>
                <iframe 
                    style={{border: "1px solid rgba(150,150,150,0.15)"}}
                    // width="400" height="560"
                    width="100%" height="560"
                    src={`https://frenzone.net/questfrens/card/index.html?fren=1`}
                ></iframe> 
                </Box>

                <Box sx={{ pl: 2, pb: 1, display: "flex", flexDirection: "column" }} spacing={0}>
                    <Typography color="secondary" variant="button" style={{ fontWeight: 500 }}>QUESTFREN {number}</Typography>
                    <Typography variant="button" style={{ fontWeight: 300 }}> by {address}</Typography>
                </Box>
                
            </CardContent>

            {/* <CardActions>
                <Button color="secondary" size="small" >Explore</Button>
                
            </CardActions> */}
        </Card>
    );
}