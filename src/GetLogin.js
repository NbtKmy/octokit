import React, { useRef }  from 'react';
import { getUserName, selectLogin, setToken, loginSuccess } from './redux/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'




function GetLogin() {
  const dispatch = useDispatch();
	const { isLoggedIn, token, userName } = useSelector(selectLogin);
  const inputRef = useRef();
  const alert = useAlert();

  const tokenSubmit = async () => {
    inputRef.current.value = '';
    const result = await dispatch(getUserName(token));
    console.log(result);
    if (getUserName.fulfilled.match(result)) {
      dispatch(loginSuccess());
    }

    if (getUserName.rejected.match(result)) {
      alert.error('log-in failed');
    }
	}
    return(
      <div>
        <input type="text" ref={inputRef} name="token" onChange={e => dispatch(setToken(e.target.value))} />
        <button onClick={tokenSubmit}>Login with token</button>
        { isLoggedIn 
          ? <p> You are logged in as {userName}</p>
          : <p> Please log in with your github token </p>}
      </div>
    );
    
}

export default GetLogin;