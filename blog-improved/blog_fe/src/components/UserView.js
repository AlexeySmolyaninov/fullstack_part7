import { findAllByTitle } from '@testing-library/react'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const allBlogs = useSelector(state => state.blogs)
  const user = allBlogs.find(blog => blog.user.id === id)?.user
  const usersBlogs = allBlogs
    .filter(blog => blog.user.id === id)
    .map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)
  if(!user){
    return null
  }

  return(
    <div>
      <h1>{user && user.name}</h1>
      <h3>added blogs</h3>
      <ListGroup>
        {usersBlogs}
      </ListGroup>
    </div>
  )
}

export default UserView