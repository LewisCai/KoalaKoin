import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Course from './components/Course';
import Profile from './components/Profile';
import Test from './components/Test';
import TestResult from './components/TestResult';
import { TestResultProvider } from './TestResultContext';
import CompleteProfile from './components/CompleteProfile';


function App() {
  return (
    <TestResultProvider>    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<Test />} />
        <Route path="course" element={<Course />} />
        <Route path="profile" element={<Profile />} />
        <Route path="testresult" element={<TestResult />} /> {/* New result page */}
        <Route path="complete-profile" element={<CompleteProfile />} />

      </Route>
    </Routes>
    </TestResultProvider>

  );
}

export default App;
