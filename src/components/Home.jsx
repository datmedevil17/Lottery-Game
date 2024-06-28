import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h3>Enter according to your Profile</h3>
        <Link to="/manager"><button>Manager</button></Link>
        <br />
        <br />
        <Link to="/players"><button>Player</button></Link>
      
    </div>
  )
}

export default Home
