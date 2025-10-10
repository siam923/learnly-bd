/**
 * Normalizes markdown content to be compatible with MDX
 */
export function normalizeMarkdownForMDX(raw: string): string {
  let out = String(raw || '').replace(/\r\n?/g, '\n');

  // Preserve JSX components (don't modify anything between < and />)
  const jsxComponents: string[] = [];
  out = out.replace(/(<[A-Z][^>]*\/?>[\s\S]*?<\/[A-Z][^>]*>|<[A-Z][^>]*\/>)/g, (match) => {
    jsxComponents.push(match);
    return `__JSX_PLACEHOLDER_${jsxComponents.length - 1}__`;
  });

  // Normalize strong delimiters: __bold__ -> **bold**
  out = out.replace(/__\s*\[([^\]]+)\]\(([^)]+)\)\s*__/g, '**[$1]($2)**');
  out = out.replace(/__(\S[\s\S]*?)__/g, '**$1**');

  // Normalize emphasis: _italic_ -> *italic* (but not in URLs or code)
  out = out.replace(/(?<![\w/:`])_([^\s_][^_]*?)_(?![\w/:])/g, '*$1*');

  // Ensure proper spacing around code blocks
  out = out.replace(/```(\w*)\n/g, '\n```$1\n');
  out = out.replace(/\n```\s*$/gm, '\n```\n');
  
  // Normalize list items (unordered)
  out = out.replace(/^\s*[-*+]\s+/gm, '- ');
  
  // Normalize ordered lists
  out = out.replace(/^\s*(\d+)\.\s+/gm, '$1. ');

  // Normalize blockquotes
  out = out.replace(/^\s*>\s+/gm, '> ');

  // Ensure headings have space after #
  out = out.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');

  // Clean up multiple blank lines (max 2 consecutive)
  out = out.replace(/\n{3,}/g, '\n\n');

  // Ensure code blocks have blank lines around them
  out = out.replace(/([^\n])\n```/g, '$1\n\n```');
  out = out.replace(/```\n([^\n])/g, '```\n\n$1');

  // Normalize inline code (ensure no extra spaces)
  out = out.replace(/`\s+([^`]+?)\s+`/g, '`$1`');

  // Restore JSX components
  jsxComponents.forEach((component, index) => {
    out = out.replace(`__JSX_PLACEHOLDER_${index}__`, component);
  });

  // Trim trailing whitespace from each line
  out = out.split('\n').map(line => line.trimEnd()).join('\n');

  return out.trim();
}
