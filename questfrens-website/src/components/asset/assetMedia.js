import React, { useState, useEffect } from 'react'

import CardMedia from '@mui/material/CardMedia';

export default function AssetMedia(props) {

    // media components for card image
    if (props.cardMediaType == "iframe") {
        return (
            <iframe width={props.iframeDimensions.width} height={props.iframeDimensions.height} src={props.assetInfo.iframe}></iframe>
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
            image={props.assetInfo.media}
            alt={props.assetInfo.asset}
            sx={{ borderRadius: "5px", objectFit: "contain" }}
        />
        )
    } else {
        return (
            <CardMedia
            component="img"
            height="auto"
            maxHeight="360"
            width="100%"
            image={props.assetInfo.image}
            alt={props.assetInfo.asset}
            sx={{ borderRadius: "5px", objectFit: "contain" }}
        />
        )
    }

}