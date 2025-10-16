import type { Doc } from "@blocksuite/store";

export function exportSnapshot(doc: Doc) {
  const d = doc as any;
  if (typeof d.save === "function") return d.save();
  if (typeof d.toJSON === "function") return d.toJSON();
  throw new Error("Doc has no save/toJSON");
}

export async function importSnapshot(createDoc: (id: string) => Doc, snapshot: any) {
  const doc = createDoc(snapshot?.id ?? crypto.randomUUID());
  await (doc as any).load(snapshot);
  return doc;
}
