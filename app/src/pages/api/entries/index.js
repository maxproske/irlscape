import { getEntries } from '../../../utils/toggl'

const axios = require('axios')
const redis = require('redis')
const papaparse = require('papaparse')

// Create Redis instnace
const redisInstance = redis.createClient({
  host: 'irlscape-redis', // Container name
  port: 6379,
})

redisInstance.on('error', (err) => {
  console.error('Redis error: ', err)
})

// Create axios instance
const axiosInstance = axios.create({
  // Toggl expects API token as username and 'api_token' string as password
  auth: {
    username: process.env.TOGGL_API_TOKEN,
    password: 'api_token',
  },
})

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      break
    default:
      res.status(405).end() // 405 Method Not Allowed
      break
  }
}

const handleGet = async (req, res) => {
  const entries = await getEntries(redisInstance, axiosInstance, papaparse, res)
  res.json(entries)
}

export default handler
