import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    return (
        <div data-testid="blog">
            <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author} </Link>

        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog