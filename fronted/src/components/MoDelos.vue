<template>
  <h4 class="text-center my-1 bg-primary-subtle py-1"><i class="bi bi-car-front me-2"></i>Registro de Vehículos </h4>
  <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light ">
    
    <form @submit.prevent="guardarVehiculo" class="">
      <!-- ======== FILA 1 ======== -->
      <div>
        <!-- Tipo -->
        <div class="row g-3 align-items-center mt-1">
          <div class="col-md-3 d-flex align-items-center ps-4 border rounded-1">
            <label class="form-label mb-0 me-2 text-nowrap">Tipo:</label>
            <div class="d-flex align-items-center">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="tipo-coche" value="coche" v-model="vehiculo.tipo">
                <label class="form-check-label" for="tipo-coche">Coche</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="tipo-furgoneta" value="furgoneta" v-model="vehiculo.tipo">
                <label class="form-check-label" for="tipo-furgoneta">Furgoneta</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="tipo-moto" value="moto" v-model="vehiculo.tipo">
                <label class="form-check-label" for="tipo-moto">Moto</label>
              </div>
            </div>
          </div>

          <!-- Matrícula -->
          <div class="col-12 col-md-2 d-flex align-items-center">
            <label for="color" class="form-label mb-0 me-2 text-nowrap ms-2">Matricula:</label>
            <input type="text" id="matricula"  @blur ="todoTexto('matricula')" v-model="vehiculo.matricula" class="form-control shadow-none border">
          </div>

          <!-- Marca -->
          <div class="col-12 col-md-2 d-flex align-items-center ms-2">
            <label for="marca" class="form-label mb-0 me-2 text-nowrap">Marca:</label>
            <input type="text" id="marca" @blur="capitalizarTexto('marca')" v-model="vehiculo.marca" class="form-control shadow-none border" required>
          </div>

          <!-- Modelo -->
          <div class="col-12 col-md-2 d-flex align-items-center">
            <label for="modelo" class="form-label mb-0 me-2 text-nowrap">Modelo:</label>
            <input type="text" id="modelo" @blur="capitalizarTexto('modelo')" v-model="vehiculo.modelo" class="form-control shadow-none border" required>
          </div>

          <!-- Año -->
          <div class="col-12 col-md-1 d-flex align-items-center">
            <label for="anio" class="form-label mb-0 me-1 text-nowrap text-end">Año:</label>
            <input type="text" id="anio" v-model="vehiculo.anio" class="form-control text-center shadow-none border" required>
          </div>
          
          <!-- Estado -->
          <div class="col-12 col-md-1 d-flex align-items-center">
            <label class="form-label mb-0 me-2 text-nowrap">Estado:</label>
            <select v-model="vehiculo.estado" class="form-select d-inline-block w-auto shadow-none border">
              <option value="disponible">Disponible</option>
              <option value="vendido">Vendido</option>
              <option value="reservado">Reservado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ======== FILA 2 ======== -->
      <div class="row g-3 align-items-center mt-2">
        <!-- Kilómetros -->
        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="kilometros" class="form-label mb-0 me-2 text-nowrap">Kilómetros:</label>
          <input type="text" id="kilometros" v-model="vehiculo.kilometros" class="form-control text-end shadow-none border" required>
        </div>

        <!-- Precio -->
        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="precio" class="form-label mb-0 me-2 text-nowrap">Precio (€):</label>
          <input type="text" id="precio" v-model="vehiculo.precio" class="form-control text-end shadow-none border" required>
        </div>

        <!-- Combustible -->
        <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="combustible" class="form-label mb-0 me-2 text-nowrap">Combustible:</label>
          <select id="combustible" v-model="vehiculo.combustible" class="form-select shadow-none border">
            <option disabled value="">Seleccione</option>
            <option>Gasolina</option>
            <option>Diésel</option>
            <option>Híbrido</option>
            <option>GLP</option>
            <option>Eléctrico</option>
          </select>
        </div>

        <!-- Transmisión -->
        <div class="col-md-3 d-flex align-items-center ps-3 border rounded-1">
          <label for="transmision" class="form-label mb-0 ms-2 me-2 text-nowrap">Transmisión:</label>
          <div class="d-flex align-items-center">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-automatica" value="automatica" v-model="vehiculo.transmision">
              <label class="form-check-label" for="tipo-automatica">Automatica</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-manual" value="manual" v-model="vehiculo.transmision">
              <label class="form-check-label" for="tipo-manual">Manual</label>
            </div>
          </div>
        </div>

        <!-- Potencia -->
        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="potencia" class="form-label mb-0 me-2 text-nowrap">Potencia (CV):</label>
          <input type="text" id="potencia" v-model="vehiculo.potencia_cv" class="form-control me-2 shadow-none border text-end" required  >
        </div>     
      </div>

      <!-- ======== FILA 3 ======== -->
        <!-- Descripción -->
        <div class="row g-2 mt-2">
          <div class="col">
            <label for="descripcion" class="form-label mb-0 me-3 text-nowrap">Descripción:</label>
            <textarea id="descripcion" v-model="vehiculo.descripcion" rows="3" class="form-control shadow-none border mt-2 mb-4" placeholder="Describe el estado, potencia, color, revisiones, etc."></textarea>
          </div>
        </div>
      
      <!-- ======== FILA 4 ======== -->
        <!-- Imagen del vehículo -->
        <div class="row g-3 align-items-center mb-3">
          <div class="col-12 col-md-3 d-flex align-items-center">
            <label for="foto" class="form-label mb-0 me-2 text-nowrap">Imagen del vehículo:</label>
            <input 
              type="file"
              id="foto"
              accept="image/*"
              @change="onFileChange"
              class="form-control-file col-md-10 rounded border shadow-none btn-file-azul" 
              >
          </div>
        </div>

      <h5 class="text-center bg-primary-subtle py-1"><i class="bi bi-person me-2"></i>Cliente Ubicación</h5>
      
      <!-- ======== FILA 1 ======== -->
      <div class="row g-3 align-items-center mt-3">
          <!-- Provincia -->
          <div class="col-12 col-md-3 d-flex align-items-center">
            <label for="provincia" class="form-label mb-0 me-2 text-nowrap">Provincia:</label>
            <select id="provincia" @change="filtrarMunicipios" v-model="vehiculo.ubicacion.provincia" class="form-select shadow-none border">
              <option disabled value="">Seleccione provincia</option>
            >
              <option v-for="prov in provincias"  :key="prov.id" :value="prov.nm">{{ prov.nm }}</option>
            </select>
          </div>

          <!-- Ciudad -->
          <div class="col-12 col-md-4 ms-4 d-flex align-items-center">
            <label for="ciudad" class="form-label mb-0 me-2 text-nowrap">Ciudad:</label>
            <select id="ciudad" v-model="vehiculo.ubicacion.ciudad" class="form-select shadow-none border">
              <option disabled value="">Seleccione ciudad</option>
              <option v-for="mun in municipiosFiltrados" :key="mun.id" :value="mun.nm">{{ mun.nm }}</option>
            </select>
          </div>

          <!-- Fecha -->
          <div class="col-12 col-md-3 ms-4 d-flex align-items-center">
            <label for="fecha_publicacion" class="form-label mb-0 me-2 text-nowrap">Fecha Publicación:</label>
            <input type="date" id="fecha_publicacion" v-model="vehiculo.fecha_publicacion" class="form-control text-center shadow-none border">
          </div>
        </div>

      <!-- ======== FILA 2 ======== -->
        <div class="row g-3 align-items-center mt-3">
          <!-- Nombre Contacto -->
          <div class="col-12 col-md-4 d-flex align-items-center">
            <label for="contacto.nombre" class="form-label mb-0 me-2 text-nowrap">Nombre Contacto:</label>
            <input type="text" id="contacto.nombre" @blur="capitalizarNombreContacto" v-model="vehiculo.contacto.nombre" class="form-control shadow-none border">
          </div>

          <!-- Teléfono -->
          <div class="col-12 col-md-2 ms-4 d-flex align-items-center">
            <label for="contacto.telefono" class="form-label text-end mb-0 me-2 text-nowrap">Teléfono:</label>
            <input type="tel" id="contacto.telefono" @blur="validarTelefono()" v-model="vehiculo.contacto.telefono" class="form-control text-center shadow-none border">
          </div>

          <!-- Email -->
          <div class="col-12 col-md-4 d-flex ms-4 align-items-center">
            <label for="contacto.email" class="form-label mb-0 me-2 text-nowrap">Email:</label>
            <input type="email" id="contacto.email" @blur="validarEmail()" v-model="vehiculo.contacto.email" class="form-control shadow-none border"></input>
          </div>
        </div>

      <!-- ======== FILA 3 ======== -->
        <div class="row g-3 align-items-center mt-3">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <!-- Btn Guardar/Modificar -->
            <button type="submit" class="btn btn-primary border shadow-none px-4 py-2 ">
              {{ editando ? 'Modificar' : 'Guardar' }}
            </button>

            <!-- Btn Eliminar -->
            <button type="submit" class="btn btn-primary border shadow-none px-4 py-2 ms-2 ">
              Eliminar
            </button>

            <!-- Btn Imprimir -->
            <button
              type="button"
              @click="imprimirPDF"
              class="btn btn-warning border shadow-none px-4 py-2 ms-2"
            >
              Imprimir
            </button>
            <!-- <i class="bi bi-printer"></i> -->
          </div>
        </div>
    </form>
  </div>

  <hr v-if="admin" class="border border-1 border-secondary rounded">
  
  <!-- Lista de Vehiculos -->
  <div v-if="admin" class="">
    <div class="table-responsive my-3">
      <h4 class="text-center">Listado Vehículos</h4>
      <table class="table table-bordered table-striped table-hover table-sm align-middle">
        <thead class="table-primary">
          <tr>
            <th class="text-center">Matrícula</th>
            <th class="text-center">Marca y Modelo</th>
            <th class="text-center">Año</th>
            <th class="text-center">Combustible</th>
            <th class="text-center">Color</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vehiculo, index) in vehiculos">
            <td>{{ vehiculo.matricula }}</td>
            <td>{{ vehiculo.marca }}, {{ vehiculo.modelo }}</td>
            <td class="text-center">{{ vehiculo.anio }}</td>
            <td class="text-center">{{ vehiculo.combustible }}</td>
            <td class="text-center">{{ vehiculo.color }}</td>
            <td class="align-middle text-center">
              <button
                type="button"
                @click="eliminarVehiculo(vehiculo.matricula)"
                class="btn btn-sm btn-danger me-2"
                title="Eliminar vehículo"
                aria-label="Eliminar vehículo"
              >
                <i class="bi bi-trash"></i>
              </button>
              <button
                type="button"
                @click="editarVehiculo(vehiculo.matricula)"
                class="btn btn-sm btn-warning me-1"
                title="Editar vehículo"
                aria-label="Editar vehículo"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Navegación de página
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
      </div> -->
    </div>
  </div>
