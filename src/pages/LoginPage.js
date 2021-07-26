import React from 'react';
import Login from '../component/Login/Login';

const LoginPage = ({setUser, title, login, setLogin}) => {
  return (
    <div>
      <h1 style={{margin:"1.5em"}}><center>LOGIN</center></h1>
      <Login
        setUser={setUser}
        title={title}
        login={login}
        setLogin={setLogin}
      />
    </div>
  )
}

export default LoginPage;