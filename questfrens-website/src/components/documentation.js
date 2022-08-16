import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FooterEl from './footerEl';

export default function(props) {

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", flexGrow: 1, m:0,p:0 }}>

            <Container sx={{ pt: 5, pb: 5 }} maxWidth="md">
                <Paper sx={{p: 3, textAlign: "left" }}>
                    <Typography variant="h3">Counterparty Metadata Standards</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 200 }}>How to format your NFT using xip100</Typography>
                    <br></br>
                    <Divider />
                    <br></br>
                    <Typography variant="body1">
                        Providing consistent, standardised metadata allows NFTs on the Counterparty network to be accessed by a diverse
                        selection of developers, and allows your audience to be as wide as possible.
                        The xip100 standard is a protocol that allows for image, video, audio, and interactive NFTs to accurately and correctly
                        display metadata.
                    </Typography>

                </Paper>

                <Paper sx={{ mt: 3, p: 3, textAlign: "left" }}>
                    <Typography variant="h4">Metadata Structure</Typography>
                    <Typography variant="body1">
                        Questfrens Asset Eplorer supports metadata that is structured according to an ongoing protocol determined by NFT use cases,
                        and the Counterparty community.

                        <br></br>
                        <br></br>

                        Questfrens Asset Explorer also has limited support for formats such as GrumpyCat and Wojak.
                    </Typography>
                </Paper>

                <Paper sx={{ mt: 3, p: 3, textAlign: "left", overflow: "scroll" }}>
                    <Typography variant="body1">Here is an example of a an asset that uses the xip100 format:</Typography>
                    <Container sx={{ m: 2 }}>
                    <Typography>
                        {`{`}<br></br>
                        &emsp;"version": "xip100",<br></br>
                        &emsp;"id": 1,<br></br>
                        &emsp;"name": "HELLOWORLD",<br></br>
                        &emsp;"artist": "Fabrique",<br></br>
                        &emsp;"description": "This is an asset description.",<br></br>
                        &emsp;{`"attributes": [`}<br></br>
                        &emsp;&emsp;{`{`}<br></br>
                        &emsp;&emsp;&emsp;"trait_type": "background",<br></br>
                        &emsp;&emsp;&emsp;"value": "cream"<br></br>
                        &emsp;&emsp;{`},`}  <br></br>
                        &emsp;&emsp;{`{`}<br></br>
                        &emsp;&emsp;&emsp;"trait_type": "fur",<br></br>
                        &emsp;&emsp;&emsp;"value": "black"<br></br>
                        &emsp;&emsp;{`},`}<br></br>
                        &emsp;&emsp;{`{`}<br></br>
                        &emsp;&emsp;&emsp;"trait_type": "hitpoints",<br></br>
                        &emsp;&emsp;&emsp;"value": "100"<br></br>
                        &emsp;&emsp;{`},`}<br></br>
                        &emsp;&emsp;{`{`}<br></br>
                        &emsp;&emsp;&emsp;"trait_type": "birthday",<br></br>
                        &emsp;&emsp;&emsp;"value": 1546360800<br></br>
                        &emsp;&emsp;{`}`}<br></br>
                        &emsp;{`],`}<br></br>
                        &emsp;{`"media": {`}<br></br>
                        &emsp;&emsp;"image": "https://s3.us-west-1.amazonaws.com/fakeasf.club/assets/LEPEPENOIR/LEPEPENOIR.png",<br></br>
                        &emsp;&emsp;"video": "https://arweave.net/-xqQAvxCn1P6hKHcJEGHeG0raZQl6fxu24uZBc67o6s/img491_video.mp4",<br></br>
                        &emsp;&emsp;{`"iframe": {`}<br></br>
                        &emsp;&emsp;&emsp;"height": 560,<br></br>
                        &emsp;&emsp;&emsp;"width": 400,<br></br>
                        &emsp;&emsp;&emsp;"src": "https://frenzone.net/questfrens/card/index.html?fren=1"<br></br>
                        &emsp;&emsp;{`}`}<br></br>
                        &emsp;{`},`}<br></br>
                        &emsp;"external_url": "https://questfrens.io"<br></br>
                    {`}`}<br></br>

                        <br></br>
                        <br></br>

                        This is how the data keys work:
                    </Typography>
                    </Container>
                </Paper>

                <TableContainer component={Paper} sx={{ mt: 2, p: 2 }}>
                        <Table sx={{  }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>key</TableCell>
                                    <TableCell>value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>version</TableCell>
                                    <TableCell>Allows for apps ingesting NFT data to determine legacy status.</TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>id</TableCell>
                                    <TableCell>ID of the asset in a collection of generative assets. Also serves as a suffix for A name assets utilising "long_name".</TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>name</TableCell>
                                    <TableCell>The title/name of the asset, this is matches to the "asset" key on the XCP database, or "asset_longname" for A name asset. </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>artist</TableCell>
                                    <TableCell>The artist or creator of the asset.</TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>description</TableCell>
                                    <TableCell>The description of the asset, this can be a short string or a paragraph. This is not an extra URL field.</TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>attributes</TableCell>
                                    <TableCell>A list of objects that allows apps to determine the attributes of your asset. This is generally used with generative assets.
                                        <br></br>
                                        <br></br>
                                        However, this is an optional field, but can be usedto display fields such as "artist", or "series" for assets such as Fake Rares that are not generative and do not necessarily require
                                        attributes.
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>media</TableCell>
                                    <TableCell>
                                        This is a list of objects that provides the front end application with accurate and diverse data applications. It is recommended to supply an image with interactive, audio, or video media for explorers to have a thumbnail snapshot of your asset.
                                        <br></br>
                                        <br></br>
                                        Only one of these fields is required to have a functioning NFT, however if multiple are supplied they will be priorised in this order:
                                        <br></br>
                                        <ol>
                                            <li>iFrame</li>
                                            <li>Video / Audio</li>
                                            <li>Image</li>
                                        </ol>
                                    </TableCell>
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>external_url</TableCell>
                                    <TableCell>
                                        This key links to your website, such as the directory for your collection.
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>

                <Paper sx={{ mt: 3, p: 3, textAlign: "left" }}>
                    <Typography variant="body1">Link to JSON prototype: &nbsp;
                        <a href="https://frenzone.net/questfrens/xip100/xip100.json" target="_blank" style={{textDecoration: 'none', color:"rgb(255,69,58)"}}>here</a>

                        <br></br>
                        <br></br>
                        
                        To make suggestions or contributions to the xip100 standard, please contact <a href="https://twitter.com/dasistsatori" target="_blank" style={{ textDecoration: 'none', color:"rgb(255,69,58)" }}>@Fabrique</a> or join the <a href="https://t.me/fren_zone" target="_blank" style={{ textDecoration: 'none', color:"rgb(255,69,58)" }}>chat</a>.
                    </Typography>
                </Paper>

            </Container>

            <FooterEl />
        </Box>
    )
}