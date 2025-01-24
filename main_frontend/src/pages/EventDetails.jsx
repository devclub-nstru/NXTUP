import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import Loader from "../components/Loader";
import NotFound from "./NotFound";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdGroups } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import getEvents from "../services/eventService";
import { showError } from "../utils/toastUtil";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  const [myevents, setmyEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setmyEvents(data);
        const eventDetails = data.find((event) => event._id === eventId);
      if (eventDetails) {
        setEvent(eventDetails);
      } else {
        setEvent(null);
      }
      } catch (error) {
        showError("Error loading data!");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // setLoading(true);
    // const timer = setTimeout(() => {
      
      // setLoading(false);
    // }, 1000);

    // return () => clearTimeout(timer);
  }, [myevents]);

  useEffect(() => {
    AOS.init();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!event) {
    return <NotFound />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="tab-content">
            {event.Description ? (
              <p>{event.Description}</p>
            ) : (
              <p>No description available.</p>
            )}
          </div>
        );
      case "rulebook":
        return (
          <div className="tab-content">
            <ul>
              {event.rules?.map((rule, index) => (
                <li key={index}>{rule}</li>
              )) || <p>No rules available.</p>}
            </ul>
          </div>
        );
      case "memories":
        return (
          <div className="tab-content">
            <div className="memories-gallery">
              {event.memories?.map((image, index) => (
                <img key={index} src={image} alt={`Memory ${index}`} />
              )) || <p>No memories available.</p>}
            </div>
          </div>
        );
      default:
        return <p>Select a tab to view information.</p>;
    }
  };

  return (
    <>
      <div
        data-aos="fade-up"
        className="individual-event-details-container container"
      >
        <div className="event-details-banner">
          <img
            src={
              event?.Banner ||
              "https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/galaxy-header.jpg"
            }
            alt="Event Banner"
            className="banner-image"
            style={{ height: "15rem", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/galaxy-header.jpg";
            }}
          />
        </div>

        <div className="sub-container">
          <div className="event-info">
            <div className="event-details-info">
              <h2 className="event-details__title">{event.heading}</h2>
              <div className="location-container">
                <IoLocationOutline />
                <p className="event-details__location">{event.Location}</p>
              </div>
              <div className="date-container">
                <SlCalender />
                <p className="event-details__date">{formatDate(event.Date)}</p>
              </div>
              <p className="event-tag">{event.tag} Event</p>
            </div>

            <div className="event-details-description">
              <div className="tabs">
                <button
                  className={`tab-button ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "rulebook" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("rulebook")}
                >
                  Rule Book
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "memories" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("memories")}
                >
                  Past Memories
                </button>
              </div>
              <div className="tabs-content">{renderTabContent()}</div>
            </div>
          </div>
          <div className="register-container">
            <div className="top">
              <p className="register-type">Free</p>
              <Link to={`/events/${eventId}/register`}>
                <button className="register-button">Register</button>
              </Link>
            </div>
            <div className="bottom">
              <div className="info-container">
                <div className="icon">
                  <MdGroups />
                </div>
                <div className="info-text">
                  <p className="top">Registered</p>
                  <p className="bottom">{event.Registered}</p>
                </div>
              </div>
              <div className="info-container">
                <div className="icon">
                  <BsFillPeopleFill />
                </div>
                <div className="info-text">
                  <p className="top">Team Size</p>
                  {event.TeamSizeStart === event.TeamSizeEnd ? (
                    <p className="bottom">Individual</p>
                  ) : (
                    <p className="bottom">
                      {event.TeamSizeStart}-{event.TeamSizeEnd} Members
                    </p>
                  )}
                </div>
              </div>
              <div className="info-container">
                <div className="icon">
                  <FaTrophy />
                </div>
                <div className="info-text">
                  <p className="top">Prizes worth</p>
                  <p className="bottom">₹ {event.Prize}</p>
                </div>
              </div>
              <div className="info-container">
                <div className="icon">
                  <FaClock />
                </div>
                <div className="info-text">
                  <p className="top">Registration Deadline</p>
                  <p className="bottom">
                    {new Date(event.Deadline)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .reverse()
                      .join(" ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
