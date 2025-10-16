"use client";

import { useEffect, useRef } from "react";
import { useEditor } from "../editor/context";

const EditorContainer = () => {
  const ctx = useEditor();
  if (!ctx) return null; // wait for provider to finish restoring

  const { editor } = ctx;
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorContainerRef.current && editor) {
      editorContainerRef.current.innerHTML = "";
      editorContainerRef.current.appendChild(editor);
    }
  }, [editor]);

  return <div className="editor-container" ref={editorContainerRef} />;
};

export default EditorContainer;
