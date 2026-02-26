import React from "react";
import Navbar from "../Partials/Navbar";
import MainCard from "../Cards/MainCard";
import Content from "../Cards/Content";
import Features from "../Cards/Features";
import JumpToRecord from "../Cards/JumpToRecord";

const Home = () => {
  return (
        <div className="App">
      <Navbar />

      <div className="main-content">

      <MainCard />
      <Content />
      <Features />
      <JumpToRecord />
</div>
    </div>
  );
};

export default Home;
