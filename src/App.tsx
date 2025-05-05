import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LearningModules from './components/LearningModules';
import { Language } from './types';
import { Code, BookOpen, Languages, Github } from 'lucide-react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [activeTab, setActiveTab] = useState<'editor' | 'learn'>('editor');

  const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'rust', label: 'Rust' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CodeMentor AI</h1>
                <p className="text-sm text-gray-600">Your intelligent coding companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {activeTab === 'editor' && (
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-gray-600" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'editor'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Code className="w-5 h-5" />
              Code Editor
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === 'learn'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Learning Modules
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'editor' ? (
          <CodeEditor language={selectedLanguage} />
        ) : (
          <LearningModules />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">© 2025 CodeMentor AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
