import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {View, mapStateToProps} from "./view";
import { connect } from "react-redux";
import { Form, mapDispatchToProps } from "./form";

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={connect(null,mapDispatchToProps)(Form)} />
                <Route path='/view' component={connect(mapStateToProps)(View)} />
            </Switch>
        </Router>
    );
};
