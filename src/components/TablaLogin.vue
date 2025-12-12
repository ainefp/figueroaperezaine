<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-75 mt-5">
    <div class="text-center mb-4">
      <h5 class="fw-bold text-uppercase text-primary position-relative d-inline-block">
        <i class="bi bi-people-fill me-2 fs-3"></i>
        Iniciar sesión
        <span class="underline-effect"></span>
      </h5>
    </div>

    <div class="border p-4 shadow-sm rounded w-100" style="max-width: 400px;">
      <form>
        <div class="mb-3">
          <label for="dni" class="form-label fw-bold">DNI:</label>
          <input type="text" id="dni" autocomplete="off" class="form-control text-center" v-model="dni" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Contraseña:</label>
          <input type="password" id="password" autocomplete="new-password" class="form-control" v-model="password" required />
        </div>

        <span v-if="cargando"> Cargando... </span>

        <div class="text-center">
          <button type="button" @click="iniciarSesion" class="btn btn-primary w-50">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Swal from 'sweetalert2';
  import { loginUsuario } from "@/api/authApi.js";
  import * as jwtDecode from 'jwt-decode';

  export default {
    name: "TablaLogin",
    data() {
      return {
        dni: "",
        password: "",
      };
    },
    
    methods: {
      async iniciarSesion() {
        try {

          this.dni = this.dni.toUpperCase().trim();
          this.password = this.password.trim(); 
          if (this.dni === "" || this.password === "") {
            Swal.fire({
              title: "Campos vacíos",
              text: "Por favor, complete ambos campos.",
              icon: "warning",
              confirmButtonText: "Aceptar"
            });
            return;
          }

          const data = await loginUsuario(this.dni, this.password);
        
          // Guardar token y datos del usuario en sessionStorage o sessionStorage
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('isLogueado', 'true');

          // Decodificar el token JWT para obtener el tipo de usuario
          const decoded = jwtDecode.default(data.token);

          if (decoded.tipo === "admin") {
              sessionStorage.setItem('isAdmin', 'true');
              sessionStorage.setItem('isUser', 'false');
              sessionStorage.setItem('userName', data.nombre);
              sessionStorage.setItem('userMovil', data.movil);
            } else {
              sessionStorage.setItem('isAdmin', 'false');
              sessionStorage.setItem('isUser', 'true');
              sessionStorage.setItem('userName', data.nombre);
              sessionStorage.setItem('userMovil', data.movil);
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
        }
      },
    }
  };
</script>

<style>
  .form-label {
    background-color: transparent !important;
    margin-bottom: 0.5rem;
  }
</style>
