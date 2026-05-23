import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { Capacitor } from "@capacitor/core";
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

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (let index = 0; index < bytes.length; index += 0x8000) {
    const chunk = bytes.subarray(index, index + 0x8000);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}


function generarInformeHTML(data: ResultsData): string {
  const fecha = new Date(data.timestamp).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const familiaLabel = FAMILIA_LABEL[data.familia as FamiliaKey] ?? data.familia;
  const ciclos = data.ciclos.slice(0, 3);

  const rankConfig = [
    { label: "Mejor coincidencia", emoji: "⭐", accent: "linear-gradient(180deg,#ff6b35,#f59e0b)" },
    { label: "Buena opción",       emoji: "",   accent: "linear-gradient(180deg,#3b82f6,#6366f1)" },
    { label: "Compatible",         emoji: "",   accent: "linear-gradient(180deg,#818cf8,#a78bfa)" },
  ];

  const ciclosHTML = ciclos.map((c, i) => {
    const r = rankConfig[i];
    const isLast = i === ciclos.length - 1;
    return `
    <div style="display:flex;${isLast ? "" : "margin-bottom:20px;"}">
      <div style="width:3px;flex-shrink:0;border-radius:999px;background:${r.accent};margin-right:18px;"></div>
      <div style="flex:1;">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0f172a;margin-bottom:6px;">${r.emoji ? r.emoji + " " : ""}${r.label}</div>
        <div style="font-size:17px;font-weight:900;color:#0f172a;letter-spacing:-0.3px;margin-bottom:3px;">${c.nombreGenerico ?? c.nombre}</div>
        <div style="font-size:11px;font-weight:600;color:#94a3b8;margin-bottom:8px;">${c.nombre} &nbsp;·&nbsp; ${c.area} &nbsp;·&nbsp; ${c.nivel}</div>
        <div style="font-size:12px;color:#475569;line-height:1.65;">${c.descripcion}</div>
      </div>
    </div>`;
  }).join("");

  const profileItems: string[] = [];
  if (data.perfil?.centro) profileItems.push(`<div style="flex:1;padding-right:20px;"><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin-bottom:3px;">Centro</div><div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.95);">${data.perfil.centro}</div></div>`);
  if (data.perfil?.genero)  profileItems.push(`<div style="flex:1;padding:0 20px;border-left:1px solid rgba(255,255,255,0.12);"><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin-bottom:3px;">Género</div><div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.95);">${data.perfil.genero}</div></div>`);
  if (data.perfil?.edad)    profileItems.push(`<div style="flex:1;padding:0 20px;border-left:1px solid rgba(255,255,255,0.12);"><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin-bottom:3px;">Edad</div><div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.95);">${data.perfil.edad} años</div></div>`);
  profileItems.push(`<div style="flex:1;padding-left:${profileItems.length > 0 ? "20px" : "0"};${profileItems.length > 0 ? "border-left:1px solid rgba(255,255,255,0.12);" : ""}"><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin-bottom:3px;">Fecha</div><div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.95);">${fecha}</div></div>`);

  const profileStrip = profileItems.length > 0
    ? `<div style="background:#0f172a;padding:16px 40px;display:flex;gap:0;">${profileItems.join("")}</div>`
    : "";

  return `<style>* { box-sizing: border-box; margin: 0; padding: 0; } div { font-family: 'Segoe UI', system-ui, Arial, sans-serif; }</style>
  <div style="width:794px;margin:0 auto;background:#fff;display:block;">

    <!-- HEADER: gradiente accent de la app naranja→azul -->
    <div style="background:linear-gradient(135deg,#ff6b35 0%,#7b6ef0 50%,#3b82f6 100%);padding:36px 44px 32px;position:relative;overflow:hidden;">
      <!-- Decoradores circulares -->
      <div style="position:absolute;top:-70px;right:-70px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,0.06);"></div>
      <div style="position:absolute;bottom:-90px;right:140px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.04);"></div>
      <div style="position:absolute;top:20px;left:320px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.05);"></div>
      <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;">
        <!-- Logo + nombre centro -->
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:60px;height:60px;background:#fff;border-radius:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;box-shadow:0 2px 12px rgba(0,0,0,0.15);">
            <img src="/logo.png" style="width:52px;height:52px;border-radius:10px;object-fit:contain;" />
          </div>
          <div>
            <div style="font-size:20px;font-weight:900;color:#fff;letter-spacing:-0.4px;line-height:1.1;">CPIFP El Arenal</div>
            <div style="font-size:10.5px;color:rgba(255,255,255,0.72);margin-top:3px;font-weight:500;">Centro Público Integrado de Formación Profesional</div>
          </div>
        </div>
        <!-- Título informe -->
        <div style="text-align:right;">
          <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.65);margin-bottom:6px;">Informe de Orientación Vocacional</div>
          <div style="font-size:30px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1;margin-bottom:6px;">Descubre-T</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.6);font-weight:500;">${fecha}</div>
        </div>
      </div>
    </div>

    <!-- PROFILE STRIP: oscuro institucional -->
    ${profileStrip}

    <!-- BODY -->
    <div style="padding:30px 44px 28px;">

      <!-- ÁREA VOCACIONAL -->
      <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:#ff6b35;margin-bottom:10px;">Tu área vocacional detectada</div>
      <div style="margin-bottom:30px;">
        <div style="font-size:22px;font-weight:900;color:#0f172a;letter-spacing:-0.5px;margin-bottom:5px;">${familiaLabel}</div>
        <div style="font-size:12px;color:#64748b;line-height:1.7;">Basándonos en tus respuestas, tu perfil muestra mayor afinidad con esta área. A continuación encontrarás los ciclos que mejor encajan con tus intereses y competencias.</div>
      </div>

      <!-- CICLOS -->
      <div style="font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:#ff6b35;margin-bottom:13px;">Ciclos formativos recomendados</div>
      ${ciclosHTML}

    </div>

    <!-- FOOTER -->
    <div style="background:#1e1e2e;padding:18px 44px;display:flex;align-items:center;justify-content:space-between;">
      <div style="font-size:10px;color:rgba(255,255,255,0.45);line-height:1.7;">
        Generado por la plataforma <span style="color:rgba(255,255,255,0.7);font-weight:700;">Descubre-T</span> · CPIFP El Arenal<br/>
        Selección libre de estereotipos de género · Programa Dualiza-Orienta 2025-2026
      </div>
      <div style="font-size:11px;color:rgba(255,107,53,0.6);font-weight:900;text-transform:uppercase;letter-spacing:0.12em;">descubre-t</div>
    </div>

  </div>`;
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
        wrapper.style.position = "absolute";
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

        const fullHeight = wrapper.scrollHeight;
        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          width: 794,
          height: fullHeight,
          windowWidth: 794,
          windowHeight: fullHeight,
        });

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
        while (y < imgPxHeight) {
          const sliceH = Math.min(pagePxHeight, imgPxHeight - y);
          const isLastSlice = y + sliceH >= imgPxHeight;

          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgPxWidth;
          pageCanvas.height = sliceH;
          const pCtx = pageCanvas.getContext("2d");
          pCtx.drawImage(sourceCanvas, 0, y, imgPxWidth, sliceH, 0, 0, imgPxWidth, sliceH);

          const pageDataUrl = pageCanvas.toDataURL("image/png");
          const pagePngBytes = await (await fetch(pageDataUrl)).arrayBuffer();
          const pageImage = await pdfDoc.embedPng(pagePngBytes);

          const scaledHeight = (pagePtWidth / pageImage.width) * pageImage.height;
          // For the last slice use the exact content height so there's no blank space at the bottom
          const pageH = isLastSlice ? scaledHeight : pagePtHeight;
          const page = pdfDoc.addPage([pagePtWidth, pageH]);
          page.drawImage(pageImage, {
            x: 0,
            y: isLastSlice ? 0 : pagePtHeight - scaledHeight,
            width: pagePtWidth,
            height: scaledHeight,
          });

          y += sliceH;
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: "application/pdf" });

        if (Capacitor.isNativePlatform()) {
          const { Filesystem, Directory } = await import("@capacitor/filesystem");
          const { FileOpener } = await import("@capacitor-community/file-opener");

          const fileName = `informe-descubre-t-${Date.now()}.pdf`;
          const base64Data = arrayBufferToBase64(pdfBytes);
          const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache,
          });

          await FileOpener.open({
            filePath: savedFile.uri,
            contentType: "application/pdf",
            openWithDefault: true,
          });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "informe-descubre-t.pdf";
          a.click();

          // cleanup
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 300);
        }

        // cleanup wrapper
        setTimeout(() => {
          try {
            document.body.removeChild(wrapper);
          } catch (err) {
            console.warn("Failed to remove temp wrapper", err);
          }
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
      <main className="shell-scroll px-4 sm:px-5 md:px-6 pt-3 sm:pt-5 pb-6 sm:pb-8">
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
