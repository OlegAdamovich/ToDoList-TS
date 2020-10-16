import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {Todolists} from '../features/Todolists';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import {RequestStatusType} from '../entities';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Login} from '../features/Login';


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
            <div style={{minHeight: '10px'}}>{loadingStatus === 'loading' && <LinearProgress color={'secondary'}/>}</div>
            <Container>
                <Switch>
                    <Route exact path='/' render={() => <Todolists/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/404' render={() => <h1>404 - PAGE NOT FOUND</h1>}/>
                    <Redirect from='' to='/404'/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

