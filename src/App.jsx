import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import "monday-ui-style/dist/index.min.css";
import "monday-ui-react-core/tokens";
import './assets/styles/main.scss'

import { Home } from './pages/Home'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './pages/TaskDetails'
import { AppIndex } from './pages/AppIndex'
import { store } from './store/store'
import { GroupList } from './cmps/GroupList';
import { Kanban } from './cmps/Kanban';
import { BoardList } from './pages/BoardList';
import { BoardActivity } from './pages/BoardActivity';


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AppIndex />} path="/board">
              <Route element={<BoardList />} path='' />
              <Route element={<BoardDetails />} path=":boardId">
                <Route element={<GroupList />} path="">
                  <Route element={<TaskDetails />} path="task/:taskId" />
                  <Route element={<BoardActivity />} path="activity_log" />
                </Route>
                <Route element={<Kanban />} path="views/kanban">
                  <Route element={<TaskDetails />} path="task/:taskId" />
                </Route>
              </Route>
            </Route>
          </Routes>
        </main>
      </Router >
    </Provider>
  )
}

{/* <Routes>
  <Route element={<Home />} path="/" />
  <Route element={<AppIndex />} path="/board">
    <Route element={<BoardList />} path="" />
    <Route element={<BoardDetails />} path=":boardId">
      <Route element={<BoardTable />} path="">
        <Route element={<TaskDetails />} path="task/:taskId" />
        <Route element={<ActivityLog />} path="activity_log" />
      </Route>
      <Route element={<BoardKanban />} path="views/kanban">
        <Route element={<TaskDetails />} path="task/:taskId" />
        <Route element={<ActivityLog />} path="activity_log" />
      </Route>
    </Route>
  </Route>
</Routes>  */}


