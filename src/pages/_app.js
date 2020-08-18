import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}

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
