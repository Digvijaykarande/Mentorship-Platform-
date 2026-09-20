"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/**
 * Unified label + input/textarea field for edit forms (Profile, Settings).
 * Renders a plain read-only value when `isEditing` is false.
 */
export default function FormField({
  label,
  name,
  value,
  onChange,
  isEditing = true,
  type = "text",
  as = "input",
  rows = 3,
  placeholder,
  disabled = false,
  className,
  emptyText = "Not specified",
  icon: Icon,
  ...props
}) {
  if (!isEditing) {
    return (
      <div className={cn("space-y-1", className)}>
        <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </Label>
        <p className="text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-200">
          {value || <span className="italic text-slate-400 dark:text-slate-600">{emptyText}</span>}
        </p>
      </div>
    );
  }

  const Field = as === "textarea" ? Textarea : Input;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </Label>
      <Field
        name={name}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label?.toLowerCase()}...`}
        disabled={disabled}
        className="text-xs"
        {...props}
      />
    </div>
  );
}
