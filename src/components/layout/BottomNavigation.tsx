import { NavLink } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { useI18n } from "@/i18n/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BottomNavigation() {
  const { t } = useI18n();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navItems = [
    { to: "/", icon: "home" as const },
    { to: "/calculs/L1", icon: "calculator" as const },
    { to: "/drives", icon: "folderopen" as const },
    { to: "/videos", icon: "play" as const },
  ];

  const moreItems = [
    { to: "/canevas", icon: "filetext" as const, label: t('navbar.canevas') || "Canevas" },
    { to: "/notes", icon: "stickynote" as const, label: t('navbar.notes') || "Notes" },
    { to: "/tutorials", icon: "graduationcap" as const, label: t('navbar.pfe') || "PFE" },
    { to: "/doctorat", icon: "bookopen" as const, label: t('navbar.doctorat') || "Doctorat" },
    { to: "/contact", icon: "mail" as const, label: "Contact" },
    { to: "/about", icon: "user" as const, label: "About" },
  ];

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground active:bg-muted/50"
    }`;

  return (
    <>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-50 mobile-safe-area"
      >
        <div className="mobile-navbar border-t border-border/20 mx-2 mb-2 rounded-t-2xl">
          <nav className="flex items-center justify-around h-16 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navCls}
                end={item.to === "/"}
              >
                <Icon name={item.icon} size={20} />
              </NavLink>
            ))}
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
                showMoreMenu 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground active:bg-muted/50"
              }`}
            >
              <Icon name="morevertical" size={20} />
            </button>
          </nav>
        </div>
      </motion.div>

      {/* More Menu Modal */}
      <AnimatePresence>
        {showMoreMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 170 }}
              className="fixed bottom-20 left-2 right-2 z-50 bg-card border border-border rounded-2xl shadow-lg max-h-[60vh] overflow-hidden"
            >
              <div className="p-4 h-full flex flex-col">
                <h3 className="font-semibold text-lg mb-4 text-center flex-shrink-0">More Options</h3>
                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                  {moreItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setShowMoreMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors flex-shrink-0"
                    >
                      <Icon name={item.icon} size={20} />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}