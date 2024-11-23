import { Body } from "./Components/Body"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from "./Components/login"
import {Provider} from "react-redux"
import appStore from "./Utilities/store"
import { Feed } from "./Components/Feed"
import { Profile } from "./Components/Profile"
import { CreatePost } from "./Components/CreatePost"
import { EditPost } from "./Components/EditPost"
function App() {
  return (
   <>
   <Provider store={appStore}>
    <BrowserRouter basename="/api/user">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/createpost" element={<CreatePost/>}/>
        <Route path="/updatepost/:id" element={<EditPost/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
   </>
  )
}

export default App
