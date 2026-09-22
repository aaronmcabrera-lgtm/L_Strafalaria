import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import styles from "./portafolio.module.css";

// No queremos que esta ruta aparezca en buscadores: solo se comparte por link directo.
export const metadata: Metadata = {
  title: "Portafolio — AAMCF",
  robots: { index: false, follow: false },
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// --- Contenido editable -----------------------------------------------
// Cambia estas rutas por tus imágenes reales una vez que las tengas en /public/portafolio/
const unitipsPiezas = [
  { src: "/portafolio/unitips-01.png", alt: "Pieza gráfica Unitips 01" },
  { src: "/portafolio/unitips-02.png", alt: "Pieza gráfica Unitips 02" },
  { src: "/portafolio/unitips-03.png", alt: "Pieza gráfica Unitips 03" },
  { src: "/portafolio/unitips-04.png", alt: "Pieza gráfica Unitips 04" },
  { src: "/portafolio/unitips-05.png", alt: "Pieza gráfica Unitips 05" },
];

// Sub-bloque dentro de Hoja 01 — Ads Unitips Chile
// Cambia estas rutas por tus imágenes reales y el texto de "caption".
const adsUnitipsChile = {
  vertical: "/portafolio/unitips-chile-ads-01.png",
  squareA: "/portafolio/unitips-chile-ads-02.png",
  squareB: "/portafolio/unitips-chile-ads-03.png",
  caption:
    "Piezas gráficas diseñadas para campaña de anuncios en Meta, mercado Chile, promoviendo el curso Preuniversitario. Composición vectorial e identidad gráfica adaptadas a formato feed y story para conversión digital.",
};

// Nueva sección — Ads de Strafalaria para campaña de Marketing Digital
// Cambia estas rutas por tus imágenes reales una vez que las tengas en /public/portafolio/
const adsStrafalaria = [
  { src: "/portafolio/strafalaria-ads-01.png", alt: "Ad Strafalaria 01" },
  { src: "/portafolio/strafalaria-ads-02.png", alt: "Ad Strafalaria 02" },
  { src: "/portafolio/strafalaria-ads-03.png", alt: "Ad Strafalaria 03" },
];

// Sección Strafalaria — Diseño y Producción: 3 ejemplos en composición tipo mosaico.
// Cambia estas rutas por tus imágenes reales y el texto de "caption" por la
// descripción real de cada ejemplo.
const mosaicoEjemplo1 = {
  imgBig: "/portafolio/strafalaria-mosaico-01-big.png",
  imgSmall: "/portafolio/strafalaria-mosaico-01-small.png",
  captionTitle: "Desarrollo del dije Águilas Blancas:",
  captionBody:
    "ilustración conceptual y hoja técnica con detalle de proporciones y acabados, apoyadas con IA generativa (",
  captionIA: "Claude, ChatGPT",
  captionEnd: ").",
};

const mosaicoEjemplo2 = {
  imgShort: "/portafolio/strafalaria-mosaico-02-a.png",
  imgTall: "/portafolio/strafalaria-mosaico-02-b.png",
  captionTitle: "Proceso de diseño para el cliente TWO4 —",
  captionBody:
    "del boceto a mano al render final, ambos apoyados con IA generativa (",
  captionIA: "Claude, ChatGPT",
  captionEnd: ").",
};

const mosaicoEjemplo3 = {
  imgA: "/portafolio/strafalaria-mosaico-03-a.png",
  imgB: "/portafolio/strafalaria-mosaico-03-b.png",
  banner: "/portafolio/strafalaria-mosaico-03-banner.png",
  captionTitle: "Banners comerciales para Strafalaria:",
  captionBody:
    "diseñados para impulsar la venta a través del simulador en la landing page. Hechos en Photoshop siguiendo la identidad visual de la marca, apoyados también en IA generativa (",
  captionIA: "Claude, ChatGPT",
  captionEnd: ").",
};
// ------------------------------------------------------------------------

export default function PortafolioPage() {
  return (
    <main className={`${styles.page} ${playfair.variable}`}>
      {/* ENCABEZADO — misma portada usada en el reel */}
      <div className={styles.headerBanner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portafolio/header-portada.jpg"
          alt="Aarón Cabrera — Graphic & Motion Designer"
          className={styles.headerImg}
        />
      </div>

      <div className={styles.sheetBorder}>
        {/* HERO */}
        <header className={styles.hero}>
          <svg className={styles.scatter} aria-hidden="true" viewBox="0 0 900 400" preserveAspectRatio="none">
            {/* Rombos */}
            <path d="M120 70 l14 14 -14 14 -14 -14 z" fill="none" stroke="#9084bd" strokeWidth="1.5" opacity="0.6" />
            <path d="M760 260 l10 10 -10 10 -10 -10 z" fill="none" stroke="#211f1a" strokeWidth="1.2" opacity="0.4" />
            {/* Estrellas de 4 puntas */}
            <path d="M60 200 l4 14 14 4 -14 4 -4 14 -4 -14 -14 -4 14 -4 z" fill="#211f1a" opacity="0.55" />
            <path d="M830 90 l3 10 10 3 -10 3 -3 10 -3 -10 -10 -3 10 -3 z" fill="#d97e46" opacity="0.7" />
            <path d="M470 40 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z" fill="#211f1a" opacity="0.4" />
            {/* Órbitas curvas con punto */}
            <path d="M40 330 Q 220 260 340 300" fill="none" stroke="#9084bd" strokeWidth="1" opacity="0.5" />
            <circle cx="340" cy="300" r="3.5" fill="#9084bd" opacity="0.8" />
            <path d="M560 60 Q 700 130 840 110" fill="none" stroke="#d97e46" strokeWidth="1" opacity="0.6" />
            <circle cx="840" cy="110" r="3.5" fill="#d97e46" opacity="0.85" />
          </svg>
          <h1 className={styles.name}>Aarón Cabrera</h1>
          <p className={styles.role}>Graphic &amp; Motion Designer</p>
          <p className={styles.intro}>
            Proyectos de diseño e imagen: identidad visual, gráficos de
            campaña y producción de contenido.
          </p>
        </header>

        {/* HOJA 01 — UNITIPS */}
        <section className={styles.sheet} aria-labelledby="hoja-01">
          <div className={styles.sheetHead}>
            <h2 id="hoja-01" className={styles.sheetTitle}>
              Unitips, Diseño Gráfico
            </h2>
          </div>
          <p className={styles.sheetCopy}>
            Ecosistema de piezas gráficas desarrollada y aplicada para
            Unitips, incluyendo Identidad Visual, Portadas y gráficos para
            Blogs y Ads multiformato para Marketing Digital.
          </p>
          <div className={styles.gridCompact}>
            {unitipsPiezas.map((pieza) => (
              <figure key={pieza.src} className={styles.frame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pieza.src} alt={pieza.alt} className={styles.frameImg} />
              </figure>
            ))}
          </div>

          {/* Sub-bloque — Ads Unitips Chile: vertical + 2 cuadradas, alineadas a la izquierda */}
          <div className={styles.adsUnitipsBlock}>
            <h3 className={styles.adsUnitipsTitle}>
              Unitips Chile - Diseño de Ads para campaña de Marketing Digital
            </h3>
            <div className={styles.adsUnitipsRow}>
              <div className={styles.adsVertical}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={adsUnitipsChile.vertical}
                    alt="Ads Unitips Chile — imagen vertical"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
              <div className={styles.adsSquare}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={adsUnitipsChile.squareA}
                    alt="Ads Unitips Chile — imagen cuadrada"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
              <div className={styles.adsSquare}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={adsUnitipsChile.squareB}
                    alt="Ads Unitips Chile — imagen cuadrada"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
            </div>
            <p className={styles.mosaicCaption}>{adsUnitipsChile.caption}</p>
          </div>
        </section>

        {/* Separador — nod a la línea de tiempo de edición */}
        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.timelineTrack} />
          <div className={styles.timelinePlayhead} />
          <div style={{ display: "flex", gap: 10, width: "100%", position: "relative" }}>
            <div className={styles.timelineBarOrange} style={{ width: "22%" }} />
            <div className={styles.timelineBarPurple} style={{ width: "14%" }} />
            <div className={styles.timelineBarPurple} style={{ width: "30%" }} />
            <div className={styles.timelineBarOrange} style={{ width: "16%" }} />
          </div>
        </div>

        {/* HOJA 02 — STRAFALARIA */}
        <section className={styles.sheet} aria-labelledby="hoja-02">
          <div className={styles.sheetHead}>
            <h2 id="hoja-02" className={styles.sheetTitle}>
              Strafalaria — Diseño y Producción
            </h2>
          </div>
          <p className={styles.sheetCopy}>
            El proceso detrás de cada pieza: del trazo a mano al render final
            que se usa para presentar la propuesta antes de fabricar.
          </p>
          {/* Grupo superior: Ejemplo 1 | divisor | Ejemplo 2 */}
          <div className={styles.mosaicTop}>
            {/* Ejemplo 1 — imagen grande + imagen chica con caption debajo */}
            <div className={styles.mosaicA}>
              <div className={styles.imgBig}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicoEjemplo1.imgBig}
                    alt="Strafalaria — ejemplo de diseño gráfico, imagen principal"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
              <div className={styles.imgSmall}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicoEjemplo1.imgSmall}
                    alt="Strafalaria — ejemplo de diseño gráfico, imagen secundaria"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
              <div className={styles.caption}>
                <p className={styles.mosaicCaption}>
                  <strong>{mosaicoEjemplo1.captionTitle}</strong>{" "}
                  {mosaicoEjemplo1.captionBody}
                  <strong>{mosaicoEjemplo1.captionIA}</strong>
                  {mosaicoEjemplo1.captionEnd}
                </p>
              </div>
            </div>

            <div className={styles.mosaicVDivider} aria-hidden="true" />

            {/* Ejemplo 2 — misma composición que el Ejemplo 1, espejada: */}
            {/* caption + imagen chica a la izquierda, imagen grande a la derecha */}
            <div className={styles.mosaicB}>
              <div className={styles.caption}>
                <p className={styles.mosaicCaption}>
                  <strong>{mosaicoEjemplo2.captionTitle}</strong>{" "}
                  {mosaicoEjemplo2.captionBody}
                  <strong>{mosaicoEjemplo2.captionIA}</strong>
                  {mosaicoEjemplo2.captionEnd}
                </p>
              </div>
              <div className={styles.imgSmall}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicoEjemplo2.imgShort}
                    alt="Strafalaria — ejemplo de diseño gráfico, imagen secundaria"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
              <div className={styles.imgBig}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicoEjemplo2.imgTall}
                    alt="Strafalaria — ejemplo de diseño gráfico, imagen principal"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className={styles.mosaicHDivider} aria-hidden="true" />

          {/* Ejemplo 3 — caption + fila de 3 imágenes, banner ancho debajo */}
          <div className={styles.mosaicC}>
            <div className={styles.top}>
              <p className={styles.mosaicCaption}>
                <strong>{mosaicoEjemplo3.captionTitle}</strong>{" "}
                {mosaicoEjemplo3.captionBody}
                <strong>{mosaicoEjemplo3.captionIA}</strong>
                {mosaicoEjemplo3.captionEnd}
              </p>
              <div className={styles.row3}>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicoEjemplo3.imgA}
                    alt="Strafalaria — ejemplo de diseño gráfico"
                    className={styles.frameImg}
                  />
                </figure>
                <figure className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicoEjemplo3.imgB}
                    alt="Strafalaria — ejemplo de diseño gráfico"
                    className={styles.frameImg}
                  />
                </figure>
              </div>
            </div>
            <div className={styles.banner}>
              <figure className={styles.frame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mosaicoEjemplo3.banner}
                  alt="Strafalaria — ejemplo de diseño gráfico, banner ancho"
                  className={styles.frameImg}
                />
              </figure>
            </div>
          </div>
        </section>

        {/* Separador — nod a la línea de tiempo de edición */}
        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.timelineTrack} />
          <div className={styles.timelinePlayhead} />
          <div style={{ display: "flex", gap: 10, width: "100%", position: "relative" }}>
            <div className={styles.timelineBarPurple} style={{ width: "18%" }} />
            <div className={styles.timelineBarOrange} style={{ width: "26%" }} />
            <div className={styles.timelineBarPurple} style={{ width: "12%" }} />
            <div className={styles.timelineBarOrange} style={{ width: "20%" }} />
          </div>
        </div>

        {/* HOJA 03 — STRAFALARIA ADS */}
        <section className={styles.sheet} aria-labelledby="hoja-03">
          <div className={styles.sheetHead}>
            <span className={styles.sheetLabel}>Hoja 03</span>
            <h2 id="hoja-03" className={styles.sheetTitle}>
              Strafalaria — Diseño de Ads para campaña de Marketing Digital
            </h2>
          </div>
          <p className={styles.sheetCopy}>
            Piezas creativas diseñadas para la campaña de pauta digital de la
            marca: artes multiformato pensados para conversión, para Meta Ads
            y puntos de contacto de venta directa.
          </p>
          <div className={styles.gridCompact}>
            {adsStrafalaria.map((pieza) => (
              <figure key={pieza.src} className={styles.frame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pieza.src} alt={pieza.alt} className={styles.frameImg} />
              </figure>
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <footer className={styles.footer}>
          <p className={styles.footerLine}>
            DEMO REEL{" "}
            <a
              href="https://vimeo.com/1228611309"
              className={styles.link}
              aria-label="Ver demo reel en Vimeo"
            >
              <svg
                className={styles.vimeoIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M22.396 7.164c-.1 2.187-1.626 5.183-4.578 8.99-3.052 3.973-5.636 5.96-7.752 5.96-1.312 0-2.42-1.211-3.327-3.634-.605-2.223-1.21-4.447-1.814-6.67-.673-2.422-1.393-3.634-2.16-3.634-.167 0-.75.35-1.751 1.05l-1.014-1.31c1.104-.972 2.192-1.944 3.264-2.917 1.474-1.276 2.58-1.947 3.318-2.014 1.744-.168 2.818.983 3.223 3.454.437 2.66.74 4.315.909 4.964.505 2.302 1.06 3.452 1.665 3.452.47 0 1.176-.745 2.117-2.236.939-1.49 1.442-2.625 1.51-3.406.135-1.286-.372-1.93-1.51-1.93-.538 0-1.092.123-1.66.367 1.102-3.613 3.206-5.37 6.313-5.27 2.302.068 3.387 1.558 3.253 4.47z"
                />
              </svg>
              vimeo.com/1228611309
            </a>
          </p>
          <p className={styles.footerLine}>
            <a href="mailto:aaronmcabrera@gmail.com" className={styles.link}>
              aaronmcabrera@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
