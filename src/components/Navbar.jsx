import React, { useState, useEffect } from "react";
import { FaBars, FaCartArrowDown, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAgent, setIsAgent] = useState();
  const [cartItems, setCartItems] = useState([]);

  // const fetchCart = async () => {
  //   try {
  //     const { data } = await axios.get(`/cart/${currentUser._id}`);
  //     setCartItems(data);
  //   } catch (error) {}
  // };

  useEffect(() => {
    // fetchCart();
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrolled(scrollTop > 50);
    };

    const fetchUserRole = async () => {
      try {
        if (currentUser && currentUser._id) {
          const response = await axios.get(`/agent/${currentUser._id}`);
          setIsAgent(response.data.role === "Agent");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentUser]);

  const handleSignout = async () => {
    try {
      await axios.get("/logout");
      dispatch(signout());
      navigate("/");
      toast.warning("logout Success!", { position: "top-center" });
    } catch (error) {
      console.log(error);
    }
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "text-darker-blue underline"
      : "text-darker-gray-medium hover:text-gray-950";
  };

  const totalDistinctItems = 2
  //cartItems.length;

  return (
    <header
      className={`flex w-full items-center ${
        scrolled
          ? "bg-opacity-65 bg-zinc-100 backdrop-blur-sm "
          : "bg-zinc-50 bg-opacity-90 backdrop-blur-sm shadow-sm"
      } p-4 fixed z-50 px-10 transition-colors duration-300`}
    >
      <div className="container mx-auto">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to={"/"} className="block w-full py-5">
              <img src={logo} alt="logo" className="w-full" />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              {open ? (
                <button
                  onClick={() => setOpen(false)}
                  id="navbarClose"
                  className="navbarTogglerActive absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <FaTimes size={22} />
                </button>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  id="navbarToggler"
                  className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <FaBars size={22} />
                </button>
              )}
              <nav
                id="navbarCollapse"
                className={`absolute z-50 right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                }`}
              >
                <div className="sm:hidden">
                  {currentUser ? (
                    <h1 className="px-7 py-3 text-xl font-medium text-dark hover:text-gray-950 text-gray-900">
                      Hello, {currentUser.firstName}
                    </h1>
                  ) : (
                    <div className="flex gap-2 text-slate-50 font-semibold">
                      <Link
                        to="/sign-up"
                        className="bg-darker-gray px-2 py-2 btnHover rounded-md"
                      >
                        SignUp
                      </Link>
                      <Link
                        to="/sign-in"
                        className="bg-darker-blue px-2 py-2 btnHover rounded-md"
                      >
                        SignIn
                      </Link>
                    </div>
                  )}
                </div>

                <ul className="block lg:flex">
                  {currentUser && (
                    <>
                      <Link to={"/"}>
                        <ListItem className={getNavLinkClass("/")}>
                          Home
                        </ListItem>
                      </Link>
                      <Link to={"/profile"}>
                        <ListItem className={getNavLinkClass("/profile")}>
                          Profile
                        </ListItem>
                      </Link>
                      <Link to={"/my-orders"}>
                        <ListItem className={getNavLinkClass("/my-orders")}>
                          My-Orders
                        </ListItem>
                      </Link>
                      <Link className="sm:hidden" to={"/cart"}>
                        <ListItem className={getNavLinkClass("/cart")}>
                          <FaCartArrowDown
                            size={26}
                            className="text-red-700 mx-1"
                          />
                          Cart
                        </ListItem>
                      </Link>
                    </>
                  )}
                  {currentUser && currentUser.role === "Admin" && (
                    <Link to={"/admin"}>
                      <ListItem className={getNavLinkClass("/admin")}>
                        Dashboard
                      </ListItem>
                    </Link>
                  )}
                  {isAgent && (
                    <Link to={"/agent-main"}>
                      <ListItem className={getNavLinkClass("/agent-main")}>
                        Agent-Dashboard
                      </ListItem>
                    </Link>
                  )}
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              {currentUser ? (
                <>
                  <Link to={"/cart"}>
                    <div className="flex ">
                      <FaCartArrowDown
                        size={32}
                        className="text-red-700 mx-1"
                      />
                      <span className=" text-red-700 rounded-full px-2 py-1 text-xl font-bold ml-6 mt-1 absolute">
                        {totalDistinctItems}
                      </span>
                    </div>
                  </Link>
                  <h1 className="px-7 py-2 text-xl font-medium text-dark hover:text-gray-950 text-gray-900">
                    Hello, {currentUser.firstName}
                  </h1>
                  <button
                    onClick={handleSignout}
                    className="bg-darker-gray text-primary rounded-md px-2 btnHover"
                  >
                    Signout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={"/sign-in"}
                    className="px-7 py-3 text-xl font-medium text-dark hover:text-gray-950 text-gray-600"
                  >
                    Sign in
                  </Link>

                  <Link
                    to={"/sign-up"}
                    className="rounded-md bg-darker-gray px-7 py-3 text-base font-medium text-white hover:bg-darker-gray-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, className }) => {
  return (
    <li
      className={`flex py-2 text-xl font-semibold lg:ml-12 lg:inline-flex  ${className}`}
    >
      {children}
    </li>
  );
};
