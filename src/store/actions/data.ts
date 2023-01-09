import { ReducerData, ReduxAction } from '../../types/reducers'
import CustomAxios from '../../utility/customAxios'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export enum DATA_ACTIONS {
    SET_CONTENTS = 'dataActions/setContents'
}

export const setUsersList: ReduxAction<any> = (contents) => {
    return {
        type: DATA_ACTIONS.SET_CONTENTS,
        payload: { data: contents, loading: false }
    }
}

export const getUsersList =
    () =>
    (dispatch: ThunkDispatch<ReducerData, undefined, AnyAction>): void => {
        const url = 'http://127.0.0.1:3001/api/v1/user'
        CustomAxios.get(url)
            .then((result) => {
                dispatch(setUsersList(result.data.data))
            })
            .catch((err) => {})
    }
