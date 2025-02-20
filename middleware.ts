// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Opcional: se pueden agregar callbacks para personalizar la autorización
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Configuración: protege todas las rutas bajo /protected
export const config = {
  matcher: ["/protected/:path*"],
};