import './App.css'
import React, { useEffect, useRef } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Blog, BlogView, CreateBlogForm } from './components/Blog'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import {initBlogs} from './reducers/blogReducer'
import { logoutUser, setUserFromLocalStorage } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    if(user){
      dispatch(initBlogs())
    }
  }, [user, dispatch])

  useEffect(() => {
    dispatch(setUserFromLocalStorage())
  }, [])

  const blogForm = () => (
    <Togglable
      buttonLabelOpen='new blog'
      buttonLabelClose='cancel'
      ref={blogFormRef}>
      <CreateBlogForm
        blogFormRef={blogFormRef}
      />
    </Togglable>
  )

  return (
    <div className='container'>
      <NavBar/>
      <Notification />
      
      <Switch>
        <Route path='/login'>
          <LoginForm/>
        </Route>
        <Route path='/users/:id'>
          <UserView/>
        </Route>
        <Route path='/users'>
          <UsersView/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogView/>
        </Route>
        <Route path='/blogs'>
          {!user ? <LoginForm /> :
          <>
            <h2>blogs</h2>
            {blogForm()}
            <Table striped>
              <tbody>
                {blogs
                  .sort((fBlog, sBlog) => sBlog.likes - fBlog.likes)
                  .map(blog =>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={user}
                    />
                )}
              </tbody>
            </Table>
          </>
          }
          
        </Route>
        <Route path='/'>
          <h1>Welcome to Blog App {user && user.name}</h1>
          {!user && <button onClick={() => history.push('/login')}>login</button>}
        </Route>
      </Switch>
    </div>
  )
}

export default App