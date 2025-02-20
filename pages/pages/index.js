// pages/index.js

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Bienvenido, {session.user.name}!</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    );
  }
  return (
    <div>
      <p>No estás autenticado.</p>
      <button onClick={() => signIn("facebook")}>
        Iniciar sesión con Facebook
      </button>
    </div>
  );
}