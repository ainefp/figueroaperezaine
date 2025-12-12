<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
    <div class="container-fluid">
      <!-- Marca o logo -->
      <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="/src/assets/logo.svg" style="height: 30px" />
      </a>
      <!-- Botón de hamburguesa en pantallas pequeñas -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links de navegación -->
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul class="navbar-nav d-flex justify-content-center w-80">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/clientes" class="nav-link">Clientes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/noticias" class="nav-link">Noticias</router-link>
          </li>

          <li class="nav-item">
            <router-link to="#" class="nav-link">Ventas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/modelos" class="nav-link">Modelos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/citas-taller" class="nav-link"
              >Taller</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link">Contacto</router-link>
          </li>
        </ul>
      </div>
      <!-- Dropdown de acceso/registro -->
      <div class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person fs-4"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <!-- Mostra “Acceso/Registro” se NON hai usuario logueado -->
          <li v-if="!isLogueado">
            <router-link class="dropdown-item" to="/login">Acceso</router-link>
          </li>
          <li v-if="!isLogueado">
            <router-link class="dropdown-item" to="/clientes"
              >Registro</router-link
            >
          </li>
          <!-- Mostra “Cerrar Sesión” se está logueado -->
          <li v-if="isLogueado">
            <router-link class="dropdown-item" to="/clientes"
              >Perfil</router-link
            >
          </li>
          <li v-if="isLogueado">
            <a class="dropdown-item" href="#" @click.prevent="logout"
              >Cerrar Sesión</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Estado do login
const isLogueado = ref(false);
const userName = ref("");
const isUser = ref(false);
const isAdmin = ref(false);

// Cando o componente se monta, lee sessionStorage (para cando montes a autenticación)
onMounted(() => {
  isLogueado.value = sessionStorage.getItem("isLogueado") === "true";
  userName.value = sessionStorage.getItem("userName") || "";
  isAdmin.value = sessionStorage.getItem("isAdmin") === "true";
  isUser.value = sessionStorage.getItem("isUser") === "true";
});

// Logout
function logout() {
  // Borra datos de sesión do sessionStorage
  sessionStorage.removeItem("isLogueado");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("isAdmin");
  sessionStorage.removeItem("isUser");
  sessionStorage.removeItem("token");

  // Actualiza estado
  isLogueado.value = false;
  userName.value = "";

  // Redirixe ao inicio recargando a páxina
  window.location.href = "/";
}
</script>

<style>
.navbar-dark .nav-link {
  color: rgba(255, 255, 255, 0.9); /* blanco suave */
}

.navbar-dark .nav-link:hover,
.navbar-dark .nav-link:focus {
  color: #fff; /* blanco intenso al pasar el ratón */
}
</style>
