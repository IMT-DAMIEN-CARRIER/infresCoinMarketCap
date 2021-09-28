import * as React from 'react';
import AppAppBar from './view/AppAppBar';
import AppFooter from './view/AppFooter';
import withRoot from './withRoot';
import List from './components/List';

function CoinsList() {
    return (
        <React.Fragment>
            <AppAppBar/>
            <List/>
            <AppFooter/>
        </React.Fragment>
    );
}

export default withRoot(CoinsList);
