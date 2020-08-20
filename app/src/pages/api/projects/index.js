const axios = require('axios')
const redis = require('redis')

// Create Redis instnace
const redisInstance = redis.createClient({
  host: 'irlscape-redis', // Container name
  port: 6379,
})

redisInstance.on('error', (err) => {
  console.error('Redis error: ', err)
})

const projectsRedisKey = 'projects'

// Create axios instance
const axiosInstance = axios.create({
  // Toggl expects API token as username and 'api_token' string as password
  auth: {
    username: process.env.TOGGL_API_TOKEN,
    password: 'api_token',
  },
})

const togglConfig = {
  v9APIUrl: 'https://toggl.com/api/v9',
  // v2ReportsUrl: 'https://toggl.com/reports/api/v2',
  v3ReportsUrl: 'https://toggl.com/reports/api/v3',
  userAgent: 'max@mproske.com',
  workspaceId: 1682009,
}

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
  const { v9APIUrl } = togglConfig

  // Try fetching from Redis first
  const projects = await new Promise((resolve) => {
    redisInstance.get(projectsRedisKey, async (err, cachedProjects) => {
      if (cachedProjects) {
        console.log('hit projects cache')
        const projects = JSON.parse(cachedProjects)

        return resolve(projects)
      }
      // Key doesn't exist in Redis store
      else {
        console.log('missed projects cache')
        const url = `${v9APIUrl}/me/projects`
        const projects = await axiosInstance
          .get(url)
          .then((res) => res.data)
          .catch((err) => console.log(err))

        redisInstance.set(projectsRedisKey, JSON.stringify(projects))

        return resolve(projects)
      }
    })
  })

  res.json(projects)
}

export default handler
