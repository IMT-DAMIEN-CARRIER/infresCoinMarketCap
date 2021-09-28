import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

function Copyright() {
    return (
        <React.Fragment>
            {'© Léon bousquet - Damien Carrier - Arthur Duca - Clément Savinaud '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

export default function AppFooter() {
    return (
        <Typography
            component="footer"
            sx={{display: 'flex', bgcolor: 'secondary.light'}}
        >
            <Container sx={{my: 8, display: 'flex'}}>
                <Grid container spacing={5} textAlign='center'>
                    <Grid
                        container
                        direction='column'
                        justifyContent='flex-end'
                        spacing={2}
                        sx={{height: 120}}
                    >
                        <Copyright/>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}
