import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Cart = lazy(() => import("./pages/cart/Cart.jsx"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const AdminRoute = lazy(() => import("./pages/Admin/AdminRoute"));
const Profile = lazy(() => import("./pages/User/Profile"));
const UserList = lazy(() => import("./pages/Admin/UserList"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList"));
const ProductList = lazy(() => import("./pages/Admin/ProductList"));
const AllProducts = lazy(() => import("./pages/Admin/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashbord.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Favorites = lazy(() => import("./pages/Products/Favorites.jsx"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Order = lazy(() => import("./pages/Orders/Order.jsx"));
const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
const OrderList = lazy(() => import("./pages/admin/OrderList.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        index={true}
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/favorite"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Favorites />
          </Suspense>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetails />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/shop"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Shop />
          </Suspense>
        }
      />

      {/* Registered users */}
      <Route
        path=""
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute />
          </Suspense>
        }
      >
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/placeorder"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Order />
            </Suspense>
          }
        />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute />
          </Suspense>
        }
      >
        <Route
          path="userlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <UserList />
            </Suspense>
          }
        />
        <Route
          path="categorylist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CategoryList />
            </Suspense>
          }
        />
        <Route
          path="productlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="allproductslist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AllProducts />
            </Suspense>
          }
        />
        <Route
          path="productlist/:pageNumber"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="product/update/:_id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductUpdate />
            </Suspense>
          }
        />
        <Route
          path="orderlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <OrderList />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
