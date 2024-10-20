import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Components/Loading";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}?ids=${id}`
        );
        setBook(response.data.results[0]);
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlisted(
          wishlist.some((item) => item.id === response.data.results[0].id)
        );
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlisted) {
      const updatedWishlist = wishlist.filter((item) => item.id !== book.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setWishlisted(!wishlisted);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      {book ? (
        <>
          <div className="bg-white p-4 shadow rounded md:flex gap-8">
            <div className=" md:w-[30%]">
              {book.formats["image/jpeg"] ? (
                <img
                  className="md:w-[90%] mx-auto max-h-[400px]"
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                />
              ) : (
                <div className="text-red-500">Image not available</div>
              )}
            </div>
            <div className="rounded">
              <h1 className="text-2xl font-bold mt-3 md:mt-0">{book.title}</h1>
              <div className="mt-3">
                <div className="flex mt-2 gap-4">
                  <h4 className="font-bold text-lg">Author: </h4>
                  <p className="text-lg font-semibold">
                    {book.authors[0]?.name || "Unknown"}
                  </p>
                </div>

                <div className="mt-2 flex gap-4">
                  <h4 className="font-bold text-lg">Subjects: </h4>
                  <div className="flex flex-wrap gap-2">
                    {book?.subjects?.length > 0 ? (
                      book.subjects.map((subject, i) => (
                        <p key={i} className="text-lg font-medium">
                          {subject}
                          {i !== book.subjects.length - 1 && ","}
                        </p>
                      ))
                    ) : (
                      <p className="text-lg">No subjects available</p>
                    )}
                  </div>
                </div>

                <div className="flex mt-2 gap-4">
                  <h4 className="font-bold text-lg">Languages: </h4>
                  <div className="flex flex-wrap gap-2">
                    {book?.languages?.length > 0 ? (
                      book.languages.map((language, i) => (
                        <p key={i} className="text-lg text-primary font-medium">
                          {language}
                          {i !== book.languages.length - 1 && ","}
                        </p>
                      ))
                    ) : (
                      <p className="text-lg">No languages available</p>
                    )}
                  </div>
                </div>

                <div className="flex mt-2 gap-4">
                  <h4 className="font-bold text-lg">Total Downloads:</h4>
                  <p className="text-lg font-semibold text-red-500">
                    {book.download_count || 0}
                  </p>
                </div>

                <div>
                  <button
                    onClick={toggleWishlist}
                    className={`py-2 px-3 flex items-center gap-2 duration-300 mt-4 border text-white hover:bg-transparent font-semibold rounded ${
                      wishlisted
                        ? "bg-red-500 border-red-500   hover:text-red-500"
                        : "bg-primary border-primary   hover:text-primary"
                    }   `}
                  >
                    {wishlisted ? (
                      <>
                        Remove from Wishlist <FaHeart className="text-xl" />
                      </>
                    ) : (
                      <>
                        Add to Wishlist <FaRegHeart className="text-xl" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded bg-slate-50 p-5">
            <div className="text-center">
              <h4 className="font-bold text-lg border-b pb-3">Bookshelves:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {book?.bookshelves?.length > 0 ? (
                  book.bookshelves.map((bookshelve, i) => (
                    <p key={i} className="text-lg mt-3 font-medium">
                      {bookshelve}
                      {i !== book.bookshelves.length - 1 && ","}
                    </p>
                  ))
                ) : (
                  <p className="text-lg">No bookshelves available</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No book data available</div>
      )}
    </div>
  );
};

export default BookPage;
