import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import UserContext from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import DashBoard from './components/DashBoard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import loaduser from './utils/loaduser';
import Profile from './components/Profile';
import BoardDetail from './components/BoardDetail';

const initUserState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
}

const App = () => {
  const [userContext, setUserContext] = useState(initUserState);

  useEffect(() => {
    (async () => {
      const { success, user, token } = await loaduser();
      if (success) {
        setUserContext({
          isAuthenticated: success,
          user,
          token,
          loading: true,
        });
      } else {
        setUserContext({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: true,
        });
      }
    })();
  }, []);

  if (!userContext.loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <UserContext.Provider value={{ userContext, setUserContext}}>
        <BrowserRouter>
          <ProtectedRoute path="/" component={DashBoard} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/board/:id" component={BoardDetail} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
