import { DarkModeToggle } from "@/shared/components/DarkModeToggle";

export const Header = () => {
  return (
    <header className="bg-primary text-white border-b-4 border-secondary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 shrink-0">
              <img
                src="/favicon.svg"
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-headline font-bold leading-tight">
                Javeriana Lead & Events Manager
              </h1>
              <p className="text-primary-100 text-xs sm:text-sm mt-0.5 sm:mt-1 font-medium font-body uppercase tracking-wider">
                Dirección de Mercadeo
              </p>
            </div>
          </div>
          <div className="shrink-0 mt-1 sm:mt-0">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
