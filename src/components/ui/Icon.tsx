
import React from "react";
import * as Icons from "lucide-react";

export type IconName = 
  | "menu"
  | "x" 
  | "globe"
  | "calculator"
  | "harddrive"
  | "play"
  | "graduationcap"
  | "bookopen"
  | "stickynote"
  | "mail"
  | "phone"
  | "linkedin"
  | "heart"
  | "filetext"
  | "home"
  | "folderopen"
  | "morevertical"
  | "user"
  | "users"
  | "github"
  | "checkcircle"
  | "alerttriangle";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const iconMap: Record<IconName, React.ComponentType<any>> = {
  menu: Icons.Menu,
  x: Icons.X,
  globe: Icons.Globe,
  calculator: Icons.Calculator,
  harddrive: Icons.HardDrive,
  play: Icons.Play,
  graduationcap: Icons.GraduationCap,
  bookopen: Icons.BookOpen,
  stickynote: Icons.StickyNote,
  mail: Icons.Mail,
  phone: Icons.Phone,
  linkedin: Icons.Linkedin,
  heart: Icons.Heart,
  filetext: Icons.FileText,
  home: Icons.Home,
  folderopen: Icons.FolderOpen,
  morevertical: Icons.MoreVertical,
  user: Icons.User,
  users: Icons.Users,
  github: Icons.Github,
  checkcircle: Icons.CheckCircle,
  alerttriangle: Icons.AlertTriangle,
};

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={className} {...props} />;
}
