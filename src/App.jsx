import React from 'react'
import Header from './components/header'
import Main from './components/main'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const App = () => {
  return (
    <div className='all-components'>
      <Header/>
      <Main/>
    </div>
  )
}

export default App