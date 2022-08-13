import React, { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import ShareIcon from '@mui/icons-material/Share';


export default function AssetTitle(props) {
    
    return (
        <Grid container xs={12}>
        <Grid // Collection & Social bar
            item xs={6}
        >
        <Grid container xs={12} sx={{  }}>

            <Grid // Collection
                item xs={12} sx={{ display: "left", justifyContent: "left", alignItems: "center"  }}
            >
                <Typography variant="h6" sx={{ textAlign: "left" }}>Counterparty</Typography>
            </Grid>

            <Grid // Floor
                item xs={12} sx={{ display: "left", justifyContent: "left", alignItems: "center"  }}
            >
                <Typography  sx={{ textAlign: "left", fontWeight: "100", color: "rgb(155,155,155)" }}>Floor 0.00btc</Typography>
            </Grid>

        </Grid>
        </Grid>

        <Grid // Share icons
            item xs={6}
        >
            <Stack direction="row" spacing={5} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                <Button 
                    variant="outlined" startIcon={<ShareIcon />}
                    color="secondary"
                    // sx={{ color: "rgb(255,255,255)" }}
                >
                    Share
                </Button>
            </Stack>
        </Grid>

        <Grid  // Contains asset name and descr.
            container xs={12}
            sx={{ pt: 2, pb: 2 }}
        >

            <Grid // Asset name
                item xs={12} sx={{ display: "flex", justifyContent: "left", pb: 1 }}
            >
                <Typography
                    variant="h3"
                    sx={{ fontWeight: "500" }}
                >
                    {props.assetInfo.asset}
                </Typography>
            </Grid>

            <Grid // Asset description
                item xs={12} sx={{ display: "flex", justifyContent: "left" }}
            >
                <Typography sx={{ fontWeight: "100", color: "rgb(155,155,155)" }}>
                    { 
                        !(props.description.includes("iframe"))
                        ? props.description
                        : "A Questfren"
                    }
                </Typography>
            </Grid>

        </Grid>

        <Grid // Owner
            container xs={12} sx={{ pb: 5 }}
        >
            <Grid item xs={2} sm={1} sx={{  display: "flex", justifyContent: "left", alignItems: "center" }}>
                <Avatar>{props.owner[1]}</Avatar>
            </Grid>
            <Grid container xs={3}>
                <Grid item xs={12} textAlign="left">
                    <Typography sx={{ fontWeight: "100", color: "rgb(155,155,155)" }}>Creator</Typography>
                </Grid>
                <Grid item xs={12} textAlign="left">
                    <Link href={`https://xchain.io/address/${props.owner}`} sx={{ textDecoration: "none" }}>
                        <Typography  color="secondary">
                            { props.owner !== ""
                                ?`${props.owner[0]}${props.owner[1]}${props.owner[2]}${props.owner[3]}${props.owner[4]}${props.owner[5]}`
                                : ""
                            }
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    )
}