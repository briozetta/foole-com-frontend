import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link
import { FaArrowLeft } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import logo from "../../assets/logo2.png";
import { useSelector } from "react-redux";

const user = {
  name: "name",
  email: "tom@example.com",
  imageUrl:
    "https://cdn3d.iconscout.com/3d/premium/thumb/administrator-6853609-5625724.png?f=webp",
};
const navigation = [
  { name: "Add users", href: "/agent-add-users", current: true },
  { name: "My users", href: "/agent-users", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AgentNavbar() {
  const { totalRewardEarned } = useSelector((state) => state.cartCount);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="">
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-200 py-3">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link to={"/"} className="flex-shrink-0">
                      <img
                        className="h-16 w-16"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href} // Use "to" instead of "href"
                            className={classNames(
                              location.pathname === item.href
                                ? "bg-darker-blue text-gray-50"
                                : "text-gray-800 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-lg poppins-semibold"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-10 w-10 rounded-full bg-white"
                              src={user.imageUrl}
                              alt="avtar"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.href} // Use "to" instead of "href"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link} // Use "as" to replace <a> with <Link>
                      to={item.href} // Use "to" instead of "href"
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt="avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link} // Use "as" to replace <a> with <Link>
                        to={item.href} // Use "to" instead of "href"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-gradient-to-r from-zinc-800 to-zinc-900 shadow">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1
                className="sm:text-3xl text-2xl font-bold  text-primary
            flex items-center gap-2 mb-6"
              >
                Dashboard <MdDashboard />
              </h1>
              <h2 className="text-darker-gray-medium shadow-md bg-gray-100 poppins-bold gap-1 px-4 py-4 text-lg rounded-lg">
                Total Earnings{" "}
                <span className="flex justify-center items-center text-green-600 gap-2">
                  <FcMoneyTransfer /> ₹{totalRewardEarned.toFixed(2) || 0}
                </span>
              </h2>
            </div>
            <button
              onClick={goBack}
              className="bg-darker-blue text-primary px-2 rounded-lg font-semibold py-1 btnHover
            gap-2 mb-2 flex justify-center items-center"
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}
