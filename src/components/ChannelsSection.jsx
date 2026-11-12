import React from 'react';
import { PhoneCall, MessageSquare, Globe, Mail, ArrowUpRight } from 'lucide-react';
import { CHANNELS } from '../data/content';

const iconMap = {
  PhoneCall: PhoneCall,
  MessageSquare: MessageSquare,
  Globe: Globe,
  Mail: Mail,
};

export default function ChannelsSection({ onOpenDemo }) {
  return (
    <section id="canais" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-block text-xs font-semibold text-[#C84B1F] uppercase tracking-wider mb-3">
            CANAIS
          </div>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Um atendimento.<br />
            <span className="font-serif-title italic text-[#C84B1F]">Onde o cliente estiver.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
            As ligações e o WhatsApp são os canais de maior conversão da sua empresa. A Vocalis unifica o atendimento mantendo o tom da sua marca em todos eles.
          </p>
        </div>

        {/* 4 Clean Cards Grid (Matching reference layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHANNELS.map((channel) => {
            const Icon = iconMap[channel.icon] || PhoneCall;
            return (
              <div
                key={channel.id}
                className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean shadow-card-hover group flex flex-col justify-between"
              >
                <div>
                  {/* Top card row: Icon + Badge + Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#EFE9DF] flex items-center justify-center text-[#C84B1F] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF6F0] text-[#7A756F] border border-[#EBE6DC]">
                        {channel.badge}
                      </span>
                      <button 
                        onClick={onOpenDemo}
                        aria-label="Saiba mais"
                        className="w-8 h-8 rounded-full border border-transparent hover:border-[#DCD7CE] flex items-center justify-center text-[#9E9A93] hover:text-[#1A1816] transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-[#1A1816] tracking-tight mb-3">
                    {channel.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#5C5955] leading-relaxed mb-4">
                    {channel.description}
                  </p>
                </div>

                {/* Footer detail */}
                <div className="pt-4 border-t border-[#F0ECE3] text-xs font-medium text-[#7A756F] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C84B1F]"></span>
                  <span>{channel.details}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
