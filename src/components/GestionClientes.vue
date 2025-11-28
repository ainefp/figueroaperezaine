<template>
  <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light">
    <h4 class="text-center my-1 mb-4 bg-primary-subtle py-1">Gestión de Clientes</h4>
    
    <!-- Formulario -->
    <form @submit.prevent="guardarCliente" class="">
    
      <!-- DNI y Fecha de Alta -->
      <div id="dniFecha" class="mb-3 row align-items-center">
        <!-- DNI -->
        <div id="dni" class="col-md-5 d-flex align-items-center">
          <label for="dni" class="form-label col-md-2 mb-0 me-3">DNI:</label> <!-- me-5 w-25 -->
          <div class="d-flex col-5"> <!-- me-5 -->
            <input
              type="text"
              id="dni"
              v-model="nuevoCliente.dni"
              @blur="validarDni"
              class="form-control w-auto ms-1" 
              :class="{ 'is-invalid': !dniValido }"
              required
            /> <!-- me-1 -->
            <div v-if="!dniValido" class="invalid-feedback text-nowrap">
              DNI o NIE inválido.
            </div>
          </div>

          <!-- Botón de Búsqueda -->
          <button
              type="button"
              id="btnBusc"
              class="btn btn-primary btn-md ms-2"
              @click="buscarClientePorDNI(nuevoCliente.dni)">
              <i class="bi bi-search"></i>
          </button> <!-- ms-5 -->

          <!-- Botón de Recarga -->
          <button 
            type="button"
            id="btnRecg"
            class="btn btn-secondary btn-md ms-2"
            @click="recargarForm()">
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>

        <!-- Fecha de Alta -->
        <div id="fecha" class="col-md-3 ms-5 d-flex align-items-center">
          <label for="fechaAlta" class="form-label me-3 mb-0 text-nowrap">Fecha de Alta:</label>
          <input
            type="date"
            id="fechaAlta"
            v-model="nuevoCliente.fechaAlta"
            class="form-control w-auto"
          />
        </div>

        <!-- Botones de Tipo de Cliente -->
        <div id="btns" class="col-md-3 d-flex align-items-center ps-3 pe-3 border rounded-1 text-nowrap">
          <div id="tipoClt" class="me-3">Tipo de cliente:</div>
          <div id="particular" class="form-check form-check-inline">
            <input 
              type="radio" 
              id="tipocliente"
              v-model="nuevoCliente.tipoCliente"
              class="form-check-input"
              value="particular"
            />
            <label for="tipocliente" class="form-check-label">Particular</label>
          </div>
          <div id="empresa" class="form-check form-check-inline">
            <input 
              type="radio" 
              id="tipocliente2"
              v-model="nuevoCliente.tipoCliente"
              class="form-check-input"
              value="empresa"
            />
            <label for="tipocliente2" class="form-check-label">Empresa</label>
          </div>
        </div>
      </div>

      <!-- Nombre y Apellidos -->
      <div id="nombreApellidos" class="mb-3 row g-3 align-items-center">
        <!-- Nombre -->
        <div id="nombre" class="col-md-5 d-flex align-items-center">
          <label for="nombre" class="form-label mb-0 text-nowrap w-25">Nombre:</label>
          <input
            type="text"
            id="nombre"
            v-model="nuevoCliente.nombre"
            class="form-control flex-grow-1"
            @blur="capitalizarTexto('nombre')"
            required
          />
        </div>
        <!-- Apellidos -->
        <div id="apellidos" class="col-md-5 d-flex align-items-center ms-5">
          <label for="apellidos" class="form-label me-4 mb-0 text-nowrap">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            v-model="nuevoCliente.apellidos"
            class="form-control flex-grow-1"
            @blur="capitalizarTexto('apellidos')"
            required
          />
        </div>
      </div>

      <!-- Email y Móvil -->
      <div id="emailMovil" class="mb-3 row g-3 align-items-center">
        <!-- Email -->
        <div id="email" class="col-md-5 d-flex align-items-center">
          <label for="email" class="form-label mb-0 text-nowrap w-25">Email:</label>
          <input
            type="email"
            id="email"
            v-model="nuevoCliente.email"
            class="form-control flex-grow-1"
            @blur="validarEmail"
            :class="{ 'is-invalid': !emailValido }"
            required
          />
        </div>
        <!-- Móvil -->
        <div id="movil" class="col-md-3 d-flex align-items-center">
          <label for="movil" class="form-label me-5 ms-5 mb-0 text-nowrap ">Móvil:</label>
          <input
            type="tel"
            id="movil"
            v-model="nuevoCliente.movil"
            @blur="validarMovil"
            class="form-control flex-grow-1 text-center ms-1"
            :class="{ 'is-invalid': !movilValido }"
          />
        </div>
      </div>

      <!-- Dirección, Provincia y Municipio -->
      <div id="dirProvMun" class="mb-3 row g-3 align-items-center">
        <!-- Dirección -->
        <div id="direccion" class="col-md-5 d-flex align-items-center">
          <label for="direccion" class="form-label mb-0 w-25 text-nowrap">Dirección:</label>
          <input
            type="text"
            id="direccion"
            v-model="nuevoCliente.direccion"
            @blur="capitalizarTexto('direccion')"
            class="form-control flex-grow-1"
          />
        </div>
        <!-- Provincia -->
        <div id="provincia" class="col-md-3 d-flex align-items-center">
          <label for="provincia" class="form-label me-4 ms-5 mb-0 text-nowrap">Provincia:</label>
          <select
            id="provincia"
            v-model="nuevoCliente.provincia"
            class="form-select flex-grow-1 w-25 ms-1"
            @change="filtrarMunicipios"
          >
            <option disabled value="">Seleccione provincia</option>
            <option v-for="prov in provincias" :key="prov.id" :value="prov.nm">{{ prov.nm }}</option>
          </select>
        </div>
        <!-- Municipio -->
        <div id="municipio" class="col-md-3 d-flex align-items-center">
          <label for="municipio" class="form-label me-5 ms-4 mb-0 text-nowrap">Municipio:</label>
          <select
            id="municipio"
            v-model="nuevoCliente.municipio"
            class="form-select flex-grow-1 w-auto"
          >
            <option disabled value="">Seleccione municipio</option>
            <option v-for="mun in municipiosFiltrados" :key="mun.id" :value="mun.nm">{{ mun.nm }}</option>
          </select>
        </div>
      </div>

      <!-- Crear Contraseña -->
      <div id="crearPwd" class="mb-3 row g-3 align-items-center">
        <!-- Contraseña -->
        <div id="contraseña" class="col-md-5 d-flex align-items-center">
          <label for="contraseña" class="form-label mb-0 text-nowrap w-25">Contraseña:</label>
          <input
            type="password"
            id="password"
            class="form-control flex-grow-1"
            v-model="nuevoCliente.password"
            required
          />
        </div>
        <!-- Repetir contraseña -->
        <div id="repetirPwd" class="col-md-5 d-flex align-items-center ms-5">
          <label for="repetirPwd" class="form-label me-4 mb-0 text-nowrap">Repetir Contraseña:</label>
          <input
            type="password"
            id="repetirPwd"
            class="form-control flex-grow-1"
            v-model="nuevoCliente.passwordRepeat"
            required
          />
        </div>
      </div>

      <!-- Aceptación de términos y condiciones -->
      <div id="terminos" class="text-center mb-3 my-4">
          <div class="form-check d-inline-block">
              <input
                  type="checkbox"
                  class="form-check-input"
                  id="condiciones"
                  v-model="nuevoCliente.lopd"
                  required
              />
              <label class="form-check-label" for="condiciones">
                  Acepto los termino y condiciones establecidos en
                  <router-link
                    :to="{ path: '/aviso-legal' }"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary text-decoration-none"
                  >
                    Aviso Legal
                  </router-link>
              </label>
          </div>
        </div>

      <!-- Botones finales -->
      <div id="btnsFin" class="d-flex align-items-center mt-3">
        <!-- Guardar Cliente -->
        <div id="guardar" class="flex-grow-1 d-flex justify-content-center">
          <button type="submit" class="btn btn-primary px-4">
            {{ editando ? 'Modificar' : 'Guardar' }}
          </button>
        </div>
      </div>

      <!-- Histórico -->
      <div id="historico" class="d-flex justify-content-end">
        <div id="historicoSwitch" class="form-check form-switch">
          <input
            type="checkbox"
            id="historico"
            v-model="mostrarHistorico"
            class="form-check-input"
            @change="cargarClientes"
          />
          <label for="historico" class="form-check-label ms-2">Histórico</label>
        </div>
      </div>
    </form>

    <!-- Lista de Clientes -->
    <div v-if="admin" class="">
      <div class="table-responsive my-5">
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
  </div>
