import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useState } from 'react'

const BlogView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const user = useSelector(state => state.user)

    const id = useParams().id
    const blog = useSelector(state =>
        state.blogs.find(blog => blog.id === id))


    const addLike = (event) => {
        event.preventDefault()
        dispatch(likeBlog(blog))
    }

    const deleteBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
            dispatch(removeBlog(blog.id))
            navigate('/')
        }
    }

    const submitComment = (event) => {
        event.preventDefault()
        dispatch(addComment(blog, comment))
        setComment('')
    }
    const deleteButton = {
        color: 'red',
    }

    if (!blog) {
        return null
    }

    return (
        <div >
            <div>
                <h2>{blog.title}</h2>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {blog.likes} likes <button onClick={addLike}>like</button>
                </p>
                <p>
                    added by {blog.user.name}
                </p>
                {user.id === blog.user.id &&
                    <p>
                        <button style={deleteButton} onClick={deleteBlog}>remove blog</button>
                    </p>}

            </div>
            <div>
                <h3>comments</h3>
                <div>
                    <form onSubmit={submitComment}>
                        <input
                            type="text"
                            value={comment}
                            name="newComment"
                            data-testid="newComment"
                            onChange={({ target }) => setComment(target.value)}
                        ></input>
                        <button type="submit">add comment</button>
                    </form>
                </div>
                <div>
                    {blog.comments.map((comment, index) =>
                        <ul key={index}>{comment}</ul>)}
                </div>
            </div>

        </div>
    )
}

export default BlogView