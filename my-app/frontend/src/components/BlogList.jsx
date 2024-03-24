
import { useRef } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {

    const blogFormRef = useRef()
    const blogs = useSelector(state => state.blogs)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs.map(blog =>
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <Blog blog={blog} />
                                </TableCell>
                            </TableRow>
                        )}

                        <Togglable buttonLabel='new blog' ref={blogFormRef}>
                            <BlogForm />
                        </Togglable>
                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    )
}

export default BlogList