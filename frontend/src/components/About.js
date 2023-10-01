import React from "react";

const About = () => {
  return (
    <div className="my-info">
      <div className="info-photo">
        <img src="photo.png" alt="Rohit Singh Rawat" className="round-image" />
      </div>
      <div className="info-content">
        <h3>Welcome to iNotebook</h3>
        <p>
          Your trusted platform for easily organizing your thoughts and tasks.
          As a full-stack web developer, I've crafted this app to assist you in
          capturing your ideas, creating to-do lists, and managing your day
          effectively.
        </p>
        <p>
          Stay focused, stay organized, and let iNotebook help you streamline
          your thoughts and boost your productivity.
        </p>
        <h5 className="my-4">~ Rohit Singh Rawat</h5>
      </div>
    </div>
  );
};

export default About;
