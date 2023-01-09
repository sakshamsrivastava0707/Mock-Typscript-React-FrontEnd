import { ReducerData, ReduxActionData } from '../../types/reducers'
import { DATA_ACTIONS } from '../actions/data'

const initialState: ReducerData = {
    users: { data: [], loading: true }
}

const dataState = (state: ReducerData = initialState, action: ReduxActionData<any>): ReducerData => {
    switch (action.type) {
        case DATA_ACTIONS.SET_CONTENTS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}

export default dataState
