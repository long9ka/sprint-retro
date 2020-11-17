import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const ProtectedRoute = (props) => {
  const { userContext } = useContext(UserContext);

  return (
    <Route
      path={props.path}
      exact
      render={
        data => userContext.isAuthenticated ? 
        <props.component {...data} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;