import { Switch, Route } from 'react-router-dom';
import Preview from './pages/preview.jsx'
import About from './pages/about.jsx'
import Download from './pages/downolad.jsx'
import Privacy from './pages/privacy.jsx'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Preview} />
            <Route exact path="/about" component={About} />
            <Route exact path="/download" component={Download} />
            <Route exact path="/privacy" component={Privacy} />
        </Switch>
    );
}