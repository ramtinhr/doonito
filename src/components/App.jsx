import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Header from './Header'
import Footer from './Footer'
import GameInfo from './GameInfo'
import AboutGame from './AboutGame'
import ActiveGame from './ActiveGame'
import ProfileUser from './ProfileUser'
import EditProfile from './EditProfile'
import SubscribeGame from './SubscribeGame'
import ForgetPassVCode from './ForgetPassVCode'
import ForgetPass from './ForgetPass'
import NewPass from './NewPass'
import GameDetail from '../pages/GameDetail'
import VerificationCode from './VerificationCode'
import PurchaseSubscription from './PurchaseSubscription'
import Ticket from './Ticket/Ticket'
import '../asset/style/style.scss'
import { Router, Switch, Route } from 'react-router-dom'
import history from '../history'
import Massages from './Ticket/Massages'

const App = () => (
  <div className={{ overflowY: 'auto' }}>
    <Router history={history}>
      <Switch>
        <Header />
      </Switch>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/ForgetPassVCode">
          <ForgetPassVCode />
        </Route>
        <Route path="/ForgetPass">
          <ForgetPass />
        </Route>
        <Route path="/NewPass">
          <NewPass />
        </Route>
        <Route path="/ProfileUser">
          <ProfileUser />
        </Route>
        <Route path="/EditProfile">
          <EditProfile />
        </Route>
        <Route path="/ActiveGame/:id">
          <ActiveGame />
        </Route>
        <Route path="/AboutGame">
          <AboutGame />
        </Route>
        <Route path="/GameDetail/:id">
          <GameDetail />
        </Route>
        <Route path="/VerificationCode">
          <VerificationCode />
        </Route>
        <Route path="/GameInfo">
          <GameInfo />
        </Route>
        <Route path="/purchaseSubscription">
          <PurchaseSubscription />
        </Route>
        <Route path="/Ticket">
          <Ticket />
        </Route>
        <Route path="/Massage">
          <Massages />
        </Route>
        <Route path="/">
          <SubscribeGame />
        </Route>
      </Switch>
      <Switch>
        <Footer />
      </Switch>
    </Router>
  </div>
)

export default App
