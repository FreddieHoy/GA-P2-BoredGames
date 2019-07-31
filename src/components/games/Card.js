import React from 'react'

const Card = ({ name, image }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{name}</div>
      </div>
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
    </div>
  )
}

export default Card
