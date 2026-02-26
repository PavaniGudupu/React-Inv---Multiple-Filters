import React from 'react';
import { GrFormNext } from "react-icons/gr";
import {Link} from 'react-router-dom'
import '../Styles/Home.css';

const JumpToRecord = () => {
  return (
    <div className='jump'>
    <h1>Ready to get started?</h1>
    <p>Jump into the dashboard and start managing your product inventory efficiently.</p>
      <Link to="/dashboard">
        <button>Dashboard <GrFormNext /></button>
      </Link>

    </div>
  )
}

export default JumpToRecord