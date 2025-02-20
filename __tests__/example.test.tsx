import { render, screen } from '@testing-library/react';
import HomePage from '../pages/index';
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom';

describe('Página de Inicio', () => {
  it('muestra el título de bienvenida', () => {
    render(
      <SessionProvider session={null}>
        <HomePage />
      </SessionProvider>
    );
    expect(
      screen.getByRole('heading', { name: /Bienvenido a la Beauty Spa/i })
    ).toBeInTheDocument();
  });
});