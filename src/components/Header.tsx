const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border safe-top">
      <div className="flex items-center gap-3 px-6 py-4">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[15px] text-primary">Descubre-T</span>
          <span className="text-[11px] text-muted-foreground"> CPIFP El Arenal</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
