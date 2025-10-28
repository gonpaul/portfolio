import { marked } from 'marked';
import matter from 'gray-matter';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function parseMarkdown(content: string) {
  const { data, content: markdownContent } = matter(content);
  
  // Remove the first H1 heading if it exists (since it's displayed in the page header)
  const contentWithoutTitle = markdownContent.replace(/^#\s+.*$/m, '');
  
  return {
    frontmatter: data,
    content: markdownContent,
    html: marked(contentWithoutTitle),
  };
}

export function extractExcerpt(content: string, maxLength: number = 150): string {
  const { content: markdownContent } = matter(content);
  const plainText = markdownContent.replace(/[#*`]/g, '').replace(/\n/g, ' ');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
}
