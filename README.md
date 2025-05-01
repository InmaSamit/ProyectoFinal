# ProyectoFinal# 🧠 Aplicación de generar rutinas
Aplicación web para gestionar intereses, objetivos, tareas y rutinas semanales.  

---  
## 🔧 Tecnologías  
- **Frontend:** Angular, Bootstrap, Bootstrap Icons, RxJS  
- **Backend:** Node.js, Express.js  
- **Base de Datos:** MySQL
- **Autenticación:** JWT  

---  
## 🛠️ Configuración de la Base de Datos
1. Crear la base de datos:
```bash
mysql -u root -p -e "CREATE DATABASE rutinmas;"
```
2. Importar la estructura y datos iniciales:
````bash
mysql -u root -p rutinmas < bbdd.sql
````
---  
## 🚀 Instalación  
### Backend (back/)  
1. `cd back`  
2. `npm install`  
3. Crear `.env`:  
HOST=localhost
USER_DB=tu_usuario
PASS_DB=tu_contraseña
PORT_DB=4500
NAME_DB=nombre_db #ej.rutinmas
JWT_API_SECRET=tu_secreto

4. `node index.js` → http://localhost:4500  

### Frontend (front/)  
1. `cd front`  
2. `npm install`  
3. `ng serve` → http://localhost:4200  

---  
## 🧠 Funcionalidades  
### 🔐 Autenticación  
- Registro con: nombre, email, teléfono, contraseña  
- Login con JWT  

### 📌 Jerarquía  
1. **Intereses** (⭐)  
- Crear/eliminar  
- Ver objetivos asociados  

2. **Objetivos** (🎯)  
- Crear/eliminar por interés  
- Ver tareas asociadas  

3. **Tareas** (📋)  
- Crear/eliminar por objetivo  

4. **Rutinas** (🗓️ )  
- Asignar tareas a días/horas  
- Visualización semanal  

---  
## 🔗 Endpoints  
### Usuarios  
- `POST /register` - Registro  
- `POST /login` - Login  

### Intereses  
- `GET /` - Listar  
- `POST /` - Crear  
- `DELETE /:id` - Eliminar  

### Objetivos  
- `POST /` - Crear  
- `GET /interest/:id` - Listar por interés  
- `DELETE /:id` - Eliminar  

### Tareas  
- `POST /` - Crear  
- `GET /goal/:id` - Listar por objetivo  
- `DELETE /:id` - Eliminar  

### Rutinas  
- `POST /` - Crear  
- `GET /` - Listar  
- `DELETE /:id` - Eliminar  

---  