import React from 'react'

const Header = (props) => {
  return (
    <div className='w-full bg-slate-900 p-4 text-center'>
      <h1 className='font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-l from-white to-blue-600'>{props.name}</h1>
    </div>
  )
}

export default Header;