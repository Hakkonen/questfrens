import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';

export default function Instructions(props) {
    return (
        <Box style={{ textAlign: "left" }}>
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
        </Box>
    )
}