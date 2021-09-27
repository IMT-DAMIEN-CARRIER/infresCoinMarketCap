import * as React from 'react';
import AppAppBar from './view/AppAppBar';
import AppFooter from './view/AppFooter';
import withRoot from './withRoot';

function CoinsList() {
    return (
        <React.Fragment>
            <AppAppBar/>
            <AppFooter/>
        </React.Fragment>
    );
}

export default withRoot(CoinsList);
