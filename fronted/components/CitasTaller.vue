<template>
  <h4 class="text-center my-1 bg-primary-subtle py-1"><i class="bi bi-wrench me-2"></i>Citas Taller</h4>
  <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light">
    <!-- Formulario -->
    <div class="container-lg mx-auto">
      <form @submit.prevent="guardarCita" class="mb-3 mt-2">
        <div class="row g-3 align-items-center">
          <!-- Matrícula -->
          <div class="col-12 col-md-3 me-4 d-flex align-items-center">
            <label for="matricula" class="form-label mb-0 me-2 text-nowrap align-middle">Matrícula:</label>
            <input
              id="matricula"
              type="text"
              v-model="nuevaCita.matricula"
              class="form-control text-center shadow-none border"
              @blur="capitalizarMatricula"
              required
            />
          </div>

          <!-- Móvil Cliente -->
          <div class="col-12 col-md-3 me-4 d-flex align-items-center">
            <label for="movilCliente" class="form-label mb-0 me-2 text-nowrap align-middle">Móvil Cliente:</label>
            <input
              id="movilCliente"
              type="tel"
              v-model="nuevaCita.movilCliente"
              class="form-control text-center shadow-none border"
              @blur="verificarCliente"
              required
            />
          </div>

          <!-- Fecha Cita -->
          <div class="col-12 col-md-3 me-4 d-flex align-items-center">
            <label for="fechaCita" class="form-label mb-0 me-2 text-nowrap align-middle">Fecha Cita:</label>
            <input
              id="fechaCita"
              type="date"
              v-model="nuevaCita.fechaCita"
              class="form-control text-center shadow-none border"
              required
            />
          </div>

          <!-- Botón limpiar -->
          <div class="col-12 col-md-1 d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-light border shadow-none"
              title="Limpiar formulario"
              @click="limpiarFormulario"
            >
              <i class="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
      
        <!-- Servicio y Estado -->
        <div class="row g-3 align-items-center mt-2">
          <div class="col-12 col-md-4 me-4 d-flex align-items-center">
            <label for="servicioTaller" class="form-label mb-0 me-3 text-nowrap align-middle">Servicio:</label>
            <select
              id="servicioTaller"
              v-model="nuevaCita.servicioTaller"
              class="form-select shadow-none border"
              required
            >
              <option disabled value="">Seleccione servicio</option>
              <option v-for="servicio in serviciosTaller" :key="servicio" :value="servicio">
                {{ servicio }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-3 ms-4 d-flex align-items-center ps-4 border rounded-1">
            <label class="form-label mb-0 me-3 text-nowrap align-middle">Estado:</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="estadoCita"
                  id="pendiente"
                  value="Pendiente"
                  v-model="nuevaCita.estadoCita"
                  required
                />
                <label class="form-check-label" for="pendiente">Pendiente</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="estadoCita"
                  id="finalizado"
                  value="Finalizado"
                  v-model="nuevaCita.estadoCita"
                />
                <label class="form-check-label" for="finalizado">Finalizado</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Checkbox centrado -->
        <div class="row g-3 justify-content-center mt-3">
          <div class="col-auto d-flex align-items-center">
              <input
              type="checkbox"
              id="acepta"
              v-model="nuevaCita.acepta"
              class="form-check-input me-2"
              />
              <label for="acepta" class="form-check-label">Acepta presupuesto</label>
          </div>
        </div>

        <!-- Botón justo debajo -->
        <div class="row g-3 justify-content-center mt-2">
          <div class="col-auto">
              <button type="submit" class="btn btn-primary px-4 shadow-none">
              {{ editando ? 'Modificar' : 'Grabar' }}
              </button>
          </div>
        </div>
      </form>
    </div>

    <hr class="border border-1 border-secondary rounded">

    <!-- Tabla Citas -->
    <div class="table-responsive mt-1">
      <h6 class="text-center mb-1 bg-secondary text-white">Listado de Citas</h6>
      <table class="table table-bordered table-striped table-hover table-sm align-middle">
        <thead class="table-primary text-center">
          <tr>
            <th>ID</th>
            <th>Matrícula</th>
            <th>Móvil</th>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Acepta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cita, index) in citasPaginadas" :key="cita.id">
            <td class="text-center">{{ (currentPage - 1) * citasPorPage + index + 1 }}</td>
            <td class="text-center">{{ cita.matricula }}</td>
            <td class="text-center">{{ cita.movilCliente }}</td>
            <td class="text-center">{{ cita.fechaCita }}</td>
            <td class="text-center">{{ cita.servicioTaller }}</td>
            <td class="text-center">{{ cita.estadoCita }}</td>
            <td class="text-center">{{ cita.acepta ? 'Sí' : 'No' }}</td>
            <td class="text-center">
              <button class="btn btn-warning btn-sm me-2" @click="editarCita(cita)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="eliminarCita(cita.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Navegación de página-->
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
// Importaciones, Dependencias y Reactividad
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'
import { getCitasTaller,  addCitaTaller, updateCitaTaller, deleteCitaTaller } from '@/api/taller.js'
import { getClientes } from '@/api/clientes.js'

const nuevaCita = ref({
  matricula: '',
  movilCliente: '',
  fechaCita: '',
  servicioTaller: '',
  estadoCita: 'Pendiente',
  acepta: false
})

// Estado reactivo
const citas = ref([])
const editando = ref(false)
const idEditando = ref(null)
const cargando = ref(false)
const currentPage = ref(1); 
const numcitas = ref(0)
const citasPorPage = 5
const clientes = ref([]) // Suponiendo que tienes una lista de clientes cargada en algún lugar


const serviciosTaller = ref([
  'Revisión',
  'Pre ITV',
  'Neumáticos',
  'Frenos',
  'Cambio de aceite'
])


// Cargar datos al montar
onMounted(async () => {
  cargarCitas()
  const data2 = await getClientes()
  clientes.value = data2
  currentPage.value = 1;
  cargando.value =false;
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(numcitas.value / citasPorPage))
})

