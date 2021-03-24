import React from 'react'
import './Card.scss';

const Card = ({ children }) => {
  return (
    <div className="utilityCard">
      {children}
    </div>
  )
}

export default Card
