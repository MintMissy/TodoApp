import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import MyBoards from './pages/MyBoards';
import Settings from './pages/Settings';
import Startup from './pages/Startup';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<Startup />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/my-boards' element={<MyBoards />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
