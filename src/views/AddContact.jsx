import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContact } from '../context/ContactContext';

const AddContact = () => {
  const navigate = useNavigate();
  const { selectedContact, createContact, updateContact, clearSelectedContact, loading, error, clearError } = useContact();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const isEditMode = selectedContact !== null;

  useEffect(() => {
    if (selectedContact) {
      setFormData({
        name: selectedContact.name || '',
        email: selectedContact.email || '',
        phone: selectedContact.phone || '',
        address: selectedContact.address || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', address: '' });
    }
    setValidationErrors({});
    clearError();
  }, [selectedContact]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [validationErrors]);

  const handlePhoneKeyPress = useCallback((e) => {
    const char = String.fromCharCode(e.which);
    const allowedChars = /[\d\+\s\-\(\)]/;
    if (!allowedChars.test(char) && e.which !== 8 && e.which !== 9 && e.which !== 46) {
      e.preventDefault();
    }
  }, []);

  const handlePhoneInput = useCallback((e) => {
    let value = e.target.value;
    value = value.replace(/[^\d\+\s\-\(\)]/g, '');
    if (value.length > 15) value = value.substring(0, 15);
    e.target.value = value;
    handleInputChange(e);
  }, [handleInputChange]);

  const handleNameKeyPress = useCallback((e) => {
    const char = String.fromCharCode(e.which);
    const allowedChars = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/;
    if (!allowedChars.test(char) && e.which !== 8 && e.which !== 9 && e.which !== 46) {
      e.preventDefault();
    }
  }, []);

  const handleNameInput = useCallback((e) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    if (value.length > 50) value = value.substring(0, 50);
    e.target.value = value;
    handleInputChange(e);
  }, [handleInputChange]);

  const handleEmailBlur = useCallback((e) => {
    const email = e.target.value.trim();
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setValidationErrors(prev => ({ ...prev, email: 'El formato del email no es válido (ejemplo: usuario@dominio.com)' }));
    }
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(formData.name.trim())) {
      errors.name = 'El nombre solo puede contener letras y espacios';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'El formato del email no es válido (ejemplo: usuario@dominio.com)';
      }
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'El teléfono debe contener solo números y puede incluir +, espacios, guiones y paréntesis (7-15 dígitos)';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await updateContact(selectedContact.id, formData);
      } else {
        await createContact(formData);
      }
      setFormData({ name: '', email: '', phone: '', address: '' });
      clearSelectedContact();
      navigate('/');
    } catch (error) {
      console.error('Error al guardar contacto:', error);
    }
  };

  const handleCancel = () => {
    clearSelectedContact();
    navigate('/');
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="mb-4">
            <h2>{isEditMode ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={clearError}></button>
            </div>
          )}

          <div className="card shadow">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleNameInput}
                    onKeyPress={handleNameKeyPress}
                    placeholder="Juan Pérez"
                    disabled={loading}
                    autoComplete="name"
                    minLength="2"
                    maxLength="50"
                  />
                  {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico *</label>
                  <input
                    type="email"
                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleEmailBlur}
                    placeholder="juan@ejemplo.com"
                    disabled={loading}
                    autoComplete="email"
                  />
                  {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    onKeyPress={handlePhoneKeyPress}
                    placeholder="+1 234 567 890"
                    disabled={loading}
                    autoComplete="tel"
                    maxLength="15"
                  />
                  {validationErrors.phone && <div className="invalid-feedback">{validationErrors.phone}</div>}
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Calle Principal, Ciudad, Estado"
                    rows="3"
                    disabled={loading}
                  />
                </div>

                <div>
                  <button type="button" className="btn btn-secondary me-2" onClick={handleCancel} disabled={loading}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Guardar')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;