</template>


<script setup>
  import { ref, onMounted, computed } from 'vue';
  import provmuniData from '@/data/provmuni.json';
  import { getClientes, getClientePorDni, addCliente, updateCliente, deleteCliente } from '@/api/clientes.js';
  import Swal from 'sweetalert2';
  import bcrypt from 'bcryptjs';

  // ============ SCRIPTS CRUD (consultar, agregar, eliminar, modificar) ============

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
        tipoCliente: 'particular',
        tipo: "user",
        password: '',
      });

      const editando = ref(false);  // Estado de edición para el formulario
      const clienteEditandoId = ref(null);
      const mostrarHistorico = ref(false);
      const clientes = ref([]);  // Aray de clientes cargados desde la API
      const numclientes = ref(0);  // Número de clientes para paginación
      const currentPage = ref(1);  // Página actual para paginación
      const clientesPorPage = 10;
      const cargando = ref(false);  // Estado de carga ( aún no se usa )

      const admin = sesionStorage.getItem('isAdmin') === 'true';
      const usuario = sesionStorage.getItem('isUsuario') === 'true';

    // Cargar clientes al momento de compartirlo
      onMounted(async () => {
        if(admin) {
          cargarClientes();
        }
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
        if (nuevoCliente.value.password !== nuevoCliente.value.passwordRepeat) {
          Swal.fire({
            icon: 'error',
            title: 'Las contraseñas no coinciden',
            showConfirmButton: false,
            timer: 2000
          });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(nuevoCliente.value.password, salt);
        
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
        nuevoCliente.value.password = hash;
        delete nuevoCliente.value.passwordRepeat;

        
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

  // ============ SCRIPTS AUXILIARES ============

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

  // ============ PROVINCIAS Y MUNICIPIOS ============

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
  
</script>

<style scoped>
  .is-invalid {
    border-color: #f28b82 important;
    background-color: #ffe6e6;
  }

  .invalid-feedback {
    display: block;
  }

  /* Ajustes para pantallas pequeñas */
  @media (max-width: 991.98px) {
    #dniFecha,
    #nombreApellidos,
    #emailMovil,
    #dirProvMun {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start !important;
      gap: 0.5rem !important;
    }

    #dni,
    #fecha,
    #nombre,
    #apellidos,
    #email,
    #movil,
    #direccion,
    #provincia,
    #municipio {
      width: calc(50% - 0.25rem) !important;
      margin-bottom: 0.5rem !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    #btns {
      width: 100% !important;
      flex-direction: row;
      align-items: center !important;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    #btnRecg, #btnBusc {
      margin-right: 0.5rem !important;
      margin-left: 0rem !important;
    }
  }
</style>
