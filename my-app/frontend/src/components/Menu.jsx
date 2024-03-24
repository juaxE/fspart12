import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box
} from '@mui/material'

const Menu = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const padding = {
        paddingRight: 5
    }
    const handleLogOut = () => {
        dispatch(logOut())
    }
    return (

        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        blogs
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        users
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />

                    <Typography variant='caption'>
                        {user.name} logged in
                    </Typography>

                    <form onSubmit={handleLogOut} style={{ marginLeft: '5px' }}>
                        <div>
                            <Button variant='contained' color='warning' type="submit">logout</Button>
                        </div>
                    </form>

                </Toolbar>
            </AppBar>










            {/* <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <div>
                {user.name} logged in
                <form onSubmit={handleLogOut}>
                    <button type="submit">logout</button>
                </form>
            </div> */}
        </div>
    )
}



export default Menu