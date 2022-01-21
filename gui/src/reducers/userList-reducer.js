const INITIAL_STATE = {
    users: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_USERS_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_USERS_FULFILLED':
        return { ...state, users: action.payload, fetching: false, fetched: true }
      case 'GET_USERS_REJECTED':
        return { ...state, error: action.payload, fetching: false, fetched: false }
      default:
        return state
    }
  }