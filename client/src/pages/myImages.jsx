import React, { useEffect, useState } from "react";
import { Hero, LoadingCircle, PersCards } from "../components";
import axios from "axios";

export default function MyImages() {
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadCaption, setLoadCaption] = useState(true);
  const access_token = localStorage.getItem("access_token");
  const { name, subscription } = JSON.parse(localStorage.getItem("user"));

  const { href, pathname } = window.location;
  let queries = href.split(pathname)[1];

  console.log(queries);
  const fetchImage = async () => {
    try {
      const response = (
        await axios({
          method: "get",
          url: `http://localhost:3000/myImages/${queries ? queries : ""}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
      ).data;

      console.log(response);
      setPhotos(response);
      setLoading(false);
      // setCaptions(caption);
      // setLoadCaption(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [queries]);

  console.log(photos);
  return (
    <>
      <Hero />
      {loading && <LoadingCircle />}
      {!loading &&
        photos.map((photo, index) => {
          return <PersCards key={photo.id} photo={photo} />;
        })}
    </>
  );
}
