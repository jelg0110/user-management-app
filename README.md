# User Management App (Angular 21 + Material MDC)

Este proyecto es una aplicación de gestión de usuarios construida con **Angular 21 Standalone Components** y **Angular Material (MDC)**.  

Permite visualizar una lista de usuarios con paginación, ver detalles de cada usuario y manejar una interfaz responsiva. Los datos de usuario se obtienen de forma **mockeada usando la API [Random User API](https://randomuser.me/api/)**.  

> Nota: Actualmente la autenticación y persistencia son simuladas; la app está diseñada para pruebas y demostración de Angular y Material.

---

## 🚀 Tecnologías y librerías

- Angular 21 (Standalone Components)
- Angular Material (MDC)
- Signals para manejo de estado reactivo
- Angular Router con navegación simulada
- SCSS con breakpoints y utilities
- API: [Random User API](https://randomuser.me/api/)

---

## 📁 Estructura del proyecto

```text
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts           # Simulación de login/logout y persistencia local
│   │   │   ├── user-detail.service.ts    # Servicio para compartir el usuario seleccionado
│   │   │   └── user.service.ts           # Peticiones a Random User API con paginación simulada
│   │   ├── guards/
│   │   │   ├── auth.guard.ts             # Protege rutas que requieren login
│   │   │   └── user-detail.guard.ts      # Redirige si no hay usuario seleccionado
│   │   └── interceptors/
│   │       ├── auth.interceptor.ts       # Manejo de headers o token (simulado)
│   │       └── error.interceptor.ts      # Manejo global de errores
│   ├── shared/
│   │   ├── pipes/
│   │   │   └── user-display-name.pipe.ts # Formatea nombre de usuario para header y lista
│   │   ├── utils/
│   │   │   └── form-error.util.ts        # Funciones para mostrar errores de formulario
│   │   └── components/
│   │       ├── header/                   # Header con avatar, nombre de usuario y menú
│   │       └── sidebar/                  # Sidebar responsivo con toggle
│   ├── features/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── login.component.ts    # Página de login con validación básica
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts    # Placeholder de dashboard para ruta raíz
│   │   └── users/
│   │       ├── user/                     # Detalle de usuario
│   │       │   └── user.component.ts     # Formulario deshabilitado para ver detalles
│   │       └── user-list/                # Lista de usuarios
│   │           ├── user-list.component.ts
│   │           └── user-table/           # Tabla de usuarios con paginación
│   │               └── user-table.component.ts
│   └── layouts/
│       ├── public-layout/                # Layout para login
│       └── private-layout/               # Layout con header + sidebar
└── assets/
    └── images/                           
└── styles/
    ├── themes/theme-colors.scss          # Generado con comando, contiene variables del tema
    ├── layout.scss                       # Estilos de layout global
    ├── spacing.scss                      # Utilidades para espaciados
    ├── responsive.scss                   # Breakpoints y clases responsivas
    └── utilities.scss                    # Helpers y utilidades generales
```

## 💻 Funcionalidades implementadas

### Login Page
- Formulario de login con validación básica (campos requeridos).
- Simula autenticación contra JSON estático con delay de 0.5s.
- Redirige a la lista de usuarios al hacer login.

### Header
- Muestra nombre de usuario (pipe `UserDisplayNamePipe`) y avatar genérico.
- Menú de usuario con opción de logout.

### Sidebar
- Toggle de apertura/cierre.
- Responsivo según ancho de pantalla (`MediaMatcher`).

### User List
- Contenedor (`user-list.component`) con tabla y control de búsqueda (toggle visual, filtros no implementados aún).
- Tabla (`user-table.component`) con:
  - Columnas: Avatar, Nombre, Usuario, Genero, Edad, Email, Teléfono.
  - Paginación con `MatPaginator`.
  - Spinner de carga mientras se obtienen datos.
  - Filas clicables para navegar al detalle del usuario.
  - Columnas responsivas según tamaño de pantalla.

### User Detail
- Componente (`user.component.ts`) basado en **formulario deshabilitado** para mostrar toda la información del usuario.
- Avatar grande y campos tipo formulario.
- Simula vista de edición, pero solo lectura actualmente.
- Guard para asegurar que no se accede a la vista sin usuario seleccionado.

### Servicios
- `AuthService`: Login/logout y persistencia simulada en localStorage.
- `UserService`: Obtiene usuarios desde Random User API, soporta cantidad de resultados y paginación simulada.
- `UserDetailService`: Comparte el usuario seleccionado entre lista y detalle.

### Pipes
- `UserDisplayNamePipe`: Formatea el nombre completo del usuario para mostrar en el header.

### Estado Reactivo
- Uso de **signals** para manejar:
  - Lista de usuarios
  - Loading
  - Paginación
  - Sidebar abierto/cerrado
  - Total de resultados

---

## ⚙ Diseño y estilos

- Variables de tema definidas en `theme-colors.scss`.
- Filas de la tabla alternan colores de fondo (gris claro y default).
- Sidebar responsivo
- Columnas responsivas que se muestran/ocultan según ancho de pantalla.
- Distribucion responsiva de inputs y avatar en User Detail
- Uso de SCSS modular con `@use` para layouts, spacing, responsive y utilities.

---

## 🛠 Funcionalidades pendientes / Bonus no implementado

- **Filtros/Search** en la lista de usuarios.
- **Validación avanzada** en login.
- **State Management (avanzado)** usando algo más allá de signals.
- **Directivas** personalizadas no implementadas.
- **Testing** de componentes y servicios.

---

## 📌 Cómo ejecutar

1. Instalar dependencias:

```
npm install
```

2. Levantar servidor de desarrollo:
```
ng serve
```

3. Abrir en navegador:
```
http://localhost:4200
```

---

## 📝 Decisiones de diseño y retos

- Uso de **signals** para un manejo de estado simple y reactivo.
- Sidebar que es persistente en desktop y flotante en móvil.
- Tabla responsiva que permite mostrar/ocultar columnas según breakpoints.
- Vista de detalle simulando formulario editable, implementada de forma responsiva.
- Persistencia de usuario seleccionado en memoria (`UserDetailService`) para evitar peticiones adicionales.
- Integración mínima con Random User API para cumplir con la prueba.

---

## 📄 Resumen de la prueba

- Login Page ✅
- User List Table ✅
- User Detail View ✅
- Signals ✅
- Services ✅
- Components ✅
- Pipes ✅
- `@if` y `@for` ✅
- `@Input` (no utilizado todavía) ❌
- `@Output` ✅
- Guards ✅
- Routing ✅
- Error Handling (parcial) ✅
- Loading Indicators ✅
- Responsiveness ✅
- Bonus (Search/Filter, Form Validation avanzada, State Management, Testing) ❌

## Live Demo

https://jelg0110.github.io/user-management-app/