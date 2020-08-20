import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    /* Include padding and border in all elements' total width and height. */
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  html {
    background-color: black;
  }
  
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }
`

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}

export default App
