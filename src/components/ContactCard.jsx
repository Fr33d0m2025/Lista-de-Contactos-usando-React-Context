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
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{contact.name}</h5>
          
          {contact.email && (
            <p className="card-text">
              <strong>Email:</strong> {contact.email}
            </p>
          )}
          
          {contact.phone && (
            <p className="card-text">
              <strong>Teléfono:</strong> {contact.phone}
            </p>
          )}
          
          {contact.address && (
            <p className="card-text">
              <strong>Dirección:</strong> {contact.address}
            </p>
          )}
          
          <div>
            <button type="button" className="btn btn-primary btn-sm me-2" onClick={handleEdit}>
              Editar
            </button>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => setShowModal(true)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <DeleteModal show={showModal} onClose={() => setShowModal(false)} contact={contact} />
    </>
  );
};

export default ContactCard;