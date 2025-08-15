import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function MobileHeader({ 
  title = "SmartCalc+", 
  showBack = false, 
  onBack 
}: MobileHeaderProps) {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 mobile-navbar border-b border-border/10"
    >
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          {showBack && onBack && (
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center active:scale-95 transition-all"
            >
              <Icon name="x" size={18} />
            </button>
          )}
          <h1 className="font-bold text-lg truncate">{title}</h1>
        </div>
        
        <ThemeSwitcher />
      </div>
    </motion.header>
  );
}