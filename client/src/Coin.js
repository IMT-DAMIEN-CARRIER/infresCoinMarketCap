import * as React from 'react';
import AppAppBar from './view/AppAppBar';
import AppFooter from './view/AppFooter';
import withRoot from './withRoot';
import InfosCoin from './components/InfosCoin'

function Coin() {
    return (
        <React.Fragment>
            <AppAppBar/>
            <InfosCoin />
            <AppFooter/>
        </React.Fragment>
    );
}

export default withRoot(Coin);