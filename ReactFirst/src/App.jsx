import {LoginSignUpWrapper} from './components/wrapper/LoginSignUpWrapper';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ControlPlane, controlPlaneLoader } from './components/controlPlane/ControlPlane';
import { SecurePath } from './components/securePath/SecurePath';
import { LoginContextProvider } from './components/store/LoginContext';
import { Administration } from './components/administration/Adminsitration';
import { VideoLibrary, videoLoader } from './components/videoLibrary/VideoLibrary';
import { ProfileApp } from './components/profileApp/ProfileApp';
import { QuizApp } from './components/quizApp/QuizApp';

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
        element: <SecurePath><Administration></Administration></SecurePath>, 
      },
      {
        path: 'videolibrary', 
        element:<SecurePath> <VideoLibrary></VideoLibrary></SecurePath>,
        loader: videoLoader,
      },
      {
        path: 'counterapp', 
        element: <SecurePath><ProfileApp></ProfileApp></SecurePath>, 
      },
      {
        path: 'quizapp', 
        element: <SecurePath><QuizApp/></SecurePath>, 
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
