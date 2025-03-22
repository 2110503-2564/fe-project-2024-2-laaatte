'use client'
import { Provider as ReactReduxProvider } from "react-redux"
import { store } from "./store"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { LinearProgress } from "@mui/material"

export default function ReduxProvider({children}:{children : React.ReactNode}) {

    let reduxPersistor = persistStore(store)

    return (
        <ReactReduxProvider store = {store}>
            <PersistGate loading={<div className="flex flex-col items-center justify-center py-4 text-gray-600 text-sm">
                        <p>Loading...</p>
                        <LinearProgress className="w-[80%] mt-2" />
                        </div>
                    } persistor={reduxPersistor}>
            {children}
            </PersistGate>
        </ReactReduxProvider>
    )
}