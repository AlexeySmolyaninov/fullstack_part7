import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

const UsersView = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const location = useLocation()
  const history = useHistory()

  const countUsersBlogs = () => {
    let usersBlogs = {}
    blogs.forEach(blog => {
      if(!usersBlogs[blog.user.id]){
        usersBlogs[blog.user.id] = { name: blog.user.name, blogs: 1}
      } else {
        usersBlogs[blog.user.id].blogs += 1
      }
    })
    return usersBlogs
  } 

  if(!user){
    history.push('/login')
  }

  return (
    <div>
      <h2>Users</h2>
        <Table>
          <thead>
            <tr>
              <th>user</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(countUsersBlogs())
              .map(entry => (
                <tr key={entry[0]}>
                  <td><a href={`${location.pathname}/${entry[0]}`}>{entry[1].name}</a></td>
                  <td>{entry[1].blogs}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
    </div>
  )
}

export default UsersView