import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import "monday-ui-style/dist/index.min.css";
import "monday-ui-react-core/tokens";
import './assets/styles/main.scss'

// import { store } from './store/store'
import { Home } from './pages/Home'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'
import { AppIndex } from './pages/AppIndex'
import { store } from './store/store'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AppIndex />} path="/board">
              {/* <Route element={<BoardSlector />} path='/' /> */}
              <Route element={<BoardDetails />} path=":boardId">
                <Route element={<TaskDetails />} path="task/:taskId" />
              </Route>
            </Route>
          </Routes>
        </main>
      </Router >
    </Provider>
  )
}
