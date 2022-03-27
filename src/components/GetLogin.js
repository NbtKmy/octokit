import React, { useRef }  from 'react';
import { getUserName, selectLogin, setToken, loginSuccess } from '../redux/slices/loginSlice';
import { decrypt, encrypt } from './encrypt';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';



const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));



function GetLogin() {
  const classes = useStyles();

  const dispatch = useDispatch();
	const { isLoggedIn, token, userName } = useSelector(selectLogin);
  const inputRef = useRef();
  const alert = useAlert();

  const tokenSubmit = async () => {
    inputRef.current.value = '';

    const result = await dispatch(getUserName(decrypt(token)));

    if (getUserName.fulfilled.match(result)) {
      dispatch(loginSuccess());
    }

    if (getUserName.rejected.match(result)) {
      alert.error('log-in failed');
    }
	}
    return(
      <div className={classes.header}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Box textAlign="left">React & Octokit App</Box>
            </Typography>
            <input type="text" ref={inputRef} name="token" placeholder="Github token" onChange={e => dispatch(setToken(encrypt(e.target.value)))} />
            { isLoggedIn 
              ? 
              <div>
                <p> Hello, {userName}!</p>
                <Button color="inherit" onClick={tokenSubmit}>Login with other token</Button>
              </div>
              : 
              <div>
                <Button color="inherit" onClick={tokenSubmit}>Login</Button>
              </div>
              }
            </Toolbar>
          </AppBar>
      </div>
    );
    
}

export default GetLogin;