import { useEffect, useState, useMemo } from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import UserContext from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashBoard from './components/DashBoard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import loaduser from './utils/loaduser';

const initUserState = {
  isAuthenticated: false,
  user: null,
  token: null,
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
        });
      } else {
        setUserContext({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <ProtectedRoute path="/" component={DashBoard} />
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
