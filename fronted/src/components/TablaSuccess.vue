<template>
    <div class="container-fluid my-1 p-3 pb-5 border rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-center" style="min-height:60vh;">
        <div class="text-center w-100" style="max-width:720px;">
            <h1 class="text-success display-4 mb-3">¡Pago Completado! <span aria-hidden>🎉</span></h1>
            <p class="lead mb-4">Gracias por tu compra. Te hemos enviado un correo con los detalles.</p>
            <div class="mb-5">
                <button @click="generarFacturaPdf" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow">
                    <i class="bi bi-file-earmark-pdf me-2"></i>Descargar Factura
                </button>
            </div>
            <router-link to="/" class="back-link"><i class="bi bi-arrow-left"></i>Volver a la tienda</router-link>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import jsPDF from "jspdf";
    import autoTable from "jspdf-autotable";
    import { useCestaStore } from "@/store/cesta";
    import logo from "@/assets/logo.png";
    import { addFactura } from "@/api/facturas";
    import { updateArticuloStatus } from "@/api/articulos";

    // Creamos la cesta para usar metodos y datos
    const cestaStore = useCestaStore();
    //Como ya no queremos los datos visibles(vaciar iconos y cesta), pasamos los datos a la variable invisible
    cestaStore.completarCompra();

    const facturaGuardada = ref(false);
    const facturaData = ref(null);

    async function guardarFacturaMongo() {
    if (facturaGuardada.value || cestaStore.compraCompleta.length === 0) return;

    try {
        const factura = {
        productos: cestaStore.compraCompleta.map((producto) => ({
            productoId: producto._id || producto.id,
            nombre:
            producto.nombre || `${producto.marca ?? ""} ${producto.modelo ?? ""}`,
            cantidad: producto.cantidad,
            precio_unitario: producto.precio,
        })),
        total: cestaStore.totalPrecio,
        };
        const resultado = await addFactura(factura);
        facturaData.value = resultado;
        facturaGuardada.value = true;
        console.log("Factura guardada en MongoDB");
    } catch (error) {
        console.error("Error guardando la factura", error);
    }
    }

    onMounted(async () => {
    await guardarFacturaMongo();
    //Por cada articulo de la cesta actualiza su estado a vendido
    for (const articulo of cestaStore.compraCompleta) {
        const articuloId = articulo._id || articulo.id;
        await updateArticuloStatus(articuloId, "vendido");
    }
    });

    //Metodo que genera un pdf en base a los datos que le pasamos.
    async function generarFacturaPdf() {
    //Asociamos el array de items no visible a la variable cart
    const cart = cestaStore.compraCompleta;

    //Si no tiene elementos mostramos alert
    if (cart.length === 0) {
        alert("No hay productos para facturar");
        return;
    }

    //Creamos pdf y seteamos las propiedades
    const doc = new jsPDF();

    // Logo y encabezado
    doc.addImage(logo, "png", 10, 10, 20, 20);
    doc.setFontSize(18);
    doc.text("Factura de Compra", 60, 20);

    // Código de factura y fecha de compra
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const codigoFactura = facturaData.value?._id || "N/A";
    const fechaCompra = facturaData.value?.fecha
        ? new Date(facturaData.value.fecha).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
        : new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    doc.text(`Factura Nº: ${codigoFactura}`, 14, 45);
    doc.text(`Fecha: ${fechaCompra}`, 14, 52);

    // Nombre del usuario
    const nombreUsuario = sessionStorage.getItem("userName") || "Cliente";
    doc.text(`Cliente: ${nombreUsuario}`, 14, 59);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const pageWidth = doc.internal.pageSize.width;
    const margenDerecho = 14;
    doc.text("Razón Social: Regalos Teis", pageWidth - margenDerecho, 72, { align: "right" });
    doc.text("Dirección: Avenida Galicia 101, Vigo - 36216", pageWidth - margenDerecho, 78, { align: "right" });
    doc.text("Tlfo: 986 666 333 - Email: regalos@example.com", pageWidth - margenDerecho, 84, { align: "right" });

    // Tabla de productos, marcará los headers de cada tabla
    const headers = [["ID", "Producto", "Cantidad", "Precio Unitario", "Total"]];
    //Formatea los datos para ser visibles, es un array de objetos
    const data = cart.map((item) => [
        item.id,
        item.nombre,
        item.cantidad,
        `${item.precio.toFixed(2)}€`,
        `${(item.cantidad * item.precio).toFixed(2)}€`,
    ]);

    //Creamos tabla en base a los headers y datos
    autoTable(doc, {
        startY: 95,
        head: headers,
        body: data,
        columnStyles: {
        0: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "right" },
        4: { halign: "right" },
        },
        theme: "striped",
    });

    // Coger los datos para poner en el documento, el total vendrá del compraCompleta ya que el otro estará vacío
    const totalPrice = cestaStore.totalPrecio;
    const totalText = `Total: ${totalPrice.toFixed(2)}€`;
    const totalWidth = doc.getTextWidth(totalText);
    const positionX = pageWidth - totalWidth - 14;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(totalText, positionX - 9, doc.lastAutoTable.finalY + 10);

    //Guardamos el pdf
    const nombreArchivo = facturaData.value?._id
        ? `factura_${facturaData.value._id}.pdf`
        : `factura_${Date.now()}.pdf`;
    doc.save(nombreArchivo);

    //Limpuamos ambas listas y el sessionStorage
    cestaStore.clearCesta();
    }
</script>

<style scoped>
.display-4 { font-weight: 600; }
</style>