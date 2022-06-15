import React from 'react'
import './Navbar.css'
import classNames from 'classnames'

const Navbar: React.FC<INavbarProps> = props => {
  return (
    <div className={classNames('rce-navbar', props.type, props.className)}>
      <div className='rce-navbar-item rce-navbar-item__left'>{props.left}</div>
      <div className='rce-navbar-item rce-navbar-item__center'>{props.center}</div>
      <div className='rce-navbar-item rce-navbar-item__right'>{props.right}</div>
    </div>
  )
}

export default Navbar
