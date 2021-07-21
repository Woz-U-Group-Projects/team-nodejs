import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import Create from "./components/Create";
import OP from "./components/OP";
import UserProfileSettings from './components/User/Settings/UserProfileSettings.vue';


export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home {...props} />
      </Route>
      <Route exact path="/login" component={Login}>
      </Route>
      <Route exact path="/signup">
        <Signup {...props} />
      </Route>
      <Route exact path="/settings/profile">
        <UserProfileSettings {...props} />
      </Route>
      <Route exact path="/topics/create">
        <Create {...props} />
      </Route>
      <Route path="/topics/:topicName" component={OP} {...props} />
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}