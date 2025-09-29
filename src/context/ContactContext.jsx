import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const initialState = {
  contacts: [],
  loading: false,
  selectedContact: null,
  error: null,
  agendaSlug: 'fr33d0m'
};

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_CONTACTS: 'SET_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_SELECTED_CONTACT: 'SET_SELECTED_CONTACT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };
    case actionTypes.SET_SELECTED_CONTACT:
      return { ...state, selectedContact: action.payload };
    case actionTypes.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload], loading: false };
    case actionTypes.UPDATE_CONTACT:
      return { ...state, contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact), loading: false };
    case actionTypes.DELETE_CONTACT:
      return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload), loading: false };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const API_BASE_URL = 'https://playground.4geeks.com/contact';

  const makeRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      }
      return null;
    } catch (error) {
      if (error.name === 'SyntaxError') throw new Error('Respuesta del servidor no válida');
      if (error.name === 'TypeError' && error.message.includes('fetch')) throw new Error('Error de conexión. Verifica tu conexión a internet.');
      throw error;
    }
  };

  const initializeAgenda = useCallback(async (agendaSlug) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_ERROR });
    try {
      try {
        const data = await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`);
        const contacts = Array.isArray(data) ? data : (data.contacts || []);
        dispatch({ type: actionTypes.SET_CONTACTS, payload: contacts });
      } catch (error) {
        if (error.message.includes('404')) {
          await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}`, {
            method: 'POST',
            body: JSON.stringify({ name: 'Mi Agenda de Contactos' })
          });
          const data = await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`);
          const contacts = Array.isArray(data) ? data : (data.contacts || []);
          dispatch({ type: actionTypes.SET_CONTACTS, payload: contacts });
        } else throw error;
      }
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: `Error al inicializar la agenda: ${error.message}` });
    }
  }, []);

  const getContacts = async (agendaSlug = state.agendaSlug) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_ERROR });
    try {
      const data = await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`);
      const contacts = Array.isArray(data) ? data : (data.contacts || []);
      dispatch({ type: actionTypes.SET_CONTACTS, payload: contacts });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: `Error al obtener contactos: ${error.message}` });
    }
  };

  const getContactById = async (id, agendaSlug = state.agendaSlug) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_ERROR });
    try {
      const contact = await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts/${id}`);
      dispatch({ type: actionTypes.SET_SELECTED_CONTACT, payload: contact });
      return contact;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: `Error al obtener contacto: ${error.message}` });
    }
  };

  const createContact = async (contactData, agendaSlug = state.agendaSlug) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_ERROR });
    try {
      const newContact = await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts`, {
        method: 'POST',
        body: JSON.stringify(contactData)
      });
      dispatch({ type: actionTypes.ADD_CONTACT, payload: newContact });
      return newContact;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: `Error al crear contacto: ${error.message}` });
      throw error;
    }
  };

  const updateContact = async (id, contactData, agendaSlug = state.agendaSlug) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_ERROR });
    try {
      const updatedContact = await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(contactData)
      });
      dispatch({ type: actionTypes.UPDATE_CONTACT, payload: updatedContact });
      return updatedContact;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: `Error al actualizar contacto: ${error.message}` });
      throw error;
    }
  };

  const deleteContact = async (id, agendaSlug = state.agendaSlug) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.CLEAR_ERROR });
    try {
      await makeRequest(`${API_BASE_URL}/agendas/${agendaSlug}/contacts/${id}`, { method: 'DELETE' });
      dispatch({ type: actionTypes.DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: `Error al eliminar contacto: ${error.message}` });
      throw error;
    }
  };

  const setSelectedContact = useCallback((contact) => {
    dispatch({ type: actionTypes.SET_SELECTED_CONTACT, payload: contact });
  }, []);

  const clearSelectedContact = useCallback(() => {
    dispatch({ type: actionTypes.SET_SELECTED_CONTACT, payload: null });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  }, []);

  useEffect(() => {
    initializeAgenda(initialState.agendaSlug);
  }, []);

  const contextValue = {
    contacts: state.contacts,
    loading: state.loading,
    selectedContact: state.selectedContact,
    error: state.error,
    agendaSlug: state.agendaSlug,
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    setSelectedContact,
    clearSelectedContact,
    clearError
  };

  return <ContactContext.Provider value={contextValue}>{children}</ContactContext.Provider>;
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error('useContact debe ser usado dentro de un ContactProvider');
  return context;
};