import './App.css';
import { Route, Redirect, Switch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store';
import React from 'react';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import Dashboardscreen from './screens/DashboardScreen';
// import Header from './Components/Header';
// import HabitHomeScreen from './screens/HabitHomeScreen';
// import Footer from './Components/Footer';
// import Progress from './Components/Progress';
// import Rewards from './Components/Rewards';
// import CardComponent from './CardComponent';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'));
const Dashboardscreen = React.lazy(() => import('./screens/DashboardScreen'));
const Header = React.lazy(() => import('./Components/Header'));
const HabitHomeScreen = React.lazy(() => import('./screens/HabitHomeScreen'));
const Footer = React.lazy(() => import('./Components/Footer'));
const Progress = React.lazy(() => import('./Components/Progress'));
const Rewards = React.lazy(() => import('./Components/Rewards'));
const CardComponent = React.lazy(() => import('./CardComponent'));

function App() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocalToken = localStorage.getItem('TOKEN');
    const getLocalUser = localStorage.getItem('USER');

    if(getLocalToken && getLocalUser) {
      dispatch(authActions.login({
        user: JSON.parse(getLocalUser),
        token: getLocalToken
    }))
    console.log(getLocalUser);
    }
  }, [])
  
  let routes;
  if(isAuth) {
    routes = (<>
          <Route path="/" exact>
            <HabitHomeScreen />
          </Route>
          <Route path="/Progress" exact>
            <Progress />
          </Route>
          <Route path="/Rewards" exact>
            <Rewards />
          </Route>
          <Redirect to="/" />
        </>
    )
  } else {
    routes = (
        <>
          <Route path="/" exact>
            <Dashboardscreen />
          </Route>
          <Route path="/Login" exact>
            <LoginScreen />
          </Route>
          <Route path="/Register" exact>
            <RegisterScreen />
          </Route>
          <Redirect to="/Login" />
        </>
    )
  }

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading ....</div>}>
          <div className='container'>
            <CardComponent>
                <Header></Header>
                <ErrorBoundary>
                  <Switch>
                            <>{routes}</>
                  </Switch>
                  </ErrorBoundary>
                <Footer></Footer>
            </CardComponent>
          </div>
          </React.Suspense>
    </React.Fragment>
  )
}

export default App;
