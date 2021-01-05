import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'BLOG_CREATE':
      return state.concat(action.data)
    case 'BLOGS_INIT':
      return action.data
    case 'BLOG_DELETE':
      return state.filter(blog => blog.id !== action.data)
    case 'BLOG_LIKE':
      return state.map(blog => {
        if(blog.id === action.data.id){
          blog.likes = action.data.likes
        }
        return blog
      })
    default:
      return state
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const blog = await blogService.createBlog({
      author,
      title,
      url
    })
    dispatch({
      type: 'BLOG_CREATE',
      data: blog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOGS_INIT',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const responseStatus = await blogService.deleteBlog(id)
    if(responseStatus === 200) {
      dispatch({
        type: 'BLOG_DELETE',
        data: id
      })
    }
  }
} 

export const likeBlog = (blog) => {
  return async dispatch => {
    blog.likes += 1
    const updatedBlog = await blogService.updateBlog(blog)
    dispatch({
      type: 'BLOG_LIKE',
      data: updatedBlog
    })
  }
}

export default blogReducer