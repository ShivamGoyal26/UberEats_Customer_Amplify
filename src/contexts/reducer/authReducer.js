import {Alert} from 'react-native';
import {authActions} from '../actions';

const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.SET_USER_DATA:
      return {
        ...state,
        user_data: action.value,
      };

    case authActions.REFETCH:
      return {
        ...state,
        refetch: action.value,
      };

    default:
      throw new Error(action.type);
  }
};

export default authReducer;
