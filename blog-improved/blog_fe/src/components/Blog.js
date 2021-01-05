import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

export const BlogView = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const id = useParams().id
  const [ blog, setBlog ] = useState(null)

  useEffect(() => {
    const getBlog = async () => {
      const blog = await blogService.getOne(id)
      setBlog(blog)
    }
    getBlog()
  }, [])

  const handleRemoveBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(deleteBlog(blog.id))
      history.push('/blogs')
    }
  }

  if(!blog){
    return null
  }

  return(
    <>
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <a target='_bank' href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes
            <button
              id='like-btn'
              onClick={() =>dispatch(likeBlog(blog))}>
              like
            </button>
          </p>
          <p>added by {blog.author}</p>
          {user.username === blog.user.username &&
            <button onClick={handleRemoveBlog}>remove</button>
          }
        </div>
      )}
    </>
  )
}

export const Blog = ({ blog, user }) => {
  const location = useLocation()
  const [showExtraDetails, setShowExtraDetails] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const buttonFunc = () => {
    if(!showExtraDetails) {
      setShowExtraDetails(true)
      setButtonLabel('hide')
      return
    }
    setShowExtraDetails(false)
    setButtonLabel('view')
  }
  
  return (
    <tr className='blog'>
      <td><a href={`${location.pathname}/${blog.id}`}>{blog.title} {blog.author}</a></td>
    </tr>
  )
}

export const CreateBlogForm = ({
  blogFormRef
}) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try{
      blogFormRef.current.toggleVisible()
      dispatch(createBlog(title, author, url))
      dispatch(setNotification(
        `A new blog ${title} by ${author} added`,
        false,
        3
      ))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      dispatch(setNotification(
        'Blog hasn\'t been created',
        true,
        3
      ))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <Form
        id='blog-form'
        onSubmit={ handleCreateBlog }>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='blog-title'
            type='text'
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='blog-author'
            type='text'
            onChange={({ target }) => setAuthor(target.value)}
            value={ author }
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='blog-url'
            type='text'
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>create</Button>
      </Form>
    </div>
  )
}
