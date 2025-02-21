// pages/protected/dashboard.tsx

import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession, signOut } from "next-auth/react";

interface DashboardProps {
  // Puedes definir props adicionales si lo requieres
}

const Dashboard: NextPage<DashboardProps> = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {session?.user?.name}</p>
      <p>Correo: {session?.user?.email}</p>
      <img src={session?.user?.image as string} alt={session?.user?.name as string} />
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;