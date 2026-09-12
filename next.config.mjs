const nextConfig = {
  // No hay página en la raíz: el idioma va siempre en la ruta (D9).
  async redirects() {
    return [{ source: "/", destination: "/es", permanent: false }];
  },
};

export default nextConfig;
