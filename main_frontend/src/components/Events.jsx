import React from 'react'
import { Link } from 'react-router-dom'

function Events({eventType, eventName, eventDate, color, url}) {
  return (
    <>
    <Link to={url}>
    <section className={`homepage-event-container ${color}`}>
        <div className="homepage-event-tag-container">
            <div className="homepage-event-tag-circle"></div>
            <p className="homepage-event-tag-title">{eventType}</p>
        </div>
        <div className="homepage-event-details-container">
            <p className="homepage-event-name">{eventName}</p>
            <p className="homepage-event-date">{eventDate}</p>
        </div>
    </section>
    </Link>
    </>
  )
}

export default Events