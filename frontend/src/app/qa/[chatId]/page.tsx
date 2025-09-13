'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface Reference {
  id: string;
  content: string;
  page?: number;
  chapter?: string;
  relevanceScore?: number;
}

interface QAMessage {
  id: string;
  question: string;
  answer: string;
  references: Reference[];
  timestamp: Date;
}

export default function QAPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = use(params);
  const [qaData, setQAData] = useState<QAMessage | null>(null);
  const [expandedReferences, setExpandedReferences] = useState<Set<string>>(new Set());
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockQA: QAMessage = {
      id: chatId,
      question: "What is the main theme of this book?",
      answer: `The main theme of this book revolves around the journey of self-discovery and personal growth. Throughout the narrative, the protagonist faces numerous challenges that test their character and force them to confront their deepest fears and insecurities.

The author masterfully weaves together elements of adventure, introspection, and human connection to explore themes of resilience, the importance of relationships, and the transformative power of facing one's past. The story demonstrates how personal growth often comes through adversity and how our struggles can become our greatest strengths.

Key thematic elements include:
- The power of perseverance in the face of overwhelming odds
- The importance of authentic relationships and community
- The journey from self-doubt to self-acceptance
- The realization that true strength comes from vulnerability
- The understanding that our past experiences shape but don't define our future

The narrative structure itself reinforces these themes, with each chapter representing a different stage of the protagonist's emotional and psychological development.`,
      references: [
        {
          id: 'ref1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          page: 15,
          chapter: 'Chapter 1: The Beginning',
          relevanceScore: 0.95
        },
        {
          id: 'ref2',
          content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          page: 42,
          chapter: 'Chapter 2: The Middle',
          relevanceScore: 0.87
        },
        {
          id: 'ref3',
          content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
          page: 78,
          chapter: 'Chapter 3: The End',
          relevanceScore: 0.92
        },
        {
          id: 'ref4',
          content: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
          page: 23,
          chapter: 'Chapter 1: The Beginning',
          relevanceScore: 0.81
        }
      ],
      timestamp: new Date()
    };

    setQAData(mockQA);
  }, [chatId]);

  const toggleReference = (refId: string) => {
    setExpandedReferences(prev => {
      const newSet = new Set(prev);
      if (newSet.has(refId)) {
        newSet.delete(refId);
      } else {
        newSet.add(refId);
      }
      return newSet;
    });
  };

  const copyReference = async (refId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedRef(refId);
      setTimeout(() => setCopiedRef(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 bg-green-50';
    if (score >= 0.8) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  if (!qaData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/reader/sample-book">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </motion.button>
              </Link>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-amber-600" />
                <h1 className="text-lg font-semibold text-gray-900">Q&A Session</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {qaData.timestamp.toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Question</h2>
                <p className="text-gray-800 text-lg leading-relaxed">{qaData.question}</p>
              </div>
            </div>
          </div>

          {/* Answer */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Answer</h2>
                <div className="prose prose-lg max-w-none">
                  {qaData.answer.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-800 leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* References */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">References</h2>
            <div className="space-y-4">
              {qaData.references.map((ref, index) => (
                <motion.div
                  key={ref.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">
                          Reference {index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(ref.relevanceScore || 0)}`}>
                          {Math.round((ref.relevanceScore || 0) * 100)}% relevant
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyReference(ref.id, ref.content)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {copiedRef === ref.id ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleReference(ref.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {expandedReferences.has(ref.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium text-gray-900">
                        {ref.chapter}
                        {ref.page && (
                          <span className="ml-2 text-gray-600">(Page {ref.page})</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedReferences.has(ref.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-4 bg-white"
                      >
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed italic">
                            "{ref.content}"
                          </p>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                          <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                            View in Book
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            <ExternalLink className="h-3 w-3 inline mr-1" />
                            Open Context
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Link href="/reader/sample-book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Back to Reading
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              Ask Follow-up
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
