# E-Commerce Next.js Application

## 🚀 Características Implementadas

### ✅ Autenticación y Autorización
- **NextAuth** con Google OAuth
- **Registro y login con email/contraseña** (usuarios normales)
- Sistema de **roles** (admin/user)
- Protección de rutas automática
- Roles asignados por email del administrador
- Contraseñas hasheadas con **bcryptjs**

### ✅ Internacionalización (i18n)
- Soporte multiidioma: **Español** e **Inglés**
- Traducciones completas en toda la aplicación
- Selector de idioma en la navbar

### ✅ Gestión de Productos
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Panel de administración exclusivo para admins
- Validación con **Yup**
- Integración con **Cloudinary** para imágenes

### ✅ Carrito de Compras
- Agregar/eliminar productos
- Actualizar cantidades
- Persistencia con **localStorage**
- Contador en tiempo real en la navbar

### ✅ Sistema de Emails
- Formulario de contacto funcional
- Email de recordatorio de carrito abandonado (1 minuto)
- Plantillas HTML personalizadas
- Integración con **Nodemailer**

### ✅ Componentes Reutilizables
- Button (con variantes: primary, secondary, outline, danger)
- Input, Textarea (con validación)
- Card (con efectos hover)
- ProductCard, ProductForm
- Layout, Navbar, Footer

### ✅ Notificaciones
- Sistema de notificaciones con **react-toastify**
- Reemplaza todos los alerts nativos
- Notificaciones para: CRUD de productos, carrito, contacto, autenticación

---

## 🔧 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Email (este usuario será admin)
ADMIN_EMAIL=arleipolo15@gmail.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 3. Ejecutar el Proyecto
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 👤 Sistema de Roles

### Admin
- Acceso al panel de administración (`/admin`)
- Crear, editar y eliminar productos
- Ver botón "Admin" en la navbar
- Email configurado en `ADMIN_EMAIL`

### Usuario Normal
- Registrarse con email y contraseña
- Iniciar sesión con email/contraseña o Google
- Ver productos y detalles
- Agregar productos al carrito
- Usar formulario de contacto
- Recibir emails de recordatorio de carrito

### Usuario No Autenticado
- Solo puede ver la página de inicio
- Ver formulario de registro y login
- Redirigido a `/auth/signin` al intentar acceder a rutas protegidas

---

## 📁 Estructura del Proyecto

```
Ecommerce/
├── public/
│   └── locales/
│       ├── es/
│       │   └── common.json
│       └── en/
│           └── common.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── Card.tsx
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductForm.tsx
│   │   └── cloudinary/
│   │       └── CloudinaryUpload.tsx
│   ├── contexts/
│   │   └── CartContext.tsx
│   ├── lib/
│   │   ├── cart.ts
│   │   ├── products.ts
│   │   ├── email.ts
│   │   └── cloudinary.ts
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth].ts
│   │   │   ├── products/
│   │   │   │   ├── index.ts
│   │   │   │   └── [id].ts
│   │   │   ├── contact.ts
│   │   │   └── cart/
│   │   │       └── reminder.ts
│   │   ├── products/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   ├── auth/
│   │   │   ├── signin.tsx
│   │   │   └── register.tsx
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   ├── contact.tsx
│   │   ├── cart.tsx
│   │   └── admin.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   ├── index.ts
│   │   └── next-auth.d.ts
│   └── utils/
│       ├── validationSchemas.ts
│       └── authSchemas.ts
├── .env
├── next.config.js
├── next-i18next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛣️ Rutas y Protección

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Página de inicio |
| `/auth/register` | Público | Registro con email/contraseña |
| `/auth/signin` | Público | Login con email/contraseña o Google |
| `/products` | Autenticado | Lista de productos |
| `/products/[id]` | Autenticado | Detalle de producto |
| `/cart` | Autenticado | Carrito de compras |
| `/contact` | Público | Formulario de contacto |
| `/admin` | Admin | Panel de administración |

---

## 🎨 Tecnologías Utilizadas

### Frontend
- **Next.js 14.2.0** (Pages Router)
- **TypeScript**
- **Tailwind CSS 3.4.3**
- **Formik 2.4.6**
- **Lucide React 0.378.0** (iconos)
- **react-toastify 10.0.5** (notificaciones)

### Backend/API
- **NextAuth 4.24.0** (autenticación)
- **bcryptjs** (hash de contraseñas)
- **Nodemailer 7.0.7** (emails)
- **Cloudinary 2.2.0** (imágenes)
- **Axios 1.7.0** (HTTP client)

### Validación y i18n
- **Yup 1.4.0** (validación)
- **next-i18next 15.3.0** (traducciones)

---

## 🔐 Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0
5. Autoriza estas URLs de redireccionamiento:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://tu-dominio.com/api/auth/callback/google` (producción)
6. Copia el Client ID y Client Secret al `.env`

