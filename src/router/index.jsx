import { useRoutes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import Profile_Settings from "../pages/Profile_Settings";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import AnkapComponent from "../pages/ankapFolder";
import FakeUser from "../pages/FakeUser";
import FakeUsers from "../pages/FakeUsers";
import UserPosts from "../pages/FakeUser/UserPosts";
import PostComments from "../pages/FakeUser/PostComments";

const ROUTES = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/profile",
        element: <UserProfile />,
    },
    {
        path: "/settings",
        element: <Profile_Settings />,
    },
    {
        path: "/users",
        element: <Users />,
    },
    {
        path: "/users/:id",
        element: <Profile />,
    },
    {
        path: "/ankap-route",
        element: <AnkapComponent />,
    },
    {
        path: "/fake-users",
        element: <FakeUsers />,
    },
    {
        path: "/fake-users/:id",
        element: <FakeUser />,
    },
]

export default function Router() {
    return useRoutes(ROUTES);
}