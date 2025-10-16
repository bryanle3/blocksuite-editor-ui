import type { Doc } from "@blocksuite/store";
import { Text } from "@blocksuite/store";

/**
 * Minimal Markdown → BlockSuite importer.
 * Supports:
 * - Headings: lines that start with 1-6 '#' + space
 * - Bullets:  lines that start with '-' or '*'
 * - Paragraphs: everything else (non-empty)
 * Blank lines create separation but not extra blocks.
 */
export async function importMarkdown(doc: Doc, md: string) {
  // Build inside a doc.load() transaction so BlockSuite updates safely.
  await (doc as any).load(() => {
    // fresh page structure
    const pageId = (doc as any).addBlock("affine:page", {});
    (doc as any).addBlock("affine:surface", {}, pageId);
    const noteId = (doc as any).addBlock("affine:note", {}, pageId);

    const lines = md.replace(/\r\n/g, "\n").split("\n");

    const addPara = (content: string) => {
      const pid = (doc as any).addBlock("affine:paragraph", {}, noteId);
      (doc as any).updateBlock(pid, { text: new Text(content) });
    };

    for (let raw of lines) {
      const line = raw.trim();

      if (!line) {
        // blank line = separation; skip creating empty blocks
        continue;
      }

      // heading: 1-6 '#'
      const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (hMatch) {
        const depth = hMatch[1].length; // 1..6
        const text = hMatch[2];
        // MVP: render as a paragraph prefixed with '# ' for visual cue
        addPara(`${"#".repeat(depth)} ${text}`);
        continue;
      }

      // bullet list: '-', '*'
      const bMatch = line.match(/^[-*]\s+(.*)$/);
      if (bMatch) {
        addPara(`• ${bMatch[1]}`);
        continue;
      }

      // fallback: plain paragraph
      addPara(line);
    }
  });
}
