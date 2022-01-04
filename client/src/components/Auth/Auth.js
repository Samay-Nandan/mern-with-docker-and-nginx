import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import GoogleLogin  from './GoogleLogin';
import { signin, signup } from '../../actions/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? dispatch(signup(form, navigate)) : dispatch(signin(form, navigate))
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" 
                    variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form}>
            { 
                isSignup ?  <SignupForm showPassword={showPassword} 
                                        handleChange={handleChange} 
                                        handleShowPassword={handleShowPassword} /> : 
                            <SigninForm showPassword={showPassword} 
                                        handleChange={handleChange} 
                                        handleShowPassword={handleShowPassword} /> 
            }
        </form>
        <Button type="submit" 
                fullWidth 
                variant="contained" 
                color="primary" 
                className={classes.submit}
                onClick={handleSubmit}>{ isSignup ? 'Sign Up' : 'Sign In' }</Button>
        <GoogleLogin />
        <Grid container justifyContent="flex-end">
            <Grid item>
            <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
