import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetails from "./pages/BlogDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBlogs from "./pages/MyBlogs";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
     

        <Route
  path="/edit/:id"
  element={
    <ProtectedRoute>
      <EditBlog />
    </ProtectedRoute>
  }
/>
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

           <Route
  path="/my-blogs"
  element={
    <ProtectedRoute>
      <MyBlogs />
    </ProtectedRoute>
  }
/>

<Route
  path="/bookmarks"
  element={
    <ProtectedRoute>
      <Bookmarks />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;