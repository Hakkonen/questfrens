import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import FooterEl from './footerEl';

export default function(props) {

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", flexGrow: 1, m:0,p:0 }}>

            <Container sx={{ pt: 5, pb: 5 }}>
                <Paper>
                    <Typography>TEST</Typography>
                </Paper>
            </Container>

            <FooterEl />
        </Box>
    )
}