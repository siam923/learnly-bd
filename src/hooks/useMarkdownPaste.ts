import { useCallback, useEffect, RefObject } from 'react';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import { looksLikeMarkdown } from '@/components/admin/editor/utils/markdownDetect';
import { normalizeMarkdownForMDX } from '@/components/admin/editor/utils/markdownNormalize';

interface UseMarkdownPasteProps {
  editorRef: RefObject<MDXEditorMethods>;
  containerRef: RefObject<HTMLDivElement>;
  onChange: (value: string) => void;
}

export function useMarkdownPaste({ 
  editorRef, 
  containerRef, 
  onChange 
}: UseMarkdownPasteProps) {
  const handlePaste = useCallback((event: ClipboardEvent) => {
    try {
      const text = event.clipboardData?.getData('text/plain');
      if (!text || !looksLikeMarkdown(text)) return;
      
      event.preventDefault();
      event.stopPropagation();
      
      const normalized = normalizeMarkdownForMDX(text);
      editorRef.current?.setMarkdown?.(normalized);
      if (typeof onChange === 'function') onChange(normalized);
    } catch (error) {
      console.error('Error handling markdown paste:', error);
    }
  }, [editorRef, onChange]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    
    const editable = container.querySelector('[contenteditable="true"]') as HTMLElement;
    if (!editable) return;
    
    editable.addEventListener('paste', handlePaste as EventListener, { capture: true });
    return () => editable.removeEventListener('paste', handlePaste as EventListener, { capture: true });
  }, [containerRef, handlePaste]);

  return { handlePaste };
}
