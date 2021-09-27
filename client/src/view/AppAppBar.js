import * as React from 'react';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import {Box} from '@mui/material';

function AppAppBar() {
    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box sx={{flex: 1}}/>
                    <Link
                        variant="h6"
                        underline='none'
                        color='inherit'
                        href='/'
                        sx={{fontSize: 18}}
                    >
                        {'Infres CoinMarketCap'}
                    </Link>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </div>
    );
}

export default AppAppBar;