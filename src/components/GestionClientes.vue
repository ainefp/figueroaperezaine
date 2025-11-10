<template>
  <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light">
    <h4 class="text-center my-1 mb-4 bg-primary-subtle py-1">Gestión de Clientes</h4>
    
    <!-- Formulario -->
<form @submit.prevent="guardarCliente" class="container mt-4">
  <!-- DNI y Fecha de Alta -->
  <div class="row mb-3 align-items-center">
    <div class="col-auto">
      <label for="dni" class="form-label mb-0">DNI:</label>
    </div>
    <div class="col">
      <div class="input-group">
        <input
          type="text"
          id="dni"
          class="form-control"
          v-model="nuevoCliente.dni"
          @blur="validarDni"
          :class="{ 'is-invalid': !dniValido }"
          required
        />
        <button type="button" class="btn btn-outline-secondary" @click="buscarClientePorDNI(nuevoCliente.dni)">
          <i class="bi bi-search"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary" @click="recargaForm()">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      <div v-if="!dniValido" class="invalid-feedback d-block">
        DNI o NIE inválido.
      </div>
    </div>

    <div class="col-auto">
      <label for="fechaAlta" class="form-label mb-0">Fecha de Alta:</label>
    </div>
    <div class="col">
      <input
        type="date"
        id="fechaAlta"
        class="form-control"
        v-model="nuevoCliente.fechaAlta"
      />
    </div>
  </div>

  <!-- Nombre y Apellidos -->
  <div class="row mb-3 align-items-center">
    <div class="col-auto">
      <label for="nombre" class="form-label mb-0">Nombre:</label>
    </div>
    <div class="col">
      <input
        type="text"
        id="nombre"
        class="form-control"
        v-model="nuevoCliente.nombre"
        @blur="capitalizarTexto('nombre')"
        required
      />
    </div>
    <div class="col-auto">
      <label for="apellidos" class="form-label mb-0">Apellidos:</label>
    </div>
    <div class="col">
      <input
        type="text"
        id="apellidos"
        class="form-control"
        v-model="nuevoCliente.apellidos"
        @blur="capitalizarTexto('apellidos')"
        required
      />
    </div>
  </div>

  <!-- Email, Móvil y Tipo de Cliente en la misma línea con labels a la izquierda -->
<div class="row mb-3 align-items-center">
  <!-- Email -->
  <div class="col-md-4 d-flex align-items-center">
    <label for="email" class="form-label mb-0 me-2">Email:</label>
    <input
      type="email"
      id="email"
      class="form-control"
      v-model="nuevoCliente.email"
      @blur="validarEmail"
      :class="{ 'is-invalid': !emailValido }"
      required
    />
  </div>

  <!-- Móvil -->
  <div class="col-md-4 d-flex align-items-center">
    <label for="movil" class="form-label mb-0 me-2">Móvil:</label>
    <input
      type="tel"
      id="movil"
      class="form-control"
      v-model="nuevoCliente.movil"
      @blur="validarMovil"
      :class="{ 'is-invalid': !movilValido }"
    />
  </div>

  <!-- Tipo de Cliente -->
  <div class="col-md-4 d-flex align-items-center">
    <label class="form-label mb-0 me-2">Tipo de cliente:</label>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="tipocliente"
        v-model="nuevoCliente.tipoCliente"
        value="particular"
      />
      <label class="form-check-label" for="tipocliente">Particular</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="tipocliente2"
        v-model="nuevoCliente.tipoCliente"
        value="empresa"
      />
      <label class="form-check-label" for="tipocliente2">Empresa</label>
    </div>
  </div>
