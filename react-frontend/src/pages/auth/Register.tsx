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
import SnackbarError from '../../components/ErrorSnackbar';
import SnackbarValidation from '../../components/SnackbarValidation';


class SignUpForm {
  _username: string;
  _password: string;
  _email: string;
  constructor(username: string, password: string, email: string) {
    this._username = username || '';
    this._password = password || '';
    this._email = email || '';
  }
  public get username() {
    return this._username;
  }
  public get password() {
    return this._password;
  }

  public get email() {
    return this._email;
  }
}

function checkPassword(str: string)
{
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

function checkEmail(str: string)
{
    let re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(str);
}

function Register () {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [validationOpen, setValidationOpen] = useState<boolean>(false);

  function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const signUpForm = new SignUpForm(
      formData.get('username')?.toString() || '', 
      formData.get('password')?.toString() || '', 
      formData.get('email')?.toString() || '',
    );

    if (!checkEmail(signUpForm.email)) {
      setErrorMessage('{ "status": 400, "message": "Bad format", "reason": "Your email is invalid"}');
      setErrorOpen(true);
      return;
    }
    
    if (!checkPassword(signUpForm.password)) {
      setErrorMessage('{ "status": 400, "message": "Bad format", "reason": "Your password must have at least 8 characters including one lowercase, one uppercase, one number and one special character"}');
      setErrorOpen(true);
      return;
    }

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
        "password": signUpForm.password,
        "email": signUpForm.email,
      })
    }).then(response => {
      if (!response.ok) {
        return response.text().then( text => {
          setErrorMessage(text);
          setErrorOpen(true);
        });
      }
      setValidationOpen(true);
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
        <form onSubmit={publish}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
                {"Have an account already? Log in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
      <SnackbarError
        open={errorOpen}
        setOpen={setErrorOpen}
        message={errorMessage}
      />
      <SnackbarValidation
        open={validationOpen}
        setOpen={setValidationOpen}
        message={"Signed up successfully!"}
      />
    </Container>
    )
};

export default Register;