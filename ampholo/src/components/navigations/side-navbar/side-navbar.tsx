import React, { useState } from "react";
import { FaTimes, FaHome, FaBook } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdFeaturedPlayList } from "react-icons/md";
import { IconType } from "react-icons";
import { MdArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { logoutService } from "../../services/login-service/logout-service";

interface SideNavBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface NavElement {
  id: number;
  element: string;
  path: string;
  icon?: IconType;
  children?: NavElement[];
}

const SideNavBar: React.FC<SideNavBarProps> = ({ toggleSidebar }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const location = useLocation();
  const { handleLogout } = logoutService()

  const navElements: NavElement[] = [
    {
      id: 2,
      element: "Home",
      path: "/",
      icon: FaHome,
      // children: [
      //   {
      //     id: 5,
      //     element: "Hero",
      //     path: "/home/hero",
      //   },
      //   {
      //     id: 6,
      //     element: "Key Feature",
      //     path: "/home/key-features",
      //   },
      //   {
      //     id: 7,
      //     element: "Banner",
      //     path: "/home/banner",
      //   },
      //   {
      //     id: 8,
      //     element: "Why AMPHLO",
      //     path: "/home/why-amphlo", 
      //   },
      //   {
      //     id: 9,
      //     element: "Counters",
      //     path: "/home/counters",
      //   },
      //   {
      //     id: 10,
      //     element: "About",
      //     path: "/home/home-about",
      //   },
      //   {
      //     id: 11,
      //     element: "Transform",
      //     path: "/home/transform",
      //   },
      //   {
      //     id: 12,
      //     element: "Testimonials",
      //     path: "/home/testimonials",
      //   },
      // ],
    },
    {
      id: 3,
      element: "About",
      path: "/about",
      icon: FaBook,
      children: [
        {
          id: 12,
          element: "For Universities",
          path: "/about/for-universities",
        },
        {
          id: 13,
          element: "For Partners",
          path: "/about/for-partners",
        },
        {
          id: 14,
          element: "Our Journey",
          path: "/about/our-journey",
        },
      ],
    },
    {
      id: 4,
      element: "Features",
      path: "/features",
      icon: MdFeaturedPlayList,
      // children: [
      //   {
      //     id: 22,
      //     element: "Hero",
      //     path: "/features/hero",
      //   },
      //   {
      //     id: 23,
      //     element: "Core Feature",
      //     path: "/features/core-features",
      //   },
      //   {
      //     id: 24,
      //     element: "Agent",
      //     path: "/features/agent",
      //   },
      //   {
      //     id: 25,
      //     element: "Overview",
      //     path: "/features/overview", 
      //   },
      //   {
      //     id: 26,
      //     element: "FAQs",
      //     path: "/features/faqs",
      //   },
      // ]
    },
    {
      id: 5,
      element: "Countries",
      path: "/destination",
      icon: MdFeaturedPlayList,
      // children: [
      //   {
      //     id: 27,
      //     element: "Australia",
      //     path: "/destination/australia",
      //   },
      //   {
      //     id: 28,
      //     element: "New Zealand",
      //     path: "/destination/new-zealand",
      //   },
      //   {
      //     id: 29,
      //     element: "Canada",
      //     path: "/destination/canada",
      //   },
      //   {
      //     id: 30,
      //     element: "United States",
      //     path: "/destination/united-states",
      //   },
      //   {
      //     id: 31,
      //     element: "United Kingdom",
      //     path: "/destination/united-kingdom",
      //   },
      //   {
      //     id: 32,
      //     element: "France",
      //     path: "/destination/france",

      //   },
      //   {
      //     id: 33,
      //     element: "Germany",
      //     path: "/destination/germany",
      //   },
      //   {
      //     id: 34,
      //     element: "United States",
      //     path: "/destination/united-states",
      //   },

      // ],

    },
    {
      id: 6,
      element: "Portal",
      path: "/portal",
      icon: MdFeaturedPlayList,
    }
  ];


  const formElement: NavElement[] = [
    {
      id: 1,
      element: "Key features ",
      path: "/contents/key-feature",
    },
    {
      id: 2,
      element: "Core Features ",
      path: "/contents/core-feature",
    },
    {
      id: 3,
      element: "Uni-Why Amphlo",
      path: "/contents/uni-why-amphlo-card",
    },
    {
      id: 4,
      element: "About Uni-Feature",
      path: "/contents/about-feature-card",
    },

  ]
  // Toggle dropdown
  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  // Check if the current path matches the item or any of its children
  const isActive = (element: NavElement) => {
    return (
      location.pathname === element.path ||
      (element.children &&
        element.children.some((child) => location.pathname === child.path))
    );
  };

  return (
    <div className="relative h-screen p-4">
      {/* Close Button in small screen */}
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl absolute top-4 right-4 lg:hidden"
      >
        <FaTimes />
      </button>

      <nav>
        <h1 className="text-2xl font-poppins text-gray-400 px-4 mt-2">Amphlo</h1>
        <h2 className="text-md lg:text-xl font-poppins text-gray-400 text-left mt-6">
          Pages
        </h2>
        {navElements.map((data) => {
          const IconComponent = data.icon;
          const isItemActive = isActive(data);
          const isDropdownOpen = openDropdownId === data.id;

          return (
            <div key={data.id}>
              <ul className="mt-2">
                <Link
                  to={data.path}
                  className={`text-gray-400 font-poppins py-2 px-2 hover:bg-gray-700 rounded flex justify-between items-center ${isItemActive ? "bg-gray-700" : ""
                    }`}
                  onClick={() => toggleDropdown(data.id)}
                >
                  <li className="flex flex-row justify-center items-center text-md">
                    {IconComponent && <IconComponent className="mr-2" />}
                    {data.element}
                  </li>
                  {data.children && (
                    <span>
                      {isDropdownOpen ? (
                        <MdOutlineArrowDropUp />
                      ) : (
                        <MdArrowDropDown />
                      )}
                    </span>
                  )}
                </Link>
                {data.children && isDropdownOpen && (
                  <ul className="pl-4">
                    {data.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.id}
                          to={child.path}
                          className={`text-gray-400 text-md font-poppins py-2 px-2 hover:bg-gray-700 rounded flex mt-2 ${isChildActive ? "bg-gray-700" : ""
                            }`}
                        >
                          <li>{child.element}</li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </ul>
            </div>
          );
        })}

        <div>
       
          <h2 className="text-md lg:text-xl font-poppins text-gray-400 text-left mt-6 mb-2">
            Contens
          </h2>
          <div>
            {
              formElement.map((item) => (
                <ul key={item.id} className="">
                  <Link
                    to={item.path}
                    className={`text-gray-400 font-poppins py-2 px-2 hover:bg-gray-700 rounded flex items-center mb-2 ${isActive(item) ? "bg-gray-700" : ""
                      }`}
                  >
                    {item.element}
                  </Link>
                </ul>
              ))
            }
          </div>
        </div>
        <div>
          <SecondaryButton
          onClick={handleLogout} 
          className="text-gray-300, bg-transparent w-full border-white mt-4">Logout</SecondaryButton>
        </div>
      </nav>
    </div>
  );
};

export default SideNavBar;