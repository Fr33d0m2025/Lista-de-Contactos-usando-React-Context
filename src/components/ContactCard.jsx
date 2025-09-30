import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContact } from '../context/ContactContext';
import DeleteModal from './DeleteModal';

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  const { setSelectedContact } = useContact();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setSelectedContact(contact);
    navigate('/add');
  };

  return (
    <>
      <div className="card h-100" style={{aspectRatio: '2/1'}}>
        <div className="card-body p-2 h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-title mb-0 fw-bold text-truncate" style={{maxWidth: 'calc(100% - 60px)'}}>
              {contact.name}
            </h6>
            <div className="d-flex gap-1">
              <button type="button" className="btn btn-sm btn-outline-primary p-1" onClick={handleEdit} title="Editar">
                <i className="bi bi-pencil"></i>
              </button>
              <button type="button" className="btn btn-sm btn-outline-danger p-1" onClick={() => setShowModal(true)} title="Eliminar">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
          
          <div className="contact-info flex-grow-1 d-flex flex-column justify-content-center">
            {contact.phone && (
              <div className="mb-1">
                <small className="text-muted text-truncate d-block">
                  <i className="bi bi-telephone me-1"></i>
                  {contact.phone}
                </small>
              </div>
            )}
            
            {contact.email && (
              <div className="mb-1">
                <small className="text-muted text-truncate d-block">
                  <i className="bi bi-envelope me-1"></i>
                  {contact.email}
                </small>
              </div>
            )}
            
            {contact.address && (
              <div className="mb-1">
                <small className="text-muted text-truncate d-block">
                  <i className="bi bi-geo-alt me-1"></i>
                  {contact.address}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteModal show={showModal} onClose={() => setShowModal(false)} contact={contact} />
    </>
  );
};

export default ContactCard;