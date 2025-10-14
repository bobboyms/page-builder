import type { Component, JSX } from "solid-js";

export const IconTrash: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

export const IconCopy: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const IconArrowUp: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

export const IconArrowDown: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export const IconGrabber: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

export const IconBracketsDivider = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="white" stroke-width="5.5" stroke-linecap="round">
      <path d="M 40 25 V 55" />
      <path d="M 15 10 H 17 A 8 8 0 0 1 25 18 V 62 A 8 8 0 0 1 17 70 H 15" />
      <path d="M 65 10 H 63 A 8 8 0 0 0 55 18 V 62 A 8 8 0 0 0 63 70 H 65" />
    </g>
  </svg>
);

export const IconSplitVertical = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" {...props}>
    <rect x="5" y="6" width="5" height="12" rx="0" />
    <rect x="14" y="6" width="5" height="12" rx="0" />
  </svg>
);

export const IconSplitHorizontal = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" {...props}>
    <rect x="6" y="5" width="12" height="5" rx="0" />
    <rect x="6" y="14" width="12" height="5" rx="0" />
  </svg>
);

export const IconGrid = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" {...props}>
    <rect x="5" y="5" width="6" height="6" rx="0" />
    <rect x="13" y="5" width="6" height="6" rx="0" />
    <rect x="5" y="13" width="6" height="6" rx="0" />
    <rect x="13" y="13" width="6" height="6" rx="0" />
  </svg>
);

export const IconFixed = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="butt">
      <path d="M 30,30 V 70" />
      <path d="M 70,30 V 70" />
      <path d="M 30,50 H 70" />
    </g>
  </svg>
);

export const IconHug = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="butt" stroke-linejoin="miter">
      <polyline points="15,20 35,50 15,80" />
      <polyline points="85,20 65,50 85,80" />
    </g>
  </svg>
);

export const IconFill = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" {...props}>
    <path d="M4 12H20" />
    <path d="M8 8L4 12L8 16" />
    <path d="M16 8L20 12L16 16" />
  </svg>
);

export const IconW = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M4 4L8 20L12 8L16 20L20 4" />
  </svg>
);

export const IconH = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}>
    <path d="M6 4V20M18 4V20M6 12H18" />
  </svg>
);

// export const IconPaddingW = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
//   <svg viewBox="0 0 120 90" stroke-width="8" stroke="currentColor" fill="none" {...props}>
//     <rect width="120" height="90" />
//     <rect x="16" y="15" width="8" height="60" />
//     <rect x="96" y="15" width="8" height="60" />
//     <circle cx="60" cy="45" r="18" />
//   </svg>
// );

export const IconPaddingW = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 120 90" stroke="currentColor" {...props}>
    {/* Fundo removido para transparência */}
    <rect x="16" y="15" width="8" height="60" fill="#FFFFFF" />
    <rect x="96" y="15" width="8" height="60" fill="#FFFFFF" />
    <circle cx="60" cy="45" r="18" fill="none" stroke="#FFFFFF" stroke-width="8" />
  </svg>
);

export const IconPaddingH = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 120 90" stroke="currentColor" {...props}>
    <g transform="rotate(90 60 45)">
      <rect x="16" y="15" width="8" height="60" fill="#FFFFFF" />
      <rect x="96" y="15" width="8" height="60" fill="#FFFFFF" />
      <circle cx="60" cy="45" r="18" fill="none" stroke="#FFFFFF" stroke-width="8" />
    </g>
  </svg>
);


export const IconOpenEyes = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg viewBox="0 0 256 170" stroke="currentColor" {...props}>

    <g fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">

      <path d="M16 85
             C64 16, 192 16, 240 85
             C192 154, 64 154, 16 85 Z"/>

      <circle cx="128" cy="85" r="32" />
    </g>
  </svg>
);

export const IconClosedEyes = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    width={256}
    height={170}
    viewBox="0 0 256 170"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <g stroke-width={14} stroke-linecap="round">
      {/* Pálpebra mais centralizada e com maior amplitude vertical */}
      <path d="M16 70 C64 150, 192 150, 240 70" />
      {/* Cílios ajustados para proporção semelhante */}
      <line x1="60" y1="120" x2="50" y2="145" />
      <line x1="96" y1="135" x2="86" y2="160" />
      <line x1="128" y1="140" x2="128" y2="165" />
      <line x1="160" y1="135" x2="170" y2="160" />
      <line x1="196" y1="120" x2="206" y2="145" />
    </g>
  </svg>
);



export const IconRound = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="butt">
      <path d="M32 116 V64 A34 34 0 0 1 66 30 H116" />
      <path d="M140 30 H190 A34 34 0 0 1 224 64 V116" />
      <path d="M32 140 V192 A34 34 0 0 0 66 226 H116" />
      <path d="M140 226 H190 A34 34 0 0 0 224 192 V140" />
    </g>
  </svg>

);

export const IconOpacity = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    viewBox="0 0 26 26"
    fill="none"
    style={{ display: "block" }}            // elimina o “pé”
    {...props}
  >
    {/* moldura */}
    <rect x="4.6" y="0.6" width="20.8" height="20.8" rx="2.4"
      stroke="currentColor" stroke-width="1.8" />

    {/* pixels (mantidos) */}
    <g fill="#D9D9D9">
      <rect opacity="0.7" x="10" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="7.5" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="10" y="16" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="12.5" y="13.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="15" y="11" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="17.5" y="8.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="20" y="6" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="22.5" y="3.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="12.5" y="16" width="1.25" height="1.25" rx="0.625" />
      <rect x="12.5" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="15" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="17.5" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="20" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="22.5" y="18.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="15" y="16" width="1.25" height="1.25" rx="0.625" />
      <rect x="17.5" y="16" width="1.25" height="1.25" rx="0.625" />
      <rect x="20" y="16" width="1.25" height="1.25" rx="0.625" />
      <rect x="22.5" y="16" width="1.25" height="1.25" rx="0.625" />
      <rect x="17.5" y="13.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="20" y="13.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="22.5" y="13.5" width="1.25" height="1.25" rx="0.625" />
      <rect x="20" y="11" width="1.25" height="1.25" rx="0.625" />
      <rect x="22.5" y="11" width="1.25" height="1.25" rx="0.625" />
      <rect x="22.5" y="8.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="15" y="13.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="17.5" y="11" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="20" y="8.5" width="1.25" height="1.25" rx="0.625" />
      <rect opacity="0.7" x="22.5" y="6" width="1.25" height="1.25" rx="0.625" />
    </g>
  </svg>
);




