import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactProvider, useContact } from './context/ContactContext';
import Contact from './views/Contact';
import AddContact from './views/AddContact';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { agendaSlug } = useContact();
  return (
    <nav className="navbar navbar-dark bg-primary">
      <span className="navbar-brand mb-0 h1">📇 Agenda de {agendaSlug}</span>
      <div>
        <a className="btn btn-light btn-sm me-2" href="/">Ver Contactos</a>
        <a className="btn btn-outline-light btn-sm" href="/add">Agregar</a>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ContactProvider>
      <Router>
        <div className="min-vh-100">
          <Navbar />
          <main className="container py-4">
            <Routes>
              <Route path="/" element={<Contact />} />
              <Route path="/add" element={<AddContact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ContactProvider>
  );
}

export default App;