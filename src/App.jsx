import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PaymentForm from './pages/PaymentForm';
import Success from './pages/Success';
import Cancel from './pages/cancel';
import Redirect from './pages/Redirect'

 
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/paymentForm" element={<PaymentForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/redirect" element={<Redirect />} />
       

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
