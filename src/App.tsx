import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed/Feed";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import NotFound from "./pages/notFound/NotFound";
import MainProtectedRoutes from "./components/protectedRoutes/MainProtectedRoutes";
import AuthProtectedRoutes from "./components/protectedRoutes/AuthProtectedRoutes";
import UserProfile from "./pages/userProfile/UserProfile";
import FriendProfile from "./pages/friendProfile/FriendProfile";
import Bookmarked from "./pages/bookmarked/Bookmarked";
import NotificationPage from "./pages/mobilePages/NotificationPage";
import FollowedUsersPosts from "./pages/followedUsersPosts/FollowedUsersPosts";
import NotificationsData from "./pages/notificationsData/NotificationsData";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <MainProtectedRoutes>
              {" "}
              <Navigate to={"/home"} />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/home",
          element: (
            <MainProtectedRoutes>
              <Feed />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/userProfile",
          element: (
            <MainProtectedRoutes>
              <UserProfile />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/profile/:userProfileId",
          element: (
            <MainProtectedRoutes>
              <FriendProfile />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/bookmarkedPosts",
          element: (
            <MainProtectedRoutes>
              <Bookmarked />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/notificationsPage",
          element: (
            <MainProtectedRoutes>
              <NotificationPage />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/followedUsers",
          element: (
            <MainProtectedRoutes>
              <FollowedUsersPosts />
            </MainProtectedRoutes>
          ),
        },
        {
          path: "/notificationData/:postId",
          element: (
            <MainProtectedRoutes>
              <NotificationsData />
            </MainProtectedRoutes>
          ),
        },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/register",
          element: (
            <AuthProtectedRoutes>
              <Register />
            </AuthProtectedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthProtectedRoutes>
              <Login />
            </AuthProtectedRoutes>
          ),
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <div className="bg-blue-100 dark:bg-slate-800 min-h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
