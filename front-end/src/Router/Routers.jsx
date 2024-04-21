import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Jobs from '../Pages/Jobs';
import Company from '../Pages/Company';
import Blog from '../Pages/Blog';
import Forum from '../Pages/Forum';
import ProfileCV from '../Pages/ProfileCV';
import Home from '../Pages/Home'
const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/viec-lam-it',
          element: <Jobs/>
        },
        {
          path: '/cong-ty-it',
          element: <Company/>
        },
        {
          path: '/blog',
          element: <Blog/>
        },
        {
          path: '/dien-dan',
          element: <Forum/>
        },
        {
          path: '/ho-so-CV',
          element: <ProfileCV/>
        },
    ]
  },
]);

export default router;