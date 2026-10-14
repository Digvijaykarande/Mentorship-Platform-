"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Code,
  FileText,
  FlaskConical,
  History,
  Link2,
  ListChecks,
  MessageCircle,
  Palette,
  RefreshCcw,
  Save,
  Send,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  NO_TASK,
  SUBMISSION_TYPES,
  getTypeMeta,
  resolveType,
} from "./constants";
import {
  INITIAL_VERSION,
  bumpVersion,
  compareVersions,
  diffForm,
  isValidVersion,
  normalizeVersion,
  toFormValues,
} from "./submissionLogic";

const TYPE_ICONS = {
  "Source Code": Code,
  Documentation: FileText,
  "Design Artifacts": Palette,
  "QA & Testing": FlaskConical,
};

const MODE_COPY = {
  create: {
    title: "Submit work",
    description: "Send your work to your mentor for feedback.",
    action: "Submit",
    icon: Send,
  },
  edit: {
    title: "Edit submission",
    description: "Update your work while it is waiting for review.",
    action: "Save changes",
    icon: Save,
  },
  revise: {
    title: "Submit revision",
    description: "Fix what your mentor asked for and send the next version.",
    action: "Submit revision",
    icon: RefreshCcw,
  },
};

const MAX_FILE_MB = 25;
const MAX_FILE_SIZE = MAX_FILE_MB * 1024 * 1024;

