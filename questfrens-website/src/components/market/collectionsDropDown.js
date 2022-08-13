
import React, { useState, useEffect } from 'react';
import {
    useLocation
} from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// Custom imports
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AttrBar from "../market/attrBar"

export default function CollectionsDropDown(props) {

    const [ collectionName, setCollectionName ] = useState("Select")
    useEffect(() => {
        try {
            if(!!props.collection.title) {
                setCollectionName(props.collection.title)
            }
        } catch {
            console.log("ss")
        }
        
    }, [props.collection])

    return (
        <Grid container xs={12} sx={{ pt: 1, pl:1 , pr: 1, pb: 2, borderBottom: "1px solid rgb(40,45,49)" }}>
            <Typography variant="overline">
                Collections
            </Typography>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{collectionName}</InputLabel>
                <Select
                    labelId="collection-label"
                    id="collection-label"
                    // defaultValue={props.collection.params}
                    value={props.collection.params}
                    label={collectionName}
                    onChange={props.handleCollectionChange}
                >
                    <Link 
                        href="/market?collection=questfrens"
                        sx={{ textDecoration: "none", color: "white" }}
                    ><MenuItem value={"questfrens"}>Questfrens</MenuItem></Link>
                    <Link 
                        href="/market?collection=mint"
                        sx={{ textDecoration: "none", color: "white" }}
                    ><MenuItem value={"mint"}>Questfren Mint Tokens</MenuItem></Link>
                    <Link 
                        href="/market?collection=punkfrens"
                        sx={{ textDecoration: "none", color: "white" }}
                    ><MenuItem value={"punkfrens"}>Punk Frens</MenuItem></Link>
                    <Link 
                        href="/market?collection=fakerares"
                        sx={{ textDecoration: "none", color: "white" }}
                    ><MenuItem value={"fakerares"}>Fake Rares</MenuItem></Link>
                    <Link 
                        href="/market?collection=fakecommons"
                        sx={{ textDecoration: "none", color: "white" }}
                    ><MenuItem value={"fakecommons"}>Fake Commons</MenuItem></Link>
                </Select>
            </FormControl>
        </Grid>
    )
}