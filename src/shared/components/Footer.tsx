export const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-primary text-white mt-16 py-8 border-t-4 border-secondary-500">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center  gap-2 mb-4">
            <img src="/favicon.svg" alt="Logo" className="w-6 h-6" />
            <span className="font-headline font-bold text-xl">
              Pontificia Universidad Javeriana
            </span>
          </div>
          <p className="text-sm text-primary-100 font-body">
            © 2026 Prueba técnica
          </p>
        </div>
      </div>
    </footer>
  );
};
