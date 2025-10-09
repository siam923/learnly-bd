/**
 * Normalizes markdown content to be compatible with MDX
 */
export function normalizeMarkdownForMDX(raw: string): string {
  let out = String(raw || '').replace(/\r\n?/g, '\n');

  // Normalize strong delimiters: __bold__ -> **bold**
  out = out.replace(/__\s*\[([^\]]+)\]\(([^)]+)\)\s*__/g, '**[$1]($2)**');
  out = out.replace(/__(\S[\s\S]*?)__/g, '**$1**');

  // Collapse lines with two-space indentation to a single space if they look like wrapped list text
  out = out.replace(/\n\s{2,}(?![-*+]|\d+\.)/g, ' ');

  // Ensure proper spacing around code blocks
  out = out.replace(/```(\w*)\n/g, '```$1\n');
  
  // Normalize list items
  out = out.replace(/^\s*[-*+]\s+/gm, '- ');

  return out;
}
