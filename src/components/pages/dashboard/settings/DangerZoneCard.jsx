"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function DangerZoneCard({ onConfirmDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-3 rounded-2xl border border-rose-200/80 bg-rose-50/40 p-5 dark:border-rose-900/40 dark:bg-rose-950/20 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-rose-900 dark:text-rose-300">Delete Account</h2>
            <p className="text-[11px] font-medium text-rose-600/80 dark:text-rose-400/80">
              Permanently delete account & all associated data
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-1.5 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/40"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete Account
        </Button>
      </section>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        icon={AlertTriangle}
        title="Delete Account"
        description="Are you sure you want to permanently delete your account? All your data, including courses, projects, and progress, will be lost."
        confirmLabel="Delete Account"
        onConfirm={() => {
          setOpen(false);
          onConfirmDelete?.();
        }}
      />
    </>
  );
}
