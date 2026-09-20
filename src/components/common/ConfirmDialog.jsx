"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Generic destructive/neutral confirmation dialog (delete account, discard changes, etc).
 */
export default function ConfirmDialog({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = true,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  destructive
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                    : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
            )}
            <div>
              <DialogTitle className="text-sm font-bold">{title}</DialogTitle>
              <DialogDescription className="text-[11px]">This action cannot be undone</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {description && (
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
        )}
        {children}

        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onConfirm}
            className={cn(
              destructive && "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500/30 dark:bg-rose-600 dark:hover:bg-rose-500"
            )}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