</template>

<script setup>
  // ================== IMPORTS ==================
 
    import Swal from "sweetalert2";
    import { ref, onMounted } from "vue";
    import jsPDF from "jspdf";
    import autoTable from "jspdf-autotable";
    import provmuniData from "../../../backend/data/provmuni.json";
    import { addArticulo, getArticulos } from "@/api/articulos.js";

    const admin = sessionStorage.getItem('isAdmin') === 'true';

    const archivo = ref(null);
    const tiposVehiculo = ref(["Coche", "Moto", "Furgoneta"]);
    const tiposCombustible = ref(["Gasolina", "Diésel", "Híbrido", "Eléctrico"]);
    const matriculaValida = ref(true);
    const matriculaRegex = /^[0-9]{4}[A-Za-z]{3}/;

    const vehiculos = ref([]);

    const vehiculo = ref({
      tipo: "",
      matricula: "",
      marca: "",
      modelo: "",
      anio: "",
      estado: "",
      kilometros: "",
      precio: "",
      combustible: "",
      transmision: "",
      potencia_cv: "",
      descripcion: "",
      ubicacion: {
        provincia: "",
        ciudad: "",
      },
      contacto: {
        nombre: "",
        telefono: "",
        email: "",
      },
      fecha_publicacion: "",
      estado: "disponible",
    });

    const editando = ref(false);

    // Cargar provincias y municipios desde JSON
    const provincias = ref(provmuniData.provincias);
    const municipios = ref(provmuniData.municipios);
    const municipiosFiltrados = ref([]);

    // Filtrar municipios según provincia seleccionada
    const filtrarCiudades = () => {
      const nombreProv = vehiculo.value.ubicacion.provincia;
      const prov = provincias.value.find((p) => p.nm === nombreProv);
      if (!prov) {
        municipiosFiltrados.value = [];
        return;
      }
      const codigoProv = prov.id.slice(0, 2);
      municipiosFiltrados.value = municipios.value.filter((m) =>
        m.id.startsWith(codigoProv)
      );
      vehiculo.value.ubicacion.ciudad = "";
    };

    const validarMatricula = () => {
      vehiculo.value.matricula = vehiculo.value.matricula.trim().toUpperCase();
      const matricula = vehiculo.value.matricula;

      if (matricula === "") {
        matriculaValida.value = true;
        return true;
      }

      matriculaValida.value = matriculaRegex.test(matricula);
      return matriculaValida.value;
    };
    const capitalizarContacto = (campo) => {
      const texto = vehiculo.value.contacto[campo] ?? "";
      if (texto.trim() === "") return;
      vehiculo.value.contacto[campo] = texto
        .toLowerCase()
        .split(" ")
        .map((palabra) => {
          if (!palabra) return "";
          return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        })
        .join(" ");
    };

    onMounted(async () => {
      vehiculos.value = await getArticulos();
    });

    // Validar teléfono
    const telefonoValido = ref(true);
    const telefonoRegex = /^[67]\d{8}$/;

    const validarTelefono = () => {
      const telefono = vehiculo.value.contacto.telefono.trim();

      if (telefono === "") {
        telefonoValido.value = true; // Vacío = válido (opcional)
        return true;
      }

      if (telefono.charAt(0) === "6" || telefono.charAt(0) === "7") {
        telefonoValido.value = telefonoRegex.test(telefono);
        return telefonoValido.value;
      } else {
        telefonoValido.value = false;
        return false;
      }
    };

    // Validar email
    const emailValido = ref(true);
    const validarEmail = () => {
      const email = vehiculo.value.contacto.email.trim();
      if (email === "") {
        emailValido.value = true; // Vacío = válido (opcional)
        return true;
      }
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      emailValido.value = regex.test(email);
    };

    // Enviar datos al backend
    const guardarVehiculo = async () => {
      // Validar teléfono antes de guardar
      if (!telefonoValido.value) {
        Swal.fire({
          icon: "error",
          title: "Teléfono inválido",
          text: "El teléfono debe empezar por 6 o 7 y tener 9 dígitos.",
          showConfirmButton: true,
        });
        return;
      }

      // Validar email antes de guardar
      if (!emailValido.value) {
        Swal.fire({
          icon: "error",
          title: "Email inválido",
          text: "Por favor, introduce un email válido.",
          showConfirmButton: true,
        });
        return;
      }
      if (!matriculaValida.value) {
        Swal.fire({
          icon: "error",
          title: "Matrícula inválida",
          text: "Por favor, introduce una matrícula válida.",
          showConfirmButton: true,
        });
        return;
      }

      try {
        const formData = new FormData();
        if (archivo.value) {
          formData.append("imagen", archivo.value);
        }
        formData.append("vehiculo", JSON.stringify(vehiculo.value));
        const nuevo = await addArticulo(formData);
        if (nuevo && nuevo._id) {
          Swal.fire({
            icon: "success",
            title: "Vehículo guardado",
            text: "El vehículo ha sido guardado correctamente.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          console.error("Error al guardar el vehículo");
        }
        vehiculo.value = {
          tipo: "",
          matricula: "",
          marca: "",
          modelo: "",
          anio: "",
          estado: "disponible",
          kilometros: "",
          precio: "",
          combustible: "",
          transmision: "",
          potencia_cv: "",
          descripcion: "",
          ubicacion: {
            provincia: "",
            ciudad: "",
          },
          contacto: {
            nombre: "",
            telefono: "",
            email: "",
          },
          fecha_publicacion: "",
        };
        matriculaValida.value = true;
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    };

    const onFileChange = (e) => {
      archivo.value = e.target.files[0];
    };

    function imprimirPDF() {
      const doc = new jsPDF();

      // Verificar si autoTable está disponible
      if (typeof autoTable !== "function") {
        console.error("jspdf-autotable no está cargado correctamente");
        Swal.fire("Error", "Plugin autotable no disponible", "error");
        return;
      }

      doc.setFontSize(18);
      doc.text("Listado de Vehículos", 12, 20);

      const headers = [["Matrícula", "Marca", "Estado", "Combustible", "Precio"]];
      const body = vehiculos.value.map((modelo) => [
        modelo.matricula || "",
        modelo.marca || "",
        modelo.estado?.toUpperCase() || "",
        modelo.combustible || "",
        modelo.precio ? `${modelo.precio}` : "",
      ]);

      autoTable(doc, {
        startY: 30,
        head: headers,
        body: body,
        theme: "striped",
        styles: {
          fontSize: 10,
          cellPadding: 3,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          4: {
            halign: "right",
            cellWidth: 35,
          },
        },
      });

      doc.save("listado_vehiculos.pdf");
    }

    async function editarVehiculo(matricula) {
      const vehiculoActual = vehiculos.value.find(matricula);
      if (!vehiculoActual) {
        return;
      }
      editando.value = true;
    }
</script>

<style>
  .btn-file-azul::file-selector-button {
    background-color: #0d6efd; /* azul primary */
    color: white;
    border: none;
    padding: 6px 12px;
    font-size: 0.9rem;
    cursor: pointer;
  }
</style>