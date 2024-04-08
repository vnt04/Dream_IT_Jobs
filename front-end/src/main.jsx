
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Router/Routers'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

