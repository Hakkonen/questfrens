import React, { useState, useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export default function AssetMedia(props) {

    // Return loading if no data
    if (props.assetInfo.name == "") {
        return (
            <CardMedia>
                <Skeleton 
                    height={560}
                    width={"100%"}
                    variant="rectangular"
                />
            </CardMedia>
        )
    }

    // media components for card image
    if (props.cardMediaType == "iframe") {
        return (
            <Container>
                <iframe 
                    width={parseInt(props.assetInfo.media.iframe.width)} height={parseInt(props.assetInfo.media.iframe.height)} src={props.assetInfo.media.iframe.src}
                    style={{ backgroundColor: "rgb(255,255,255)", border: "none" }}
                ></iframe>
            </Container>
        )
    } else if (props.cardMediaType == "video") {
        return (
            <CardMedia
            component="video"
            height="auto"
            // maxHeight="360"
            width="100%"
            controls
            autoPlay
            image={props.assetInfo.media.video}
            alt={props.assetInfo.name}
            sx={{ borderRadius: "5px", objectFit: "contain" }}
        />
        )
    } else {
        return (
            <Container sx={{ width: "100%", backgroundColor: "rgba(45,45,47,0.1)", border: "1px solid rgba(155,155,155,0.1)" }}>
                <CardMedia
                component="img"
                height="auto"
                // maxHeight="360"
                width="100%"
                image={props.assetInfo.media.image}
                alt={props.assetInfo.name}
                sx={{ borderRadius: "5px", objectFit: "contain" }}
            />
            </Container>
        )
    }

}