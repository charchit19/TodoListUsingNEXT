/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    apiKey : process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain : process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    projectId : process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket : process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_measurementId,
    appId : process.env.NEXT_PUBLIC_FIREBASE_appId,
    measurementId : process.env.NEXT_PUBLIC_FIREBASE_measurementId
  },
};