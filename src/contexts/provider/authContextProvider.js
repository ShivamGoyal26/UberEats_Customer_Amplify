import React, {useReducer} from 'react';
import {authContext} from '../context';
import {authStore} from '../store';
import {authReducer} from '../reducer';
import {authActions} from '../actions';

const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(authReducer, authStore);

  const value = {
    user_data: state.user_data,
    refetch: state.refetch,

    setUserData: _value => {
      dispatch({type: authActions.SET_USER_DATA, value: _value});
    },
    setRefetch: _value => {
      dispatch({type: authActions.REFETCH, value: _value});
    },
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};

export default AuthContextProvider;
