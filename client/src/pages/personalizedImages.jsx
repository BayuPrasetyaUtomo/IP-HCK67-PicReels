import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
  SmallCard,
  LoadingCircle,
  Hero,
} from "../components";

export default function PersonalizedImage() {
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [loading, setLoading] = useState(true);
  const [loadCaption, setLoadCaption] = useState(true);
  const access_token = localStorage.getItem("access_token");
  const { name, subscription } = JSON.parse(localStorage.getItem("user"));

  const { href, pathname } = window.location;
  const queries = href.split(pathname)[1];

  // const base_url = "https://dev.katakatari.site"
  const base_url = "https://localhost:3000"
  const fetchImage = async () => {
    try {
      const { photos, caption } = (
        await axios({
          method: "get",
          url: `${base_url}/greet${queries ? queries : ""}`,
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
  }, []);
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
          photos.map((photo) => {
            return (
              <>
                <SmallCard photo={photo} key={photo.id} />
              </>
            );
          })}
      </div>
    </>
  );
}
