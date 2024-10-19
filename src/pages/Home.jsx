import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../Components/BookList";
import Loading from "../Components/Loading";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchBooks = async (url = `${import.meta.env.VITE_BACKEND_URL}`) => {
    const response = await axios.get(url);
    setBooks(response.data.results);
    setNextPage(response.data.next);
    setPrevPage(response.data.previous);

    const allGenres = response.data.results.flatMap((book) => book.subjects);
    setGenres([...new Set(allGenres)]);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenre =
      genre === "" || (book.subjects && book.subjects.includes(genre));
    return matchesSearch && matchesGenre;
  });

  if (books.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-x-4 mb-4">
        <input
          type="text"
          placeholder="Search books by title"
          className="border rounded p-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="relative">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border p-2 rounded w-full mt-2 md:mt-0 text-sm truncate"
            style={{ maxWidth: "100%" }}
          >
            <option value="">All Genres</option>
            {genres?.map((g, index) => (
              <option key={index} value={g}>
                {g.length > 24 ? g.slice(0, 24) + "..." : g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <BookList books={filteredBooks} />

      <div className="flex justify-between mt-4">
        {prevPage && (
          <button
            onClick={() => fetchBooks(prevPage)}
            className="py-2 px-3 border border-red-500 bg-red-500 text-white font-semibold rounded hover:bg-transparent hover:text-red-500 duration-300"
          >
            Previous Page
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => fetchBooks(nextPage)}
            className="py-2 px-3 border border-primary bg-primary text-white font-semibold rounded hover:bg-transparent hover:text-primary duration-300"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
