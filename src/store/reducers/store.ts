import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import thunk from 'redux-thunk'
import data from './data'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['data'], // elements that will be persisted
    blacklist: [] // elements that will not be persisted
}

const rootReducer = combineReducers({
    data
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = composeWithDevTools({ trace: true })
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)))
const persistor = persistStore(store)

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export { store, persistor }
