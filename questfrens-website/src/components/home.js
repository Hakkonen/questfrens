import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import SplashCard from "./cards/splashCard"

import Dashboard from "./dashboard"
import { Typography } from '@mui/material';
import { useTheme, createTheme } from '@mui/material/styles';

import bg1 from "../assets/bg1.gif"

export default function Home(props) {

    const theme = useTheme()

    return (
        <Container
            style={{
                display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90%", height: "auto", width: "100vw"
            }}>

            <Box style={{ height: "100%", width: "100%", position: "absolute", zIndex: "-1", backgroundImage: `linear-gradient(transparent, black 75%), url(${bg1})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }}></Box>

            <Grid container spacing={2}
                sx={{ height: "100%", width: "auto", maxWidth: "1300px" }}
            >
                <Grid item xs={12} md={6}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <Container>
                        <Typography
                            variant="h2"
                            sx={{ color: props.theme.palette.basque, fontWeight: 600, pb: 2, pr: 1 }}
                            align="justify"
                        >
                            Mint, collect, and quest...
                        </Typography>

                        <Typography
                            variant="h5"
                            align="justify"
                            sx={{ pb: 2, pr: 1 }}
                            color={theme.palette.grey[300]}
                        >
                            With Questfrens, generative, interactive NFTs on the Counterparty network
                        </Typography>

                        <Stack spacing={2} direction="row" sx={{ pb: 2, pr: 1 }}>
                            <Link to="/market">
                                <Button color="secondary" variant="contained">Mint</Button>
                            </Link>
                            <Button color="secondary" variant="outlined">Explore</Button>
                        </Stack>
                    </Container>
                </Grid>

                <Grid item xs={12} md={6}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", pt: 1, pb: 1 }}
                >
                    <SplashCard>
                        {/* <iframe 
                        style={{border: 0}}
                        width="400" height="560" 
                        src={`https://frenzone.net/questfrens/card/index.html?fren=1`}
                        ></iframe>  */}
                    </SplashCard>
                </Grid>
            </Grid>
        </Container>
    )
}

// export default function home(props) {

//     return (
//         <Dashboard 
//             page={<HomePage/>}
//         />
//     )

// }