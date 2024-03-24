import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const user = useSelector(state =>
        state.users.find(user => user.id === id))

    if (!user) {
        return null
    }

    return (
        <div >
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            {user.blogs.map(blog =>
                <div key={blog.id}>
                    <li>{blog.title}</li>
                </div>)}
        </div>
    )
}

export default User