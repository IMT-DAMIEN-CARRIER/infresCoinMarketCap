import * as React from 'react';
import AppAppBar from './view/AppAppBar';
import AppFooter from "./view/AppFooter";
import withRoot from "./withRoot";
import Global from "./components/Global";

function App() {
    return (
        <React.Fragment>
            <AppAppBar/>
            <Global/>
            <AppFooter/>
        </React.Fragment>
    );
}

export default withRoot(App);