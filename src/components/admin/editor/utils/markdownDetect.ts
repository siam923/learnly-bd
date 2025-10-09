/**
 * Detects if a text string looks like Markdown
 */
export function looksLikeMarkdown(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  
  return (
    /(^|\n)\s{0,3}#{1,6}\s/.test(text) || // headings
    /(^|\n)\s{0,3}([-*+]\s|\d+\.\s)/.test(text) || // lists
    /(^|\n)\s{0,3}>\s/.test(text) || // blockquote
    /(^|\n)\s*```/.test(text) || // fenced code
    /(^|\n)\|.*\|/.test(text) || // tables
    /\[[^\]]+\]\([^\)]+\)/.test(text) // links
  );
}
