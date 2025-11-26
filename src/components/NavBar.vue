<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Logo -->
      <router-link id="icono" to="/" class="navbar-logo ms-5">
        <img class="logo" src="/logo.svg" alt="Logo" />
      </router-link>
        
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

      <!-- Enlaces centrados -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><router-link to="/" class="nav-link">Inicio</router-link></li>
          <li class="nav-item"><router-link to="/clientes" class="nav-link">Clientes</router-link></li>
          <li class="nav-item"><router-link to="/modelos" class="nav-link">Modelos</router-link></li>
          <li class="nav-item"><router-link to="/taller" class="nav-link"> Taller </router-link></li>
          <li class="nav-item"><router-link to="/ventas" class="nav-link">Ventas</router-link></li>
          <li class="nav-item"><router-link to="/noticias" class="nav-link">Noticias</router-link></li>
          <li class="nav-item"><router-link to="/contacto" class="nav-link">Contacto</router-link></li>
        </ul>
      </div>

      <!-- Dropdown de acceso/registro -->
      <div class="dropdown dropdown-collapse ms-5 me-5">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person fs-2"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <!-- Mostra "Acceso/Registro" se NON hai usuario logueado -->
          <li v-if="!isLogueado"><router-link class="dropdown-item" to="/login">Acceso</router-link></li>
          <li v-if="!isLogueado"><router-link class="dropdown-item" to="/clientes">Registro</router-link></li>
          <!-- Mostra "Cerrar Sesión" se está logueado -->
          <li v-if="isLogueado">
            <a class="dropdown-item" href="#" @click.prevent="logout">Cerrar Sesión</a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  // Estado do login
  const isLogueado = ref(false)
  const isAdmin = ref(false)
  const isUsuario = ref(false)
  const userName = ref('')

  // Cando o componente se monta, le localStorage (para cando montes a autenticación)
  onMounted(() => {
    isLogueado.value = localStorage.getItem('isLogueado') === 'true'
    isAdmin.value = localStorage.getItem('isAdmin') === 'true'
    isUsuario.value = localStorage.getItem('isUsuario') === 'true'
    userName.value = localStorage.getItem('userName') || ''
  })

  // Logout
  function logout() {
    // Borra datos de sesión do localStorage
    localStorage.removeItem('isLogueado')
    localStorage.removeItem('userName')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('isUsuario')

    // Actualiza estado
    isLogueado.value = false
    userName.value = ''

    // Redirixe ao inicio recargando a páxina
    window.location.href = '/'
  }
</script>

<style>
  .navbar-dark .nav-link {
    color: rgba(255, 255, 255, 0.9);
  }
  .navbar-dark .nav-link:hover,
  .navbar-dark .nav-link:focus {
    color: #fff;
  }

  .logo {
    width: 40%;
  }

  /* Ajustes para pantallas pequeñas */
    @media (max-width: 991.98px) {
      .navbar-nav {
        align-items: center;
      }
    }
</style>
