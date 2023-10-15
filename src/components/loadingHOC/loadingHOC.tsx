import { useEffect } from 'react'
import { Loading } from '../loading/loading'

interface IProps {
    loading: boolean,
    value?: string,
    callback: () => void,
}
export const LoadingHOC: React.FC<IProps> = ({children, loading, value, callback}) => {
    useEffect(() => {
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <>
            {loading && <Loading/>}
            {!loading && children}
        </>
    )
}