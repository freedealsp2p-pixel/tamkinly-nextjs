'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Target, Brain, Calendar, Printer } from 'lucide-react';

const IdentityMasteryGuide: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Chapters data
  const chapters = [
    {
      id: 'cover',
      title: 'Identity Mastery',
      subtitle: 'Advanced Implementation Framework',
      type: 'cover',
    },
    {
      id: 'toc',
      title: 'Table of Contents',
      type: 'toc',
    },
    {
      id: 'chapter1',
      title: 'The Identity Shift Paradigm',
      subtitle: 'From Goals to Being',
      type: 'chapter',
    },
    {
      id: 'chapter2',
      title: 'Scientific Adaptation of WOOP for Identity',
      subtitle: 'Transforming Psychological Framework',
      type: 'chapter',
    },
    {
      id: 'chapter3',
      title: 'Advanced If-Then Implementation',
      type: 'chapter',
    },
    {
      id: 'chapter4',
      title: '90-Day Identity Layering System',
      type: 'chapter',
    },
    {
      id: 'chapter5',
      title: 'Daily Identity Reinforcement Protocol',
      type: 'chapter',
    },
  ];

  // Table of contents data
  const tocSections = [
    {
      title: 'Foundational Frameworks',
      items: [
        { name: '1. The Identity Shift Paradigm', page: 3 },
        { name: '2. Scientific Adaptation of WOOP for Identity', page: 5 },
        { name: '3. Advanced If-Then Implementation', page: 7 },
        { name: '4. 90-Day Identity Layering System', page: 9 },
      ],
    },
    {
      title: 'Implementation Protocols',
      items: [
        { name: '5. Daily Identity Reinforcement Protocol', page: 11 },
        { name: '6. Weekly Pattern Recognition System', page: 13 },
        { name: '7. Monthly Identity Depth Assessment', page: 15 },
      ],
    },
  ];

  // WOOP Framework data
  const woopFramework = [
    {
      letter: 'W',
      title: 'IDENTITY INTENTION',
      original: 'Instead of "I wish to be..."',
      adapted: 'Use: "I choose to identify as someone who [core action]"',
    },
    {
      letter: 'O',
      title: 'IDENTITY STATE',
      original: 'Instead of visualizing outcomes',
      adapted: 'Use: "How does this identity feel in daily moments?"',
    },
    {
      letter: 'O',
      title: 'IDENTITY RESISTANCE',
      original: 'Instead of external obstacles',
      adapted: 'Use: "What old identity story fights back?"',
    },
    {
      letter: 'P',
      title: 'IDENTITY REINFORCEMENT',
      original: 'Instead of "if-then" plans',
      adapted: 'Use: "When old identity whispers, I\'ll [specific identity action]"',
    },
  ];

  const renderPage = () => {
    const chapter = chapters[currentPage];

    switch (chapter.id) {
      case 'cover':
        return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            {/* Decorative line */}
            <div className="w-32 h-0.5 bg-[#3DD4B0] mb-8" />

            <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-[#0F1C2E] mb-4">
              IDENTITY MASTERY
            </h1>

            <div className="w-32 h-0.5 bg-[#3DD4B0] mb-8" />

            <p className="text-xl font-light tracking-wide text-[#1F6F78] mb-2">
              Advanced Implementation Framework
            </p>

            <p className="text-lg italic text-[#8A94A6] mb-16">
              Professional Edition
            </p>

            <div className="border-t border-[#1F6F78]/30 pt-8 mt-16">
              <p className="text-sm tracking-widest uppercase text-[#1F6F78] mb-2">
                Part of Tamkinly
              </p>
              <p className="text-xs text-[#8A94A6]">
                © 2024 Tamkinly — Empowerment Through Refined Choices
              </p>
            </div>
          </div>
        );

      case 'toc':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-[#0F1C2E] uppercase tracking-wide">
                Table of Contents
              </h2>
              <div className="w-24 h-0.5 bg-[#3DD4B0] mx-auto mt-4" />
            </div>

            {tocSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F6F78] border-b border-[#1F6F78]/30 pb-2 uppercase">
                  {section.title}
                </h3>

                <div className="space-y-2">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-[#F6F8FA] hover:bg-[#F6F8FA] px-2 rounded cursor-pointer"
                      onClick={() => setCurrentPage(idx + 2)}
                    >
                      <span className="text-[#2B2E34]">{item.name}</span>
                      <span className="text-[#3DD4B0] font-semibold">{item.page}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'chapter1':
        return (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-[#3DD4B0] mb-2">
                CHAPTER 1
              </p>
              <div className="w-16 h-0.5 bg-[#3DD4B0] mb-4" />

              <h2 className="text-2xl font-semibold text-[#0F1C2E] uppercase mb-2">
                The Identity Shift Paradigm
              </h2>
              <p className="text-lg italic text-[#8A94A6]">
                From Goals to Being
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-[#2B2E34]">
              <p className="leading-relaxed">
                Traditional goal-setting operates on external achievement metrics.
                Identity-based transformation works through internal reconfiguration
                of self-perception. The distinction is fundamental rather than
                incremental.
              </p>
            </div>

            <Card className="bg-[#F6F8FA] border-l-4 border-l-[#3DD4B0]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">
                  Key Distinctions
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-[#0F1C2E] mb-2">Goal-Focused Approach:</p>
                    <p className="text-[#1F6F78] italic mb-2">"I will exercise 3 times weekly"</p>
                    <ul className="text-sm text-[#8A94A6] space-y-1">
                      <li>• External compliance metric</li>
                      <li>• Willpower-dependent</li>
                      <li>• Binary success/failure outcome</li>
                    </ul>
                  </div>

                  <div className="bg-[#0F1C2E] p-4 rounded-lg">
                    <p className="font-semibold text-[#3DD4B0] mb-2">Identity-Focused Approach:</p>
                    <p className="text-white italic mb-2">"I am someone whose body moves with intention"</p>
                    <ul className="text-sm text-[#8A94A6] space-y-1">
                      <li>• Internal self-definition</li>
                      <li>• Automatic behavioral alignment</li>
                      <li>• Continuous identity reinforcement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#1F6F78]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">
                  Scientific Foundation
                </h3>
                <p className="text-[#8A94A6] mb-4">Key research supporting identity-based transformation:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[#2B2E34]">
                    <span className="w-2 h-2 rounded-full bg-[#3DD4B0]" />
                    Self-Perception Theory (Bem, 1972)
                  </li>
                  <li className="flex items-center gap-2 text-[#2B2E34]">
                    <span className="w-2 h-2 rounded-full bg-[#3DD4B0]" />
                    Identity-Based Habit Formation (Neal et al., 2012)
                  </li>
                  <li className="flex items-center gap-2 text-[#2B2E34]">
                    <span className="w-2 h-2 rounded-full bg-[#3DD4B0]" />
                    Cognitive Dissonance Reduction (Festinger, 1957)
                  </li>
                  <li className="flex items-center gap-2 text-[#2B2E34]">
                    <span className="w-2 h-2 rounded-full bg-[#3DD4B0]" />
                    Implementation Intentions (Gollwitzer, 1999)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'chapter2':
        return (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-[#3DD4B0] mb-2">
                CHAPTER 2
              </p>
              <div className="w-16 h-0.5 bg-[#3DD4B0] mb-4" />

              <h2 className="text-2xl font-semibold text-[#0F1C2E] uppercase mb-2">
                Scientific Adaptation of WOOP for Identity
              </h2>
              <p className="text-lg italic text-[#8A94A6]">
                Transforming Psychological Framework
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-[#2B2E34]">
              <p className="leading-relaxed">
                The WOOP technique (Wish, Outcome, Obstacle, Plan) developed by
                psychologist Gabriele Oettingen has been systematically adapted for
                identity transformation applications. This adaptation represents a
                significant evolution beyond its original goal-oriented
                implementation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {woopFramework.map((item, index) => (
                <Card key={index} className="bg-[#F6F8FA] border-l-4 border-l-[#3DD4B0]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#0F1C2E] flex items-center justify-center">
                        <span className="text-[#3DD4B0] font-bold">{item.letter}</span>
                      </div>
                      <h4 className="font-semibold text-[#0F1C2E]">{item.title}</h4>
                    </div>
                    <p className="text-sm text-[#8A94A6] mb-2">{item.original}</p>
                    <p className="text-[#2B2E34] font-medium">{item.adapted}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-[#0F1C2E]">
              <CardContent className="p-6">
                <h4 className="text-[#3DD4B0] font-semibold mb-4">
                  Research Note
                </h4>
                <p className="text-white leading-relaxed">
                  Research from behavioral psychology indicates identity-based habits
                  exhibit 300% higher adherence rates compared to goal-oriented
                  behaviors. This paradigm shift represents the core innovation of the
                  Identity Recode methodology.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-[#3DD4B0] mb-2">
                CHAPTER
              </p>
              <div className="w-16 h-0.5 bg-[#3DD4B0] mb-4" />

              <h2 className="text-2xl font-semibold text-[#0F1C2E] uppercase mb-2">
                {chapter.title}
              </h2>
              {chapter.subtitle && (
                <p className="text-lg italic text-[#8A94A6]">{chapter.subtitle}</p>
              )}
            </div>

            <Card className="bg-[#F6F8FA]">
              <CardContent className="p-8 text-center">
                <p className="text-[#8A94A6]">Content coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#3DD4B0]" />
            <span className="text-sm tracking-wide">Identity Mastery Guide</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#8A94A6]">
              Page {currentPage + 1} of {chapters.length}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {renderPage()}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#1F6F78]/20">
          <Button
            className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-5 py-2.5 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {chapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === index ? 'bg-[#3DD4B0] w-4' : 'bg-[#8A94A6]/30'
                }`}
              />
            ))}
          </div>

          <Button
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-5 py-2.5 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(chapters.length - 1, prev + 1))}
            disabled={currentPage === chapters.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#8A94A6]">
          <p>Part of Tamkinly — Empowerment Through Refined Choices</p>
        </div>
      </div>
    </div>
  );
};

export default IdentityMasteryGuide;
