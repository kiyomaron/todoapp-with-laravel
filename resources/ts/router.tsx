import React, { useEffect } from "react"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    RouteProps,
    Navigate
  } from "react-router-dom"
import TaskPage from './pages/tasks'
import LoginPage from './pages/login'
import HelpPage from './pages/help'
import NotFoundPage from "./pages/error"
import { useLogout, useUser } from "./queries/AuthQuery"
import { useAuth } from "./hooks/AuthContext"

import { RouteAuthGuard } from "./RouteAuthGuard"
import { RouteAuthLogin } from "./RouteAuthLogin"

// import axios from "axios"

const Router = () => {
  const logout = useLogout()
  const { isAuth, setIsAuth } = useAuth()
  const { isLoading, data: authUser } = useUser()

  useEffect(() => {
    if (authUser) {
      setIsAuth(true)
    }
   }, [authUser])


  const navigation = (
    <header className="global-head">
      <ul>
        <li><Link to="/">ホーム</Link></li>
        <li><Link to="/help">ヘルプ</Link></li>
        <li onClick={() => logout.mutate()}><span>ログアウト</span></li>
      </ul>
      </header>
  )
  const loginNavigation = (
    <header className="global-head">
      <ul>
        <li><Link to="/help">ヘルプ</Link></li>
        <li><Link to="/login">ログイン</Link></li>
      </ul>
    </header>
  )

  if(isLoading) return <div className="loader"></div>

  return (
    <>
      <BrowserRouter>
        { isAuth ? navigation : loginNavigation }
        <Routes>
          <Route path="/help" element={<HelpPage />}/>
          <Route path="/login" element={
            <RouteAuthLogin component={<LoginPage />} redirect="/" />} />
          <Route path="/" element={
            <RouteAuthGuard component={<TaskPage />} redirect="/login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default Router;