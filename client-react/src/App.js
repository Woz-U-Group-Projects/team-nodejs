import React, { useState, useEffect, Component } from "react";
import Task from "./components/Task";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/Theme';
import { GlobalStyles } from './components/Global';
import { useDarkMode } from './components/useDarkMode';
import Toggle from './components/Toggle';
import "./App.css";
import Routes from "./Routes";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "./libs/errorLib";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify"
import { useHistory } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext"

function App(props) {
  
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
   (
      <div className="App container py-3">
        <ThemeProvider theme={themeMode}>
          <>
            <GlobalStyles />
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </>
        </ThemeProvider>
        <UserProvider>
          <Navigation />
            <Routes {...props} />
          </UserProvider>
      </div>
    )
  );
}

function Navigation(props) {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useUser();

  function handleLogout() {
    setUser({loggedIn: false});
    history.push("/login");
  }

  return (
    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
    <LinkContainer to="/">
      <Navbar.Brand className="font-weight-bold text-muted">
        Chat Bubbles
  </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-en">
      <Nav activeKey={window.location.pathname}>
        {user.loggedIn ? (
          <>
            <LinkContainer to="/topics/create">
              <Nav.Link>Create Post</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings/profile">
              <Nav.Link>Settings</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        ) : (
            <>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default App;