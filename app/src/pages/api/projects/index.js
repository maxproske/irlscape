const axios = require('axios')

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

  console.log('missed projects cache')
  const url = `${v9APIUrl}/me/projects`
  const projects = await axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return res.json(projects)
}

export default handler
