export interface UserData {
    id: number
    first_name: string
    last_name: string
    avatar: string
    email: string
}

export interface ReducerData {
    users: { data: UserData[]; loading: boolean }
}

export type ReduxActionData<T> = {
    type: any
    payload?: T
}

export type ReduxAction<T> = (data: T) => ReduxActionData<T>
