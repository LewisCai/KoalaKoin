import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Course from './components/Course';
import Profile from './components/Profile';
import Test from './components/Test';

function App() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<Test />} />
        <Route path="course" element={<Course />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
    </>

  );
}

export default App;
