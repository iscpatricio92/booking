// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Ruta a la carpeta del proyecto para que se cargue el next.config.js y las variables de entorno
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Permite mapear estilos y otros módulos estáticos
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Si usas alias de módulos, configúralos aquí (ejemplo)
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  // Generar coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

module.exports = createJestConfig(customJestConfig);