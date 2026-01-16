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
  import * as jwtDecode from 'jwt-decode';
  import { getArticulos } from '@/api/articulos';

  export default {

    name: "TablaLogin",

    data() {
      return {
        dni: "",
        pass: "",
        token: "admin",
        cargando: false,
        admin: false,
        vehiculos: [],
        numVehiculos: 0,
        currentPage: 1,
        vehiculosPorPage: 10,
      };
    },
    
    computed: {
      vehiculosPaginados() {
        const start = (this.currentPage - 1) * this.vehiculosPorPage;
        const end = start + this.vehiculosPorPage;
        return this.vehiculos.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.numVehiculos / this.vehiculosPorPage);
      }
    },

    methods: {
      async cargarVehiculos() {
        try {
          const data = await getArticulos();
          this.vehiculos = data;
          this.numVehiculos = data.length;
          this.currentPage = 1;
        } catch (error) {
          console.error('Error al cargar los vehículos:', error);
        }
      },

      async eliminarVehiculo(id) {
        // Lógica para eliminar vehículo
        console.log('Eliminar vehículo con ID:', id);
      },

      async editarVehiculo(id) {
        // Lógica para editar vehículo
        console.log('Editar vehículo con ID:', id);
      },

      async iniciarSesion() {
        try {
          this.cargando = true;
          this.dni = this.dni.toUpperCase().trim();
          this.pass = this.pass.trim();
          if (this.dni === "" || this.pass === "") {
            Swal.fire({
              title: "Campos vacíos",
              text: "Por favor, complete todos los campos.",
              icon: "warning",
              confirmButtonText: "Aceptar"
            });
            this.cargando = false;
            return;
          }

          const data = await loginUsuario(this.dni, this.pass, this.token);

          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('isLogueado', 'true');

          const decoded = jwtDecode.default(data.token);

          if (decoded.tipo === "admin") {
            sessionStorage.setItem('isAdmin', 'true');
            sessionStorage.setItem('userName', data.nombre);
            sessionStorage.setItem('isUser', 'false');
            this.admin = true;
          } else {
            sessionStorage.setItem('isAdmin', 'false');
            sessionStorage.setItem('userName', data.nombre);
            sessionStorage.setItem('isUser', 'true');
            this.admin = false;
          }

          Swal.fire({
            title: "Bienvenido",
            text: `Hola ${data.nombre}`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          });
          this.$router.push({ name: 'Inicio' }).then(() => window.location.reload());

        } catch (error) {
          console.error("Error en iniciarSesion:", error);
          Swal.fire({
            title: "Error de autenticación",
            text: "Error usuario o contraseña. Verifica tus credenciales.",
            icon: "error",
            confirmButtonText: "Aceptar"
          });
        } finally {
          this.cargando = false;
        }
      },

      beforePagina() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPagina() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    },

    mounted() {
      this.cargarVehiculos();
      this.currentPage = 1;
      // Si quieres, puedes comprobar aquí si es admin
      this.admin = sessionStorage.getItem('isAdmin') === 'true';
    }
  };
