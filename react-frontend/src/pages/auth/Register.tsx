import React, { useState } from 'react';
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
import { Snackbar, SnackbarOrigin } from '@mui/material';




class LogInForm {
  _username: string;
  _password: string;
  constructor(username, password) {
    this._username = username || '';
    this._password = password || '';
  }
  public get username() {
    return this._username;
  }
  public get password() {
    return this._password;
  }
}

interface State extends SnackbarOrigin {
  open: boolean;
}

function Register () {
  
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  function publish(formData: FormData) {
    const signUpForm = new LogInForm(formData.get('email'), formData.get('password'));
    
      // post to create an account;
      fetch('http://localhost:8081/auth/signup', {
        method: 'POST',
        headers: {
          'Access-Control-Request-Method': 'POST',
          'Origin': 'http://localhost:5173',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": signUpForm.username,
          "password": signUpForm.password
        })
      }).then(res => {
        setState({ open: true,
          vertical: 'top',
          horizontal: 'center',
        });
      }).catch(err => {
        console.log(err)
      }).finally(() => {

      })
    
  }
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <form action={publish}>
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
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message="I love snacks"
        key={vertical + horizontal}
        action={
          <Button onClick={handleClose} color="primary" size="small">
            Ok
          </Button>
        }
      />
    </Container>
    )
};

export default Register;