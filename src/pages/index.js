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
          <h1>IRLScape Highscores</h1>
          <a>Home</a>
        </StyledBannerFrame>
      </StyledBanner>
    </StyledWrapper>
  )
}

export default Home
