import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";

const contentStyle = {
  height: "470px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselView = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);
  return (
    <>
      <Carousel autoplay>
        {loader === false && <Spin />}

        <div>
          <img src={"https://i.ibb.co/JCQTtpc/1.jpg"} style={contentStyle} />
        </div>
        <div>
          <img src={"https://i.ibb.co/wp7CdFh/2.jpg"} style={contentStyle} />
        </div>
        <div>
          <img src={"https://i.ibb.co/YWCP4pS/3.jpg"} style={contentStyle} />
        </div>
        <div>
          <img src={"https://i.ibb.co/tmtwKVZ/4.jpg"} style={contentStyle} />
        </div>
      </Carousel>
    </>
  );
};

export default CarouselView;
