# Mini Dashboard

## About the App
This is a **Mini Dashboard** that displays user data in a table format, allowing users to perform **CRUD operations** (Create, Read, Update, Delete). The application features modals for submitting user information and confirmation dialogs for actions such as deletion.

## Features
- **Responsive Table:** Displays user data fetched from [jsonplaceholder.org/users](https://jsonplaceholder.org/).
- **Search Functionality:** Filter user data by name or email.
- **Loading States:**
  - Skeleton loading effect while fetching table data.
  - Spinner animation for button actions.
- **CRUD Operations:**
  - **Add** a new user.
  - **Update** existing user details.
  - **Delete** a user with confirmation.
- **Pagination:**
  - Displays **10 users per page** for better data handling.
- **Consistent Branding:**
  - Uses **IBCSCorp favicon** for a professional look.
  - Uniform styling across the application.

## Tech Stack
### **Libraries & Modules Used**
- **[React with TypeScript](https://react.dev/):** Strongly typed frontend development.
- **[Vite](https://vitejs.dev/):** Fast build tool for the app.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first styling framework.
- **[React Hot Toast](https://react-hot-toast.com/):** Flash messages for user feedback.
- **[React Icons](https://react-icons.github.io/react-icons/):** Provides an icon set.
- **[Zustand](https://zustand-demo.pmnd.rs/):** State management.
- **[Axios](https://axios-http.com/):** Asynchronous data fetching.
- **[Helmet](https://www.npmjs.com/package/react-helmet):** SEO optimization and dynamic page titles.

## Getting Started
### **Installation & Setup**

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Olalekankin/userTable-dashboard.git
   cd userTable-dashboard
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm run dev
   ```
   The app should now be running at `http://localhost:5173/`.



## Usage
- **View Users:** Data is automatically fetched and displayed in a table.
- **Search:** Use the search bar to filter users by name or email.
- **Add User:** Click the **Add User** button to open a form modal.
- **Edit User:** Click the **Edit** icon next to a user to modify their details.
- **Delete User:** Click the **Delete** icon and confirm the action in the modal.
- **Pagination:** Use the **Next** and **Previous** buttons to navigate pages.

## License
This project is licensed under the **MIT License**.

---
Made with ❤️ by **Olalekan**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/olalekankin)

