import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserState } from '../../../Context/User';

export default function PrivateRoute({ children, userType, ...rest }) {
  const user = useUserState();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.token &&
        (user.user.type === userType || user.user.type === 'Admin') ? (
          children
        ) : (
          <Redirect to={{ pathname: '/signIn', state: { from: location } }} />
        )
      }
    />
  );
}
