import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed/Feed";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
	const router = createBrowserRouter([
		{ path:"/" , element: <MainLayout/> , children:[
			{index:true , element: <Navigate to={"/home"} />},
			{path:"/home", element:<Feed/>}
		]},

		{path:"/" , element: <AuthLayout/> , children:[
			{path:"/register" , element:<Register/>},
			{path:"/login" , element:<Login/>}
		]},

		{path:"*" , element:<NotFound/>}
	])

	return <>
	       <RouterProvider  router={router} />
	       </>
};

export default App;



