import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImage from "../Assests/default-image.svg";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    setLoading(true);

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer api-key",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();
    console.log(data);
    let dataArray = data?.data;
    setImageUrl(dataArray[0].url);

    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>

      <div className="img-loading">
        <div className="image">
          <img
            src={imageUrl === "/" ? defaultImage : imageUrl}
            alt="ai-image"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          className="search-input"
          ref={inputRef}
          name=""
          id=""
          placeholder="Describe what you want to see"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
