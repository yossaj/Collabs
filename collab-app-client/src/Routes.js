import React from "react";
import { Route, Switch } from "react-router-dom";
import MyProjects from "./containers/MyProjects";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewProject from "./containers/NewProject";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

import AppliedRoute from "./components/AppliedRoute";




export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/myprojects" exact component={MyProjects} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/project/new" exact component={NewProject} props={childProps} />
        <Route component={NotFound} />
    </Switch>;
