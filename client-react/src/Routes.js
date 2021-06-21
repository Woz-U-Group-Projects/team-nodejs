import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home {...props} />
      </Route>
      <Route exact path="/login">
        <Login {...props} />
      </Route>
      <Route exact path="/signup">
        <Signup {...props} />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}