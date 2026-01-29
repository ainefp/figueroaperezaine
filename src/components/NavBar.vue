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

      <!-- Barra de búsqueda -->
      <div class="ms-2">
        <form class="d-flex ms-auto" role="search" @submit.prevent="buscar">
          <input
            class="form-control form-control-sm me-1 rounded-1"
            type="search"
            placeholder="Buscar..."
            aria-label="Buscar"
            v-model="query"
            style="width: 140px;"
          />
          <button class="btn btn-light btn-sm rounded-1" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>

      <!-- Enlaces centrados -->
      <div class="collapse navbar-collapse me-5" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><router-link to="/" class="nav-link">Inicio</router-link></li>
          <li v-if="admin" class="nav-item"><router-link to="/clientes" class="nav-link">Clientes</router-link></li>
          <li v-if="admin" class="nav-item"><router-link to="/modelos" class="nav-link">Modelos</router-link></li>
          <li v-if="admin" class="nav-item"><router-link to="/taller" class="nav-link"> Taller </router-link></li>
          <li class="nav-item"><router-link to="/ventas" class="nav-link">Ventas</router-link></li>
          <li class="nav-item"><router-link to="/noticias" class="nav-link">Noticias</router-link></li>
          <li class="nav-item"><router-link to="/contacto" class="nav-link">Contacto</router-link></li>
        </ul>
      </div>

      <!-- Cesta de la Compra -->
       <router-link to="/cesta" class="btn btn-primary position-relative ms-5 me-4" title="Cesta">
        <i class="bi bi-cart3 fs-4"></i>
        <!-- Nº de productos -->
         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
         v-if="cesta.totalItems > 0"
          >
          {{ cesta.totalItems }}
         </span>
       </router-link>

      <!-- Dropdown de acceso/registro -->
      <div class="dropdown dropdown-collapse me-5">
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
          <li v-if="isLogueado"><router-link class="dropdown-item" :to="`/perfil?movil=${userMovil}`">Perfil</router-link></li>
          <li v-if="isLogueado"><a class="dropdown-item" href="#" @click.prevent="logout">Cerrar Sesión</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCestaStore } from '@/store/cesta.js';

  const router = useRouter();
  const query = ref('');
  const cesta = useCestaStore();

  // Estado do login
  const isLogueado = ref(false);
  const isAdmin = ref(false);
  const isUser = ref(false);
  const userName = ref('');
  const userMovil = ref('');

  const admin = sessionStorage.getItem('isAdmin') === 'true';

  function buscar() {
    if (!query.value.trim()) return;

    router.push({
      name: 'BusCar',
      query: { q: query.value.trim() }
    })

    query.value = '';
  }

  // Cando o componente se monta, le sessionStorage (para cando montes a autenticación)
  onMounted(() => {
    isLogueado.value = sessionStorage.getItem('isLogueado') === 'true';
    isAdmin.value = sessionStorage.getItem('isAdmin') === 'true';
    isUser.value = sessionStorage.getItem('isUser') === 'true';
    userName.value = sessionStorage.getItem('userName') || '';
    userMovil.value = sessionStorage.getItem('userMovil') || '';
  })

  // Logout
  function logout() {
    // Borra datos de sesión do sessionStorage
    sessionStorage.removeItem('isLogueado');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isUser');
    sessionStorage.removeItem('userMovil');

    // Actualiza estado
    isLogueado.value = false;
    userName.value = '';

    // Redirixe ao inicio recargando a páxina
    window.location.href = '/';
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
