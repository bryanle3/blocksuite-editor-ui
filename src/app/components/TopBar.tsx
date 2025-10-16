"use client";

import { importMarkdown } from "../editor/markdown"; // keep if you use MD import
import { Button } from "@/components/ui/button";
import { useEditor } from "../editor/context";

export default function TopBar() {
  const ctx = useEditor();
  if (!ctx) return null; // guard while context is null

  const { collection, editor } = ctx;

  // 🆕 New Document
  const handleNew = () => {
    if (!collection || !editor) return;
    const newDoc = collection.createDoc({ id: crypto.randomUUID() });
    newDoc.load(() => {
      const pageBlockId = newDoc.addBlock("affine:page", {});
      newDoc.addBlock("affine:surface", {}, pageBlockId);
      const noteId = newDoc.addBlock("affine:note", {}, pageBlockId);
      newDoc.addBlock("affine:paragraph", {}, noteId);
    });
    editor.doc = newDoc;
  };

  // 💾 Export snapshot
  const handleSave = () => {
    if (!editor?.doc) return;
    const snapshot =
      (editor.doc as any).save?.() ?? (editor.doc as any).toJSON?.();
    if (!snapshot) return;

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${editor.doc.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 📂 Import BlockSuite snapshot (.json)
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !collection || !editor) return;

    const text = await file.text();
    try {
      const json = JSON.parse(text);
      const newDoc = collection.createDoc({ id: crypto.randomUUID() });
      await newDoc.load(json);
      editor.doc = newDoc;
    } catch (err) {
      console.error("Import failed:", err);
      alert("Failed to import file. Make sure it's a valid BlockSuite snapshot.");
    }
  };

  // 📥 Load from localStorage
  const handleLoad = () => {
    try {
      const data = localStorage.getItem("extraSauce-doc");
      if (!data || !collection || !editor) return;
      const snapshot = JSON.parse(data);
      const doc = collection.createDoc({ id: snapshot.id });
      doc.load(snapshot);
      editor.doc = doc;
    } catch (err) {
      console.error("Load failed:", err);
    }
  };

  // ✍️ Import Markdown (.md) — optional
  const handleImportMarkdown = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !collection || !editor) return;

    const text = await file.text();
    try {
      const newDoc = collection.createDoc({ id: crypto.randomUUID() });
      await importMarkdown(newDoc, text);
      editor.doc = newDoc;
    } catch (err) {
      console.error("Markdown import failed:", err);
      alert("Could not parse markdown file.");
    }
  };

  return (
    <div className="top-bar bg-sauce-ink text-[rgb(var(--sauce-cream))] flex items-center justify-between px-4 py-2 rounded-t-lg">
      <div className="font-semibold text-lg">🧠 Extra Sauce Editor</div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="bg-primary text-primary-foreground" onClick={handleNew}>
          New
        </Button>

        <Button size="sm" variant="secondary" onClick={handleSave}>
          Export
        </Button>

        <label
          htmlFor="importFile"
          className="cursor-pointer bg-accent text-accent-foreground px-3 py-1.5 text-sm rounded-md hover:opacity-90"
        >
          Import
          <input
            id="importFile"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <label
          htmlFor="importMarkdown"
          className="cursor-pointer bg-[rgb(var(--sauce-mint))] text-white px-3 py-1.5 text-sm rounded-md hover:opacity-90"
        >
          Import Markdown
          <input
            id="importMarkdown"
            type="file"
            accept=".md,.markdown"
            onChange={handleImportMarkdown}
            className="hidden"
          />
        </label>

        <Button size="sm" variant="secondary" onClick={handleLoad}>
          Load
        </Button>
      </div>
    </div>
  );
}