</div>



  <!-- Dirección, Provincia y Municipio -->
  <div class="row mb-3 align-items-center">
    <div class="col-auto">
      <label for="direccion" class="form-label mb-0">Dirección:</label>
    </div>
    <div class="col">
      <input
        type="text"
        id="direccion"
        class="form-control"
        v-model="nuevoCliente.direccion"
        @blur="capitalizarTexto('direccion')"
      />
    </div>
    <div class="col-auto">
      <label for="provincia" class="form-label mb-0">Provincia:</label>
    </div>
    <div class="col">
      <select
        id="provincia"
        class="form-select"
        v-model="nuevoCliente.provincia"
        @change="filtrarMunicipios"
      >
        <option disabled value="">Seleccione provincia</option>
        <option v-for="prov in provincias" :key="prov.id" :value="prov.nm">{{ prov.nm }}</option>
      </select>
    </div>
    <div class="col-auto">
      <label for="municipio" class="form-label mb-0">Municipio:</label>
    </div>
    <div class="col">
      <select
        id="municipio"
        class="form-select"
        v-model="nuevoCliente.municipio"
      >
        <option disabled value="">Seleccione municipio</option>
        <option v-for="mun in municipiosFiltrados" :key="mun.id" :value="mun.nm">{{ mun.nm }}</option>
      </select>
    </div>
  </div>

  <!-- Términos y condiciones centrado -->
<div class="row mb-3 justify-content-center">
  <div class="col-auto">
    <div class="form-check text-center">
      <input
        class="form-check-input"
        type="checkbox"
        id="condiciones"
        v-model="nuevoCliente.lopd"
        required
      />
      <label class="form-check-label" for="condiciones">
        Acepto los términos y condiciones establecidos en
        <router-link
          :to="{ path: '/aviso-legal' }"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aviso Legal
        </router-link>
      </label>
    </div>
  </div>
</div>

<!-- Botón Guardar centrado -->
<div class="row mb-3 justify-content-center">
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">
      {{ editando ? 'Modificar' : 'Guardar' }}
    </button>
  </div>
</div>

<!-- Histórico alineado a la derecha -->
<div class="row mb-3 justify-content-end">
  <div class="col-auto">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="historico"
        v-model="mostrarHistorico"
        @change="cargarClientes"
      />
      <label class="form-check-label" for="historico">Histórico</label>
    </div>
  </div>
</div>

</form>


    <!-- Lista de Clientes -->
    <div class="table-responsive">
      <h4 class="text-center">Listado Clientes</h4>
      <table class="table table-bordered table-striped table-hover table-sm align-middle"> <!--  w-100  -->
        <thead class="table-primary">
          <tr >
            <th class="text-center">ID</th>
            <th class="text-center">Apellidos</th>
            <th class="text-center">Nombre</th>
            <th class="text-center">Móvil</th>
            <th class="text-center">Municipio</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientesPaginados" :key="cliente.id || index" >
            <th scope="row" class="text-center">{{ (currentPage - 1) * clientesPorPage + index + 1 }}</th>
            <td >{{ cliente.apellidos }}</td>
            <td >{{ cliente.nombre }}</td>
            <td class="text-center">{{ cliente.movil }}</td>
            <td class="text-center">{{ cliente.municipio }}</td>
            <td class="align-middle text-center">
              <button
                @click="eliminarCliente(cliente.movil)"
                class="btn btn-danger btn-sm border-0 ms-4 me-2 shadow-none rounded-0"
                title="Eliminar cliente"
                aria-label="Eliminar cliente"
              >
                <i class="bi bi-trash"></i>
              </button>
              <button
                @click="editarCliente(cliente.movil)"
                class="btn btn-warning btn-sm border-0 shadow-none rounded-0"
                title="Editar cliente"
                aria-label="Editar cliente"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                v-if="cliente.historico === false"
                @click="activarCliente(cliente)"
                class="btn btn-secondary btn-sm ms-2 border-0 shadow-none rounded-0"
                title="Activar cliente"
              >
                <i class="bi bi-person-check"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Navegación de página -->
        <div class="d-flex justify-content-center my-3">
          <button class="btn btn-outline-primary btn-sm me-2 border-1 shadow-none" 
            @click = "beforePagina" :disabled="currentPage <= 1">
            <i class="bi bi-chevron-left "></i>
          </button>
          <span class="mx-3 align-self-center text-muted">Página {{ currentPage  }}</span>
          <button class="btn btn-outline-primary btn-sm border-1 shadow-none" 
            @click="nextPagina" :disabled="currentPage >= totalPages">
            <i class="bi bi-chevron-right "></i>
          </button>
       </div>
    </div>
  </div>
</template>


