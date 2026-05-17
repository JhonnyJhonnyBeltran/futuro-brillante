import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import ResultCard from "@/components/ResultCard";
import SorteoModal from "@/components/SorteoModal";
import type { CicloConPuntuacion, FamiliaKey } from "@/data/ciclos";
import { trackEvent } from "@/lib/supabase";
import { FAMILIA_LABEL } from "@/components/ResultadosCiclos";

interface Perfil {
  centro: string;
  genero: string;
  edad: string;
}

interface ResultsData {
  ciclos: CicloConPuntuacion[];
  familia: string;
  timestamp: string;
  perfil?: Perfil;
  submissionId?: string;
  duracionSegundos?: number | null;
}


function generarInformeHTML(data: ResultsData): string {
  const fecha = new Date(data.timestamp).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const familiaLabel =
    FAMILIA_LABEL[data.familia as FamiliaKey] ?? data.familia;

  const ciclos = data.ciclos.slice(0, 3);
  const labels = ["Mejor coincidencia", "Buena opción", "Compatible"];

  const ciclosHTML = ciclos
    .map((c, i) => {
      return `
      <div class="ciclo ${i === 0 ? "ciclo-top" : ""}">
        <div class="ciclo-label">${labels[i]}</div>
        <div class="ciclo-nombre">${c.nombre}</div>
        <div class="ciclo-meta">${c.nivel} &nbsp;·&nbsp; ${c.area}</div>
        <div class="ciclo-desc">${c.descripcion}</div>
      </div>`;
    })
    .join("");

  const perfilRows = [
    data.perfil?.centro
      ? `<tr><td class="td-label">Centro educativo</td><td>${data.perfil.centro}</td></tr>`
      : "",
    data.perfil?.genero
      ? `<tr><td class="td-label">Género</td><td>${data.perfil.genero}</td></tr>`
      : "",
    data.perfil?.edad
      ? `<tr><td class="td-label">Edad</td><td>${data.perfil.edad} años</td></tr>`
      : "",
    `<tr><td class="td-label">Fecha</td><td>${fecha}</td></tr>`,
  ]
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Informe Descubre-T</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f8f8f8;
      color: #222;
      padding: 32px 16px;
    }
    /* A4 layout at 96dpi: 8.27in * 96 = 794px width */
    .page {
      width: 794px;
      margin: 0 auto;
      background: #fff;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: none;
      padding: 24px 0;
    }
    /* Stronger app gradient used in header and accents */
    .header {
      background: linear-gradient(90deg, #ff6b35 0%, #ff8a50 40%, #f7931e 100%);
      padding: 28px 32px 24px;
      color: #fff;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    /* Vocational area row centered vertically and more prominent */
    .familia-row { display:flex; align-items:center; justify-content:flex-start; gap:18px; margin: 18px 0; }
    .header h1 { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
    .header .subtitle { font-size: 13px; opacity: 0.88; margin-top: 4px; }
    .header .centro-tag {
      font-size: 11px;
      font-weight: 700;
      text-align: right;
      opacity: 0.85;
      line-height: 1.4;
    }

    .body { padding: 20px 36px; }

    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #ff6b35;
      margin-bottom: 10px;
    }
    .section { margin-bottom: 28px; }

    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .td-label { color: #888; width: 140px; padding: 5px 0; font-weight: 600; }
    td { padding: 5px 0; }

    .familia-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, #ff6b35 0%, #ff8a50 50%, #f7931e 100%);
      color: #fff;
      font-size: 15px;
      font-weight: 900;
      border-radius: 12px;
      padding: 10px 20px;
      box-shadow: 0 6px 18px rgba(247,147,30,0.12);
      transform: translateY(0);
    }

    .ciclo {
      border: 1.5px solid #ececec;
      border-radius: 12px;
      padding: 16px 18px;
      margin-bottom: 12px;
    }
    .ciclo-top {
      border-color: transparent;
      background: linear-gradient(180deg, #fff8f5 0%, #fff 100%);
      box-shadow: 0 2px 0 rgba(255,107,53,0.02), 0 6px 18px rgba(255,107,53,0.06) inset;
      position: relative;
    }
    .ciclo-top:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 4px;
      width: 100%;
      background: linear-gradient(90deg,#ff6b35,#ff8a50,#f7931e);
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .ciclo-label {
      font-size: 11px;
      font-weight: 700;
      color: #ff6b35;
      margin-bottom: 6px;
    }
    .ciclo-nombre { font-size: 15px; font-weight: 800; margin-bottom: 4px; }
    .ciclo-meta { font-size: 11px; color: #888; margin-bottom: 8px; }
    .ciclo-desc { font-size: 12px; color: #555; line-height: 1.55; margin-bottom: 10px; }

    .footer {
      border-top: 1px solid #f0f0f0;
      padding: 18px 32px;
      font-size: 10px;
      color: #aaa;
      text-align: center;
      line-height: 1.6;
    }

    .print-btn {
      display: block;
      width: 220px;
      margin: 24px auto 0;
      padding: 12px 0;
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .page { box-shadow: none; border-radius: 0; }
      .print-btn { display: none; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="header-top">
        <div>
          <div class="subtitle">Informe de Orientación Vocacional</div>
          <h1>Descubre-T</h1>
        </div>
        <div class="centro-tag">CPIFP El Arenal<br/>Programa Dualiza-Orienta</div>
      </div>
    </div>

    <div class="body">

      <div class="section">
        <div class="section-title">Perfil del estudiante</div>
        <table>
          <tbody>${perfilRows}</tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Área vocacional detectada</div>
        <div class="familia-badge">${familiaLabel}</div>
      </div>

      <div class="section">
        <div class="section-title">Ciclos formativos recomendados</div>
        ${ciclosHTML}
      </div>

    </div>

    <div class="footer">
      Este informe ha sido generado por la plataforma Descubre-T — CPIFP El Arenal.<br/>
      La selección de ciclos se basa exclusivamente en tus competencias, libre de estereotipos de género.<br/>
      Programa Dualiza-Orienta 2025-2026.
    </div>
  </div>
</body>
</html>`;
}

const Results = () => {
  const navigate = useNavigate();
  const [modalSorteo, setModalSorteo] = useState(false);
  const [inscrito, setInscrito] = useState(
    () => sessionStorage.getItem("eligetufut_inscrito") === "1"
  );

  const data = useMemo<ResultsData | null>(() => {
    const raw = sessionStorage.getItem("descubre-t_results");
    if (!raw) {
      navigate("/cuestionario");
      return null;
    }
    return JSON.parse(raw) as ResultsData;
  }, [navigate]);

  const results = useMemo(() => data?.ciclos.slice(0, 3) ?? [], [data]);

  useEffect(() => {
    if (results.length > 0) {
      trackEvent("results_view", { top: results[0]?.nombre, familia: results[0]?.area });
    }
  }, [results]);

  const moreInfo = () => {
    window.open("https://fpelarenal.com/", "_blank", "noopener,noreferrer");
  };

  const descargarInforme = () => {
    if (!data) return;
    void (async () => {
      try {
        const html = generarInformeHTML(data);

        // Create an offscreen container and inject the HTML
        const wrapper = document.createElement("div");
        wrapper.style.position = "fixed";
        wrapper.style.left = "-9999px";
        wrapper.style.top = "0";
        wrapper.style.width = "794px"; // A4 width at 96dpi
        wrapper.style.height = "auto";
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
        const [{ default: html2canvas }, { PDFDocument }] = await Promise.all([
          import("html2canvas"),
          import("pdf-lib"),
        ]);

        // Wait a tick for fonts/images to load
        await new Promise((r) => setTimeout(r, 300));

        const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true });

        // PDF page dimensions in points (A4)
        const pagePtWidth = 595.28;
        const pagePtHeight = 841.89;

        const pdfDoc = await PDFDocument.create();

        const sourceCanvas = canvas;
        const imgPxWidth = sourceCanvas.width;
        const imgPxHeight = sourceCanvas.height;

        // pixels per PDF point
        const pxPerPt = imgPxWidth / pagePtWidth;
        const pagePxHeight = Math.floor(pagePtHeight * pxPerPt);

        let y = 0;
        const ctx = sourceCanvas.getContext("2d");
        while (y < imgPxHeight) {
          const sliceH = Math.min(pagePxHeight, imgPxHeight - y);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgPxWidth;
          pageCanvas.height = sliceH;
          const pCtx = pageCanvas.getContext("2d");
          pCtx.drawImage(sourceCanvas, 0, y, imgPxWidth, sliceH, 0, 0, imgPxWidth, sliceH);

          const pageDataUrl = pageCanvas.toDataURL("image/png");
          const pagePngBytes = await (await fetch(pageDataUrl)).arrayBuffer();
          const pageImage = await pdfDoc.embedPng(pagePngBytes);

          const page = pdfDoc.addPage([pagePtWidth, pagePtHeight]);
          const scaledHeight = (pagePtWidth / pageImage.width) * pageImage.height;
          page.drawImage(pageImage, {
            x: 0,
            y: pagePtHeight - scaledHeight,
            width: pagePtWidth,
            height: scaledHeight,
          });

          y += sliceH;
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "informe-descubre-t.pdf";
        a.click();

        // cleanup
        setTimeout(() => {
          try {
            document.body.removeChild(wrapper);
          } catch (err) {
            // Non-fatal cleanup error — log for debugging
            console.warn("Failed to remove temp wrapper", err);
          }
          URL.revokeObjectURL(url);
        }, 300);

        trackEvent("report_download", { submission_id: data.submissionId });
      } catch (err) {
        // fallback: open HTML if PDF generation fails
        const html = generarInformeHTML(data);
        const blob = new Blob([html], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win) {
          const a = document.createElement("a");
          a.href = url;
          a.download = "informe-descubre-t.html";
          a.click();
        }
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      }
    })();
  };

  return (
    <div className="mobile-shell">
      <Header />
      <main className="px-4 sm:px-5 md:px-6 pt-3 sm:pt-5 pb-6 sm:pb-8">
        <div className="text-center mb-4 sm:mb-5 anim-fade-up">
          <h1 className="text-[clamp(1.4rem,6vw,1.75rem)] font-black leading-tight">
            <span className="text-gradient-accent">¡Tus resultados!</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 px-2">
            Basándonos en tus respuestas, estos son los ciclos formativos más adecuados para ti
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {results.map((r, i) => (
            <div key={r.id} className="anim-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <ResultCard result={r} rank={i} />
            </div>
          ))}
        </div>

        <div className="mt-5 sm:mt-7 flex flex-col gap-3">
          {inscrito ? (
            <button
              disabled
              className="btn-primary w-full"
              style={{ opacity: 0.55, cursor: "default" }}
            >
              ✓ Ya estás inscrito en el sorteo
            </button>
          ) : (
            <button
              onClick={() => setModalSorteo(true)}
              className="btn-primary w-full tap-fast"
            >
              ¿Quieres participar en el sorteo?
            </button>
          )}
          <button
            onClick={moreInfo}
            className="w-full tap-fast py-3 px-4 rounded-xl font-bold text-sm text-white transition-colors"
            style={{ background: "#2563eb" }}
          >
            Ver más información
          </button>
        </div>

        <button
          onClick={descargarInforme}
          className="mt-4 sm:mt-6 mx-auto flex items-center gap-2 text-sm font-semibold text-gradient-accent"
        >
          <Download size={16} />
          Descargar informe
        </button>
      </main>

      <SorteoModal
        open={modalSorteo}
        onClose={() => setModalSorteo(false)}
        onSuccess={() => {
          sessionStorage.setItem("descubre-t_inscrito", "1");
          setInscrito(true);
          setModalSorteo(false);
        }}
      />
    </div>
  );
};

export default Results;
