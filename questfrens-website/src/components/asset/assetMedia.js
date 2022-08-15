import React, { useState, useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia';

export default function AssetMedia(props) {
    console.log(props)
    console.log(props.assetInfo.iframe)

    // media components for card image
    if (props.cardMediaType == "iframe") {
        return (
            <iframe 
                width={parseInt(props.assetInfo.media.iframe.width)} height={parseInt(props.assetInfo.media.iframe.height)} src={props.assetInfo.media.iframe.src}
                style={{ backgroundColor: "rgb(255,255,255)", border: "none" }}
            ></iframe>
        )
    } else if (props.cardMediaType == "video") {
        return (
            <CardMedia
            component="video"
            height="auto"
            maxHeight="360"
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
            <CardMedia
            component="img"
            height="auto"
            // maxHeight="360"
            width="100%"
            image={props.assetInfo.media.image}
            alt={props.assetInfo.name}
            sx={{ borderRadius: "5px", objectFit: "contain" }}
        />
        )
    }

}