<script setup>
  import { ref, onMounted, computed } from 'vue';
  import provmuniData from '@/data/provmuni.json';
  import { getClientes, getClientePorDni, addCliente, updateCliente, deleteCliente } from '@/api/clientes.js';
  import Swal from 'sweetalert2';

  //////////////////////////////////////////////////////////////
  //  SCRIPTS CRUD (consultar, agregar, eliminar, modificar)  //
  //////////////////////////////////////////////////////////////

  // Declaración de variables
    const nuevoCliente = ref({
      dni: '',
      nombre: '',
      apellidos: '',
      email: '',
      movil: '',
      direccion: '',
      provincia: '',
      municipio: '',
      fechaAlta: '',
      historico: true,
      lopd: false,
      tipo: "user",
      tipoCliente: 'particular',
    });

    const editando = ref(false);  // Estado de edición para el formulario
    const clienteEditandoId = ref(null);
    const mostrarHistorico = ref(false);
    const clientes = ref([]);  // Aray de clientes cargados desde la API
    const numclientes = ref(0);  // Número de clientes para paginación
    const currentPage = ref(1);  // Página actual para paginación
    const clientesPorPage = 10;

  // Cargar clientes al momento de compartirlo
    onMounted(async () => {
      cargarClientes();
      currentPage.value = 1;
    })

    const cargarClientes = () => {
      getClientes(mostrarHistorico.value).then(data => {
        clientes.value = data;
        numclientes.value = data.length;  // Actualiza el nº total de clientes
        currentPage.value = 1;  // Reiniciar a la 1era página al cargar
      })
      Swal.fire({
        icon: 'success',
        title: "Listando Clientes...",
        showConfirmButton: false,
        timer: 1500
        });
    }

  // Consultar Clientes
    const buscarClientePorDNI = async (dni) => {
      if (!dni || dni.trim() === '') {
        Swal.fire({
          icon: 'warning',
          title: 'Debe introducir un DNI antes de buscar.',
          timer: 1500,
          showConfirmButton: false
        });
        return;
      }

      try {
        const cliente = await getClientePorDni(dni.trim().toUpperCase());

        if (!cliente) {
          Swal.fire({
            icon: 'info',
            title: 'Cliente no encontrado',
            text: 'No existe ningún cliente con ese DNI.',
            timer: 1500,
            showConfirmButton: false
          });
          return;
        }

        nuevoCliente.value = { ...cliente };
        nuevoCliente.value.fechaAlta = formatearFechaParaInput(cliente.fechaAlta);

        // Actualiza lista de municipios si cambia la provincia
        filtrarMunicipios();
        nuevoCliente.value.municipio = cliente.municipio;
        
        editando.value = true;
        clienteEditandoId.value = cliente.id;

        Swal.fire({
          icon: 'success',
          title: 'Cliente encontrado y cargado',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error buscando cliente por DNI:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al buscar cliente',
          text: 'Verifique la conexión o contacte con el administrador.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }

  // Agregar Cliente
    const guardarCliente = async () => {
      if (!editando.value) {
        const duplicado = clientes.value.find(cliente =>
          cliente.dni === nuevoCliente.value.dni ||
          cliente.movil === nuevoCliente.value.movil ||
          cliente.email === nuevoCliente.value.email
        );
        if (duplicado) {
          Swal.fire({
            icon: 'error',
            title: 'DNI, móvil o email duplicados',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }
      }
      
      // Confirmación antes de guardar
      const result = await Swal.fire({
        title: editando.value ? '¿Desea modificar este cliente?' : '¿Desea grabar este cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: editando.value ? 'Modificar' : 'Grabar',
        cancelButtonText: 'Cancelar'
      });

      if (!result.isConfirmed) return;
      //  cliente.fecha_alta = formatearFechaParaInput(cliente.fecha_alta);
      try {
        if (editando.value) {
          // Modificar cliente (PUT)+
          const clienteActualizado = await updateCliente(clienteEditandoId.value, nuevoCliente.value);
          
          // Actualiza el cliente en la lista local
          const index = clientes.value.findIndex(c => c.id === clienteEditandoId.value);
          if (index !== -1) clientes.value[index] = clienteActualizado;
          Swal.fire({
            icon: 'success',
            title: 'Cliente modificado',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          // Agregar cliente (POST)
          const clienteAgregado = await addCliente(nuevoCliente.value);
          clientes.value.push(clienteAgregado);
          Swal.fire({
            icon: 'success',
            title: 'Cliente agregado',
            showConfirmButton: false,
            timer: 1500
          });
        }
        
        clienteEditandoId.value = null;

        // Reset validaciones si tienes (dniValido, movilValido, etc)
        dniValido.value = true;
        movilValido.value = true;
        emailValido.value = true;

        // Refrescar lista completa (opcional)
        clientes.value = await getClientes();

      } catch (error) {
        console.error('Error al guardar cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar cliente',
          text: 'Inténtelo de nuevo o contacte con el administrador.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    };

  // Eliminar Cliente
    const eliminarCliente = async (movil) => {
      // Refrescar lista desde la API
      clientes.value = await getClientes();

      const clienteAEliminar = clientes.value.find(cliente => cliente.movil === movil);

      if (!clienteAEliminar) {
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      // Pedir confirmación antes de eliminar
      const result = await Swal.fire({
        title: `¿Eliminar al cliente ${clienteAEliminar.nombre} ${clienteAEliminar.apellidos}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      });

      // Si no confirma, salir
      if (!result.isConfirmed) return;

      // Si confirma, eliminar cliente usando la API y movil como ID
      await deleteCliente(clienteAEliminar.id);
      
      clientes.value = await getClientes();

      Swal.fire({
        icon: 'success',
        title: 'Cliente eliminado',
        showConfirmButton: false,
        timer: 1500
      });
    };

  // Editar Cliente
    const editarCliente = (movil) => {
      const cliente = clientes.value.find(c => c.movil === movil);
      if (!cliente) {
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      // Copiar datos al formulario
      nuevoCliente.value = { ...cliente };
      editando.value = true;
      nuevoCliente.value.fechaAlta = formatearFechaParaInput(cliente.fechaAlta);

      // Actualiza municipios filtrados según la provincia seleccionada
      filtrarMunicipios();
      nuevoCliente.value.municipio = cliente.municipio;
      clienteEditandoId.value = cliente.id;
    };

  // Activar cliente (poner histórico en true)
    const activarCliente = async (cliente) => {
      const confirmacion = await Swal.fire({
        title: `¿Activar cliente ${cliente.nombre} ${cliente.apellidos}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmacion.isConfirmed) return;

      try {
        // Crear una copia del cliente con historico en true
        const clienteActivado = { ...cliente, historico: true };

        // Llamar a la API para actualizar
        const actualizado = await updateCliente(cliente.id, clienteActivado);

        // Actualizar la lista local (opcional, también puedes volver a cargar todo)
        const index = clientes.value.findIndex(c => c.id === cliente.id);
        if (index !== -1) {
          clientes.value[index] = actualizado;
        }

        Swal.fire({
          icon: 'success',
          title: 'Cliente reactivado',
          showConfirmButton: false,
          timer: 1500
        });

        // Recargar lista actualizada
        await cargarClientes();

      } catch (error) {
        console.error('Error al reactivar cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al activar cliente',
          text: 'Por favor, intenta de nuevo.',
          timer: 1500
        });
      }
    };


  ////////////////////////////
  //   SCRIPTS AUXILIARES   //
  ////////////////////////////

  // Paginación
    const beforePagina = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    const nextPagina = () => {
      const totalPages = Math.ceil(numclientes.value / clientesPorPage);
      if (currentPage.value < totalPages) {
        currentPage.value++;
      }
    }

    const clientesPaginados = computed(() => {
      const start = (currentPage.value - 1) * clientesPorPage;
      const end = start + clientesPorPage;
      return clientes.value.slice(start, end);
    })
    // Las funciones computed se ejecutan cuando detectan que algo de lo que hay en su interior cambia

  // Capitalización del Texto
    const capitalizarTexto = (campo) => {
    const texto = nuevoCliente.value[campo] ?? '';
    nuevoCliente.value[campo] = texto
      .toLowerCase()
      .split(' ')
      .map(palabra => {
        if (!palabra) return '';
        return palabra.charAt(0).toLocaleUpperCase() + palabra.slice(1);
      })
      .join(' ');
    };
  
  // Estado de validez del DNI/NIE (Por defecto es válido y no muestra error al iniciar)
    const dniValido = ref(true);

  // Validar DNI/NIE (No se utiliza directamente)
    const validarDniNie = (valor) => {
      const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const dniRegex = /^[0-9]{8}[A-Z]$/;
      const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;

      valor = valor.toUpperCase();

      if (dniRegex.test(valor)) {
          const numero = parseInt(valor.slice(0, 8), 10);
          const letra = valor.charAt(8);
          return letra === letras[numero % 23];  //sale con true si es válido
        } else if (nieRegex.test(valor)) {
          const nie = valor.replace('X', '0').replace('Y', '1').replace('Z', '2');
          const numero = parseInt(nie.slice(0, 8), 10);
          const letra = valor.charAt(8);
          return letra === letras[numero % 23];  //sale con true si es válido
        }
      return false; 
    };

  // Validar DNI
    const validarDni = () => {
      nuevoCliente.value.dni = nuevoCliente.value.dni.trim().toUpperCase();
      dniValido.value = validarDniNie(nuevoCliente.value.dni);
    };

  // Validar EMAIL
    const emailValido = ref(true);
    const validarEmail = () => {
      if (email === '') {
        emailValido.value = true;  // Vacío = válido (opcional)
        return true;
      }

      const email = nuevoCliente.value.email.trim();
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      emailValido.value = regex.test(email);
    };

  // Validar MÓVIL
    const movilValido = ref(true);
    const movilRegex = /^[67]\d{8}$/;

    const validarMovil = () => {
      const movil = nuevoCliente.value.movil.trim();

      if (movil === '') {
        movilValido.value = true;  // Vacío = válido (opcional)
        return true;
      }

      if (movil.charAt(0) === '6' || movil.charAt(0) === '7') {
        movilValido.value = movilRegex.test(movil);
        return movilValido.value;
      } else {
        movilValido.value = false;
        return false;
      }
    };

  // Provincias y municipios
    const provincias = ref(provmuniData.provincias);  // Array de provincias
    const municipios = ref(provmuniData.municipios);  // Array de municipios para filtrarlos
    const municipiosFiltrados = ref([]);  // vacío pero contendrá los municipios filtrados

    const filtrarMunicipios = () => {
      const nombreProv = nuevoCliente.value.provincia;

      // 1️⃣ buscar en provincias el objeto con ese nombre
      const prov = provincias.value.find(p => p.nm === nombreProv);
      if (!prov) {
        municipiosFiltrados.value = [];
        return;
      }

      // 2️⃣ los dos primeros dígitos del id de la provincia
      const codigoProv = prov.id.slice(0, 2);

      // 3️⃣ filtrar los municipios cuyo id empiece por esos dos dígitos
      municipiosFiltrados.value = municipios.value.filter(
        m => m.id.startsWith(codigoProv)
      );

      // 4️⃣ opcional: resetear el municipio si ya no corresponde
      nuevoCliente.value.municipio = '';
    };

  // Conversor fechas
    function formatearFechaParaInput(fecha) {
      if (!fecha) return '';

      // Detecta formato dd/mm/yyyy
      if (fecha.includes('/')) {
        const [dd, mm, yyyy] = fecha.split('/');
        return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
      }

      // Detecta formato yyyy-mm-dd
      if (fecha.includes('-')) {
        const partes = fecha.split('-');
        if (partes.length === 3) return fecha; // ya formato ISO
      }

      return '';
    }

    // Recargar formulario
    function recargarForm() {
      nuevoCliente.value = {
        dni: '',
        nombre: '',
        apellidos: '',
        email: '',
        movil: '',
        direccion: '',
        provincia: '',
        municipio: '',
        fechaAlta: '',
        historico: true,
        lopd: false,
        tipo: "user",
        tipoCliente: 'particular',
      };
      editando.value = false;
      clienteEditandoId.value = null;

      // Reset validaciones
      dniValido.value = true;
      movilValido.value = true;
      emailValido.value = true;
    }
</script>

<style scoped>
  .is-invalid {
    border-color: #f28b82 important;
    background-color: #ffe6e6;
  }

  .invalid-feedback {
    display: block;
  }
</style>
