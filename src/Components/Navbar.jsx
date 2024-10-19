import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-gray-200 shadow">
      <div className="container">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/">
            <img src="/images/logo.png" className="h-8" alt="Logo" />
          </NavLink>

          <div>
            <ul className="flex w-full gap-5">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold hover:text-primary duration-300"
                      : "hover:text-primary duration-300"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold hover:text-primary duration-300"
                      : "hover:text-primary duration-300"
                  }
                >
                  Wishlist
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
