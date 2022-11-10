import './App.css';
import LoginPage from './components/LoginPage';
import RegisterUsers from './components/RegisterUsers.js'
import Dashboard from './components/Dashboard';
import AddCourse from './components/AddCourse';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <div className="container">
            <Routes>
              <Route  path="/" exact element={<LoginPage/>} />
              <Route  path="/login" element={<LoginPage/>} />
              <Route  path="/register" exact element={<RegisterUsers/>} />
              <Route  path="/dashboard" element={<Dashboard/>} />
              <Route path="/add-course" element={<AddCourse/>}/>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
