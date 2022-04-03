import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";


const theme = createTheme();

// Verifies message signature
function verify(address, signature) {
    const bitcoin = require('bitcoinjs-lib') // v4.x.x
    const bitcoinMessage = require('bitcoinjs-message')
    
    console.log(bitcoinMessage.verify(address, address, signature))
    return bitcoinMessage.verify(address, address, signature)
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: 'white',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
        borderColor: 'white',
    },
    '&:hover fieldset': {
        borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
        borderColor: 'white',
    },
    '&.MuiOutlinedInput-input': {
        borderColor: 'white',
    },
    },
});

export default function Login(props) {
    const navigate = useNavigate();
    Buffer.from('anything','base64');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            address: data.get('address'),
            signature: data.get('signature'),
        });
        // Verify login
        const checkSig = verify(data.get('address'), data.get('signature'))
        console.log(checkSig)

        if (checkSig) {
            const wallet = {
                "address": data.get('address'),
                "signature": data.get('signature')
            }

            // Add to cookies
            document.cookie = `address=${data.get('address')}; max-age=604800; path=/`;
            document.cookie = `signature=${data.get('signature')}; max-age=604800; path=/`;

            props.setAddress(data.get('address'))
            props.setSignature(data.get('signature'))

            alert("Signature valid")

            // Navigate to home if valid
            navigate("/");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: "1em"
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="XCP Address"
                        name="address"
                        autoComplete="text"
                        autoFocus
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="signature"
                        label="Signature"
                        type="signature"
                        id="signature"
                        autoComplete="text"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            What is my signature?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}