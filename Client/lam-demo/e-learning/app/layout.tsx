'use client'
import React, { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hàm toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      const button = document.getElementById('user-menu-button');
      if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <html>
      <body>
        <div className="font-sans antialiased">
          {/* Navbar */}
          <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
              <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">F6</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>

              {/* Navbar Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">Course</a>
                
                <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">Contact</a>
              </div>

              {/* Search Input */}
              <div className="relative hidden md:block">
                <input
                  className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search..."
                />
                <div className="absolute right-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center text-sm bg-gray-800 text-white rounded-full focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                  onClick={toggleDropdown}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 ${dropdownOpen ? 'block' : 'hidden'}`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Mary Phiri</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">MaryPhiri@gmail.com</span>
                  </div>
                  <div className="py-2">
                    <a href="/profile_user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Sign out</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>
            <div className="container mx-auto py-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
