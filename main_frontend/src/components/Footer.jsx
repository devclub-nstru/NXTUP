import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
        <section className="footer-container container">
        <div className="footer-text-container">
          <p className="footer-text">Copyright &copy; 2025 DevClub NSTxRU</p>
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
              <Link to="https://discord.com">
                <FaDiscord />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Footer