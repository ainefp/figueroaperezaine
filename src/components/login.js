// DEBE QUEDAR CLARO QUE ESTA É UNHA SIMULACIÓN DE LOGIN PARA FINS DIDÁCTICOS CON JSON-SERVER
// EN NINGÚN CASO DEBE USARSE ESTA IMPLEMENTACIÓN EN PRODUCCIÓN
// PARA UNHA APLICACIÓN REAL, O LOGIN DEBE XESTIONARSE NO LADO DO SERVIDOR CON HTTPS Y JWT SEGURO
/*  JWT (JSON Web Token) es un estándar que permite transmitir información segura entre un cliente (frontend) 
y un servidor (backend) como un token firmado.
Cómo funciona:
1. Login: El usuario introduce DNI y contraseña.
2. Backend valida las credenciales.
3. Genera un token JWT que contiene datos como: id, nombre, tipo (admin o user) y un tiempo de expiración (exp).
4. El token se envía al frontend y se guarda en sessionStorage o localStorage.
5. Cada vez que el frontend hace una petición protegida, envía ese token en los headers (Authorization: Bearer <token>).
6. El backend verifica el token: si es válido y no expiró, concede acceso; si no, devuelve error.
Aunque un usuario pueda decodificar el token en el frontend y ver los datos (tipo, nombre, etc.), 
no puede modificarlo para actuar como admin porque:
El token está firmado con una clave secreta que solo el backend conoce.
Si alguien modifica el token, la firma ya no coincidirá y el backend lo rechazará.
Por eso, la seguridad real siempre reside en el backend, no en el token visible en el frontend. */

import Swal from 'sweetalert2';
import { loginUsuario } from "@/api/authApi.js";
import * as jwtDecode from 'jwt-decode';  // Importación de la librería jwt-decode de forma antigua
// de importación por eso el "* as" no funciona con "import jwtDecode from 'jwt-decode';"
// npm install jwt-decode  o  npm install jwt-decode@3.1.2

export default {
  name: "TablaLogin",
  data() {
    return {
      dni: "",
      pass: "",
    };
  },
  
  methods: {
    async iniciarSesion() {
      try {

        this.dni = this.dni.toUpperCase().trim();
        this.pass = this.pass.trim(); 
        if (this.dni === "" || this.pass === "") {
          Swal.fire({
            title: "Campos vacíos",
            text: "Por favor, complete ambos campos.",
            icon: "warning",
            confirmButtonText: "Aceptar"
          });
          return;
        }

        const data = await loginUsuario(this.dni, this.pass);
       
        
        // Guardar token y datos del usuario en sessionStorage o sessionStorage
        sessionStorage.setItem('token', data.token);
        //sessionStorage.setItem('userName', data.nombre);
        sessionStorage.setItem('isLogueado', 'true');

        // Decodificar el token JWT para obtener el tipo de usuario


        const decoded = jwtDecode.default(data.token);
        

        /*
        if (data.tipo === "admin") {
          sessionStorage.setItem('isAdmin', 'true');
        } else {
          sessionStorage.setItem('isUsuario', 'true');
        }
        */

        if (decoded.tipo === "admin") {
            sessionStorage.setItem('isAdmin', 'true');
            sessionStorage.setItem('userName', data.nombre);
            sessionStorage.setItem('isUser', 'false');
          } else {
            sessionStorage.setItem('isAdmin', 'false');
            sessionStorage.setItem('userName', data.nombre);
            sessionStorage.setItem('isUser', 'true');
          }

        Swal.fire({
          title: "Bienvenido",
          text: `Hola ${data.nombre}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000
        });
        // Redirigir a la página de inicio y recargar con $router
        // $router se usa para evitar problemas de historial en SPA
        // window.location.reload() recarga la página para reflejar el estado autenticado
        this.$router.push({ name: 'Inicio' }).then(() => window.location.reload());

      } catch (error) {
        console.error("Error en iniciarSesion:", error);
        Swal.fire({
          title: "Error de autenticación",
          text: "Error usuario o contraseña. Verifica tus credenciales.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      }
    },
  }
};