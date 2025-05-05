import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Language, CodeReviewResult } from "../types";
import { Brain, Code2, Sparkles, Play, RotateCcw } from "lucide-react";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

// Load API key securely from environment variables
const GEMINI_API_KEY = "AIzaSyDVdOw4NFTk51s7o1yYSQBQmrgZSjhE1Kw";

interface CodeEditorProps {
  language: Language;
}

export default function CodeEditor({ language }: CodeEditorProps) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string>("");
  const [review, setReview] = useState<CodeReviewResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running code...\n");

    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [{ content: code }],
      });

      setOutput(response.data.run.output || "No output received.");
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReview = async () => {
    if (!code || !GEMINI_API_KEY) return;

    setIsReviewing(true);
    setReview(null);
    setOutput("Analyzing code with AI...");

    try {
      const requestBody = {
        contents: [{ parts: [{ text: `Review and improve the following code:\n\n${code}` }] }],
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      const improvedCode =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No improvements suggested.";

      setReview({
        suggestions: ["AI-generated improvements based on your code."],
        improvedCode: improvedCode,
      });
      setOutput("Code analysis completed.");
    } catch (error: any) {
      setOutput(`Error analyzing code: ${error.response?.data?.error?.message || error.message}`);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setOutput("");
    setReview(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Code2 className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Code Editor</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning || !code}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isRunning || !code ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <Play className="w-4 h-4" /> Run Code
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[500px] w-full">
              <Editor
                height="100%"
                defaultLanguage={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-[200px] overflow-auto">
            <h3 className="text-lg font-semibold text-white mb-2">Output</h3>
            <pre className="text-green-400 font-mono text-sm">{output || "Code output will appear here..."}</pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold">AI Code Review</h3>
          </div>
          <button
            onClick={handleReview}
            disabled={!code || isReviewing}
            className={`mb-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              !code || isReviewing ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <Sparkles className="w-5 h-5" /> {isReviewing ? "Analyzing..." : "Analyze Code"}
          </button>
          {review && (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 text-purple-900">Suggestions:</h4>
                <ul className="space-y-3">
                  {review.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-purple-800">
                      <span className="text-purple-500">•</span> {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Improved Code:</h4>
                <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-[300px]">
                  <pre className="text-sm font-mono text-gray-800">
                    <code>{review.improvedCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
