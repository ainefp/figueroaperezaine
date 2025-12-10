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
          <input type="password" id="password" autocomplete="new-password" class="form-control" v-model="pass" required />
        </div>

        <span v-if="cargando"> Cargando... </span>

        <div class="text-center">
          <button type="button" @click="iniciarSesion" class="btn btn-primary w-50">Iniciar sesión</button>
        </div>
      </form>
    </div>
    <!-- Lista de Vehiculos -->
    <div v-if="admin" class="">
      <div class="table-responsive my-5">
        <h4 class="text-center">Listado Vehículos</h4>
        <table class="table table-bordered table-striped table-hover table-sm align-middle">
          <thead class="table-primary">
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">Marca y Modelo</th>
              <th class="text-center">Año</th>
              <th class="text-center">Combustible</th>
              <th class="text-center">Color</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vehiculo, index) in vehiculosPaginados" :key="vehiculo.id || index">
              <th scope="row" class="text-center">{{ (currentPage - 1) * vehiculosPorPage + index + 1 }}</th>
              <td>{{ vehiculo.id }}</td>
              <td>{{ vehiculo.marca }}, {{ vehiculo.modelo }}</td>
              <td class="text-center">{{ vehiculo.anio }}</td>
              <td class="text-center">{{ vehiculo.combustible }}</td>
              <td class="text-center">{{ vehiculo.color }}</td>
              <td class="align-middle text-center">
                <button
                  @click="eliminarVehiculo(vehiculo.id)"
                  class="btn btn-danger btn-sm border-0 ms-4 me-2 shadow-none rounded-0"
                  title="Eliminar vehículo"
                  aria-label="Eliminar vehículo"
                >
                  <i class="bi bi-trash"></i>
                </button>
                <button
                  @click="editarVehiculo(vehiculo.id)"
                  class="btn btn-warning btn-sm border-0 shadow-none rounded-0"
                  title="Editar vehículo"
                  aria-label="Editar vehículo"
                >
                  <i class="bi bi-pencil"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Navegación de página -->
        <div class="d-flex justify-content-center my-3">
          <button class="btn btn-outline-primary btn-sm me-2 border-1 shadow-none"
            @click="beforePagina" :disabled="currentPage <= 1">
            <i class="bi bi-chevron-left "></i>
          </button>
          <span class="mx-3 align-self-center text-muted">Página {{ currentPage }}</span>
          <button class="btn btn-outline-primary btn-sm border-1 shadow-none"
            @click="nextPagina" :disabled="currentPage >= totalPages">
            <i class="bi bi-chevron-right "></i>
          </button>
        </div>
      </div>
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
