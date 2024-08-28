import React from 'react'
import { Link } from 'react-router-dom'

const Button = () => {
  return (
    <Link to={"/"}> <div className='btn btn-primary absolute top-2 left-2 text-lg hover:scale-105 duration-300'>Home</div></Link>
  
  )
}

export default Button