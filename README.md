# Project Name - Train Seat Reservation System



## Description
This project aims to create a seat reservation system for a train coach using Next.js. The coach has a total of 80 seats, arranged in rows of 7 seats each, except for the last row which has only 3 seats. The system allows a user to reserve seats, prioritizing booking them in one row. If seats are not available in one row, then the nearby seats are booked. The user can reserve up to 7 seats at a time and can book as many tickets as desired until the coach is full. Please note that there is no login functionality implemented in this application.
## Live link -> <a href="https://nimble-zuccutto-53756e.netlify.app/">Live Link</a>
This project Built in Next.js 13.4, so backend also included in the same project Application under the `api` routes
## How to Use
1. Run the application and open it in your web browser.
2. On the homepage, you will see an input field where you can enter the required number of seats you want to reserve. For example, enter 2 or 4 or 6 or 1, etc.
3. After entering the number of seats, click on the "Reserve" button.
4. The system will attempt to book the requested number of seats, following the specified logic.
5. If the seats can be reserved, the system will display the seat numbers that have been booked for the user.
6. All seats in the coach will be displayed, indicating their availability status using colors, numbers, or any other suitable visualization method.

## Additional Information
- The Full-stack application is built using Next.js, a popular React framework for server-side rendering and building single-page applications.
- The logic for seat reservation follows the given problem description, ensuring that booking is done in one row if possible, and nearby seats are booked otherwise.
- The application does not support user authentication or login functionality. It assumes that all users can reserve seats without restrictions.
- The seat availability status will be updated dynamically based on the reservations made by users.
- The frontend interface such as changing the color scheme for visual representation of seat availability.

## Technologies Used
- Next.js
- React
- HTML
- CSS
- MongoDB

## Setup and Installation
1. Clone the project repository from GitHub.
2. Navigate to the project directory.
3. Install the required dependencies using a package manager like npm or yarn.
4. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
