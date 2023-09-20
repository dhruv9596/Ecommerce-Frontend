import React from 'react'
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download our App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High Quality is our First Priority.</p>
        <p>COpyrights 2021 &copy; MeDhruv</p>
      </div>
      <div className="rightFooter">
        <h4>Follw Us</h4>
        <a href="https://www.google.com/">Instagram</a>
        <a href="https://www.google.com/">Youtube</a>
        <a href="https://www.google.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;