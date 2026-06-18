"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  language: string;
  code: string;
};

const languageMap: Record<string, string> = {
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  py: "Python",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  bash: "Bash",
};

const CodeBlock = ({ language, code }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-gray-700 bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-[#252526] px-4 py-2">
        <span className="text-sm font-medium text-gray-300">
          {languageMap[language] || language || "Code"}
        </span>

        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-300 transition hover:bg-gray-700 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "transparent",
          padding: "1rem",
        }}
        codeTagProps={{
          style: {
            fontSize: "14px",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;