---

## 📧 Configurar Email (Gmail)

1. Ve a tu cuenta de Google
2. Habilita la verificación en dos pasos
3. Genera una "Contraseña de aplicación"
4. Usa esa contraseña en `EMAIL_PASSWORD`

---

## ☁️ Configurar Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Ve al Dashboard
3. Copia el Cloud Name, API Key y API Secret
4. Pégalos en el `.env`

---

## 🧪 Testing de Funcionalidades

### Autenticación
- [ ] Registro con email/contraseña funciona
- [ ] Login con email/contraseña funciona
- [ ] Login con Google funciona
- [ ] Usuario admin ve el botón "Admin"
- [ ] Usuario normal no ve el botón "Admin"
- [ ] Rutas protegidas redirigen a signin
- [ ] Botón de "Registro" aparece cuando no estás autenticado

### Productos
- [ ] Admin puede crear productos
- [ ] Admin puede editar productos
- [ ] Admin puede eliminar productos
- [ ] Usuarios pueden ver productos
- [ ] Usuarios pueden agregar al carrito

### Carrito
- [ ] Agregar productos funciona
- [ ] Actualizar cantidad funciona
- [ ] Eliminar productos funciona
- [ ] Vaciar carrito funciona
- [ ] Email de recordatorio llega después de 1 minuto

### Notificaciones
- [ ] Toast aparece al crear producto
- [ ] Toast aparece al actualizar producto
- [ ] Toast aparece al eliminar producto
- [ ] Toast aparece al agregar al carrito
- [ ] Toast aparece en formulario de contacto

### i18n
- [ ] Cambiar idioma funciona
- [ ] Traducciones se aplican correctamente

---

## 🐛 Solución de Problemas Comunes

### Error: NextAuth no funciona
- Verifica que `NEXTAUTH_SECRET` esté configurado
- Genera uno nuevo: `openssl rand -base64 32`

### Error: Google OAuth falla
- Verifica que las URLs de redireccionamiento estén correctas
- Asegúrate de que el Client ID y Secret sean correctos

### Error: Emails no se envían
- Verifica que `EMAIL_PASSWORD` sea la contraseña de aplicación
- Revisa que el puerto 587 no esté bloqueado

### Error: Imágenes no cargan
- Verifica las credenciales de Cloudinary
- Asegúrate de que `remotePatterns` esté en `next.config.js`

---

## 📝 Notas Adicionales

- Los productos actualmente se almacenan en memoria (`src/lib/products.ts`)
- Para producción, considera usar una base de datos (MongoDB, PostgreSQL, etc.)
- El carrito usa localStorage, se pierde al cambiar de navegador
- El cron job de recordatorio se ejecuta en el cliente (considera un worker en producción)

---

## 🚀 Próximos Pasos

- [ ] Implementar base de datos
- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Historial de pedidos
- [ ] Búsqueda y filtros de productos
- [ ] Favoritos
- [ ] Reseñas y calificaciones

---

## 📞 Soporte

Para cualquier duda o problema, usa el formulario de contacto en `/contact`.

---

**¡Gracias por usar esta aplicación!** 🎉
