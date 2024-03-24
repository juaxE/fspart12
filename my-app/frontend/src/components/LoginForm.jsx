import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logIn } from '../reducers/userReducer'
import {
    TextField,
    Button
} from '@mui/material'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(logIn(username, password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('wrong credentials', 'error', 5))
        }

    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        label='Username'
                        value={username}
                        name="Username"
                        data-testid="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label='Password'
                        type="password"
                        value={password}
                        name="Password"
                        data-testid="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <Button variant='contained' type='submit' >login</Button>
                </div>
            </form>
        </div>
    )
}





export default LoginForm