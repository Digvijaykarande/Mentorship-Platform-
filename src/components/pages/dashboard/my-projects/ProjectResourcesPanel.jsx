"use client";

import { useEffect, useState } from "react";
import { Paperclip, UploadCloud, CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import ResourceRow from "./ResourceRow";
import UploadResourceDialog from "./UploadResourceDialog";
import { programResources } from "./projectsData";

export default function ProjectResourcesPanel({ project }) {
  const [resourceList, setResourceList] = useState(project.resources || []);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "picture_as_pdf" });
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setResourceList(project.resources || []);
  }, [project.id, project.resources]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleUpload = () => {
    if (!form.name.trim()) return;
    setResourceList((prev) => [
      {
        id: `${project.id}-${Date.now()}`,
        name: form.name,
        meta: "Added by Intern • Just now",
        icon: form.category,
        tone: "primary-fixed",
        action: "download",
      },
      ...prev,
    ]);
    setIsUploadOpen(false);
    showToast(`"${form.name}" uploaded successfully!`);
    setForm({ name: "", category: "picture_as_pdf" });
  };

  const handleDownload = (name) => showToast(`Downloading "${name}"...`);
  const allResources = [...resourceList, ...programResources];

  return (
    <>
    <div style={{ minWidth: "65%" }}>
      <SectionCard
        icon={Paperclip}
        title="Resources & Specs"
        description={`${project.name} • Project references & program documentation`}
        iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
        action={
          <Button
            type="button"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            className="gap-1.5 bg-indigo-600 font-medium text-white shadow-xs hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            <UploadCloud className="h-4 w-4" />
            Upload Spec
          </Button>
        }
        contentClassName="space-y-4 p-5 sm:p-6"
      >
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-500/15 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
        <div className="space-y-3">
          <p className="px-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Project Deliverables & Assets
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {allResources.length ? (
              allResources.map((resource) => (
                <ResourceRow
                  key={resource.id}
                  resource={resource}
                  onDownload={handleDownload}
                />
              ))
            ) : (
              <p className="col-span-full rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900/40">
                No resources uploaded for this project yet. Click &quot;Upload
                Spec&quot; to add one.
              </p>
            )}
          </div>
        </div>
      </SectionCard>
      <UploadResourceDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        form={form}
        onFormChange={(key, val) =>
          setForm((prev) => ({ ...prev, [key]: val }))
        }
        onSubmit={handleUpload}
      />
      </div>
    </>
  );
}
