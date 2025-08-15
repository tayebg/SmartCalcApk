
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const developers = [
    {
      name: "Tayeb Bekkouche",
      github: "tayebg",
      icon: "user" as const
    },
    {
      name: "Ilyes Bakkar", 
      github: "ilyes-bkr",
      icon: "users" as const
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden touch-action-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-sm bg-gradient-to-br from-card to-card/80 border-2 border-primary/20 shadow-2xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-xl font-bold mb-1">SmartCalc+</h1>
                <p className="text-xs opacity-90">Development Team</p>
              </motion.div>
            </div>

            {/* Developers Section */}
            <div className="p-4 space-y-4">
              {developers.map((dev, index) => (
                <motion.div
                  key={dev.github}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-muted/50 to-transparent border border-border/50"
                >
                   {/* Profile Icon */}
                   <div className="flex-shrink-0">
                     <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                       <Icon name={dev.icon} size={24} className="text-primary" />
                     </div>
                   </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-foreground break-words">
                      {dev.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary mb-1">
                      Full Stack Developer
                    </p>
                    
                    {/* GitHub */}
                    <a
                      href={`https://github.com/${dev.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon name="github" size={12} />
                      <span>@{dev.github}</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-muted/30 to-transparent p-4 border-t border-border/50"
            >
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-sm text-foreground">About SmartCalc+</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A comprehensive academic calculator and resource platform for students and professionals.
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground pt-1">
                  <span>Version 2.0</span>
                  <span>•</span>
                  <span>© 2025</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
