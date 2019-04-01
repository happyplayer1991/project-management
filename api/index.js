import express from 'express'
import axios from 'axios'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  
  axios({
    method: 'post',
    url: 'https://api.quwi.com/v2/auth/login',
    data: {
      email: req.body.username,
      password: req.body.password
    },
    headers: {
      'Content-Type': 'application/json',
      'Client-Timezone': '180',
      'Client-Language': 'ru-RU'
    },
    validateStatus: (status) => {
      return true;
    },
  })
  .then((response) => {
    req.session.authUser = { 
      username: response.data.app_init.user.name, 
      token: response.data.token 
    }
    return res.json({ 
      username: response.data.app_init.user.name, 
      token: response.data.token 
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(401).json({ message: 'Your Email or Password is incorrect.' })
  })
})

// Add POST - /api/get-projects
router.post('/get-projects', (req, res) => {
  axios({
    method: 'get',
    url: 'https://api.quwi.com/v2/projects-manage/index',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    },
    validateStatus: (status) => {
      return true;
    },
  })
  .then((response) => {
    // console.log(response);
    // console.log( response.data.projects )
    return res.json( response.data.projects )
  })
  .catch((error) => {
    console.log(error)
    res.status(401).json({ message: 'Failed to get projects' })
  })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  axios({
    method: 'post',
    url: 'https://api.quwi.com/v2/auth/logout',
    data: {
      anywhere: false,
    },
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: (status) => {
      return true;
    },
  })
  .then((response) => {
    delete req.session.authUser
    res.json({ ok: true })
  })
  .catch((error) => {
    console.log(error)
    res.status(401).json({ message: 'Logout failed' })
  })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
