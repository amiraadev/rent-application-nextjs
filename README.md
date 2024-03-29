# Full Stack Rent Application with Next.js 14 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023
![Screenshot](/public/rent-app-screen-shot.png)

## Demo

Check out the live demo here : https://renting-app-nextjs.vercel.app/.

## Overview

This repository contains the source code for a Full Stack Airbnb Clone built with Next.js 14, featuring the App Router, React, Tailwind, Prisma, MongoDB, and NextAuth.


## Features

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms, and bathrooms
  - For example, filtering properties with reservations in the desired date range
- Favorites system
- Shareable URL filters
  - Share a URL with predefined filters for category, location, and date range
- Demonstrates how to write POST and DELETE routes in route handlers (app/api)
- Fetching data in server react components by directly accessing the database (WITHOUT API!)
- Handling files like error.tsx and loading.tsx, new Next 14 templating files for unified loading and error handling
- Managing relations between server and child components



## Setup .env file
Create a .env file in the root directory and add the following configuration:
```bash
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```
## Setup Prisma
```bash
npx prisma db push
```
## Start the app
```bash
npm run dev
```

