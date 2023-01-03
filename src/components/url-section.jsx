import React, { useState, useEffect } from "react";
import "../scss/url-section.scss";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "animate.css";
import Cards from "./cards-section";

const UrlSection = () => {
  const [url, setUrl] = useState("");
  const [urlArr, setUrlArr] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("links")) {
      let savedArr = localStorage.getItem("links");
      savedArr = JSON.parse(savedArr);
      setUrlArr(savedArr);
    }
  }, []);

  const handleClick = () => {
    let reg = RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    let tempUrl = url.trim();

    if (reg.test(tempUrl) === false) {
      setError(true);
    } else {
      axios.post(`https://api.shrtco.de/v2/shorten?url=${url}`).then(
        (data) => {
          let tempArr = [...urlArr];
          let shorten = data.data.result.full_short_link;
          let copied = false;
          let newObj = { url, shorten, copied };
          console.log(newObj);
          tempArr.push(newObj);
          setUrlArr(tempArr);
          setError(false);
          localStorage.setItem("links", JSON.stringify(tempArr));
          setUrl("");
        },
        (error) => setError(true)
      );
    }
  };

  const handleCopy = (index) => {
    let arr = [...urlArr];
    let obj = arr[index];
    obj.copied = true;
    navigator.clipboard.writeText(obj.shorten);
    setUrlArr(arr);
  };

  return (
    <div className="url-section-wrap">
      <div className="url-section">
        {/* <input
          type="text"
          aria-label="url input"
          onChange={(e) => setUrl(e.target.value)}
          className={error ? "url-input error" : " url-input"}
          placeholder="Shorten a link here..."
          value={url}
        />{" "}
        {error && (
          <span className="err-message">
            Please enter a valid url (with https)
          </span>
        )}
        <button className="shorten-btn" onClick={handleClick}>
          Shorten it!
        </button> */}
      </div>

      <div className="urls">
        {urlArr.map((url, index) => {
          return (
            <div className="url animate__fadeInDown" key={index}>
              <span>{url.url}</span>
              <div className="dropdown-divider"></div>
              <a
                className="shorten"
                target="_blank"
                rel="noopener noreferrer"
                href={url.shorten}
              >
                {url.shorten}
              </a>
              <CopyToClipboard text={url.shorten}>
                <button
                  className={url.copied ? "copied" : "copy-url"}
                  onClick={() => handleCopy(index)}
                >
                  {url.copied ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
          );
        })}
      </div>
      <Cards />
    </div>
  );
};

export default UrlSection;
