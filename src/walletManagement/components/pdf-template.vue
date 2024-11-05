<script>
import jsPDF from 'jspdf';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'PdfTemplate',
  props: {
    walletDetails: {
      type: Object,
      required: true
    },
    bills: {
      type: Array,
      required: true
    }
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    currencySymbol() {
      return this.walletDetails.moneyType === 'TYPE_SOLES' ? 'S/.' : '$';
    },
    currencyMoneyType() {
      return this.walletDetails.moneyType === 'TYPE_SOLES' ? 'Soles' : 'Dólares';
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    },
    addHeaderImage(doc) {
      doc.setFillColor(39, 174, 96);
      doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');

      doc.setFillColor(45, 200, 111);
      let x = 0;
      const y = 35;
      const waveHeight = 5;
      const waveWidth = 10;
      while (x < doc.internal.pageSize.width) {
        doc.circle(x, y, waveHeight, 'F');
        x += waveWidth;
      }
    },
    addWatermark(doc) {
      doc.setFontSize(60);
      doc.setTextColor(245, 245, 245);
      doc.setGState(new doc.GState({opacity: 0.1}));
      doc.text("RapiPay", 50, doc.internal.pageSize.height/2, {
        angle: 45
      });
      doc.setGState(new doc.GState({opacity: 1}));
    },
    generatePDF() {
      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;

        this.addWatermark(doc);
        this.addHeaderImage(doc);

        doc.setFontSize(26);
        doc.setTextColor(255, 255, 255);
        const title = `Cartera ${this.walletDetails.walletName}`;
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 25);

        doc.setFillColor(248, 249, 250);
        doc.roundedRect(margin, 50, pageWidth - (margin * 2), 50, 3, 3, 'F');

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        const infoGrid = [
          [`ID: ${this.walletDetails.id}`, `Banco: ${this.walletDetails.bankName}`],
          [`Tasa: ${this.walletDetails.tea}%`, `Moneda: ${this.currencyMoneyType}`],
          [`Fecha de cierre: ${this.walletDetails.closingDate}`, `Total descuento: ${this.currencySymbol}${this.formatCurrency(this.walletDetails.totalDiscount)}`]
        ];

        let yPos = 60;
        infoGrid.forEach(row => {
          doc.text(row[0], margin + 5, yPos);
          doc.text(row[1], pageWidth/2, yPos);
          yPos += 15;
        });

        doc.setFontSize(18);
        doc.setTextColor(39, 174, 96);
        doc.text("Detalle de Facturas", margin, 120);

        doc.setDrawColor(39, 174, 96);
        doc.setLineWidth(0.5);
        doc.line(margin, 125, pageWidth - margin, 125);

        const tableConfig = {
          startX: margin,
          startY: 140,
          columns: [
            {
              header: "N° Factura",
              key: "billNumber",
              width: 25,
              align: "left"
            },
            {
              header: "Tipo",
              key: "type",
              width: 20,
              align: "left"
            },
            {
              header: "Valor",
              key: "value",
              width: 35,
              align: "right"
            },
            {
              header: "Descuento",
              key: "discount",
              width: 30,
              align: "right"
            },
            {
              header: "Destinatario",
              key: "addressee",
              width: 30,
              align: "left"
            },
            {
              header: "F. Vencimiento",
              key: "dueDate",
              width: 30,
              align: "left"
            }
          ]
        };

        // Calcular posiciones X para cada columna
        let currentX = tableConfig.startX;
        tableConfig.columns.forEach(column => {
          column.x = currentX;
          currentX += column.width;
        });

        // Dibujar header de la tabla
        doc.setFillColor(39, 174, 96);
        doc.rect(margin, tableConfig.startY - 7, pageWidth - (margin * 2), 12, 'F');

        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        tableConfig.columns.forEach(column => {
          doc.text(column.header, column.x, tableConfig.startY);
        });

        // Contenido de la tabla
        let yPosition = tableConfig.startY + 14;
        doc.setTextColor(0, 0, 0);

        this.bills.forEach((bill, index) => {
          if (index % 2 === 0) {
            doc.setFillColor(248, 249, 250);
            doc.roundedRect(margin, yPosition - 7, pageWidth - (margin * 2), 12, 1, 1, 'F');
          }

          doc.text(bill.billNumber.toString(), tableConfig.columns[0].x, yPosition);
          doc.text(bill.billType === 'TYPE_BILL' ? 'Factura' : 'Letra', tableConfig.columns[1].x, yPosition);
          const valueText = `${this.currencySymbol}${this.formatCurrency(bill.netValue)}`;
          doc.text(valueText, tableConfig.columns[2].x, yPosition);
          const discountText = `${this.currencySymbol}${this.formatCurrency(bill.discount)}`;
          doc.text(discountText, tableConfig.columns[3].x, yPosition);
          doc.text(bill.addressee, tableConfig.columns[4].x, yPosition);
          doc.text(bill.dueDate, tableConfig.columns[5].x, yPosition);

          yPosition += 12;

          if (yPosition > pageHeight - 30) {
            doc.addPage();
            this.addWatermark(doc);
            this.addHeaderImage(doc);
            yPosition = 60;
          }
        });

        doc.setDrawColor(39, 174, 96);
        doc.setLineWidth(0.5);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        const footer = `Generado el ${new Date().toLocaleDateString()} | RapiPay App`;
        doc.text(footer, margin, pageHeight - 10);

        doc.setTextColor(39, 174, 96);
        doc.setFontSize(12);
        doc.text("WALLET", pageWidth - margin - 30, pageHeight - 10);

        doc.save(`cartera_${this.walletDetails.walletName}_${new Date().toISOString().split('T')[0]}.pdf`);

        this.toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'PDF generado correctamente',
          life: 3000
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al generar el PDF',
          life: 3000
        });
      }
    }
  }
}
</script>

<template>
  <div class="pdf-export-section">
    <pv-button
        class="p-button-success"
        @click="generatePDF"
        icon="pi pi-file-pdf"
        label="Exportar a PDF"
    />
  </div>
</template>

<style scoped>
.pdf-export-section {
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
}

:deep(.p-button) {
  background-color: #27AE60;
  border: none;
  border-radius: 2em;
  transition: all 0.3s ease;
  padding: 0.5rem 1.5rem;
}

:deep(.p-button:hover) {
  background-color: #2cdc78 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.2);
}

:deep(.p-button-icon) {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}
</style>