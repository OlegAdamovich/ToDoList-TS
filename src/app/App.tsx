import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {Todolists} from '../features/Todolists';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import {RequestStatusType} from '../entities';


export const App = () => {
    console.log('App call')

    let loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {loadingStatus === 'loading' && <LinearProgress color="secondary" />}
            <Container>
                <Todolists/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

