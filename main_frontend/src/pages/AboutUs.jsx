import React from "react";
import CardsContainer from "../components/CardsContainer";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <>
      <div className="about-us-container container">
        <h1 className="about-us-container-heading">About Us</h1>
        <p className="about-us-container-paragraph">
          Dev Club at Newton School of Technology is a dynamic hub for
          open-source enthusiasts, research-driven minds, and peer-to-peer
          learners. Our mission is to foster innovation, collaboration, and
          continuous growth through hands-on projects, knowledge sharing, and
          impactful contributions to the tech community. Join Dev Club to
          explore, create, and excel together!
        </p>
        <div className="about-us-container-events">
          <Link to="https://www.linkedin.com/in/adityainnovates/">
            <CardsContainer
              clubName="Aditya Kumar"
              presidentName="Full-Stack Developer"
              imageUrl={"/images/aditya_pfp.jpeg"}
            />
          </Link>
          <Link to="https://www.linkedin.com/in/ved-pawar-00169a268/">
            <CardsContainer
              clubName="Ved Pawar"
              presidentName="DevOps Developer"
              imageUrl={"/images/ved_pfp.jpeg"}
            />
          </Link>
          <Link to="https://www.linkedin.com/in/pseudopythonic/">
            <CardsContainer
              clubName="Hardik Jaiswal"
              presidentName="Frontend Developer"
              imageUrl="/images/hardik_pfp.jpg"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/shreyansh-agrawal-695289203/">
            <CardsContainer
              clubName="Shreyansh Agarwal"
              presidentName="Middleware Developer"
              imageUrl="/images/shreyansh_pfp.jpeg"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/raghav-gupta-b890b7323/">
            <CardsContainer
              clubName="Raghav Gupta"
              presidentName="API Engineer"
              imageUrl="/images/raghav_pfp.jpeg"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/rohansng/">
            <CardsContainer
              clubName="Rohan Singh"
              presidentName="Product Manager"
              imageUrl="/images/rohan_pfp.jpeg"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/avneet0419/">
            <CardsContainer
              clubName="Avneet Singh"
              presidentName="UI/UX Designer"
              imageUrl="/images/avneet_pfp.jpeg"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/uditjain13/">
            <CardsContainer
              clubName="Udit Jain"
              presidentName="Backend Developer"
              imageUrl="/images/UditJain_pfp.jpeg"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
