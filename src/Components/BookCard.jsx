import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlisted(wishlist.some((item) => item.id === book.id));
  }, [book.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlisted) {
      const newWishlist = wishlist.filter((item) => item.id !== book.id);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } else {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setWishlisted(!wishlisted);
  };

  return (
    <div
      data-aos="zoom-in-up"
      className="border shadow-md bg-white rounded-md p-3"
    >
      <Link to={`/book/${book.id}`}>
        <img
          className="w-full shadow h-[300px] rounded-t-sm md:h-80"
          src={book.formats["image/jpeg"]}
          alt={book.title}
        />
      </Link>
      <div className="min-h-[70px]">
        <Link to={`/book/${book.id}`} className="text-lg mt-2 font-bold">
          {book.title}
        </Link>
        <p className="text-sm text-neutral-content">
          Author:{" "}
          {book.authors && book.authors.length > 0
            ? book.authors[0].name
            : "Unknown"}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <Link
          to={`/book/${book.id}`}
          className="py-1.5 px-3 text-white font-semibold bg-primary border border-primary text-sm hover:bg-transparent hover:text-primary duration-300 rounded"
        >
          View Details
        </Link>
        <button
          title={wishlisted ? "Remove Wishlist" : "Add Wishlist"}
          onClick={toggleWishlist}
          className="text-2xl text-red-500"
        >
          {wishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
