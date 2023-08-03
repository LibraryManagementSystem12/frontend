import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import AddBook from './pages/AddBook';
import ListBooks from './pages/ListBooks';
import BooksPage from './pages/BooksPage';
import SingleBook from './pages/SingleBook';
import BorrowBook from './pages/BorrowBook';
import ListBorrowings from './pages/ListBorrowings';
import PaymentPage from './pages/PaymentPage';
import Profile from './pages/Profile';
import AddCd from './pages/AddCd';
import CdPage from './pages/CdPage';
import SingleCd from './pages/SingleCd';
import BorrowCd from './pages/BorrowCD';
import HomePage from './pages/HomePage';
import ListCd from './pages/ListCd';
import Admin from './pages/Admin';
import AdminProfile from './pages/AdminProfile';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/listbooks" element={<ListBooks />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/singlebook/:id" element={<SingleBook />} />
          <Route path="/borrowbook/:id" element={<BorrowBook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listborrowings" element={<ListBorrowings />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/addcd" element={<AddCd />} />
          <Route path="/cd" element={<CdPage />} />
          <Route path="/singlecd/:id" element={<SingleCd />} />
          <Route path="/borrowcd/:id" element={<BorrowCd />} />
          <Route path="/listcd" element={<ListCd />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
