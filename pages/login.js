import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [googleSignInComplete, setGoogleSignInComplete] = useState(false);
    const { user, googleSignIn, logOut } = UserAuth();

    useEffect(() => {
        console.log("logout : ", logOut);
        console.log("Current User:", user);
        if (user && googleSignInComplete) {
            console.log("user in firebase : ", user.email);

            handleFirebase();
        }
    }, [user, googleSignInComplete]);

    const handleFirebase = async () => {
        try {
            const response = await fetch('http://localhost:3001/firebaseLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Firebase Login successful:', data);
                localStorage.setItem('token', data.finalToken);// Redirect or navigate to a different page upon successful login
                alert("Login Success");
                router.push("/home");
            } else {
                alert("Login Failed");
                console.error('Firebase Login failed:', data.error);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            setGoogleSignInComplete(true);
        } catch (error) {
            console.error('Google Sign-In failed:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data.message);
                localStorage.setItem('token', data.token);
                alert("Login Success");
                router.push("/home");
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Login
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account{' '}
                                <Link href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Register Here
                                </Link>
                            </p>
                        </form>
                        <button
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={handleGoogleSignIn}
                        >
                            Login using Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
