import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '@/context/AuthContext';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logOut } = UserAuth();

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Update the isLoggedIn state whenever the route changes
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [router.pathname]); // This will re-run the effect when the route changes

  // Function to handle logout (clear the token from localStorage and redirect to login)
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    if (user) {
      handleSignOut();
    }
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update the state immediately
    // Redirect to login
    router.push('/login');
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">TodoList</span>
          </div>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {isLoggedIn ? (
            <>
              <Link href="/home" className="mr-5 hover:text-gray-900">
                Home
              </Link>
              <Link href="/todos" className="mr-5 hover:text-gray-900">
                My Todos
              </Link>
              <button onClick={handleLogout} className="mr-5 hover:text-gray-900 cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-5 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="mr-5 hover:text-gray-900">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
