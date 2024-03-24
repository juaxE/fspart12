import { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom'
import { Container } from '@mui/material'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import { useDispatch, useSelector } from 'react-redux'
import { tokenLoggedIn } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'




const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())

    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(tokenLoggedIn(user))
        }
    }, [])

    return (
        <Container>
            <div>
                <Router>
                    {user && <Menu />}
                    <Notification />
                    {user ?
                        <Routes>
                            <Route path="/" element={<BlogList />} />
                            <Route path="/blogs/:id" element={<BlogView />} />
                            <Route path="/users/:id" element={<User />} />
                            <Route path="/users" element={<Users />} />
                        </Routes>
                        :
                        <LoginForm />
                    }
                </Router>
            </div>
        </Container>
    )
}
export default App