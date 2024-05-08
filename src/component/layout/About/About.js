import React from "react";
import "./AboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

import LinkedInIcon from '@mui/icons-material/LinkedIn';
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.linkedin.com/in/dhruv-lodaliya/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dlxfnkvgh/image/upload/v1702626455/avtars/Snapchat-1290038521_oqlj1k.jpg"
              alt="Founder"
            />
            <Typography>Dhruv Lodaliya</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit LinkedIn
            </Button>
            <span>
              This is a sample wesbite made by @Dhruv_Lodaliya. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://www.linkedin.com/in/dhruv-lodaliya/" target="blank">
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
