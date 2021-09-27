import React, {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import axios from 'axios';

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

function Global() {
    const [global, setGlobal] = useState([]);

    useEffect(() => {
        refreshGlobal();
    }, []);

    const refreshGlobal = () => {
        axios.get('http://localhost:3000/global')
            .then(results => {
                console.log(results);

                if (results.data) {
                    setGlobal(results.data);
                } else {
                    setGlobal([]);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <Box
            component="section"
            sx={{display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light'}}
        >
            <Container sx={{mt: 5, mb: 5, display: 'flex', position: 'relative'}}>
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant='body2' sx={{my: 2}}>
                                Numbers of coins : {(global) ? global?.coins : ''}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant='body2' sx={{my: 2}}>
                                Numbers of Markets : {(global) ? global?.markets : ''}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant='body2' sx={{my: 2}}>
                                Total Market Cap : {(global) ? '$' + global?.total_market_cap : ''}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Typography variant='body2' sx={{my: 2}}>
                                Total Volume in 24h : {(global) ? '$' + global?.total_volume_24h : ''}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Global;