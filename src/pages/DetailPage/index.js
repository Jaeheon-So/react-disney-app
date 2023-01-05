import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  let { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`movie/${movieId}`);
        setMovie(res.data);
      } catch (error) {
        setMovie({});
      }
    }
    if (document.querySelector("input"))
      document.querySelector("input").value = location.state?.q || "";
    fetchData();
  }, [movieId, location]);

  if (!movie) {
    return (
      <div className="loading">
        <span>Loading...</span>
      </div>
    );
  } else {
    return (
      <section>
        <img
          className="modal__poster-img"
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              : "/images/viewers-disney.png"
          }
          alt="modal__poster-img"
        />
      </section>
    );
  }
};

export default DetailPage;
