import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Allnews } from "../Api/Constant";

const News = () => {
  const [allnews, setAllnews] = useState([]);
  const fetchAllNews = async () => {
    const { data } = await axios.get(Allnews());

    setAllnews(data.data);
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  function stringdot(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "....continue" : str;
  }

  return (
    <div className="container mx-auto" id="News">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-center  mt-10 mb-10">
        {allnews.slice(0, 40).map((news) => (
          <div
            key={allnews.indexOf(news)}
            className="bg-slate-100 rounded-lg  m-2 ring-1 ring-slate-900/5 shadow-xl h-96 w-85  text-sm  hover:bg-blue-200"
          >
            <div className="m-3">
              <h2>
                <strong>{stringdot(news.title.toUpperCase(), 100)}</strong>
              </h2>
              <img
                src="news.jpg"
                alt="Error"
                className="w-60 h-40 m-2 content-center"
              />
              <a className="font-normal" href={news.url}>
                {stringdot(news.description, 165)}
              </a>
              <p className="text-sm align-bottom mt-2 font-semibold">
                {news?.published_at}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
