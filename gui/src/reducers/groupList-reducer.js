const INITIAL_STATE = {
    groups: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_USERGROUPS_PENDING':
      case 'DELETE_USERGROUP_PENDING':
      case 'PUT_USERGROUP_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_USERGROUPS_FULFILLED':
      case 'DELETE_USERGROUP_FULFILLED':
      case 'PUT_USERGROUP_FULFILLED':
        return { ...state, groups: action.payload, fetching: false, fetched: true }
      case 'GET_USERGROUPS_REJECTED':
      case 'DELETE_USERGROUP_REJECTED':
      case 'PUT_USERGROUP_REJECTED':
        return { ...state, error: action.payload, fetching: false, fetched: false }
      default:
        return state
    }
  }