import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Preview from './pages/preview.jsx'
import Map from './pages/map.jsx'
import About from './pages/about.jsx'
import Download from './pages/downolad.jsx'
import Privacy from './pages/privacy.jsx'
import Themes from './pages/themes.jsx'
import Admin from './pages/admin.jsx'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Preview} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/about" component={About} />
            <Route exact path="/download" component={Download} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/themes" component={Themes} />
            <Route exact path="/admin" component={Admin} />
        </Switch>
    );
}