import React, { useState, useEffect } from 'react';
import { X, Share2, ExternalLink, Linkedin, ImageOff } from 'lucide-react';
import { DayContent, ContentType } from '../types';

interface DayModalProps {
  content: DayContent;
  onClose: () => void;
  isOpen: boolean;
}

export const DayModal: React.FC<DayModalProps> = ({ content, onClose, isOpen }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset error state when content changes (i.e. opening a different day)
  useEffect(() => {
    setImageError(false);
  }, [content]);

  if (!isOpen) return null;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gea-dark/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white text-gea-dark w-full max-w-lg rounded-sm overflow-hidden shadow-2xl transform transition-all scale-100 animate-[fadeIn_0.3s_ease-out]">
        
        {/* Header/Close */}
        <div className="absolute top-0 right-0 p-4 z-10">
          <button 
            onClick={onClose}
            className="bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full h-64 sm:h-72 relative overflow-hidden bg-gray-100 group">
             {!imageError ? (
               <img 
                 src={content.imageUrl} 
                 alt={`Day ${content.day}`} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 onError={() => setImageError(true)}
               />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500 p-4 text-center">
                 <ImageOff size={48} className="mb-2 opacity-50" />
                 <p className="font-bold">Image Not Found</p>
                 <p className="text-xs mt-1 font-mono bg-white/50 px-2 py-1 rounded">
                   {content.imageUrl}
                 </p>
               </div>
             )}
             <div className="absolute top-4 left-4 bg-gea-primary text-white px-3 py-1 text-sm font-bold tracking-widest shadow-md">
                DEC {content.day}
             </div>
        </div>

        {/* Body Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-body font-bold text-gea-primary mb-2 border-b-2 border-gea-light/20 pb-2">
            {content.title || `Innovation #${content.day}`}
          </h2>
          
          <p className="text-base leading-relaxed text-gray-600 mb-6 font-body whitespace-pre-wrap">
            {content.text}
          </p>

          <div className="flex flex-col gap-3">
             {/* Source Button if LinkedIn */}
             {content.type === ContentType.LINKEDIN && content.sourceUrl && (
                <a 
                  href={content.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-colors text-sm font-bold uppercase tracking-wide rounded-sm"
                >
                  <Linkedin size={18} />
                  Read on LinkedIn
                </a>
             )}

             {/* External Source (General) */}
             {content.type === ContentType.CUSTOM && content.sourceUrl && (
                <a 
                  href={content.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gea-primary text-gea-primary hover:bg-gea-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wide rounded-sm"
                >
                  <ExternalLink size={18} />
                  Learn More
                </a>
             )}

             {/* Share Button */}
             <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gea-light text-white hover:bg-gea-primary transition-colors text-sm font-bold uppercase tracking-wide shadow-sm rounded-sm"
             >
                <Share2 size={18} />
                {copied ? 'Link Copied!' : 'Share this Day'}
             </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};