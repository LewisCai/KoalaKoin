import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Course from './components/Course';
import Questions from './components/Questions';
import Profile from './components/Profile';

function App() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="questions" element={<Questions />} />
        <Route path="course" element={<Course />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
    </>

  );
}

export default App;
