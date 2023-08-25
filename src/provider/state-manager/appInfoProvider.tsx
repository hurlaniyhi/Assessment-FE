import React, {useReducer} from 'react'
import { Action, KeyValuePayload } from 'src/model'


const AppInfoContext = React.createContext<any>(null)
const initialState = {
    token: '', userData: {}, profile: {}, companies: {}
}

const AppInfoReducer = (state: any, action: Action<KeyValuePayload>) => {
    switch(action.type){
        case "set-property": 
            return { ...state, [action.payload.key]: action.payload.value }
        case 'clear-data': 
            return { ...initialState }
    }
}

export const AppInfoProvider = (props: any) => {
    const [state, dispatch] = useReducer(AppInfoReducer, {
      ...initialState
    })

    async function setInfoProperty (key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
        let isString = typeof(value) === 'string' ? true : false
        let isNumber = typeof(value) === 'number' ? true : false
        localStorage.setItem(key, isString ? value : isNumber ? String(value) : JSON.stringify(value))
        await dispatch({type: "set-property", payload: {key, value}})
    }

    async function recoverAppData () {
        for (let item of Object.keys(initialState)) {
            let retrievedData = await localStorage.getItem(item)!
            retrievedData = (['null', 'undefined', 'NaN'].includes(retrievedData) ? state[item] : ['number', 'string'].includes(typeof state[item]) ? retrievedData : JSON.parse(retrievedData))
            await setInfoProperty(item, typeof state[item] === 'number' ? Number(retrievedData) : retrievedData)
        }
    }

    async function clearAppData () {
        await dispatch({type: "clear-data", payload: {key: '', value: ''}})
    }

    async function recoverStatesData () {
        recoverAppData()
    }

    async function logout () {
        await Promise.all([
            localStorage.clear(), 
            clearAppData()
        ])
    }
  

    const stateActions = {
       setInfoProperty,
       recoverStatesData,
       clearAppData,
       logout
    }

    return (
        <AppInfoContext.Provider value={{info: state, ...stateActions}} >
            {props.children}
        </AppInfoContext.Provider>
    )
}

export default AppInfoContext