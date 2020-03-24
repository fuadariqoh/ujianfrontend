import {
  USER_LOGIN_FAILED,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS
} from "./../actions/type";

const INITIAL_STATE = {
  username: "",
  id: 0,
  loading: false,
  islogin: false,
  errormes: "",
  role: "",
  hargaTotal: 0,
  totalBarang: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_START:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, ...action.payload, islogin: true };
    case USER_LOGIN_FAILED:
      return { ...state, loading: false, errormes: action.payload };
    case "ErrorClear":
      return INITIAL_STATE;
    case "LOGOUT":
      return { ...state, islogin: false };
    case "HARGATOTAL":
      return { ...state, hargaTotal: action.payload };
    case "HEADERUP":
      return { ...state, totalBarang: state.totalBarang + 1 };
    case "HEADERDOWN":
      return { ...state, totalBarang: state.totalBarang - 1 };

    default:
      return state;
  }
};
