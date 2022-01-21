const INITIAL_STATE = {
    foods: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_FOODS_PENDING':
      case 'DELETE_FOODS_PENDING':
      case 'POST_FOODS_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_FOODS_FULFILLED':
      case 'DELETE_FOODS_FULFILLED':
      case 'POST_FOODS_FULFILLED':
        return { ...state, foods: action.payload, fetching: false, fetched: true }
      case 'GET_FOODS_REJECTED':
      case 'DELETE_FOODS_REJECTED':
      case 'POST_FOODS_REJECTED':
        return { ...state, error: action.payload, fetching: false, fetched: false }
      default:
        return state
    }
  }