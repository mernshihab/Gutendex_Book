import { useState, useEffect } from 'react';
import BookList from '../components/BookList';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4 font-bold">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <BookList books={wishlist} />
      ) : (
        <p>No books in your wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
