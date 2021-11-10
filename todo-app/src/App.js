import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyBoards from './pages/MyBoards';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import Startup from './pages/Startup';

export default function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<Startup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/my-boards' element={<MyBoards />} />
        </Routes>
      </Layout>
    </div>
  );
}
