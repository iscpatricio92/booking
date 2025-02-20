// pages/index.tsx

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Bienvenido a la Beauty Spa</h1>
      {session ? (
        <>
          <p>Hola, {session.user?.name}</p>
          <Link href="/protected/dashboard">
            Ir al Dashboard
          </Link>
        </>
      ) : (
        <Link href="/login">
          Iniciar sesión
        </Link>
      )}
    </div>
  );
}