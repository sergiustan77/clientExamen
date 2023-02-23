import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const handlekeyword = (event) => {
    setKeyword(event.target.value);
  };
  const getBooks = async () => {
    const booksData = await fetch(
      "http://localhost:8080/api/books/" + keyword,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    setBooks(await booksData.json());
  };

  const getKeywords = async () => {
    const keywords = await fetch("http://localhost:8080/api/books/keywords", {
      headers: { "Content-Type": "application/json" },
    });

    setKeywords(await keywords.json());
  };

  useEffect(() => {
    getKeywords();
  }, [keywords]);
  return (
    <div className="flex gap-8 place-content-center">
      <div className="grid place-content-center">
        <input
          className="border"
          value={keyword}
          onChange={handlekeyword}
          type="text"
        />
        {keyword ? (
          <button onClick={getBooks}>Get books</button>
        ) : (
          <button disabled>Get books</button>
        )}
        {books && (
          <div className="grid gap-4 bg-yellow-200 border place-items-center w-full flex-wrap">
            {books.map((b, i) => (
              <div key={i} className="w-[250px]">
                {" "}
                <div className="">{i + 1}</div>
                <div>{b.title}</div>
                <div>{b.author}</div>
                <div>{b.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="">
        <h2>Available keywords:</h2>
        {keywords && (
          <div className="grid gap-4  border place-items-center w-full flex-wrap">
            {keywords.map((k, i) => (
              <div key={i} className="w-[250px] flex gap-2">
                <div className="">{i + 1}.</div>
                <div>{k.keyword}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
