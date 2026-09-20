"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = ["Module Task", "Capstone Code", "Mentor Review", "Documentation"];

export default function AddTaskDialog({ open, onOpenChange, form, onFormChange, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm font-bold">
            <Plus className="h-4 w-4 text-indigo-600" />
            Add New Deliverable
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold">Task Title</Label>
            <Input
              required
              placeholder="e.g. Complete Phase 2 Code Review & Unit Tests"
              value={form.title}
              onChange={(e) => onFormChange("title", e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <Label className="text-[11px] font-semibold">Category Tag</Label>
              <Select value={form.category} onValueChange={(val) => onFormChange("category", val)}>
                <SelectTrigger className="w-full text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-1.5">
              <Label className="text-[11px] font-semibold">Target Date</Label>
              <Input
                type="date"
                value={form.dueDate}
                onChange={(e) => onFormChange("dueDate", e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
              <Plus className="h-3.5 w-3.5" />
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
