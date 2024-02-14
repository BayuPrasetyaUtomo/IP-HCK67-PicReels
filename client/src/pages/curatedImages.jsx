import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SmallCard, Pagination, Sidebar } from "../components";

export default function CuratedImages() {
  const [photos, setPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");

  const { href, pathname } = window.location;
  const queries = href.split(pathname)[1];

  const fetchImage = async () => {
    const { photos } = (
      await axios({
        method: "get",
        url: `http://localhost:3000/images${queries ? queries : ""}`,
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzA3OTIzMzEzfQ.w2fkm1hQ7gkN10PIL7qOw8ki-arG6fBwkpCa-Pb04UI"
        }
      })
    ).data;

    setPhotos(photos);
  };

  console.log(photos);
  useEffect(() => {
    fetchImage();
  }, []);
  return (
    <>
        <div className="flex flex-wrap place-content-evenly">
          {photos.map((photo) => {
            return <SmallCard photo={photo} key={photo.id} />;
          })}
        </div>
    </>
  );
}
