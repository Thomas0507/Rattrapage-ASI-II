import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';

function Register () {
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

          >
            Create an account
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account aldready? Log in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    )
};

export default Register;