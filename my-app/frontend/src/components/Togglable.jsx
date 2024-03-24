import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box
} from '@mui/material'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={hideWhenVisible}>
                <Button variant='outlined' onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>

                {props.children}
                <Button variant='contained' color='warning' onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable