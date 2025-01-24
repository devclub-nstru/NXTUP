import React, { useState } from "react";
import { MdEventNote } from "react-icons/md";
import { GiSwordWound } from "react-icons/gi";
import { FaFlagCheckered } from "react-icons/fa";
import Event from "../components/Event";
import Clubs from "../components/Clubs";
import Clans from "../components/Clans";
import getEvents from "../services/eventService.js";
import { showError } from "../utils/toastUtil.js";
import { useEffect } from "react";


const AllEvents = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [eventFilter, setEventFilter] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [isLoading,setisLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true)
      try {
        const data = await getEvents();  
        setEvents(data.filter(el=>el.IsActive));  
      } catch (error) {
        showError("Error loading data!");  
      }
      setisLoading(false)
    };

    fetchData();  
  }, []);



  const renderContent = () => {
    switch (activeTab) {
      case "events":
        return <Event filter={eventFilter} setisLoading={setisLoading} isLoading={isLoading} events={events} />;
      case "clubs":
        return <Clubs />;
      case "clans":
        return <Clans />;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="dashboard section-gap">
      <div className="dashboard-sidebar">
        <ul>
          <li
            className={activeTab === "events" ? "active" : ""}
            onClick={() => setActiveTab("events")}
          >
            <div className="dashboard-item">
              <MdEventNote />
              <span className="dashboard-text">Events</span>
            </div>
            {activeTab === "events" && (
              <ul className="subsection">
                <li
                  className={eventFilter === "upcoming" ? "active" : ""}
                  onClick={() => setEventFilter("upcoming")}
                >
                  Upcoming
                </li>
                <li
                  className={eventFilter === "ongoing" ? "active" : ""}
                  onClick={() => setEventFilter("ongoing")}
                >
                  Ongoing
                </li>
                <li
                  className={eventFilter === "past" ? "active" : ""}
                  onClick={() => setEventFilter("past")}
                >
                  Past
                </li>
              </ul>
            )}
          </li>
          <li
            className={`${activeTab === "clubs" ? "orange" : ""}`}
            onClick={() => setActiveTab("clubs")}
          >
            <div className="dashboard-item">
              <FaFlagCheckered />
              <span className="dashboard-text">Clubs</span>
            </div>
          </li>
          <li
            className={`${activeTab === "clans" ? "green" : ""}`}
            onClick={() => setActiveTab("clans")}
          >
            <div className="dashboard-item">
              <GiSwordWound />
              <span className="dashboard-text">Clans</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default AllEvents;