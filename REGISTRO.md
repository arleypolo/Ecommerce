# 📝 Guía de Registro de Usuarios

## 🎯 Resumen

Ahora la aplicación cuenta con un sistema completo de registro y autenticación con dos opciones:

1. **Registro con Email y Contraseña** (Nuevo)
2. **Login con Google OAuth** (Existente)

---

## 🆕 ¿Qué se agregó?

### Archivos Nuevos

1. **`src/lib/users.ts`**
   - Base de datos en memoria para usuarios
   - Funciones CRUD para usuarios
   - Hash de contraseñas con bcryptjs
   - Validación de credenciales

2. **`src/utils/authSchemas.ts`**
   - Schema de validación Yup para registro
   - Schema de validación Yup para login
   - Validación de emails, contraseñas, y confirmación

3. **`src/pages/api/auth/register.ts`**
   - API endpoint para registrar nuevos usuarios
   - Validación de datos con Yup
   - Manejo de errores

4. **`src/pages/auth/register.tsx`**
   - Página de registro con formulario
   - Validación en tiempo real
   - Redirección automática a login después del registro
   - Notificaciones con toast

### Archivos Modificados

1. **`src/pages/api/auth/[...nextauth].ts`**
   - Agregado `CredentialsProvider` para login con email/contraseña
   - Integración con la función `validatePassword` de users.ts

2. **`src/pages/auth/signin.tsx`**
   - Formulario de login con email/contraseña
   - Mantiene el botón de Google OAuth
   - Link al registro
   - Estados de carga separados para cada método

3. **`src/components/layout/Navbar.tsx`**
   - Botón de "Registro" visible cuando no estás autenticado
   - Botones "Registro" y "Login" juntos

4. **`src/types/next-auth.d.ts`**
   - Extendido el tipo `User` para incluir el role

---

## 🚀 Cómo Usar

### Para Usuarios Nuevos

1. **Ir a la página de registro**
   - Click en el botón "Registro" en la navbar
   - O navegar a `/auth/register`

2. **Llenar el formulario**
   - Nombre completo
   - Email
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña

3. **Crear cuenta**
   - Click en "Crear cuenta"
   - Esperar confirmación (toast verde)
   - Serás redirigido automáticamente a la página de login

4. **Iniciar sesión**
   - Usa tu email y contraseña registrados
   - O usa Google si prefieres

### Para Usuarios Existentes (Google)

- Pueden seguir usando Google OAuth sin cambios
- No necesitan registrarse nuevamente

### Para Admins

- Si tu email está en `ADMIN_EMAIL` (.env), automáticamente tendrás rol admin
- Funciona tanto para registro con email como con Google

---

## 🔒 Seguridad

### Contraseñas
- **Hash**: Todas las contraseñas se hashean con bcryptjs (10 rounds)
- **No se guardan en texto plano**
- **Validación**: Mínimo 6 caracteres

### Validación
- Email válido requerido
- No se permiten duplicados de email
- Confirmación de contraseña obligatoria
- Validación del lado del servidor y cliente

### Roles
- Los usuarios normales se registran automáticamente con rol "user"
- Los admins se asignan por email configurado en `.env`
- No se puede auto-asignar el rol admin

---

## 📋 Flujos de Trabajo

### Flujo de Registro
```
1. Usuario visita /auth/register
2. Completa el formulario
3. Click "Crear cuenta"
4. POST a /api/auth/register
5. Se validan los datos (Yup)
6. Se hashea la contraseña (bcrypt)
7. Se crea el usuario en memoria
8. Respuesta exitosa
9. Toast de confirmación
10. Redirección a /auth/signin
```

### Flujo de Login (Credenciales)
```
1. Usuario visita /auth/signin
2. Ingresa email y contraseña
3. Click "Iniciar sesión"
4. NextAuth valida con CredentialsProvider
5. Se verifica la contraseña (bcrypt.compare)
6. Se crea la sesión
7. Se asigna el rol
8. Redirección a /
```

### Flujo de Login (Google)
```
1. Usuario visita /auth/signin
2. Click "Continúa con Google"
3. OAuth con Google
4. NextAuth recibe los datos
5. Se asigna el rol
6. Redirección a /
```

---

## 🧪 Testing

### Probar Registro
```bash
# 1. Ir a /auth/register
# 2. Registrar usuario:
Nombre: Juan Pérez
Email: juan@example.com
Contraseña: test123
Confirmar: test123

# 3. Verificar toast de éxito
# 4. Verificar redirección a /auth/signin
```

### Probar Login
```bash
# 1. Ir a /auth/signin
# 2. Login con credenciales:
Email: juan@example.com
Contraseña: test123

# 3. Verificar toast de éxito
# 4. Verificar redirección a /
# 5. Verificar que aparece el nombre en navbar
```

### Probar Admin
```bash
# 1. Registrar usuario con email del .env (ADMIN_EMAIL)
# 2. Login
# 3. Verificar botón "Admin" en navbar
# 4. Acceder a /admin
# 5. Verificar acceso a CRUD de productos
```

---

## ⚠️ Notas Importantes

### Base de Datos en Memoria
- Los usuarios se guardan en **memoria RAM**
- Se pierden al reiniciar el servidor
- Para producción: usar MongoDB, PostgreSQL, etc.

### Limitaciones Actuales
- No hay recuperación de contraseña
- No hay verificación de email
- No hay cambio de contraseña
- No hay perfil de usuario

### Próximas Mejoras Recomendadas
- [ ] Conectar a una base de datos real
- [ ] Implementar "Olvidé mi contraseña"
- [ ] Verificación de email con código
- [ ] Página de perfil de usuario
- [ ] Cambio de contraseña
- [ ] Validación de fortaleza de contraseña
- [ ] Límite de intentos de login
- [ ] Sesiones persistentes

---

## 🎨 Experiencia de Usuario

### Navbar
- **No autenticado**: Botones "Registro" y "Login"
- **Autenticado**: Nombre del usuario y botón "Cerrar sesión"
- **Admin**: Botón adicional "Admin"

### Formularios
- **Validación en tiempo real**
- **Mensajes de error específicos**
- **Indicadores de carga**
- **Notificaciones toast**

### Seguridad Visual
- **Campos de contraseña ocultos**
- **Iconos intuitivos** (Mail, Lock, User)
- **Colores según estado** (error, success)

---

## 🔧 Configuración Adicional

No se requiere configuración adicional. El sistema funciona con las variables de entorno existentes:

```env
ADMIN_EMAIL=tu-email-admin@gmail.com
NEXTAUTH_SECRET=tu-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 📞 Soporte

Si tienes dudas sobre el sistema de registro:
1. Revisa esta guía
2. Verifica los schemas de validación en `src/utils/authSchemas.ts`
3. Revisa los errores en la consola del navegador
4. Verifica los errores en la consola del servidor

---

**¡El sistema de registro está listo para usar!** 🎉

Puedes crear usuarios normales y empezar a probar todas las funcionalidades de la aplicación.
