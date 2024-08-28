import {LoginSignUpWrapper} from './components/wrapper/LoginSignUpWrapper';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ControlPlane, controlPlaneLoader } from './components/controlPlane/ControlPlane';
import { SecurePath } from './components/securePath/SecurePath';
import { LoginContextProvider } from './components/store/LoginContext';
import { Administration } from './components/administration/Adminsitration';
import { VideoLibrary, videoLoader } from './components/videoLibrary/VideoLibrary';
import { CounterApp } from './components/counterApp/CounterApp';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <LoginSignUpWrapper></LoginSignUpWrapper>
  },
  {
    path: '/welcome/:userName', 
    element: <SecurePath><ControlPlane></ControlPlane></SecurePath>, 
    loader: controlPlaneLoader,
    children: [
      {
        path: 'administration', 
        element: <Administration></Administration>, 
      },
      {
        path: 'videolibrary', 
        element: <VideoLibrary></VideoLibrary>, 
        loader: videoLoader,
      },
      {
        path: 'counterapp', 
        element: <CounterApp></CounterApp>, 
      }
    ]
  }
]);

function App() {

  return (
    <LoginContextProvider>
      <RouterProvider router={router}></RouterProvider>
   </LoginContextProvider>

  );
}

export default App
