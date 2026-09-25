import { marked } from 'marked';

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function simpleMd(text: string): string {
  if (!text) return '';
  const result = marked.parse(text, { async: false });
  return typeof result === 'string' ? result : String(result);
}
