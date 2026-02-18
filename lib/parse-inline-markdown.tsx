import { ReactNode } from "react";

/**
 * Parses minimal inline markdown (bold and italic only) into React elements.
 * Supports: **bold**, *italic*, _italic_
 */
export function parseInlineMarkdown(text: string): ReactNode {
  // Pattern matches **bold**, *italic*, or _italic_
  // Order matters: check ** before * to avoid partial matches
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_)/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Determine which group matched
    if (match[2]) {
      // **bold**
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      parts.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4]) {
      // _italic_
      parts.push(<em key={key++}>{match[4]}</em>);
    }

    lastIndex = pattern.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // Return plain string if no markdown was found
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}
