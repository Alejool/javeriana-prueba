/**
 * Formatea una fecha a formato legible en español colombiano
 * @param date - Fecha a formatear (string o Date)
 * @returns Fecha formateada en formato largo (ej: "24 de abril de 2026")
 */
export const formatDateLong = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatea una fecha a formato corto en español colombiano
 * @param date - Fecha a formatear (string o Date)
 * @returns Fecha formateada en formato corto (ej: "24/04/2026")
 */
export const formatDateShort = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Formatea una fecha a formato medio en español colombiano
 * @param date - Fecha a formatear (string o Date)
 * @returns Fecha formateada en formato medio (ej: "24 abr. 2026")
 */
export const formatDateMedium = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
