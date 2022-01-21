const INITIAL_STATE = {
    friends: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_FRIENDS_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_FRIENDS_FULFILLED':
        return { ...state, friends: action.payload, fetching: false, fetched: true }
      case 'GGET_FRIENDS_REJECTED':
        return { ...state, error: action.payload, fetching: false, fetched: false }
      default:
        return state
    }
  }