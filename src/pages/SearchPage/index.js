import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useQuery } from "../../hooks/useQuery";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

const SearchPage = () => {
  let query = useQuery();
  const debouncedSearchTerm = useDebounce(query.get("q"), 500);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(query.get("q") ? true : false);
  const navigate = useNavigate();

  const fetchSearchMovie = async (searchTerm) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(res.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) fetchSearchMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>Loading...</p>
        </div>
      </section>
    );
  } else {
    if (debouncedSearchTerm) {
      if (searchResults.length > 0) {
        return (
          <section className="search-container">
            {searchResults.map((movie) => {
              const movieImageUrl = !movie.backdrop_path
                ? "/images/viewers-disney.png"
                : "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className="movie" key={movie.id}>
                  <div
                    onClick={() => {
                      navigate(`/${movie.id}`, {
                        state: {
                          q: debouncedSearchTerm,
                        },
                      });
                    }}
                    className="movie__column-poster"
                  >
                    <img
                      src={movieImageUrl}
                      alt="movie"
                      className="movie__poster"
                    />
                    <div className="movie__title">
                      {movie.title || movie.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        );
      } else {
        return (
          <section className="no-results">
            <div className="no-results__text">
              <p>
                찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다
              </p>
            </div>
          </section>
        );
      }
    } else {
      return (
        <section className="no-results">
          <div className="no-results__text">
            <p>검색어를 입력해주세요~</p>
          </div>
        </section>
      );
    }
  }
};

export default SearchPage;