const citasPaginadas  = computed(() => {
  const start = (currentPage.value - 1) * citasPorPage;
  const end = start + citasPorPage;
  return citas.value.slice(start, end);
});

// Métodos de paginación
const beforePagina = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPagina = () => {
  const totalPages = Math.ceil(numcitas.value / citasPorPage); 
  //redondear hacia arriba para mostrar la última página aunque no esté completa
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};


////////// Funciones CRUD

const cargarCitas = async () => {
  try {
    const data = await getCitasTaller()
    citas.value = data
    numcitas.value = data.length
    currentPage.value = 1;
  } catch (error) {
    console.error('Error al cargar las citas del taller:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar las citas del taller',
      text: error.message || 'Ha ocurrido un error inesperado.',
    })
  } finally {
    cargando.value = false
  } 
}

const guardarCita = async () => {
  if (!nuevaCita.value.acepta) {
    Swal.fire({
      icon: 'warning',
      title: 'Debe aceptar el presupuesto antes de guardar.',
      timer: 2000,
      showConfirmButton: false
    })
    return
  }

  if (editando.value) {
    await updateCitaTaller(idEditando.value, nuevaCita.value)
    Swal.fire({ icon: 'success', title: 'Cita modificada', timer: 1500, showConfirmButton: false })
  } else {
    await addCitaTaller(nuevaCita.value)
    Swal.fire({ icon: 'success', title: 'Cita guardada', timer: 1500, showConfirmButton: false })
  }
  await cargarCitas()
  limpiarFormulario()
}

const editarCita = (cita) => {
  nuevaCita.value = { ...cita }
  idEditando.value = cita.id
  editando.value = true
}

const eliminarCita = async (id) => {
  const confirm = await Swal.fire({
    title: '¿Eliminar cita?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  })
  if (!confirm.isConfirmed) return
  await deleteCitaTaller(id)
  await cargarCitas()
  Swal.fire({ icon: 'success', title: 'Cita eliminada', timer: 1500, showConfirmButton: false })
}

///////// Funciones Auxiliares

const limpiarFormulario = () => {
  nuevaCita.value = {
    matricula: '',
    movilCliente: '',
    fechaCita: '',
    servicioTaller: '',
    estadoCita: 'Pendiente',
    acepta: false
  }
  editando.value = false
  idEditando.value = null
}

const verificarCliente = () => {
  // Primero validar formato del móvil
  if (!validarMovil()) {
    Swal.fire({
      icon: 'error',
      title: 'Número no válido',
      text: 'Debe comenzar por 6 o 7 y tener 9 dígitos.',
      timer: 2000,
      showConfirmButton: false
    })
    return
  }

  // Después comprobar si existe en la BD
  const movil = nuevaCita.value.movilCliente.trim()
  if (!movil) return

  const existe = clientes.value.some(c => c.movil === movil)

  if (!existe) {
    Swal.fire({
      icon: 'warning',
      title: 'Cliente no encontrado en la base de datos',
      text: 'Verifique el número o regístrelo primero.',
      timer: 2000,
      showConfirmButton: false
    })
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Cliente en Base de Datos',
      timer: 1500,
      showConfirmButton: false
    })
  }
}


function capitalizarMatricula() {
  nuevaCita.value.matricula = nuevaCita.value.matricula.toUpperCase()
}

// Control móvil

const validarMovil = () => {
  const movilRegex = /^[67]\d{8}$/;
  const movil = nuevaCita.value.movilCliente.trim();

  if (movil === '') return true; // vacío → válido (por si aún no escribió)

  return movilRegex.test(movil);
};


</script>

<style scoped>
.is-invalid {
  border-color: #f28b82 !important;
  background-color: #ffe6e6;
}
</style>
