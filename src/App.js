import React from 'react'
import MainDiv from './components/MainDiv'
import SideDiv from './components/SideDiv'
const App = () => {
  return (
    <div className="container-fluid d-flex">
    <SideDiv/>
    <MainDiv/>
  </div>
  )
}

export default App
