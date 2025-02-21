import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Si el usuario ya está autenticado, redirige a la página protegida
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/protected/dashboard");
    }
  }, [status, router]);

  if (status === "loading") return <p>Cargando...</p>;

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <button onClick={() => signIn("facebook")}>
        Iniciar sesión con Facebook
      </button>
      <br />
      <button onClick={() => signIn("google")}>
        Iniciar sesión con Google
      </button>
      <br />
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
}