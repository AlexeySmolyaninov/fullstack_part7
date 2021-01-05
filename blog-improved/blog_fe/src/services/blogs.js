import axios from 'axios'

import { getToken } from '../utils/localstorage'
const baseUrl = '/api/blogs'

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.status
}

const updateBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export default { getAll, getOne, createBlog, deleteBlog, updateBlog }