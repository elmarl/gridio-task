# Setup

To run the app, first install dependencies:

`npm i`

Then for development, run:

`npm run dev`.

it should now be running on `http://localhost:5173/`

# Data integration

I used DummyJSON for retrieving dummy user data for visualization. For retrieving the data, I used Axios (if further requests need to be made, the base URL is setup for it) and tanstack. Tanstack allows me to easily show if the data is still loading. I chose 10 minutes as stale time.

# Features

I implemented basic login with fake user data. The mocked user will be stored using Redux, making it accessible elsewhere in the app. After logging in, the user is taken from the login page to the dashboard. On the dashboard there is a navbar with logout button and when there is space, text saying the username of the currently logged in user.

I implemented basic routing using `react-router-dom`. To make sure that only logged in users can access the dashboard, I wrapped it using a custom `<ProtectedRoute>` component, it checks the redux store if the user is authenticated.

Below on the dashboard there is a bar chart made using Recharts, it fetches the data from the mock endpoint provided: https://dummyjson.com/c/9371-4923-495b-9217. I chose Recharts because I have used it before recently and it's well known. The chart allows the user to select a time frame to display. It calculates a moving average for additional information and can also show data for each point as a tooltip if the user hovers the mouse over it. I also implemented a basic date formatter for the time range selector so it would display `Jan 1` instead of `2024-01-01`.

The application is responsive.
