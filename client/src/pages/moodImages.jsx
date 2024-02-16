import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SmallCard, LoadingCircle, Hero } from "../components";

export default function MoodImages() {
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadCaption, setLoadCaption] = useState(true);
  const access_token = localStorage.getItem("access_token");
  const { name, subscription } = JSON.parse(localStorage.getItem("user"));

  const { href, pathname } = window.location;
  const queries = href.split(pathname)[1];

  const fetchImage = async () => {
    try {
      const { photos, caption } = (
        await axios({
          method: "get",
          url: `http://localhost:3000/feelings/${queries ? queries : ""}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      ).data;

      setPhotos(photos);
      setLoading(false);
      setCaptions(caption);
      setLoadCaption(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [queries]);

  return (
    <>
      <div className="flex flex-wrap place-content-evenly overflow-auto">
        {loadCaption ? (
          <LoadingCircle />
        ) : (
          <>
            <Hero props={{ name, captions }} />
            <div className="bg-white-600"></div>
          </>
        )}
        {loading && <LoadingCircle />}

        {!loading &&
          photos.map((photo, index) => {
            return (
              <>
                <SmallCard
                  photo={photo}
                  queries={queries}
                  key={`${index}${photo.id}`}
                />
              </>
            );
          })}
      </div>
    </>
  );
}
