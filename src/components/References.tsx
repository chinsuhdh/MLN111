'use client';

import { useState, useEffect } from 'react';
import { FileText, BookMarked } from 'lucide-react';
import AnimatedView from './AnimatedView';
import Tooltip from './Tooltip';

interface Section {
  id: number;
  title: string;
  content: string;
  subsections?: {
    title: string;
    details: string[];
  }[];
}

interface DocumentData {
  title: string;
  sections: Section[];
}

/**
 * Format citation:
 * [[1]]
 * [[1,2,3]]
 */
const formatTextWithCitations = (text: string) => {
  if (!text) return text;

  // Regex match [[1]] hoặc [[1,2]]
  const regex = /(\[\[[\d,\s]+\]\])/g;

  // Tách text thành nhiều phần
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // Kiểm tra citation
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const match = part.match(/\[\[([\d,\s]+)\]\]/);

      if (match) {
        const numbers = match[1]
          .split(',')
          .map((n) => n.trim());

        return (
          <sup
            key={index}
            className="ml-1 inline-flex gap-0.5 select-none align-super"
          >
            {numbers.map((num, i) => (
              <span
                key={i}
                className="
                  inline-flex items-center justify-center
                  bg-dred/15
                  text-beige
                  border border-dred/30
                  rounded-[3px]
                  px-1.5 py-0.5
                  text-[9px]
                  font-sans font-bold
                  tracking-widest
                  cursor-help
                  hover:bg-dred/30
                  hover:text-white
                  transition-colors
                "
                title={`Nguồn trích dẫn: ${num}`}
              >
                {num}
              </span>
            ))}
          </sup>
        );
      }
    }

    return <span key={index}>{part}</span>;
  });
};

export default function References() {
  const [doc, setDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    fetch('/MLN111.json')
      .then((res) => res.json())
      .then((data) => setDoc(data))
      .catch((err) => console.error('Lỗi tải tài liệu:', err));
  }, []);

  return (
    <section
      id="section-references"
      className="
        py-20 lg:py-32
        bg-navy-dark
        relative
        overflow-hidden
      "
    >
      {/* Background Pattern */}
      <div
        className="
          absolute inset-0
          opacity-[0.03]
          bg-[radial-gradient(circle_at_25%_50%,_#D4A373_1px,_transparent_1px),_radial-gradient(circle_at_75%_50%,_#D4A373_1px,_transparent_1px)]
          bg-[size:48px_48px]
          pointer-events-none
        "
      />

      <div className="relative z-10 w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28">
        
        {/* Header */}
        <AnimatedView className="text-center mb-14">
          <div
            className="
              inline-flex items-center gap-3
              mb-5 px-5 py-2.5
              rounded-full
              bg-beige/10
              border border-beige/20
            "
          >
            <BookMarked size={16} className="text-beige" />

            <span className="section-eyebrow text-beige mb-0 tracking-widest">
              Tài liệu
            </span>
          </div>

          <h2
            className="
              font-serif font-bold
              text-white
              text-3xl sm:text-4xl
            "
          >
            {doc ? doc.title : 'Đang tải tài liệu...'}
          </h2>

          <div
            className="
              w-20 h-0.5
              mx-auto mt-6
              bg-gradient-to-r
              from-beige/60
              via-dred/60
              to-transparent
            "
          />
        </AnimatedView>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {doc?.sections.map((section, index) => (
            <AnimatedView
              key={section.id}
              delay={index * 0.1}
            >
              <div
                className="
                  rounded-3xl
                  p-8 sm:p-10
                  bg-white/5
                  border border-white/10
                  hover:border-beige/30
                  transition-all duration-300
                "
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="
                      w-12 h-12
                      rounded-xl
                      flex items-center justify-center
                      bg-dred/10
                      text-dred
                      shrink-0
                    "
                  >
                    <FileText size={24} />
                  </div>

                  <h3
                    className="
                      font-serif font-bold
                      text-2xl
                      text-white
                      leading-tight
                    "
                  >
                    {section.title}
                  </h3>
                </div>

                {/* Main Content */}
                <div
                  className="
                    text-white/70
                    leading-relaxed
                    mb-6
                    text-base sm:text-lg
                  "
                >
                  {formatTextWithCitations(section.content)}
                </div>

                {/* Subsections */}
                {section.subsections?.map((sub, i) => (
                  <div
                    key={i}
                    className="
                      mt-6
                      pl-5 sm:pl-6
                      border-l-2 border-beige/20
                    "
                  >
                    <h4
                      className="
                        font-bold
                        text-beige
                        mb-3
                        text-lg
                      "
                    >
                      {sub.title}
                    </h4>

                    <ul
                      className="
                        list-disc
                        list-outside
                        pl-4
                        space-y-2
                        text-white/60
                        text-sm sm:text-base
                        leading-relaxed
                      "
                    >
                      {sub.details.map((detail, d) => (
                        <li key={d}>
                          {formatTextWithCitations(detail)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedView>
          ))}
        </div>
      </div>
    </section>
  );
}