<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg min-height-75">
    <div class="container-fluid">
      <!-- Marca o logo -->
      <router-link id="icono" to="/" class="navbar-brand position-absolute ms-4"><img class="logo" src="/logo.svg" alt="Logo" /></router-link>

      <!-- Botón de hamburguesa en pantallas pequeñas -->
      <button
        id="btnPq"
        class="navbar-toggler position-absolute end-0 mx-3 me-5"
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
      <div class="collapse navbar-collapse justify-content-center align-items-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link"> Inicio </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/clientes" class="nav-link"> Clientes </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/noticias" class="nav-link"> Noticias </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/#" class="nav-link"> Modelos </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/#" class="nav-link"> Contacto </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style>
.navbar {
  min-height: 75px;
}

.navbar-dark .nav-link {
  color: rgba(255,255,255,0.9);
}

.navbar-dark .nav-link:hover,
.navbar-dark .nav-link:focus {
  color: #fff;
}

.logo {
  width: 45%;
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding: 1rem 0;
  }
  
  .navbar-nav {
    align-items: center;
  }
}
</style>
