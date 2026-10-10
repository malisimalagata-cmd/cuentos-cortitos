/* =========================================================
   CONFIGURACIÓN DE ANUNCIOS  -  Cuentos Cortitos  (HilltopAds)
   ---------------------------------------------------------
   Cómo activarlos:

   1) Crea tu cuenta gratis en  https://hilltopads.com/signup?who=publisher
   2) Añade tu sitio (la URL donde publiques la app) y VERIFÍCALO
      (suben un archivo a la raíz, o te dan una meta para el <head>).
   3) Ve a  Manage Site & Zones > Add zone  y crea DOS zonas:
         - PORTADA  -> formato recomendado: MultiTag Banner (300x250)
         - CUENTO   -> formato recomendado: In-Page o MultiTag In-Page
      Copia el "Zone Code" de cada una (es un <script>...</script>).
   4) Pega cada código abajo, entre las comillas, tal cual te lo dieron.

   Mientras estén vacíos, la app funciona SIN anuncios.

   IMPORTANTE (contenido infantil):
   - Usa SOLO formatos Banner e In-Page. NO uses Popunder ni Popup:
     son intrusivos y suelen traer anuncios de citas/apuestas que NO
     se deben mostrar a niños.
   - En HilltopAds, revisa que tu sitio esté en categoría "Mainstream".
   - Revisa los anuncios que salen y bloquea los que no sean aptos.
   ========================================================= */
window.ADS_CONFIG = {
  enabled: true,   // false = desactiva los anuncios

  // Pega aquí el código de zona de HilltopAds (con <script> incluido)
  zones: {
    home:  "",   // código de la zona de la PORTADA
    story: ""    // código de la zona al TERMINAR un cuento
  },

  // Ponlo en true para VER cajas de ejemplo mientras te aprueban el sitio
  preview: false
};
