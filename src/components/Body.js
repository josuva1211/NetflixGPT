import Login from './Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';



const Body = () => {
  const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/browse",
        element: <Browse />
    },
  ])

  return (
    <div>
        <RouterProvider router={AppRouter} />
    </div>
  )
}

export default Body