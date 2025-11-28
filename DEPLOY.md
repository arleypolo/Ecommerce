# Guía de Despliegue en Vercel

## 🚀 Pasos para Desplegar

### 1. Preparación del Repositorio

Asegúrate de que todos los archivos sensibles estén en `.gitignore`:
```bash
# Verifica que .env esté en .gitignore
cat .gitignore | grep .env
```

### 2. Subir a GitHub

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Preparado para desplegar en Vercel"

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Subir
git push -u origin main
```

### 3. Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

```env
# NextAuth
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=tu-secret-aqui

# Google OAuth
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# Admin Email
ADMIN_EMAIL=tu-email-admin@gmail.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=tu-email@gmail.com
EMAIL_SERVER_PASSWORD=tu-app-password
EMAIL_FROM=tu-email@gmail.com
```

### 4. Configurar Google OAuth para Vercel

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a "Credenciales"
4. Edita tu cliente OAuth
5. Agrega estas URLs autorizadas:
   - **Orígenes autorizados de JavaScript**:
     - `https://tu-dominio.vercel.app`
   - **URIs de redireccionamiento autorizadas**:
     - `https://tu-dominio.vercel.app/api/auth/callback/google`

### 5. Desplegar en Vercel

#### Opción A: Desde la interfaz de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en "Add New Project"
4. Importa tu repositorio
5. Vercel detectará automáticamente Next.js
6. Click "Deploy"

#### Opción B: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

### 6. Actualizar NEXTAUTH_URL

Después del primer despliegue:

1. Copia tu URL de Vercel (ej: `https://tu-app.vercel.app`)
2. Ve a Vercel → Settings → Environment Variables
3. Actualiza `NEXTAUTH_URL` con tu URL real
4. Redeploy el proyecto

---

## ⚠️ Notas Importantes

### Base de Datos en Memoria

⚠️ **IMPORTANTE**: Los usuarios registrados con email/contraseña se almacenan en **memoria** y se pierden con cada despliegue.

**Soluciones recomendadas:**

1. **MongoDB Atlas** (Recomendado)
   - Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Obtén tu connection string
   - Instala: `npm install mongodb mongoose`
   - Actualiza `src/lib/users.ts` para usar MongoDB

2. **Vercel Postgres**
   - Agrega Vercel Postgres a tu proyecto
   - Migra la lógica de usuarios a SQL

3. **Supabase**
   - Crea proyecto en [Supabase](https://supabase.com)
   - Usa su autenticación integrada

### Productos en Memoria

⚠️ Los productos también están en memoria (`src/lib/products.ts`).

Para producción, necesitas:
- Una base de datos real (MongoDB, PostgreSQL, etc.)
- Migrar las funciones CRUD a la BD

---

## 🔧 Troubleshooting

### Error: "Invalid callback URL"

**Solución**: Asegúrate de que la URL en Google OAuth coincida exactamente con tu dominio de Vercel.

### Error: "Session configuration is invalid"

**Solución**: Verifica que `NEXTAUTH_SECRET` y `NEXTAUTH_URL` estén configurados en Vercel.

### Los usuarios/productos desaparecen

**Esperado**: Están en memoria. Necesitas conectar una base de datos.

### Emails no se envían

**Solución**: Verifica que las variables `EMAIL_*` estén correctamente configuradas en Vercel.

### Imágenes de Cloudinary no cargan

**Solución**: 
1. Verifica `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
2. Asegúrate de que el dominio de Vercel esté permitido en Cloudinary

---

## 📝 Checklist de Despliegue

- [ ] `.env` en `.gitignore`
- [ ] Repositorio subido a GitHub
- [ ] Variables de entorno en Vercel
- [ ] Google OAuth URLs actualizadas
- [ ] Proyecto desplegado
- [ ] `NEXTAUTH_URL` actualizada con URL real
- [ ] Redeploy después de actualizar URL
- [ ] Probar login con Google
- [ ] Probar registro con email
- [ ] Probar funciones admin
- [ ] Probar carrito
- [ ] Probar emails

---

## 🎯 Próximos Pasos (Recomendado)

### 1. Conectar Base de Datos

Migrar de memoria a MongoDB:

```javascript
// Ejemplo: src/lib/db.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  return client.db('ecommerce');
}
```

### 2. Variables de Entorno Adicionales

```env
MONGODB_URI=mongodb+srv://...
DATABASE_URL=postgresql://... # Si usas PostgreSQL
```

### 3. Deploy Hooks

Configura webhooks para redesplegar automáticamente:
- Vercel → Settings → Git → Deploy Hooks

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica que todas las variables de entorno estén configuradas
3. Revisa la consola del navegador para errores

---

**¡Listo para desplegar!** 🚀
