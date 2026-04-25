const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border safe-top">
      <div className="flex items-center gap-3 px-6 py-4">
        <div
          className="flex items-center justify-center font-black text-white shrink-0"
          style={{
            width: 38,
            height: 38,
            borderRadius: "0.75rem",
            background: "var(--gradient-primary)",
            boxShadow: "var(--shadow-orange)",
          }}
          aria-hidden
        >
          EA
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[15px] text-primary">CPIFP El Arenal</span>
          <span className="text-[11px] text-muted-foreground">Centro Público Integrado de FP</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
