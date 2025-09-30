import React from 'react';
import { useContact } from '../context/ContactContext';
import ContactCard from '../components/ContactCard';

const Contact = () => {
  const { contacts, loading, error, clearError } = useContact();

  const handleRefresh = () => {
    clearError();
    window.location.reload();
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="mb-4">
            <h2>Lista de Contactos</h2>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={clearError}></button>
            </div>
          )}

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted">Cargando contactos...</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">
                  {contacts.length === 0 
                    ? 'No tienes contactos guardados' 
                    : `${contacts.length} ${contacts.length === 1 ? 'contacto' : 'contactos'} guardado${contacts.length === 1 ? '' : 's'}`
                  }
                </span>
                {contacts.length > 0 && (
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Actualizar
                  </button>
                )}
              </div>

              {contacts.length === 0 ? (
                <div className="text-center py-5">
                  <h4>No hay contactos</h4>
                  <p>Agrega tu primer contacto</p>
                </div>
              ) : (
                <div className="row g-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="col-12 col-md-6 col-lg-6 col-xl-4">
                      <ContactCard contact={contact} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;