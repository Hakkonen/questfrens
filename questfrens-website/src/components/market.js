import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SearchBar from "./searchBar"
import Dashboard from "./dashboard"
import MarketCard from "./cards/marketCard"
import qfIcon from "../assets/QFicontemp.png"

export default function Market(props) {
    const [ marketList, setMarketList ] = useState([])
    const [ collection, setCollection ] = useState({
        title: "Questfrens",
        info: "Dynamically generated, interactive NFTs on the Counterparty network."
    })
    const [priceDirection, setPriceDirection] = useState(true)

    const handleChange = (event) => {
        setPriceDirection(event.target.value);
    }

    useEffect(async () => {
        console.log("running")
        const res = await getDispensers()
        
        setMarketList(res)
    }, [])

    useEffect(() => {
        console.log("COMPLETED")
        console.log(marketList)
    }, [marketList])

    // TODO
    // 1. Create market system that shows unminted tokens and minted tokens

    return (
        <Box sx={{ width: "100vw", minHeight: "90%", height: "auto" }}>

            {/* Header */}
            <Container  maxWidth="0" sx={{ width: "100%", height: "340px", display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "space-between", borderBottom: "1px solid rgba(155,155,155,0.2)"}}>

                <Box style={{ background: `url(${qfIcon})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom", zIndex: "-1", height: "340px", width: "100%", position: "fixed", filter: "blur(12px)", opacity: 0.1, ml:0, p:0 }}></Box>

                <Grid container spacing={1} sx={{ height: "auto", p: 0 }}>

                    {/* Icon */}
                    <Grid item xs={1} sx={{ mb: 2 }}>
                        <Box
                            disableGutters
                            component="img"
                            sx={{
                                height: 96,
                                width: 96,
                                maxHeight: 96,
                                maxWidth: 96,
                                p: 0,
                                m: 0
                            }}
                            alt="Questfrens"
                            src={qfIcon}
                        />
                    </Grid>

                    {/* Info */}
                    <Grid item xs={8} sx={{  }}>
                        <Grid container xs={10} sx={{ height: "32px" }}>
                            <Typography variant="h5" sx={{ fontWeight: "500", pl: 0, pr: 0, borderBottom: "1px solid rgba(150,150,150,0.5)" }}>
                                {collection.title}
                            </Typography>
                        </Grid>

                        <Grid container xs={11} sx={{ height: "32px" }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "1rem", pl: 0, pb: 1 }}>
                                {collection.info}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Social */}
                    <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "start", pr: 0, m: 0 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <IconButton aria-label="twitter" component="label">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton aria-label="twitter" component="label">
                                <TelegramIcon />
                            </IconButton>
                        </Stack>
                    </Grid>

                </Grid>

                {/* Bottom Panel */}
                <Grid container spacing={1} sx={{ minHeight: "96px", height: "auto" }}>
                    <Grid item xs={0.75} sx={{  }}>
                        <Typography variant="h5">
                            200
                        </Typography>
                        <Typography variant="overline">
                            Items
                        </Typography>
                    </Grid>

                    <Grid item xs={0.75} sx={{  }}>
                    <Typography variant="h5">
                            20
                        </Typography>
                        <Typography variant="overline">
                            Owners
                        </Typography>
                    </Grid>

                    <Grid item xs={0.75} sx={{  }}>
                    <Typography variant="h5">
                            1
                        </Typography>
                        <Typography variant="overline">
                            Total Vol
                        </Typography>
                    </Grid>

                    <Grid item xs={0.75} sx={{  }}>
                    <Typography variant="h5">
                            0.002
                        </Typography>
                        <Typography variant="overline">
                            Floor
                        </Typography>
                    </Grid>
                </Grid>

            </Container>

            <Container disableGutters maxWidth="0" sx={{ width: "100%", height: "auto", display: "flex" }}>
                {/* Filter */}
                <Grid container sx={{ width: "320px", height: "100%", borderRight: "1px solid grey" }}>
                    Fiters
                </Grid>

                {/* Assets */}
                <Grid container sx={{ width: "100%", height: "100%" }}>
                    {/* Search and price direction */}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pr: 2, mb: 4 }}>
                        {/* Search bar */}
                        <SearchBar /> 

                        {/* Price direction */}
                        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                            <InputLabel id="demo-select-small">Price</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={priceDirection}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value="Low to High">
                                </MenuItem>
                                <MenuItem value={false}>Low to High</MenuItem>
                                <MenuItem value={true}>High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    {/* Assets */}
                    <Grid container xs={12} spacing={2} sx={{ p:0, m:2 }}>
                        {
                            marketList.map(asset => (
                                <Grid item xs={3} sx={{ }}>
                                    <MarketCard key={asset.asset} asset={asset} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>

            </Container>

        </Box>
    )
}

const getDispensers = async () => {
    const response = await fetch('https://questfrens.herokuapp.com/get_dispensers');
    const dispenserData = await response.json();
    console.log(dispenserData)
    return dispenserData
}