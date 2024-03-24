import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import {
    TextField,
    Button
} from '@mui/material'


const BlogForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        dispatch(createBlog(blogObject, user))
        dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 5))

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Add new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    <TextField
                        label='Title'
                        value={title}
                        name="Title"
                        data-testid="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label='Author'
                        value={author}
                        name="Author"
                        data-testid="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label='Url'
                        value={url}
                        name="Url"
                        data-testid="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <div>
                    <Button variant='contained' color='primary' type="submit">create</Button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm