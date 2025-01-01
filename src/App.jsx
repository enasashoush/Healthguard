import { Component } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Wishlist from './components/Wishlist/Wishlist';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ProductDetails from './components/Product Details/ProductDetails';
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import Categories from './components/Categories/Categories'
import { CartContextProvider } from './context/cartContext';
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authContext'
import { Offline } from 'react-detect-offline'
import NotFound from './components/notFound/notfound'

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Login /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'productDetails/:id/:category', element: <ProductDetails /> },
      { path: 'categories', element: <Categories /> },
      { path: 'categoryDetails/:id', element: <CategoryDetails /> },
      { path: 'wishlist', element: <Wishlist /> },
              { path: '*', element: <NotFound /> },
       ]
  }


])

export default class App extends Component {
  state = {}
  render() {
    let queryClient = new QueryClient();
    return <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>
      <Offline>
        <div className="bg-dark position-fixed text-white bottom-0 start-0 p-3 rounded-3">
          Ooops.... You Are Offline
        </div>
      </Offline>
    </>
  }
}


