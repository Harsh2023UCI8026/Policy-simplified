/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Send, 
  HelpCircle, 
  Paperclip, 
  Download, 
  CheckCircle,
  Clock,
  ShieldCheck,
  Flame,
  Globe,
  Settings,
  BrainCircuit,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, Policy } from '../types';
import { DEFAULT_CHATS } from '../data';

interface CompareViewProps {
  selectedPolicy: Policy;
}

export default function CompareView({ selectedPolicy }: CompareViewProps) {
  
  // Chat list state starting with pre-loaded mock thread
  const [messages, setMessages] = React.useState<ChatMessage[]>(DEFAULT_CHATS);
  
  // Text state
  const [inputText, setInputText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  // Active topic highlighted in the sidebar
  const [activeTopic, setActiveTopic] = React.useState<string>('Subrogation Clause');

  // Interactive topics list
  const topics = [
    { title: 'Coverage Limits', status: 'Completed' },
    { title: 'Subrogation Clause', status: 'Active' },
    { title: 'Waiting Periods', status: 'Pending' }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Respond intelligently after simulated delay
    setTimeout(() => {
      let responseText = '';
      const query = text.toLowerCase();

      if (query.includes('waiting') || query.includes('exclusion')) {
        responseText = `Regarding waiting periods on your ${selectedPolicy.name} policy:\n\n1. Initial Waiting Period: A strict 30-day initial waiting period applies during which no non-accident treatments are payable.\n2. Specific Diseases waiting: 24 months for slow-progressing conditions (like hernia, cataract, or joint replacement).\n3. Pre-Existing conditions: 3 or 4 years depending on declarations. You are currently 15 days away from clearing the first tier of slow-growing exclusion conditions.`;
      } else if (query.includes('co-pay') || query.includes('deductible')) {
        responseText = `Under HDFC Ergo Optima Restore, there is a standard 0% co-payment rule unless opting for room-level upgrades. Standard private single room accommodates 100% sum insured payouts. Selecting deluxe suites will enforce a pro-rata co-pay on diagnostic or surgery fees.`;
      } else if (query.includes('hello') || query.includes('hi')) {
        responseText = `Hello! How can I assist you with analyzing clauses in the ${selectedPolicy.name} active session? I can decode terms like Subrogation, room limits, and copays.`;
      } else {
        responseText = `I've analyzed your query about "${text}" against the decoded IRDAI handbook. Our model predicts standard approvals under Clause 11.2 of the ${selectedPolicy.name} manual. Make sure diagnostic scans (including date) are cleanly appended as non-expired records. Let me know if you would like me to simulate a what-if payment outcome for this!`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1205);
  };

  // Selecting a topic triggers information addition to the chat feed seamlessly!
  const handleSelectTopic = (topic: string) => {
    setActiveTopic(topic);
    
    // Check if message is already added so as not to duplicate too much
    const hasTopic = messages.some(msg => msg.meta?.topic === topic);
    if (hasTopic) return;

    if (topic === 'Coverage Limits') {
      handleSendMessage("Explain our current policy coverage limits");
    } else if (topic === 'Waiting Periods') {
      handleSendMessage("Tell me about the waiting periods restriction clause");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* Container holding Chat structure (Page 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Session Detail sidebar (3 of 12 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-205 dark:border-slate-800 dark:bg-slate-900/40 p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Header section */}
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-450 dark:text-slate-400 uppercase">
                ACTIVE SESSION
              </span>
              
              <div className="mt-2.5 p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl flex items-center gap-2.5">
                <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">Analyzing Policy</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{selectedPolicy.name}</div>
                </div>
              </div>
            </div>

            {/* Topic Summary Checklist panel */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-widest text-slate-450 dark:text-slate-400 uppercase">
                TOPIC SUMMARY
              </span>

              <div className="space-y-1.5">
                {topics.map((t, idx) => {
                  const isActive = activeTopic === t.title;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTopic(t.title)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                        isActive
                          ? 'border-blue-500 bg-blue-50/20 text-blue-700 dark:border-blue-600 dark:bg-blue-950/30 dark:text-blue-300'
                          : 'border-slate-150 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-350 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          t.status === 'Completed' 
                            ? 'bg-green-500' 
                            : t.status === 'Active' 
                            ? 'bg-blue-500' 
                            : 'bg-slate-350'
                        }`} />
                        <span>{t.title}</span>
                      </div>
                      
                      {t.status === 'Completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Lower Confidence bar layout */}
          <div className="pt-4 border-t border-slate-150 dark:border-slate-805">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-150 dark:border-slate-850">
              <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                <span>SIMULATOR ACCURACY</span>
                <span className="text-blue-600 dark:text-blue-400">98.4% Confidence</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[98.4%]" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Conversation Assistant panel (8 of 12 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-205 dark:border-slate-800 dark:bg-slate-900/40 p-5 md:p-6 flex flex-col justify-between min-h-[520px]">
          
          {/* Messages stream view */}
          <div className="flex-1 overflow-y-auto space-y-4 max-h-[380px] mb-6 pr-2">
            
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`p-4 max-w-[85%] rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs ${
                    isAssistant
                      ? 'bg-slate-50 border border-slate-200 text-slate-800 dark:bg-slate-950/40 dark:border-slate-850 dark:text-slate-300 rounded-tl-none font-sans'
                      : 'bg-blue-600 text-white rounded-tr-none font-sans font-medium'
                  }`}>
                    {/* Header info */}
                    <div className="flex justify-between items-center gap-8 mb-1.5 opacity-75 font-mono text-[9px] font-bold">
                      <span>{isAssistant ? '🛡️ PoliShield' : 'You'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {/* Typings / Loader dots */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3.5 bg-slate-55 bg-slate-55 bg-slate-50 border rounded-2xl rounded-tl-none dark:bg-slate-950/40 dark:border-slate-850 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

          </div>

          {/* Form input controls (Page 4 bottom) */}
          <div className="pt-4 border-t border-slate-150 dark:border-slate-800 space-y-3">
            
            {/* Quick action question helper chips inside the input panel */}
            <div className="flex flex-wrap gap-1.5 pb-1">
              {[
                'Do I pay co-pay?',
                'Are dental surgical treatments included?',
                'Can I claim for emergency ambulance?'
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-905 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Real Message text bar inputs */}
            <div className="flex gap-2.5 items-stretch">
              
              {/* Attachment placeholder button */}
              <button 
                onClick={() => alert("Upload diagnostics logs or policy annexure for instant scanning...")}
                title="Attach Document"
                className="p-3 border border-slate-250 bg-slate-50 hover:bg-slate-100 rounded-xl dark:border-slate-800 dark:bg-slate-905 text-slate-500 dark:text-slate-400"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputText);
                  }
                }}
                placeholder="Ask about waiting periods, claim filing, or premium hikes..."
                className="flex-1 px-4.5 rounded-xl border border-slate-255 bg-transparent text-xs font-medium text-slate-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:text-slate-100"
              />

              {/* Send button */}
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="px-4.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition disabled:opacity-40 shadow-sm"
              >
                <Send className="h-4.5 w-4.5" />
              </button>

            </div>

            <div className="flex justify-between text-[10px] font-semibold text-slate-400 font-mono">
              <span>Shift + Enter for new line</span>
              <span>Secure encrypted AES session</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
