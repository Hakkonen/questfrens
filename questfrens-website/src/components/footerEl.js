import React from 'react'

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function FooterEl(props) {

    return (
        <Box sx={{ width: "100%", height: "50px", borderTop: "1px solid rgba(155,155,157,0.3)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 5 }}>
            <Typography variant='caption' sx={{ color: "rgb(145,145,147)", pt: 2 }}>Site under construction, by <a href="https://twitter.com/dasistsatori" target="_blank">@fabrique</a> 2022</Typography>
            <Typography variant="caption" sx={{ color: "rgb(145,145,147)" }}>If you enjoy this site please consider donating an NFT to: 1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5</Typography>
        </Box>
    )
}