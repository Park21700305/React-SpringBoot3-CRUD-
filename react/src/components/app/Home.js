import React from "react";
import "../../css/home.css";

function Home() {
  return (
    <div className="home-div">
      <h1 className="home-title">과제는 했냐? 형이 지켜보고 있다</h1>
      <img src="/images/ServerPartImg.jpeg" className="serverImage" />
      <img alt="내사진" src="/images/내사진.png" className="myImage" />
    </div>
  );
}

export default Home;
