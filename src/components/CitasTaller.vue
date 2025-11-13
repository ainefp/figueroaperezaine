<template>
    <h4 class="text-center my-1 mb-4 bg-primary-subtle py-1">Agendar Cita</h4>

    <!-- Formulario -->
    <form @submit.prevent="agendarCita" class="mb-4">
        <!-- Matrícula y Móvil -->
        <div id="matriculaMovil" class="mb-3 row align-items-center">
            <!-- Matricula -->
            <div id="matricula" class="col-md-5 d-flex align-items-center">
            <label for="matricula" class="form-label col-md-2 mb-0 me-3">Matrícula:</label> <!-- me-5 w-25 -->
            <div class="d-flex col-5 me-5">
                <input
                type="text"
                id="matricula"
                v-model="nuevaCita.matricula"
                @blur="validarMatricula"
                class="form-control w-auto ms-1 me-1" 
                :class="{ 'is-invalid': !matriculaInvalida }"
                required
                />
                <div v-if="!matriculaInvalida" class="invalid-feedback">
                    Matrícula inválida.
                </div>
            </div>

            <!-- Botón de Recarga -->
            <button 
                type="button"
                id="btnRecg"
                class="btn btn-secondary btn-md ms-2"
                @click="recargarForm()">
                <i class="bi bi-arrow-clockwise"></i>
            </button>
            </div>

            <!-- Móvil -->
            <div id="movil" class="col-md-3 d-flex align-items-center">
                <label for="movil" class="form-label me-5 ms-5 mb-0 text-nowrap ">Móvil:</label>
                <input
                    type="tel"
                    id="movil"
                    v-model="nuevaCita.movilCliente"
                    @blur="validarMovil"
                    class="form-control flex-grow-1 text-center"
                    :class="{ 'is-invalid': !movilValido }"
                    required
                />
            </div>
        </div>

        <!-- Servicio y Fecha -->
        <div id="servicioFecha" class="mb-3 row g-3 align-items-center">
            <!-- Servicio -->
            <div id="servicio" class="col-md-5 d-flex align-items-center">
                <label for="servicio" class="form-label mb-0 text-nowrap w-25">Servicio:</label>
                <input
                    type="text"
                    id="servicio"
                    v-model="nuevaCita.servicioTaller"
                    class="form-control flex-grow-1"
                    @blur="capitalizarTexto('servicio')"
                    required
                />
            </div>
            <!-- Fecha de Cita -->
            <div id="fecha" class="col-md-3 ms-5 d-flex align-items-center">
                <label for="fechaCita" class="form-label me-3 mb-0 text-nowrap">Fecha de Cita:</label>
                <input
                    type="date"
                    id="fechaCita"
                    v-model="nuevaCita.fechaCita"
                    class="form-control w-auto"
                    required
                />
            </div>
        </div>

        <!-- Estado Cita -->
        <div id="estadoCita" class="col-md-5 d-flex align-items-center">
        <label for="estadoCita" class="form-label mb-0 text-nowrap w-25">Estado Cita:</label>
        <input
            type="text"
            id="estadoCita"
            v-model="nuevaCita.estadoCita"
            class="form-control flex-grow-1"
            @blur="capitalizarTexto('estadoCita')"
            required
        />
        </div>

        <!-- Aceptación de presupuesto -->
        <div id="presupuesto" class="text-center mb-3 my-4">
            <div class="form-check d-inline-block">
                <input
                    type="checkbox"
                    class="form-check-input"
                    id="condicion"
                    v-model="nuevaCita.lopd"
                    required
                />
                <label class="form-check-label" for="condicion">
                    Acepto el presupuesto
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
            <!-- Grabar Cita -->
            <div id="grabar" class="flex-grow-1 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary px-4">
                {{ editando ? 'Modificar' : 'Grabar' }}
            </button>
            </div>
        </div>
    </form>

    <!-- Lista de Citas -->
    <div class="table-responsive">
      <h4 class="text-center">Listado Citas</h4>
      <table class="table table-bordered table-striped table-hover table-sm align-middle"> <!--  w-100  -->
        <thead class="table-primary">
          <tr >
            <th class="text-center">ID</th>
            <th class="text-center">Matrícula</th>
            <th class="text-center">Móvil</th>
            <th class="text-center">Fecha Cita</th>
            <th class="text-center">Servicio</th>
            <th class="text-center">Estado Cita</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cita, index) in citasPaginadas" :key="cita.id || index" >
            <th scope="row" class="text-center">{{ (currentPage - 1) * citasPorPage + index + 1 }}</th>
            <td >{{ cita.matricula }}</td>
            <td >{{ cita.movilCliente }}</td>
            <td class="text-center">{{ cita.fechaCita }}</td>
            <td class="text-center">{{ cita.servicioTaller }}</td>
            <td class="text-center">{{ capitalizarTexto(cita.estadoCita) }}</td>
            <td class="align-middle text-center">
              <button
                @click="eliminarCita(cita.id)"
                class="btn btn-danger btn-sm border-0 ms-4 me-2 shadow-none rounded-0"
                title="Eliminar cita"
                aria-label="Eliminar cita"
              >
                <i class="bi bi-trash"></i>
              </button>
              <button
                @click="editarCita(cita.id)"
                class="btn btn-warning btn-sm border-0 shadow-none rounded-0"
                title="Editar cita"
                aria-label="Editar cita"
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
</template>
<script setup>
    import { ref, onMounted, computed } from 'vue';
    import Swal from 'sweetalert2';
    import { deleteCita, getCitas, updateCita, addCita } from '@/api/taller.js';
    
    // ============ SCRIPTS CRUD (consultar, agregar, eliminar, modificar) ============

    // Declaración de variables
      const nuevaCita = ref({
        id: "",
        matricula: "",
        movilCliente: "",
        fechaCita: "",
        servicioTaller: "",
        estadoCita: "pendiente",
        acepta: "",
      });

      const editando = ref(false);  // Estado de edición para el formulario
      const citaEditandoId = ref(null);
      const citas = ref([]);  // Aray de citas cargados desde la API
      const numCitas = ref(0);  // Número de citas para paginación
      const currentPage = ref(1);  // Página actual para paginación
      const citasPorPage = 5;

    // Cargar citas al momento de compartirlo
      onMounted(async () => {
        cargarCitas();
        currentPage.value = 1;
      })

      const cargarCitas = () => {
        getCitas().then(data => {
          citas.value = data;
          numCitas.value = data.length;  // Actualiza el nº total de citas
          currentPage.value = 1;  // Reiniciar a la 1era página al cargar
        })
        Swal.fire({
          icon: 'success',
          title: "Listando Citas...",
          showConfirmButton: false,
          timer: 1500
          });
      }
     
    // Grabar Cita
      const agendarCita = async () => {
        if (!editando.value) {
          const duplicado = citas.value.find(cita =>
            cita.matricula === nuevaCita.value.matricula ||
            cita.movil === nuevaCita.value.movilCliente
          );
          if (duplicado) {
            Swal.fire({
              icon: 'error',
              title: 'Matrícula o móvil duplicados',
              showConfirmButton: false,
              timer: 2000
            });
            return;
          }
        }
        
        // Confirmación antes de guardar
        const result = await Swal.fire({
          title: editando.value ? '¿Desea modificar esta cita?' : '¿Desea grabar esta cita?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: editando.value ? 'Modificar' : 'Grabar',
          cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;
        
        try {
          if (editando.value) {
            // Modificar cita (PUT)+
            const citaActualizada = await updateCita(citaEditandoId.value, nuevaCita.value);
            
            // Actualiza el cita en la lista local
            const index = citas.value.findIndex(c => c.id === citaEditandoId.value);
            if (index !== -1) citas.value[index] = citaActualizada;
            Swal.fire({
              icon: 'success',
              title: 'Cita modificada',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            // Agregar cita (POST)
            const citaAgregada = await addCita(nuevaCita.value);
            citas.value.push(citaAgregada);
            Swal.fire({
              icon: 'success',
              title: 'Cita agregada',
              showConfirmButton: false,
              timer: 1500
            });
          }
          
          citaEditandoId.value = null;

          // Reset validaciones si tienes
          matriculaValida.value = true;
          movilValido.value = true;

          // Refrescar lista completa (opcional)
          citas.value = await getCitas();

        } catch (error) {
          console.error('Error al guardar cita:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar cita',
            text: 'Inténtelo de nuevo o contacte con el administrador.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      };

    // Eliminar Cita
      const eliminarCita = async (id) => {
        // Refrescar lista desde la API
        citas.value = await getCitas();

        const citaAEliminar = citas.value.find(cita => cita.id === id);

        if (!citaAEliminar) {
          Swal.fire({
            icon: 'error',
            title: 'Cita no encontrada',
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }

        // Pedir confirmación antes de eliminar
        const result = await Swal.fire({
          title: `¿Eliminar la cita para ${citaAEliminar.servicioTaller}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        });

        // Si no confirma, salir
        if (!result.isConfirmed) return;

        // Si confirma, eliminar cliente usando la API y movil como ID
        await deleteCita(citaAEliminar.id);
        
        citas.value = await getCitas();

        Swal.fire({
          icon: 'success',
          title: 'Cita eliminado',
          showConfirmButton: false,
          timer: 1500
        });
      }

      // Editar Cita
      const editarCita = (id) => {
        const cita = citas.value.find(c => c.id === id);
        if (!cita) {
          Swal.fire({
            icon: 'error',
            title: 'Cita no encontrado',
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }

        // Copiar datos al formulario
        nuevaCita.value = { ...cita };
        editando.value = true;
        nuevaCita.value.fechaCita = formatearFechaParaInput(cita.fechaCita);
      };

    // ============ SCRIPTS AUXILIARES ============

    // Paginación
      const beforePagina = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      }

      const nextPagina = () => {
        const totalPages = Math.ceil(numCitas.value / citasPorPage);
        if (currentPage.value < totalPages) {
          currentPage.value++;
        }
      }

      const citasPaginadas = computed(() => {
        const start = (currentPage.value - 1) * citasPorPage;
        const end = start + citasPorPage;
        return citas.value.slice(start, end);
      })
      // Las funciones computed se ejecutan cuando detectan que algo de lo que hay en su interior cambia

    // Capitalización del Texto
      const capitalizarTexto = (campo) => {
        const texto = nuevaCita.value[campo] ?? '';
        nuevaCita.value[campo] = texto
        .toLowerCase()
        .split(' ')
        .map(palabra => {
          if (!palabra) return '';
          return palabra.charAt(0).toLocaleUpperCase() + palabra.slice(1);
        })
        .join(' ');
      };
    
    // Validar Matrícula
    const matriculaValida = ref(true);

    const validarMatricula = () => {
        const matricula = nuevaCita.value.matricula.trim();

        if (matricula === '') {
          matriculaValida.value = true;  // Vacío = válido (opcional)
          return true;
        }

        if (matricula.length() > 0 || matricula.length() <= 10) {
            const matriculaValida = nuevaCita.value.matricula.trim();
            return matriculaValida.value;
        } else {
            matriculaValida.value = false;
            return false;
        }
    }

    // Validar MÓVIL
      const movilValido = ref(true);
      const movilRegex = /^[67]\d{8}$/;

      const validarMovil = () => {
        const movil = nuevaCita.value.movilCliente.trim();

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
    //   function formatearFechaParaInput(fecha) {
    //     if (!fecha) return '';

    //     // Detecta formato dd/mm/yyyy
    //     if (fecha.includes('/')) {
    //       const [dd, mm, yyyy] = fecha.split('/');
    //       return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    //     }

    //     // Detecta formato yyyy-mm-dd
    //     if (fecha.includes('-')) {
    //       const partes = fecha.split('-');
    //       if (partes.length === 3) return fecha; // ya formato ISO
    //     }

    //     return '';
    //   }

    // Recargar formulario
      function recargarForm() {
        nuevaCita.value = {
            id: "",
            matricula: "",
            movilCliente: "",
            fechaCita: "",
            servicioTaller: "",
            estadoCita: "pendiente",
            acepta: "",
        };
        editando.value = false;
        citaEditandoId.value = null;

        // Reset validaciones
        matriculaValida.value = true;
        movilValido.value = true;
      }
</script>