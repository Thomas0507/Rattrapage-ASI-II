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
import Container from '@mui/material/Container';
import { useAuth } from '../../hooks/useAuth';

class LogInForm {
  _username: string;
  _password: string;
  constructor(username: string, password: string) {
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



function Login() {

  const { login } = useAuth();

  function publish(formData: FormData) {
    const signUpForm = new LogInForm(formData.get('email') as string, formData.get('password') as string);

    // post to create an account;
    fetch('http://localhost:8081/auth/login', {
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
    })
      .then(response => response.json())
      .then(async data => 
        await login(data)
      )      
      .catch(err => console.log(err));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign in
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
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

export default Login;