import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Notes from './views/Notes';

class App extends React.Component {
    public render() {
        return (
            <Router>
                <Route exact={true} path="/" component={Notes} />
            </Router>
        );
    }
}

export default App;
