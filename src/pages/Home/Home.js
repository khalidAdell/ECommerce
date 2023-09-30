import React from "react";
import { Slider } from "../../components/Slider/Slider";
import Gallary from "../../components/Gallary/Gallary";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Slider />
      <Gallary title={"Best Sellers"} />
      <Banner title={"Autumn Collection UP to 20% OFF"} />
      <Gallary title={"Latest This Week"} />
      <Gallary title={"Recommendation"} />
    </div>
  );
};

export default Home;
