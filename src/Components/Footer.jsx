import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="/images/logo.png" className="h-8" alt="Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link to="/" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:underline me-4 md:me-6">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <Link to="/" className="hover:underline">
            Gutendex
          </Link>
          . All Rights Reserved. Developed by{" "}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shihab.merndeveloper@gmail.com"
            className="font-semibold underline"
            target="_blank"
          >
            Shihab
          </a>
        </span>
      </div>
    </footer>
  );
}