const formatSize = (bytes) => {
  if (!bytes) return "";
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

/**
 * mode: "create" | "edit" | "revise"
 * For "edit" and "revise" pass the existing `submission`.
 * The parent should give this component a fresh `key` every time it opens.
 */
export default function NewSubmissionDialog({
  open = false,
  mode = "create",
  submission = null,
  initialType = "Source Code",
  tasks = [],
  presetTaskId = null, // opened from a task: pre-select it
  presetTitle = "",
  context = null, // { stepText, stepNumber, total } shown as a banner
  onClose = () => {},
  onSubmit = () => {},
}) {
  // Snapshot of the submission when the dialog opened.
  const [base] = useState(() =>
    submission
      ? {
          values: toFormValues(submission),
          version: submission.version,
          feedback: submission.feedback,
        }
      : null,
  );
  const initial = base?.values ?? null;
  const copy = MODE_COPY[mode] ?? MODE_COPY.create;
  const ActionIcon = copy.icon;

  // Keep the task the submission already has, even if it is not in the list.
  const taskOptions =
    initial?.taskTitle && !tasks.some((t) => t.title === initial.taskTitle)
      ? [{ id: "__current", title: initial.taskTitle }, ...tasks]
      : tasks;

  const [title, setTitle] = useState(initial?.title ?? presetTitle ?? "");
  const [type, setType] = useState(resolveType(initial?.type ?? initialType));
  const [taskId, setTaskId] = useState(() => {
    const wanted = submission?.taskId ?? presetTaskId;
    if (wanted != null) {
      const byId = taskOptions.find((t) => String(t.id) === String(wanted));
      if (byId) return String(byId.id);
    }
    const match = taskOptions.find((t) => t.title === initial?.taskTitle);
    return match ? String(match.id) : NO_TASK;
  });
  // A submission that belongs to a task step keeps its task.
  const taskLocked = Boolean(context) || (mode !== "create" && submission?.taskId != null);
  const [link, setLink] = useState(initial?.link ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [changeNote, setChangeNote] = useState("");
  const [files, setFiles] = useState(() =>
    (initial?.files ?? []).map((name) => ({ name })),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [versionInput, setVersionInput] = useState(null); // null = use the suggested version
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const activeType = getTypeMeta(type);
  const projectName = taskOptions.find((t) => String(t.id) === taskId)?.project || "";
  const pastVersions = submission?.versions ?? [];
  const LinkIcon = type === "Source Code" ? FaGithub : Link2;

  const currentValues = () => {
    const task = taskOptions.find((t) => String(t.id) === taskId);
    return {
      title: title.trim(),
      type,
      taskId: task && task.id !== "__current" ? task.id : null,
      taskTitle: task ? task.title : "",
      link: link.trim(),
      notes: notes.trim(),
      files: files.map((f) => f.name),
    };
  };

  // Version this save will produce.
  const diff = initial ? diffForm(initial, currentValues()) : null;
  let nextVersion = INITIAL_VERSION;
  if (mode === "revise") nextVersion = bumpVersion(base.version, "major");
  if (mode === "edit") {
    nextVersion = diff?.kind ? bumpVersion(base.version, diff.kind) : null;
  }
  const noChanges = mode === "edit" && !diff?.kind;

  // The version the intern chose, or the suggested one.
  const versionText = versionInput ?? nextVersion ?? "";
  const versionValid = isValidVersion(versionText);
  const finalVersion = versionValid ? normalizeVersion(versionText) : null;
  const versionTooLow =
    versionValid && base?.version && compareVersions(finalVersion, base.version) <= 0;
  const versionError = !versionValid
    ? "Use the format v1.0.0"
    : versionTooLow
      ? `Must be higher than ${base.version}`
      : "";

  const clearError = () => {
    if (error) setError("");
  };

  const handleFileSelect = (selected) => {
    if (!selected?.length) return;
    const incoming = Array.from(selected);
    const valid = incoming.filter((f) => f.size <= MAX_FILE_SIZE);
    setError(
      valid.length < incoming.length
        ? `Some files were over ${MAX_FILE_MB} MB and were skipped.`
        : "",
    );
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      const fresh = valid
        .filter((f) => !names.has(f.name))
        .map((f) => ({ name: f.name, size: f.size }));
      return [...prev, ...fresh];
    });
  };

  const removeFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = currentValues();
    if (!values.title) {
      setError("Please add a title.");
      return;
    }
    if (!values.files.length && !values.link) {
      setError("Add at least one file or a link.");
      return;
    }
    if (mode === "revise" && !changeNote.trim()) {
      setError("Tell your mentor what you changed in this version.");
      return;
    }
    if (noChanges) {
      setError("Nothing has changed yet.");
      return;
    }
    if (versionError) {
      setError(`Version: ${versionError}.`);
      return;
    }
    onSubmit({ ...values, changeNote: changeNote.trim(), version: finalVersion });
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <DialogHeader className="shrink-0 border-b px-4 pt-4 pb-3 pr-12">
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{projectName || copy.description}</DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5">
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {context && mode === "create" && (
              <div className="flex gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-3 dark:border-indigo-500/25 dark:bg-indigo-500/10">
                <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-300" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-700 dark:text-indigo-300">
                    Step {context.stepNumber} of {context.total}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                    {context.stepText}. Your mentor reviews this submission to unlock the next step.
                  </p>
                </div>
              </div>
            )}

            {mode === "revise" && base?.feedback && (
              <div className="flex gap-3 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 dark:border-rose-500/25 dark:bg-rose-500/10">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-300" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-rose-700 dark:text-rose-300">
                    Mentor feedback
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                    {base.feedback}
                  </p>
                </div>
              </div>
            )}

            {mode !== "create" && pastVersions.length > 0 && (
              <div className="rounded-xl border">
                <button
                  type="button"
                  onClick={() => setShowVersions((v) => !v)}
                  aria-expanded={showVersions}
                  className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-xs font-medium"
                >
                  <History className="h-4 w-4 text-muted-foreground" />
                  Previous versions ({pastVersions.length})
                  <ChevronDown
                    className={cn(
                      "ml-auto h-4 w-4 text-muted-foreground transition-transform",
                      showVersions && "rotate-180",
                    )}
                  />
                </button>
                {showVersions && (
                  <ul className="max-h-44 space-y-2 overflow-y-auto border-t px-3.5 py-3">
                    {pastVersions.map((v) => (
                      <li key={v.version} className="text-xs leading-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold">{v.version}</span>
                          <span className="text-muted-foreground">{v.date}</span>
                          {v.status && (
                            <span className="ml-auto text-muted-foreground">{v.status}</span>
                          )}
                        </div>
                        {v.changes && <p className="text-muted-foreground">{v.changes}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="submission-title">Title</Label>
              <Input
                id="submission-title"
                autoFocus
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  clearError();
                }}
                placeholder="e.g. Authentication API"
              />
            </div>

            <div className="space-y-1.5">
              <Label>What are you submitting?</Label>
              <div role="radiogroup" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SUBMISSION_TYPES.map((t) => {
                  const Icon = TYPE_ICONS[t.value];
                  const active = t.value === type;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setType(t.value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center text-xs font-medium transition-colors",
                        active
                          ? "border-primary bg-primary/5 text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {t.short}
                    </button>
                  );
                })}
              </div>
            </div>

            {taskOptions.length > 0 && (
              <div className="space-y-1.5">
                <Label>
                  Related task{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Select value={taskId} onValueChange={setTaskId} disabled={taskLocked}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NO_TASK}>No specific task</SelectItem>
                    {taskOptions.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.label ?? t.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="submission-link">
                {activeType.linkLabel}{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <div className="relative">
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="submission-link"
                  type="url"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    clearError();
                  }}
                  placeholder={activeType.linkPlaceholder}
                  className="pl-9"
                />
              </div>
              {activeType.linkHint && (
                <p className="text-xs text-muted-foreground">{activeType.linkHint}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Files{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileSelect(e.dataTransfer.files);
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50 hover:bg-muted/40",
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => {
                    handleFileSelect(e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
                <UploadCloud className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Drop files here or browse</p>
                  <p className="text-xs text-muted-foreground">Up to {MAX_FILE_MB} MB each</p>
                </div>
              </div>

              {files.length > 0 && (
                <ul className="space-y-1.5">
                  {files.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate text-sm">{file.name}</span>
                        {file.size ? (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {formatSize(file.size)}
                          </span>
                        ) : null}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFile(index)}
                        className="text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400"
                        aria-label={`Remove ${file.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="submission-notes">
                Note for your mentor{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="submission-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything they should know before reviewing?"
              />
            </div>

            {mode !== "create" && (
              <div className="space-y-1.5">
                <Label htmlFor="submission-change-note">
                  What changed in this version?{" "}
                  <span className="font-normal text-muted-foreground">
                    {mode === "revise" ? "(required)" : "(optional)"}
                  </span>
                </Label>
                <Textarea
                  id="submission-change-note"
                  rows={2}
                  value={changeNote}
                  onChange={(e) => {
                    setChangeNote(e.target.value);
                    clearError();
                  }}
                  placeholder={
                    mode === "revise"
                      ? "e.g. Fixed mobile spacing and added validation messages"
                      : "Leave empty and we will summarise it for you"
                  }
                />
              </div>
            )}

            {!noChanges && (
              <div className="space-y-2">
                <Label htmlFor="submission-version">Version</Label>
                {base?.version && (
                  <div role="radiogroup" className="grid grid-cols-3 gap-2">
                    {[
                      { kind: "major", label: "Major", hint: "Revision" },
                      { kind: "minor", label: "Minor", hint: "Update" },
                      { kind: "patch", label: "Patch", hint: "Small edit" },
                    ].map((option) => {
                      const value = bumpVersion(base.version, option.kind);
                      const active = finalVersion === value;
                      return (
                        <button
                          key={option.kind}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setVersionInput(value)}
                          className={cn(
                            "flex flex-col items-center rounded-xl border px-2 py-2 text-xs transition-colors",
                            active
                              ? "border-primary bg-primary/5 text-primary"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        >
                          <span className="font-medium">{option.label}</span>
                          <span className="font-mono text-[11px]">{value}</span>
                          <span className="text-[10px] opacity-70">{option.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input
                    id="submission-version"
                    value={versionText}
                    onChange={(e) => {
                      setVersionInput(e.target.value);
                      clearError();
                    }}
                    onBlur={() => {
                      if (isValidVersion(versionText)) setVersionInput(normalizeVersion(versionText));
                    }}
                    placeholder={INITIAL_VERSION}
                    aria-invalid={Boolean(versionError)}
                    className="w-32 font-mono"
                  />
                  <p
                    className={cn(
                      "text-xs",
                      versionError ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground",
                    )}
                  >
                    {versionError ||
                      (base?.version
                        ? "Pick a type or type your own version."
                        : "First version of this work. Change it only if you need another number.")}
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mx-0 mb-0 shrink-0">
            <span className="text-xs text-muted-foreground sm:mr-auto sm:self-center">
              {noChanges ? (
                "No changes yet"
              ) : base?.version ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-mono" title="Previous version">
                    {base.version}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                  <span
                    className="font-mono font-semibold text-foreground"
                    title="New version"
                  >
                    {finalVersion ?? versionText}
                  </span>
                </span>
              ) : (
                <>
                  Saves as{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {finalVersion ?? versionText}
                  </span>
                </>
              )}
            </span>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2" disabled={noChanges}>
              <ActionIcon className="h-4 w-4" /> {copy.action}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}