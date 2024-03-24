import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
    Alert
} from '@mui/material'

const Notification = () => {
    const message = useSelector(state => state.notification.message)
    const type = useSelector(state => state.notification.type)
    if (message === null) {
        return null
    }

    return (
        <div>
            <Alert severity={type}>
                {message}
            </Alert>
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
}

export default Notification