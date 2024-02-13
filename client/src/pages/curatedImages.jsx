import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useSearchParams } from "react-router-dom";

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
    const { photos } = (await axios({
      method: "get",
      url: `http://localhost:3000/images`,
    })).data;

    setPhotos(photos);
  };

  console.log(photos);
  useEffect(() => {
    fetchImage();
  }, []);
  return (
    <>
      {photos.map((photo) => {
          return (
            <div key={photo.id} className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  src={photo.src.landscape}
                  className="object-cover h-48 w-96"
                  alt={photo.alt}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{photo.photographer}</h2>
                <p>{photo.alt}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
