"use client";

import { FilePlus, UploadCloud } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  { value: "picture_as_pdf", label: "PDF Specification / Brief" },
  { value: "draw", label: "Figma / Design Specs" },
  { value: "database", label: "Database Schema / Migration" },
  { value: "terminal", label: "Code Script / CLI Utility" },
];

export default function UploadResourceDialog({ open, onOpenChange, form, onFormChange, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm font-bold">
            <FilePlus className="h-4.5 w-4.5 text-indigo-600" />
            Upload Internship Asset
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold">Document / Asset Title</Label>
            <Input
              required
              placeholder="e.g. Module 2 Deliverable Architecture.pdf"
              value={form.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold">Asset Category</Label>
            <Select value={form.category} onValueChange={(val) => onFormChange("category", val)}>
              <SelectTrigger className="w-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center dark:border-slate-800 dark:bg-slate-900/30">
            <UploadCloud className="h-6 w-6 text-indigo-500" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Click to choose file or drag & drop</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">PDF, DOCX, ZIP, or PNG up to 25MB</span>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" size="sm" className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
              <UploadCloud className="h-3.5 w-3.5" />
              Upload Asset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
