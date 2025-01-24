import React from "react";
import DetailContainer from "./DetailContainer";
import formatDate from "../utils/formatDate";
import Loader from "./Loader";

function Event({ filter, events, isLoading }) {
  const currentDate = Number(new Date());

  const filteredEvents = events.filter((event) => {

    if (filter === "upcoming") {
      return currentDate < event.Date;
    } else if (filter === "past") {
      return currentDate > event.Date;
    } else if (event.IsActive) {
      return event.IsActive;
    }
    return false;
  });


  return (
    <section className="all-event-section">
      <p className="event-heading">
        {filter.charAt(0).toUpperCase() + filter.slice(1)} Events
      </p>
      <div className="all-event-container">
        {isLoading ? <Loader /> : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <DetailContainer
              key={event._id}
              id={event._id}
              EventDate={formatDate(event.Date)}
              time={event.Time}
              location={event.Location}
              details={event.Description}
              title={event.Title}
            />
          ))
        ) : (
          <p className="no_event_available">No {filter} events available.</p>
        )}
      </div>
    </section>
  );
}

export default Event;