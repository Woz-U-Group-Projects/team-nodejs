import React, { useState, useEffect } from "react";
import  Task from "./components/Task";
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
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
  function App(props) {
    const [user, setUser] = useState({email: "", password: ""});
    const history = useHistory();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    useEffect(() => {
      onLoad();
    }, []);

    if (!componentMounted) {
      return <div />
    };

    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      }
      catch(e) {
        if (e !== 'No current user') {
          onError(e);
        }
      }
    
      setIsAuthenticating(false);
    }

    async function handleLogout() {
      await Auth.signOut();
    
      userHasAuthenticated(false);
    
      history.push("/login");
    }

  return (
    !isAuthenticating && (
    <div className="App container py-3">
      <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </>
    </ThemeProvider>
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
      <LinkContainer to="/">
        <Navbar.Brand className="font-weight-bold text-muted">
          Chat Bubbles
        </Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-en">
        <Nav activeKey={window.location.pathname}>
        {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }} {...props} setUser={setUser}>
      <Routes {...props} setUser={setUser} user={user}/>
      </AppContext.Provider>
    </div>
    )
  );
}

export default App;
