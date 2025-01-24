import React from 'react'
import { Link } from 'react-router-dom'

function SmallCards({title, type, url}) {
  return (
    <>
    <Link to={url}>
        <div className={`small-cards-continer ${type}`}>
            <h2 className="small-card-title">{title}</h2>
        </div>
    </Link>
    </>
  )
}

export default SmallCards