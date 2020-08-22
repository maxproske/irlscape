import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

const StyledWrapper = styled.div`
  background: url('/static/bg.jpg') repeat-y scroll center top black;
  padding-top: 10px;
  padding-bottom: 4rem;
`

const StyledFrame = styled.div`
  background-color: black;
  border: 2px solid #382418;

  overflow: hidden;
  position: relative;
  width: 753px;
  margin-left: auto;
  margin-right: auto;
  padding: 4px;
`

const StyledLogin = styled.span`
  float: right;
  color: #90c040;
  text-decoration: none;
`

const StyledBanner = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 4px;
  width: 759px;
  height: 130px;
  background: url('/static/banner.png') no-repeat;
`

const StyledBannerFrame = styled.div`
  position: relative;
  width: 165px;
  top: 20px;
  padding-right: 0px;
  padding-left: 0px;
  padding-top: 2px;
  padding-bottom: 2px;
  text-align: center;
  border: 2px solid #382418;
  background-color: black;
  margin: 15px auto 0;

  h1 {
    font-size: 13px;
    color: white;
    font-weight: bold;
    font-size: inherit;
  }

  a {
    color: #90c040;
    text-decoration: none;
  }
`

const StyledPersonal = styled.div`
  max-width: 380px;
  min-height: 20rem;
  margin: 0 auto;
  position: relative;
`

const StyledScrollTop = styled.div`
  background: url('/static/scroll-top.png') no-repeat;
  height: 36px;
`

const StyledScrollBottom = styled.div`
  background: url('/static/scroll-bottom.png') no-repeat;
  height: 36px;
`

const StyledScores = styled.div`
  background: url('/static/scroll-middle.png') repeat-y;
  min-height: 176px;

  h2 {
    max-width: 355px;
    line-height: 18px;
    font-size: 13px;
    text-align: center;
    font-weight: bold;
    padding: 0.5rem 0;
  }
`

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 155px 30px 50px 90px;
  grid-template-rows: auto;

  max-width: 355px;
  padding: 0 22px 1rem 22px;
`

const StyledRow = styled.div`
  display: contents;
`

const StyledHeader = styled.div`
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 0.5rem;

  ${({ align }) => align && `text-align: right;`}
`

const StyledCell = styled.div`
  line-height: 27px;

  ${({ align }) => align && `text-align: right;`}
`

const Home = ({ projects, entries }) => {
  const [skills, setSkills] = useState(null)

  // TODO: Cache this server-side
  useEffect(() => {
    if (projects && entries) {
      let skillsUpdate = []
      for (const entry of entries) {
        const { project, seconds } = entry

        const skillIndex = skillsUpdate.findIndex((skill) => skill.name === project)

        if (skillIndex === -1) {
          skillsUpdate.push({
            name: project,
            xp: seconds * 0.36206752777,
            hours: seconds / 60 / 60,
          })
        } else {
          skillsUpdate[skillIndex].xp += seconds * 0.36206752777
          skillsUpdate[skillIndex].hours += seconds / 60 / 60
        }
      }

      // Sort by xp
      skillsUpdate.sort((a, b) => b.xp - a.xp)

      setSkills(skillsUpdate)
    }
  }, [entries, projects])

  const xpToLevel = (xp) => {
    const equate = (xp) => Math.floor(xp + 300 * Math.pow(2, xp / 7))

    const levelToXp = (level) => {
      let xp = 0
      for (let i = 1; i < level; i++) xp += equate(i)
      return Math.floor(xp / 4)
    }

    let level = 1
    while (levelToXp(level) < xp) level++
    return level
  }

  return (
    <StyledWrapper>
      <StyledFrame>
        <StyledLogin>Log in</StyledLogin>
      </StyledFrame>
      <br />
      <StyledBanner>
        <StyledBannerFrame>
          <h1>Personal Highscores</h1>
          <a>Home</a>
        </StyledBannerFrame>
      </StyledBanner>
      <StyledPersonal>
        <StyledScrollTop />
        <StyledScores>
          <h2>Personal scores for Max</h2>
          <StyledTable>
            <StyledRow>
              <StyledHeader>&nbsp;&nbsp;Skill</StyledHeader>
              <StyledHeader align={'right'}>Rank</StyledHeader>
              <StyledHeader align={'right'}>
                <acronym title="Level 99 = 10,000 Hours">Level</acronym>
              </StyledHeader>
              <StyledHeader align={'right'}>
                <acronym title="1,303 XP/hour">XP</acronym>
              </StyledHeader>
            </StyledRow>
            {skills &&
              skills.map((skill, i) => {
                const { name } = skill
                const xp = Math.floor(skill.xp)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                const level = xpToLevel(skill.xp)
                const hours = Math.floor(skill.hours)

                return (
                  <StyledRow key={skill.name}>
                    <StyledCell>
                      <img src="/static/placeholder.png" alt="Placeholder" /> {name}
                    </StyledCell>
                    <StyledCell align={'right'}>1</StyledCell>
                    <StyledCell align={'right'}>{level}</StyledCell>
                    <StyledCell align={'right'}>
                      <acronym title={`${hours} Hours`}>{xp}</acronym>
                    </StyledCell>
                  </StyledRow>
                )
              })}
          </StyledTable>
        </StyledScores>
        <StyledScrollBottom />
      </StyledPersonal>
    </StyledWrapper>
  )
}

export const getServerSideProps = async () => {
  console.log('getStaticProps fired')

  // Get projects
  const projectsResponse = await fetch(`http://localhost:3000/api/projects`)

  // So much power!
  if (!projectsResponse.ok) {
    console.log('Projects response not ok')
    return { props: {} }
  }

  const projects = await projectsResponse.json()

  // Get entries
  const entriesResponse = await fetch(`http://localhost:3000/api/entries`)

  if (!entriesResponse.ok) {
    console.log('Entries response not ok')
    return { props: {} }
  }

  const entries = await entriesResponse.json()

  if (projects && entries) {
    return {
      props: {
        projects,
        entries,
      },
    }
  }
}

export default Home
