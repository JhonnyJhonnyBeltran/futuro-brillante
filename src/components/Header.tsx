import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HeaderProps {
  warnOnPrivacyAccess?: boolean;
  onPrivacyAccess?: () => void;
}

const Header = ({ warnOnPrivacyAccess = false, onPrivacyAccess }: HeaderProps) => {
  const navigate = useNavigate();

  const handlePrivacyAccess = useCallback(() => {
    onPrivacyAccess?.();
    navigate("/privacidad");
  }, [navigate, onPrivacyAccess]);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border safe-top">
      <div className="flex items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[15px] text-primary">Descubre-T</span>
            <span className="text-[11px] text-muted-foreground">CPIFP El Arenal</span>
          </div>
        </div>

        {warnOnPrivacyAccess ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                Privacidad
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Salir del cuestionario?</AlertDialogTitle>
                <AlertDialogDescription>
                  Si accedes a la política de privacidad ahora, se perderá el progreso del cuestionario y
                  tendrás que volver a empezar cuando regreses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handlePrivacyAccess}>Ir a privacidad</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Link
            to="/privacidad"
            onClick={handlePrivacyAccess}
            className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
          >
            Privacidad
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
