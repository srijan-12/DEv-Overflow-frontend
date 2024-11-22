import { Body } from "./Components/Body"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from "./Components/login"
import {Provider} from "react-redux"
import appStore from "./Utilities/store"
import { Feed } from "./Components/Feed"
import { backendBaseUrl } from "./Utilities/constants"
function App() {
  return (
   <>
   <Provider store={appStore}>
    <BrowserRouter basename="/api/user">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
   </>
  )
}

export default App
