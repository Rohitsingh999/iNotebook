import React from "react";
import Notes from "./Notes";

const Home = () => {
  return (
    //without token user cannot access home

    <div>
      <Notes />
    </div>
  );
};

export default Home;
