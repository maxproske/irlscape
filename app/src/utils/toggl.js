export const togglConfig = {
  v9APIUrl: 'https://toggl.com/api/v9',
  // v2ReportsUrl: 'https://toggl.com/reports/api/v2',
  v3ReportsUrl: 'https://toggl.com/reports/api/v3',
  userAgent: 'max@mproske.com',
  workspaceId: 1682009,
}

// Parse duration as seconds (eg. '00:25:00' → 1500)
const parseDuration = (duration) => {
  const [hours, minutes, seconds] = duration
    .split(':')
    .filter((x) => x) // Filter null/undefined
    .map((x) => +x) // '00' → 0
  const parsed = (hours * 60 + minutes) * 60 + seconds
  return parsed
}

export const getEntries = async (redisInstance, axiosInstance, papaparse, res) => {
  const allowedSkills = require('./allowedSkills.json')

  const { v3ReportsUrl, userAgent, workspaceId } = togglConfig

  // Try fetching from Redis first
  const entries = await new Promise((resolve) => {
    redisInstance.get('entries', async (err, cachedEntries) => {
      if (cachedEntries) {
        console.log('hit entries cache')
        const entries = JSON.parse(cachedEntries)

        return resolve(entries)
      }
      // Key doesn't exist in Redis store
      else {
        const lol = await Promise.all(
          [2016, 2017, 2018, 2019, 2020].map(async (year) => {
            console.log(`missed ${year} entries cache`)
            // Note: Maximum allowed date range is 1 year
            const startDate = `${year}-01-01`
            const endDate = `${year}-12-31`

            // Note: Without the .csv extension we're limited to 50 time entries, with no way to paginate
            const url = `${v3ReportsUrl}/workspace/${workspaceId}/search/time_entries.csv`
            const body = {
              user_agent: userAgent,
              start_date: startDate,
              end_date: endDate,
            }

            let entries = await axiosInstance
              .post(url, body)
              .then((res) => {
                const parseConfig = {
                  header: true, // Use key-value pairs
                  dynamicTyping: true, // Use integers/null
                  // Format headers
                  transformHeader: (header) => {
                    header = header.toLowerCase() // Expect lowercase key
                    header = header.split(' ').join('_') // Replace spaces in key with underscores
                    return header
                  },
                }
                const parsed = papaparse.parse(res.data, parseConfig)

                return parsed.data
              })
              .catch((err) => err.response)

            // Error handling
            if (entries.status) {
              return res.status(entries.status).json({
                code: entries.status.toString(),
                message: entries.statusText,
              })
            }

            // Filter entries without a duration and project
            entries = entries.filter((entry) => {
              return entry.duration && entry.project && allowedSkills.includes(entry.project)
            })

            // Format response
            entries = entries.map((entry) => {
              return {
                project: entry.project,
                description: entry.description,
                start_date: entry.start_date,
                seconds: parseDuration(entry.duration), // '00:25:00' → 1500
              }
            })

            return entries
          })
        )

        const entries = lol.flat()

        redisInstance.set('entries', JSON.stringify(entries))

        return resolve(entries)
      }
    })
  })

  return entries
}
