# Gist Upload App with React & Octokit

You can upload a file as a Gist in your Github account.

- You need your own Github token for the gist
- 'txt', 'csv', 'md', 'markdown', 'xml', 'json', 'js', and 'py' are allowed

## Usage

1. Clone this repo
2. Create an ".env" file for the encryption in the project folder.  
It seems like:
```text:.env
REACT_APP_ENCRYPTION_KEY = '[Your encryption key]'
``` 
3. `npm install`  
4. `npm start` 

## For security ...

Encrypted tokens will be stored in the Redux store. If you need to create a more secure environment, you should think to use a server side solution. 
Please use this repo with caution. 

## Dev env

react-dom: ^17.0.2  
react-scripts: 5.0.0  
@octokit/request: ^5.6.3  
@octokit/rest: ^18.12.0  
@reduxjs/toolkit: ^1.8.0  
octokit: ^1.7.1  
react-alert: ^7.0.3  
react-alert-template-basic": ^1.0.2  
react-redux": ^7.2.6  
@emotion/react: ^11.8.2  
@emotion/styled: ^11.8.1  
@material-ui/core: ^4.12.3  
@mui/material: ^5.5.2  
buffer: ^6.0.3  
crypto-browserify: ^3.12.0  
react-app-rewired: ^2.2.1  
stream-browserify: ^3.0.0  
