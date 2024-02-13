import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useSearchParams } from "react-router-dom";
import { SmallCard } from "../components";

export default function CuratedImages() {
  const [photos, setPhotos] = useState([]);
  // const [searchParams, setSearchParams] = useSearchParams();

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // The serialize function here would be responsible for
  //   // creating an object of { key: value } pairs from the
  //   // fields in the form that make up the query.
  //   let params = serializeFormQuery(event.target);
  //   setSearchParams(params);
  // }

  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  // console.log(searchParams);
  const fetchImage = async () => {
    const { photos } = (
      await axios({
        method: "get",
        url: `http://localhost:3000/images`,
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
    <div className="flex flex-wrap justify-evenly">
      {photos.map((photo) => {
        return <SmallCard photo={photo} key={photo.id}/>;
      })}
    </div>
    </>
  );
}
