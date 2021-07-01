import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { useHistory, useLocation } from 'react-router-dom';
import { accountVerification } from '../../../../api/Admin';
import { useUserDispatch, loadUser } from '../../../../Context/User';
import config from '../../../../config.json';
import { Box, CircularProgress, styled } from '@material-ui/core';

import { BackgroundColor } from '../../../constants/theme';

const ParentWrapper = styled(Box)({
  minHeight: '100vh',
  background: BackgroundColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function AdminAccountVerification(props) {
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const userDispatch = useUserDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      window.location.href = config.baseUrl + 'signIn/';
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded._id) {
      accountVerification(decoded._id, token).then((res) => {
        loadUser(userDispatch, { token: res.token });
        history.push('/');
      });
    } else {
      window.location.href = config.baseUrl + 'signIn/';
    }
  });
  return (
    <ParentWrapper>
      <CircularProgress color="primary" />
    </ParentWrapper>
  );
}

AdminAccountVerification.propTypes = {};

export default AdminAccountVerification;
