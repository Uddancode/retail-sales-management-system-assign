import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  ChevronRight,
  Package,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  children?: { label: string; active?: boolean }[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileText, label: 'All Reports' },
  { 
    icon: TrendingUp, 
    label: 'Analyze',
    children: [
      { label: 'Performance Deviation' },
      { label: 'Find Needles' },
    ]
  },
  { icon: FileSpreadsheet, label: 'Manage Tables', active: true },
];

const bottomNavItems: NavItem[] = [
  { 
    icon: Package, 
    label: 'Preferences', 
    children: [
      { label: 'Profile Sessions', active: true },
      { label: 'Find Sessions' },
    ]
  },
  { icon: Users, label: 'User Guides' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>('Preferences');

  const toggleExpand = (label: string) => {
    setExpanded(prev => prev === label ? null : label);
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isExpanded = expanded === item.label;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.label}>
        <button
          onClick={() => hasChildren && toggleExpand(item.label)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
            item.active 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            <ChevronRight 
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isExpanded && "rotate-90"
              )} 
            />
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="ml-7 mt-1 space-y-1 animate-fade-in">
            {item.children!.map(child => (
              <button
                key={child.label}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  child.active 
                    ? "text-primary" 
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  child.active ? "bg-primary" : "bg-sidebar-foreground/30"
                )} />
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">R</span>
          </div>
          <span className="font-semibold text-foreground">Retail</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(renderNavItem)}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map(renderNavItem)}
      </div>
    </aside>
  );
}
