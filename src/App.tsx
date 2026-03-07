import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed/Feed";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import NotFound from "./pages/notFound/NotFound";
import MainProtectedRoutes from "./components/protectedRoutes/MainProtectedRoutes";
import AuthProtectedRoutes from "./components/protectedRoutes/AuthProtectedRoutes";
import UserProfile from "./pages/userProfile/UserProfile";

const App = () => {
	const router = createBrowserRouter([
		{ path:"/" , element: <MainLayout/> , children:[
			{index:true , element: <MainProtectedRoutes> <Navigate to={"/home"} /></MainProtectedRoutes> },
			{path:"/home", element: <MainProtectedRoutes><Feed/></MainProtectedRoutes>},
			{path:"/userProfile", element: <MainProtectedRoutes><UserProfile/></MainProtectedRoutes>}
		]},

		{path:"/" , element: <AuthLayout/> , children:[
			{path:"/register" , element:<AuthProtectedRoutes><Register/></AuthProtectedRoutes>},
			{path:"/login" , element:<AuthProtectedRoutes><Login/></AuthProtectedRoutes>  }
		]},

		{path:"*" , element:<NotFound/>}
	])

	return <>
	       <RouterProvider  router={router} />
	       </>
};

export default App;



