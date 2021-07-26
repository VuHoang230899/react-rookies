import React, {useState} from "react";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage"
import PostsPage from "./pages/PostsPage";
import PostsDetailPage from "./pages/PostsDetailPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./component/Navbar/Navbar";
import "./App.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  const [user, setUser] = useState({
    token: null,
    userID: null
  });

  const [login, setLogin] = useState('LOGIN')

  return (
    <Router>
      <div>
        <Navbar
          setUser={ setUser }
          login={ login }
          setLogin={ setLogin }
          />
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/posts">
            <PostsPage />
          </Route>
          <Route 
            path="/profile"
            exact
            render={() => {
              if(user.userID === null) return (
                <LoginPage
                  setUser={ setUser }
                  title="You need to login before using this page"
                />
              )
              else return (
                <ProfilePage
                  user={ user }
                />
              )
            }}
          />
          <Route 
            path="/login"
            render={() => {
              if(login === 'LOGIN') return (
                <LoginPage
                  setUser={ setUser }
                  login={ login }
                  setLogin={ setLogin }
                />
              )
              else return (
                <div><center>Login Success</center></div>
              )
            }}
          />
          <Route path="/postdetail/:id">
            <PostsDetailPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}