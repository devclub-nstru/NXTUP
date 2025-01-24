import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <section className="navbar-container container">
        <div className="logo-container">
          <Link className="logo-text" to="/">
            nxtup
          </Link>
        </div>
        <div className="social-links-container">
          <ul className="links">
            <li className="link">
              <Link to="https://linkedin.com">
                <FaLinkedin />
              </Link>
            </li>
            <li className="link">
              <Link to="https://x.com">
                <FaXTwitter />
              </Link>
            </li>
            <li className="link">
              <Link to="https://discord.gg/5XQceXM3">
                <FaDiscord />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Navbar;
