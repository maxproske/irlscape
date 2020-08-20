import React from 'react'

import styled from 'styled-components'

const StyledWrapper = styled.div``

const StyledBackground = styled.div`
  background: url('/static/bg.jpg') repeat-y scroll center top black;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`

const StyledFrame = styled.div`
  background-color: black;
  border: 2px solid #382418;
  margin-top: 10px;
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
  padding: 0 22px 0 22px;
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

const Home = () => {
  return (
    <StyledWrapper>
      <StyledBackground />
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
              <StyledHeader align={'right'}>Level</StyledHeader>
              <StyledHeader align={'right'}>XP</StyledHeader>
            </StyledRow>
            <StyledRow>
              <StyledCell>
                <img src="/static/placeholder.png" alt="Placeholder" /> React
              </StyledCell>
              <StyledCell align={'right'}>15</StyledCell>
              <StyledCell align={'right'}>99</StyledCell>
              <StyledCell align={'right'}>200,000,000</StyledCell>
            </StyledRow>
            <StyledRow>
              <StyledCell>
                <img src="/static/placeholder.png" alt="Placeholder" /> In the Groove 2
              </StyledCell>
              <StyledCell align={'right'}>109</StyledCell>
              <StyledCell align={'right'}>99</StyledCell>
              <StyledCell align={'right'}>200,000,000</StyledCell>
            </StyledRow>
            <StyledRow></StyledRow>
          </StyledTable>
        </StyledScores>
        <StyledScrollBottom />
      </StyledPersonal>
    </StyledWrapper>
  )
}

export default Home
