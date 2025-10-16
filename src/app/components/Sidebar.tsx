"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Doc } from "@blocksuite/store";
import { useEditor } from "../editor/context";

const Sidebar = () => {
  const ctx = useEditor();
  if (!ctx) return null; // guard while context is null

  const { collection, editor } = ctx;
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    if (!collection) return;
    const refresh = () =>
      setDocs([...collection.docs.values()].map((b: any) => b.getDoc()));
    refresh();

    const subs = [
      collection.slots.docUpdated.on(refresh),
      editor?.slots.docLinkClicked.on(refresh),
    ];

    return () => subs.forEach((s) => s?.dispose?.());
  }, [collection, editor]);

  return (
    <aside className="sidebar">
      <Card className="p-3 bg-card">
        <div className="header text-sm opacity-80">Documents</div>
        <div className="doc-list">
          {docs.map((d) => (
            <div
              key={d.id}
              className={`doc-item ${editor?.doc === d ? "active" : ""}`}
              onClick={() => {
                if (editor) editor.doc = d;
              }}
            >
              {d.meta?.title || "Untitled"}
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
};

export default Sidebar;
