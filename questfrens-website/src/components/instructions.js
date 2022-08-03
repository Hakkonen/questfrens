import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { textAlign } from '@mui/system';
import { Container } from '@mui/material';

export default function Instructions(props) {
    return (
        <Box style={{ textAlign: "left", display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column nowrap" }}>
            MINTING
            <Card sx={{ maxWidth: 300, backgroundColor: "rgb(30,30,30)" }}>
                <CardMedia
                    component="img"
                    // height="50"
                    image="https://imgur.com/Y87akzr.png"
                    alt="Step 1"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                    Step 1
                    </Typography>
                    <Typography variant="body2" color="white">
                    Open Freewallet and select "Broadcast Message" from the dropdown menu.
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>

            <Card sx={{ maxWidth: 425, backgroundColor: "rgb(30,30,30)" }}>
                <CardMedia
                    component="img"
                    // height="50"
                    image="https://imgur.com/SSrIozA.png"
                    alt="Step 2"
                />
                <CardMedia
                    component="img"
                    // height="50"
                    image="https://imgur.com/vVV34d4.png"
                    alt="Step 2"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                    Step 2
                    </Typography>
                    <Typography variant="body2" color="white">
                    To create a valid broadcast signature enter into the message field:
                    <br></br>
                    <br></br>
                    MINT QUESTFREN number name
                    <br></br><br></br>
                    Where "number" is the QUESTFREN that you own.
                    Where "name" is the optional alias for your QUESTFREN.
                    <br></br><br></br>
                    For example, the first QUESTFREN ever made was minted by enter the following into the message field:
                    <br></br><br></br>
                    MINT QUESTFREN 1 HELLOWORLD
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: 500, backgroundColor: "rgb(30,30,30)" }}>
                <CardMedia
                    component="img"
                    // height="50"
                    image="https://imgur.com/A1yZ5He.png"
                    alt="Step 3"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                    Step 3
                    </Typography>
                    <Typography variant="body2" color="white">
                    Wait for the broadcast to be confirmed on the chain...
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: 500, backgroundColor: "rgb(30,30,30)" }}>
                <CardMedia
                    component="img"
                    image="https://imgur.com/nZKVma4.png"
                    alt="Step 4"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                    Step 4
                    </Typography>
                    <Typography variant="body2" color="white">
                    Go to your QUESTFREN token and select "Start".
                    <br></br>
                    Enter the QUESTFREN number that you have broadcast a mint signature for.
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: 400, backgroundColor: "rgb(30,30,30)" }}>
                <CardMedia
                    component="img"
                    image="https://imgur.com/e0u19M6.png"
                    alt="Step 5"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                    Step 5
                    </Typography>
                    <Typography variant="body2" color="white">
                    Click to confirm that you have a valid mint signature broadcasted and confirmed on the network.
                    <br></br><br></br>
                    Congratultions, you're now ready to hit "Mint" and mint your QUESTFREN!
                    </Typography>
                </CardContent>
            </Card>
            
            
            <Container>
            COMBAT
            <ol>
                <li>
                    Open Freewallet and select sign message<br></br>
                    <br></br>
                    <img src="https://i.imgur.com/hzGLKB3.png" height="auto" width="300px"></img><br></br><br></br>
                </li>
                <li>
                    Enter the address that owns the fren you would like to use<br></br><br></br>
                    <img src="https://i.imgur.com/h4bCb6y.png" height="auto" width="300px"></img><br></br><br></br>
                </li>
                <li>
                    Press sign. Do not share your signature. <br></br>
                    Your signature will not allow access to your wallet.<br></br> 
                    Signing simply proves ownership of a wallet.<br></br><br></br>
                </li>
                <li>
                    Enter your address and signature into the fren attack / heal dialogue box.<br></br>
                    Hit "Submit".<br></br>
                    <br></br>
                    <img src="https://i.imgur.com/lBVlKN5.png" height="auto" width="300px"></img>
                </li>
            </ol>
            </Container>
        </Box>
    )
}