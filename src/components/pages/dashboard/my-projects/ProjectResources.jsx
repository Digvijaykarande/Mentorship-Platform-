"use client";

import { useState } from "react";
import { Paperclip, UploadCloud, CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import ResourceRow from "./ResourceRow";
import UploadResourceDialog from "./UploadResourceDialog";
import { resources as initialResources } from "./projectsData";

export default function ProjectResources() {
  const [resourceList, setResourceList] = useState(initialResources || []);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "picture_as_pdf" });
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleUpload = () => {
    if (!form.name.trim()) return;
    setResourceList((prev) => [
      { id: Date.now(), name: form.name, meta: "Added by Intern • Just now", icon: form.category, tone: "primary-fixed", action: "download" },
      ...prev,
    ]);
    setIsUploadOpen(false);
    showToast(`"${form.name}" uploaded successfully!`);
    setForm({ name: "", category: "picture_as_pdf" });
  };

  const handleDownload = (name) => showToast(`Downloading "${name}"...`);

  return (
    <>
      <SectionCard
        icon={Paperclip}
        title="Resources & Specs"
        description="Internship reference materials"
        iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
        action={
          <Button type="button" size="sm" variant="secondary" onClick={() => setIsUploadOpen(true)} className="gap-1.5">
            <UploadCloud className="h-3.5 w-3.5" />
            Upload
          </Button>
        }
        contentClassName="space-y-3 p-5"
      >
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {resourceList.map((resource) => (
            <ResourceRow key={resource.id} resource={resource} onDownload={handleDownload} />
          ))}
        </div>
      </SectionCard>

      <UploadResourceDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        form={form}
        onFormChange={(key, val) => setForm((prev) => ({ ...prev, [key]: val }))}
        onSubmit={handleUpload}
      />
    </>
  );
}
