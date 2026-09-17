import React, { createContext, useContext, useState } from "react";
import { SiteSettings } from "@/types/settings";
import { getSiteSettings, saveSiteSettings } from "@/services/settingsService";

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  const updateSettings = (updates: Partial<SiteSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    saveSiteSettings(updated);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettingsContext must be used within SettingsProvider");
  return ctx;
};
