"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Save, Check } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import SaveToast from "@/components/common/SaveToast";
import { Button } from "@/components/ui/button";

import AccountDetailsCard from "@/components/pages/dashboard/settings/AccountDetailsCard";
import SecurityCard from "@/components/pages/dashboard/settings/SecurityCard";
import AppearanceCard from "@/components/pages/dashboard/settings/AppearanceCard";
import NotificationsCard, { NOTIFS } from "@/components/pages/dashboard/settings/NotificationsCard";
import DataPrivacyCard from "@/components/pages/dashboard/settings/DataPrivacyCard";
import DangerZoneCard from "@/components/pages/dashboard/settings/DangerZoneCard";

function useSettingsForm() {
  const [form, setForm] = useState({
    name: "Digvijay",
    email: "karandedigvijay2@gmail.com",
    accountId: "INT-2026-001",
    accountType: "Intern",
    currentPass: "",
    newPass: "",
    confirmPass: "",
    twoFactor: true,
    language: "English",
    compactSidebar: false,
    notifications: Object.fromEntries(NOTIFS.map(([key]) => [key, true])),
  });

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const updateNotif = (key) =>
    setForm((p) => ({ ...p, notifications: { ...p.notifications, [key]: !p.notifications[key] } }));

  return { form, update, updateNotif };
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const { form, update, updateNotif } = useSettingsForm();
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setShowToast(true);
    setTimeout(() => setSaved(false), 2000);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ account: form, theme }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "settings.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      <SaveToast
        show={showToast}
        title="Settings saved"
        description="Your changes have been saved successfully."
        onClose={() => setShowToast(false)}
      />

      <PageHeader title="Settings" subtitle="Manage your profile, security, appearance, and system preferences">
        <Button type="button" size="sm" onClick={handleSave} className="gap-1.5 bg-blue-600 text-white hover:bg-blue-700">
          {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          {saved ? "Saved" : "Save Changes"}
        </Button>
      </PageHeader>

      <AccountDetailsCard form={form} update={update} />

      <div className="grid gap-5 lg:grid-cols-2">
        <SecurityCard form={form} update={update} />
        <AppearanceCard theme={theme} setTheme={setTheme} mounted={mounted} form={form} update={update} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <NotificationsCard notifications={form.notifications} onToggle={updateNotif} />
        <DataPrivacyCard onExport={handleExport} />
      </div>

      <DangerZoneCard onConfirmDelete={() => {}} />
    </div>
  );
}
