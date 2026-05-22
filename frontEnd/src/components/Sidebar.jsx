import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Camera, FileText, History, Settings } from 'lucide-react';

export function Sidebar() {
  const baseLinkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const activeLinkClasses = "bg-blue-600/10 text-blue-400 border border-blue-500/20";
  const inactiveLinkClasses = "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent";

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
          <Camera className="text-blue-500" /> YOLO VISION
        </h2>
        <p className="text-xs text-slate-500 mt-1">SISTEMA DE DETECÇÃO DE VESTIMENTAS</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/detections" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
          <Camera size={20} />
          <span className="font-medium">Detecções</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
          <FileText size={20} />
          <span className="font-medium">Relatórios</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
          <History size={20} />
          <span className="font-medium">Histórico</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Raspberry Pi 5 System
      </div>
    </aside>
  );
}
