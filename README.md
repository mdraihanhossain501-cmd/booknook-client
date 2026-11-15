# BookNook

**Live site:** https://booknook-client-pearl.vercel.app

BookNook is a small online library. Add a book, borrow a book, return a book.

## Features

- Browse all books, with the latest arrivals and a Swiper slider on the home page
- Register and log in with email and password or with Google (Better Auth and MongoDB)
- Add your own books with a cover image uploaded to imgbb
- Edit or delete your books from My Books, with a confirmation modal before deleting
- Borrow a book for 7 days and return it from My Borrows, with live copy counts
- JWT-protected API routes, so you can only change your own data
- Loading spinners, toast messages, a custom 404 page and a responsive layout

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Swiper, Better Auth, MongoDB, Express, JWT

## Repositories

- Client: https://github.com/mdraihanhossain501-cmd/booknook-client
- Server: https://github.com/mdraihanhossain501-cmd/booknook-server

## Run Locally

1. Run `npm install`
2. Create a `.env.local` file with these variables: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_KEY`, `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
3. Run `npm run dev` and open http://localhost:3000