import React from "react"
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom"
import TaskPage from './pages/tasks'
import LoginPage from './pages/login'
import HelpPage from './pages/help'

const Router = () => {
    return (
        <BrowserRouter>
          <header className="global-head">
                <ul>
                    <li><Link to="/">ホーム</Link></li>
                    <li><Link to="/help">ヘルプ</Link></li>
                    <li><Link to="/login">ログイン</Link></li>
                    <li><span>ログアウト</span></li>
                </ul>
            </header>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/help" element={<HelpPage />}/>
              <Route path="/" element={<TaskPage />}/>
            </Routes>
        </BrowserRouter>
      );
}


export default Router;