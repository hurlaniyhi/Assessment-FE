import React, { useContext } from 'react'
import { Loader, Notifier } from 'src/component'
import VisibilityContext from 'src/provider/state-manager/visibilityProvider'

export const ActivityStatus: React.FC<any> = () => {
    const { visibility } = useContext(VisibilityContext)

    return (
        <>
            { visibility.isLoading ? <Loader /> : null }
            <Notifier />
        </>
    )
}