"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { cn } from "@/common/lib/utils/ui";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
        // Headings
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-base font-semibold mt-3 mb-2" {...props} />
        ),

        // Paragraphs
        p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,

        // Lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
        ),
        li: ({ node, ...props }) => <li className="leading-7" {...props} />,

        // Code blocks
        code: ({ node, inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline ? (
            <code
              className={cn(
                "block bg-muted rounded-lg p-4 my-4 overflow-x-auto text-sm",
                className
              )}
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
            {...props}
          />
        ),

        // Links
        a: ({ node, ...props }) => (
          <a
            className="text-primary hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),

        // Images
        img: ({ node, ...props }) => (
          <img
            className="max-w-[350px] h-auto rounded-lg my-4"
            loading="lazy"
            {...props}
          />
        ),

        // Tables
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table
              className="min-w-full divide-y divide-border border border-border rounded-lg"
              {...props}
            />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-muted" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="divide-y divide-border" {...props} />
        ),
        tr: ({ node, ...props }) => <tr className="hover:bg-muted/50" {...props} />,
        th: ({ node, ...props }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-3 text-sm" {...props} />
        ),

        // Horizontal rule
        hr: ({ node, ...props }) => (
          <hr className="my-6 border-border" {...props} />
        ),

        // Strong and emphasis
        strong: ({ node, ...props }) => (
          <strong className="font-bold" {...props} />
        ),
        em: ({ node, ...props }) => <em className="italic" {...props} />,
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
