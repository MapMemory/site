import { Switch, Route } from 'react-router-dom';
import Preview from './pages/preview.jsx'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Preview} />
        </Switch>
    );
}