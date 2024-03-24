import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            const { id, updatedBlog } = action.payload
            return state.map(blog =>
                blog.id !== id ? blog : updatedBlog)
        },
        deleteBlog(state, action) {
            const deletedId = action.payload
            return state.filter(blog => blog.id !== deletedId)
        }
    }
})

export const { appendBlogs, setBlogs, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
        dispatch(setBlogs(sortedBlogs))
    }
}

export const createBlog = (newBlog, user) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        const blogWithUser = { ...blog, user: user }
        dispatch(appendBlogs(blogWithUser))
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(deleteBlog(id))
    }
}

export const likeBlog = blog => {
    return async dispatch => {

        const id = blog.id
        const newLikes = blog.likes + 1

        const changedBlog = {
            user: blog.user.id,
            likes: newLikes,
            title: blog.title,
            author: blog.author,
            url: blog.url
        }

        const updatedBlog = await blogService.update(id, changedBlog)
        const updatedBlogWithUser = { ...updatedBlog, user: blog.user }
        dispatch(updateBlog({ id: id, updatedBlog: updatedBlogWithUser }))
    }
}

export const addComment = (blog, comment) => {
    const id = blog.id
    const user = blog.user


    return async dispatch => {
        const updatedBlog = await blogService.addComment(id, comment)
        const updatedBlogWithUser = { ...updatedBlog, user: blog.user }
        dispatch(updateBlog({ id: id, updatedBlog: updatedBlogWithUser }))
    }
}


export default blogSlice.reducer