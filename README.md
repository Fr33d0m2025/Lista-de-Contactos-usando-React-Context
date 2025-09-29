# 📇 Lista de Contactos con React + Context API

Una aplicación CRUD completa para gestionar contactos usando React, Context API, Bootstrap y la API de 4Geeks Contact.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar contactos
- ✅ **Context API**: Gestión de estado global con React Context
- ✅ **React Router**: Navegación entre vistas
- ✅ **Bootstrap**: Diseño responsive y moderno
- ✅ **Validación**: Validación de formularios en tiempo real
- ✅ **Estados de Carga**: Indicadores de carga y manejo de errores
- ✅ **Modal de Confirmación**: Confirmación antes de eliminar contactos
- ✅ **API Externa**: Integración con la API de 4Geeks Contact

## 🛠️ Tecnologías Utilizadas

- **React 18** con hooks
- **Context API** para gestión de estado
- **React Router DOM** para navegación
- **Bootstrap 5** para estilos
- **Bootstrap Icons** para iconografía
- **Fetch API** para peticiones HTTP
- **Vite** como bundler

## 📦 Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes git instalado
   git clone <url-del-repositorio>
   cd contact-list-react-context
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── ContactCard.jsx      # Tarjeta individual de contacto
│   └── DeleteModal.jsx      # Modal de confirmación para eliminar
├── views/
│   ├── Contact.jsx          # Vista principal - Lista de contactos
│   └── AddContact.jsx       # Vista del formulario (crear/editar)
├── context/
│   └── ContactContext.jsx   # Context API con toda la lógica CRUD
├── App.jsx                  # Componente principal con routing
├── main.jsx                 # Punto de entrada de la aplicación
└── index.css                # Estilos globales y personalizados
```

## 🔧 Funcionalidades

### 1. **Gestión de Contactos**
- **Ver todos los contactos** en una vista de tarjetas
- **Agregar nuevo contacto** con validación de campos
- **Editar contacto existente** con formulario pre-llenado
- **Eliminar contacto** con modal de confirmación

### 2. **Campos del Contacto**
- **Nombre completo** (obligatorio)
- **Correo electrónico** (obligatorio, con validación de formato)
- **Teléfono** (obligatorio)
- **Dirección** (opcional)

### 3. **Validaciones**
- Campos obligatorios marcados con *
- Validación de formato de email
- Mensajes de error específicos por campo
- Prevención de envío con datos inválidos

### 4. **Estados de la Aplicación**
- **Loading**: Indicadores de carga durante operaciones
- **Error**: Manejo y visualización de errores
- **Éxito**: Confirmación de operaciones exitosas

## 🔄 Flujo de la Aplicación

### **Inicialización**
1. La aplicación se conecta a la API de 4Geeks
2. Crea o accede a la agenda personal (`mi_agenda_2024`)
3. Carga todos los contactos existentes

### **Crear Contacto**
1. Usuario hace clic en "Agregar Contacto"
2. Se abre el formulario en modo creación
3. Usuario completa los datos requeridos
4. Al guardar, se envía POST a la API
5. Se actualiza la lista y se regresa a la vista principal

### **Editar Contacto**
1. Usuario hace clic en el botón de editar (✏️) en una tarjeta
2. Se guarda el contacto en el estado global
3. Se navega al formulario con datos pre-llenados
4. Al guardar, se envía PUT a la API
5. Se actualiza la lista y se regresa a la vista principal

### **Eliminar Contacto**
1. Usuario hace clic en el botón de eliminar (🗑️)
2. Se abre un modal de confirmación
3. Al confirmar, se envía DELETE a la API
4. El contacto se elimina de la lista

## 🌐 API Utilizada

- **Base URL**: `https://playground.4geeks.com/contact`
- **Documentación**: https://playground.4geeks.com/contact/docs
- **Agenda**: `mi_agenda_2024` (personalizable en el código)

### Endpoints utilizados:
- `POST /agendas/{agenda_slug}` - Crear/inicializar agenda
- `GET /agendas/{agenda_slug}/contacts` - Obtener contactos
- `POST /agendas/{agenda_slug}/contacts` - Crear contacto
- `PUT /agendas/{agenda_slug}/contacts/{id}` - Actualizar contacto
- `DELETE /agendas/{agenda_slug}/contacts/{id}` - Eliminar contacto

## 🎨 Diseño

- **Bootstrap 5** para componentes y grid system
- **Bootstrap Icons** para iconografía consistente
- **Responsive design** que funciona en móviles y desktop
- **Colores**: Esquema de colores Bootstrap con personalizaciones
- **Animaciones**: Transiciones suaves y efectos hover

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🔍 Conceptos Técnicos Implementados

### **Context API**
- **Estado Global**: Todos los contactos y estados de la app
- **Funciones CRUD**: Centralizadas en el contexto
- **Manejo de Errores**: Estado de error global
- **Loading States**: Estados de carga centralizados

### **React Hooks**
- `useState`: Estado local en componentes
- `useEffect`: Efectos secundarios y ciclo de vida
- `useContext`: Consumo del contexto
- `useReducer`: Manejo complejo del estado global

### **React Router**
- Navegación entre vistas
- Parámetros de URL
- Protección de rutas

## 🐛 Solución de Problemas

### **Error de CORS**
Si encuentras errores de CORS, es normal en desarrollo. La API de 4Geeks permite peticiones desde localhost.

### **Contactos no se cargan**
1. Verifica la conexión a internet
2. Revisa la consola del navegador para errores
3. Confirma que la API esté funcionando

### **Formulario no se envía**
1. Verifica que todos los campos obligatorios estén llenos
2. Confirma que el email tenga formato válido
3. Revisa la consola para errores de validación

## 🔮 Posibles Mejoras Futuras

- [ ] **Búsqueda y filtros** de contactos
- [ ] **Paginación** para listas grandes
- [ ] **Importar/Exportar** contactos (CSV, JSON)
- [ ] **Fotos de perfil** para contactos
- [ ] **Categorías/Tags** para organizar contactos
- [ ] **Favoritos** para contactos importantes
- [ ] **Modo oscuro** para la interfaz
- [ ] **Notificaciones** push para recordatorios
- [ ] **Sincronización** con calendario
- [ ] **Compartir contactos** por QR o enlace

## 📚 Recursos de Aprendizaje

- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [React Router](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [4Geeks Contact API](https://playground.4geeks.com/contact/docs)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta gestionando tus contactos! 📇✨**



