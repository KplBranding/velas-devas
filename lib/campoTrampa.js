// Campo trampa de los formularios: invisible para las personas; los bots que
// rellenan todo lo completan y el servidor rechaza el envío. El nombre es raro
// a propósito para que el navegador no lo autocomplete.
// Vive en su propio archivo porque lo importan componentes del navegador
// (lib/antiabuso.js es solo de servidor).
export const CAMPO_TRAMPA = 'confirmacion_extra';
