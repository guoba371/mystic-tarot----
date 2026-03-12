import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, Layout, Star, Menu, X, ChevronRight, Info, ExternalLink } from 'lucide-react';
import { TAROT_CARDS, TAROT_SPREADS, TarotCard } from './constants';
import { getDailyTarotInterpretation } from './services/geminiService';

// --- Components ---

const BookingModal = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-mystic-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md glass rounded-[2.5rem] p-8 md:p-10 overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-500">
              <Star size={40} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">预约已提交</h3>
            <p className="text-white/60 mb-8">我们的塔罗师将在24小时内通过电话与您联系，请保持通讯畅通。</p>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-gold-500 text-mystic-950 font-bold rounded-full hover:bg-gold-400 transition-all"
            >
              返回首页
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-bold gold-text mb-2">预约专业咨询</h3>
              <p className="text-sm text-white/40">请填写以下信息，开启您的深度解读之旅。</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold-500/60 mb-2 ml-1">您的姓名</label>
                <input 
                  required
                  type="text" 
                  placeholder="请输入姓名"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold-500/60 mb-2 ml-1">联系电话</label>
                <input 
                  required
                  type="tel" 
                  placeholder="请输入手机号码"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gold-500/60 mb-2 ml-1">您想咨询的问题</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="请简述您目前的困惑或想了解的方向..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                />
              </div>

              <button 
                disabled={status === 'submitting'}
                type="submit"
                className="w-full py-4 bg-gold-500 text-mystic-950 font-bold rounded-full hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-mystic-950/30 border-t-mystic-950 rounded-full animate-spin" />
                    提交中...
                  </>
                ) : '提交预约'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const CardModal = ({ card, onClose }: { card: TarotCard | null; onClose: () => void }) => {
  if (!card) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-mystic-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl glass rounded-[2rem] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
          <img 
            src={card.image} 
            alt={card.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mystic-950/80 via-transparent to-transparent md:hidden" />
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-[10px] font-bold uppercase tracking-widest border border-gold-500/20">
                {card.arcana === 'Major' ? '大阿卡纳' : '小阿卡纳'}
              </span>
              <span className="text-white/40 text-xs uppercase tracking-widest">No. {card.value}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold gold-text mb-1">{card.name}</h2>
            <p className="text-lg text-white/40 font-serif italic">{card.nameEn}</p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <Info size={16} /> 牌面描述
              </h3>
              <p className="text-white/70 leading-relaxed">{card.description}</p>
            </section>

            <div className="grid sm:grid-cols-2 gap-8">
              <section className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
                <h3 className="text-green-400 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Star size={16} /> 正位牌意
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">{card.meaningUpright}</p>
              </section>

              <section className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <h3 className="text-red-400 text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Star size={16} className="rotate-180" /> 逆位牌意
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">{card.meaningReversed}</p>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            <Star className="text-mystic-950 fill-mystic-950" size={20} />
          </div>
          <span className="text-xl font-serif font-bold tracking-widest gold-text">MYSTIC TAROT</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#daily" className="hover:text-gold-400 transition-colors">每日抽牌</a>
          <a href="#learning" className="hover:text-gold-400 transition-colors">塔罗入门</a>
          <a href="#library" className="hover:text-gold-400 transition-colors">牌意大全</a>
          <a href="#spreads" className="hover:text-gold-400 transition-colors">经典牌阵</a>
          <a href="#services" className="hover:text-gold-400 transition-colors">专业服务</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full glass p-6 flex flex-col gap-4 border-b border-white/10"
          >
            <a href="#daily" onClick={() => setIsOpen(false)}>每日抽牌</a>
            <a href="#learning" onClick={() => setIsOpen(false)}>塔罗入门</a>
            <a href="#library" onClick={() => setIsOpen(false)}>牌意大全</a>
            <a href="#spreads" onClick={() => setIsOpen(false)}>经典牌阵</a>
            <a href="#services" onClick={() => setIsOpen(false)}>专业服务</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mystic-800/20 rounded-full blur-[120px]" />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 max-w-3xl"
    >
      <span className="inline-block px-4 py-1 rounded-full border border-gold-500/30 text-gold-500 text-xs tracking-[0.3em] uppercase mb-6">
        探索命运的奥秘
      </span>
      <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">
        开启你的<br /><span className="gold-text italic">塔罗之旅</span>
      </h1>
      <p className="text-lg text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
        在这里，我们通过古老的塔罗符号，连接你的直觉与宇宙的智慧。
        无论是寻找指引、探索自我，还是预见未来，塔罗之境都将为你揭开神秘的面纱。
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#daily" className="px-8 py-4 bg-gold-500 text-mystic-950 font-bold rounded-full hover:bg-gold-400 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
          立即抽牌
        </a>
        <a href="#library" className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
          浏览牌库
        </a>
      </div>
    </motion.div>
  </section>
);

const LearningCenter = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'classification' | 'elements'>('history');

  const content = {
    history: {
      title: '塔罗的历史起源',
      text: '塔罗牌起源于15世纪的意大利，最初是一种名为“Tarocchini”的宫廷纸牌游戏。直到18世纪末，神秘学者开始赋予这些卡牌深层的神秘学含义，将其与占星术、卡巴拉和炼金术联系起来。现代塔罗牌不仅是占卜工具，更是自我探索和心理分析的强大媒介。',
      image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb099?auto=format&fit=crop&q=80&w=800'
    },
    classification: {
      title: '78张牌的结构',
      text: '一副标准的塔罗牌由78张牌组成，分为两个主要部分：\n\n• 大阿卡纳 (Major Arcana)：22张牌，代表生命中的重大转折、灵魂的进化阶段和宏观的宇宙法则。\n• 小阿卡纳 (Minor Arcana)：56张牌，分为四个花色，反映日常生活中的具体事件、情感、思想和物质状态。',
      image: 'https://images.unsplash.com/photo-1635627408144-6bf33dabc98c?auto=format&fit=crop&q=80&w=800'
    },
    elements: {
      title: '四大元素象征',
      text: '小阿卡纳的四个花色对应着自然界的四大元素：\n\n• 权杖 (Wands)：火元素，象征行动、创造力、激情与意志。\n• 圣杯 (Cups)：水元素，象征情感、直觉、关系与潜意识。\n• 宝剑 (Swords)：风元素，象征理智、沟通、冲突与决断。\n• 星币 (Pentacles)：土元素，象征物质、金钱、工作与稳定。',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800'
    }
  };

  return (
    <section id="learning" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4">塔罗学习中心</h2>
          <p className="text-white/50">从零开始，探索塔罗牌的古老智慧与象征体系。</p>
        </div>

        <div className="glass rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
          <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 p-8 flex flex-col gap-4">
            {(['history', 'classification', 'elements'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-6 py-4 rounded-2xl transition-all flex items-center justify-between group ${activeTab === tab ? 'bg-gold-500 text-mystic-950 font-bold' : 'hover:bg-white/5 text-white/60'}`}
              >
                <span>
                  {tab === 'history' ? '历史起源' : tab === 'classification' ? '牌组分类' : '元素象征'}
                </span>
                <ChevronRight size={18} className={activeTab === tab ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
              </button>
            ))}
          </div>

          <div className="w-full lg:w-2/3 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <h3 className="text-3xl font-serif font-bold mb-6 gold-text">{content[activeTab].title}</h3>
              <p className="text-white/70 leading-relaxed whitespace-pre-wrap text-lg">
                {content[activeTab].text}
              </p>
            </motion.div>
            
            <motion.div 
              key={`${activeTab}-img`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full md:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10"
            >
              <img src={content[activeTab].image} alt={activeTab} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DailyDraw = () => {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleDraw = async () => {
    setIsDrawing(true);
    setShowResult(false);
    
    // Simulate shuffle
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const reversed = Math.random() > 0.7; // 30% chance for reversed
    
    setCard(randomCard);
    setIsReversed(reversed);
    setIsDrawing(false);
    setShowResult(true);
    
    setInterpretation('正在感应星象...');
    const result = await getDailyTarotInterpretation(randomCard, reversed);
    setInterpretation(result);
  };

  return (
    <section id="daily" className="py-24 px-6 bg-mystic-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4">每日抽牌</h2>
          <p className="text-white/50">静下心来，默想你今天的问题，然后点击卡牌抽取你的指引。</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative w-64 h-96">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div 
                  key="back"
                  initial={{ rotateY: 0 }}
                  animate={isDrawing ? { rotateY: [0, 180, 360], scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: isDrawing ? Infinity : 0 }}
                  onClick={!isDrawing ? handleDraw : undefined}
                  className={`w-full h-full rounded-2xl border-4 border-gold-500/50 bg-mystic-800 flex items-center justify-center cursor-pointer overflow-hidden group`}
                >
                  <div className="absolute inset-4 border border-gold-500/20 rounded-xl flex items-center justify-center">
                    <div className="text-gold-500/20 group-hover:text-gold-500/40 transition-colors">
                      <Sparkles size={80} />
                    </div>
                  </div>
                  <span className="relative z-10 text-gold-500 font-serif tracking-widest text-sm uppercase">点击抽牌</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="front"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  className={`w-full h-full rounded-2xl border-2 border-gold-500 bg-mystic-950 overflow-hidden relative ${isReversed ? 'rotate-180' : ''}`}
                >
                  <img src={card?.image} alt={card?.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-mystic-950 to-transparent">
                    <h3 className="text-xl font-serif font-bold text-gold-400">{card?.name}</h3>
                    <p className="text-xs text-white/60 uppercase tracking-widest">{card?.nameEn}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {showResult && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-xl glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isReversed ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {isReversed ? '逆位' : '正位'}
                </span>
                <h3 className="text-2xl font-serif font-bold">{card?.name}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Info size={14} /> 核心牌意
                  </h4>
                  <p className="text-white/80">{isReversed ? card?.meaningReversed : card?.meaningUpright}</p>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles size={14} /> 灵感解读
                  </h4>
                  <div className="text-white/70 whitespace-pre-wrap italic leading-relaxed">
                    {interpretation}
                  </div>
                </div>

                <button 
                  onClick={() => setShowResult(false)}
                  className="mt-8 text-gold-500 text-sm font-bold uppercase tracking-widest hover:text-gold-400 flex items-center gap-2"
                >
                  重新抽取 <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const CardLibrary = ({ onCardClick }: { onCardClick: (card: TarotCard) => void }) => {
  const [filter, setFilter] = useState<'All' | 'Major' | 'Minor'>('All');
  
  const filteredCards = filter === 'All' 
    ? TAROT_CARDS 
    : TAROT_CARDS.filter(c => c.arcana === filter);

  return (
    <section id="library" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">牌意大全</h2>
            <p className="text-white/50">深入了解78张塔罗牌的象征意义与哲学内涵。</p>
          </div>
          
          <div className="flex gap-2 p-1 glass rounded-full">
            {(['All', 'Major', 'Minor'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-gold-500 text-mystic-950' : 'hover:bg-white/5'}`}
              >
                {f === 'All' ? '全部' : f === 'Major' ? '大阿卡纳' : '小阿卡纳'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredCards.map((card) => (
            <motion.div 
              layout
              key={card.id}
              onClick={() => onCardClick(card)}
              className="group cursor-pointer"
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-gold-500/50 transition-colors relative">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-mystic-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <BookOpen className="text-gold-500" size={32} />
                </div>
              </div>
              <h3 className="font-serif font-bold group-hover:text-gold-500 transition-colors">{card.name}</h3>
              <p className="text-xs text-white/40 uppercase tracking-widest">{card.nameEn}</p>
            </motion.div>
          ))}
          {/* Placeholder for more cards if needed */}
          {filteredCards.length < 10 && Array.from({ length: 5 }).map((_, i) => (
            <div key={`placeholder-${i}`} className="opacity-20">
              <div className="aspect-[2/3] rounded-xl bg-white/5 mb-4 border border-dashed border-white/20" />
              <div className="h-4 w-20 bg-white/20 rounded mb-2" />
              <div className="h-3 w-12 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Spreads = () => {
  const [selectedSpread, setSelectedSpread] = useState(TAROT_SPREADS[1]); // Default to Three Card
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  return (
    <section id="spreads" className="py-24 px-6 bg-mystic-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-4">经典牌阵</h2>
          <p className="text-white/50">选择适合你问题的牌阵，通过可视化布局探索深层含义。</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Spread Selection List */}
          <div className="lg:col-span-4 space-y-4">
            {TAROT_SPREADS.map((spread) => (
              <button
                key={spread.id}
                onClick={() => setSelectedSpread(spread)}
                className={`w-full text-left p-6 rounded-3xl transition-all border ${
                  selectedSpread.id === spread.id 
                    ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                    : 'glass border-white/5 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-serif font-bold text-xl ${selectedSpread.id === spread.id ? 'text-gold-400' : 'text-white'}`}>
                    {spread.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    {spread.cardsCount} 张牌
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{spread.description}</p>
              </button>
            ))}
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-8 glass rounded-[3rem] p-8 md:p-12 min-h-[600px] relative flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gold-400">{selectedSpread.name}</h3>
                <p className="text-sm text-white/40">点击牌位查看位置含义</p>
              </div>
              <div className="flex items-center gap-2 text-gold-500/60 text-xs font-bold uppercase tracking-widest">
                <Layout size={16} /> 可视化布局
              </div>
            </div>

            <div className="flex-1 relative bg-mystic-950/30 rounded-[2rem] border border-white/5 overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute inset-0 p-12">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedSpread.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                  >
                    {selectedSpread.positions.map((pos, idx) => (
                      <motion.div
                        key={`${selectedSpread.id}-${idx}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ 
                          left: `${pos.x}%`, 
                          top: `${pos.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onMouseEnter={() => setHoveredPosition(idx)}
                        onMouseLeave={() => setHoveredPosition(null)}
                        className={`absolute w-16 h-24 md:w-24 md:h-36 rounded-lg border-2 flex flex-col items-center justify-center cursor-help transition-all duration-300 ${
                          hoveredPosition === idx 
                            ? 'border-gold-500 bg-gold-500/20 shadow-[0_0_30px_rgba(212,175,55,0.3)] z-20' 
                            : 'border-gold-500/30 bg-mystic-900/50 z-10'
                        } ${selectedSpread.id === 'celtic-cross' && idx === 1 ? 'rotate-90' : ''}`}
                      >
                        <span className={`text-xl font-serif font-bold ${hoveredPosition === idx ? 'text-gold-400' : 'text-gold-500/40'}`}>
                          {idx + 1}
                        </span>
                        
                        {/* Tooltip-like info on hover */}
                        <AnimatePresence>
                          {hoveredPosition === idx && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 glass p-4 rounded-xl text-center pointer-events-none z-30"
                            >
                              <h4 className="text-gold-400 font-bold text-sm mb-1">{pos.name}</h4>
                              <p className="text-[10px] text-white/70 leading-tight">{pos.description}</p>
                              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 glass rotate-45 border-t-0 border-l-0" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Legend / Info Footer */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
              {selectedSpread.positions.map((pos, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredPosition(idx)}
                  onMouseLeave={() => setHoveredPosition(null)}
                  className={`p-3 rounded-xl border transition-all cursor-default ${
                    hoveredPosition === idx ? 'bg-gold-500/10 border-gold-500/30' : 'bg-white/5 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-4 h-4 rounded-full bg-gold-500 text-mystic-950 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 truncate">{pos.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ onBookClick }: { onBookClick: () => void }) => (
  <section id="services" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-gold-500 text-sm font-bold uppercase tracking-widest mb-4 block">专业咨询服务</span>
          <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">一对一深度<br /><span className="gold-text italic">塔罗解读</span></h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            我们的专业塔罗师拥有超过十年的实战经验，擅长情感分析、事业规划及灵性成长。
            通过深度的能量连接，为你提供最诚恳、最具启发性的建议。
          </p>
          
          <div className="space-y-6 mb-12">
            {[
              { title: '情感咨询', desc: '解析恋爱关系、婚姻走向及真爱指引。' },
              { title: '事业财运', desc: '职场晋升、创业时机及财富能量分析。' },
              { title: '年度运势', desc: '全年的能量波动预警与核心机遇把握。' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 text-gold-500"><Star size={18} /></div>
                <div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onBookClick}
            className="px-10 py-4 bg-white text-mystic-950 font-bold rounded-full hover:bg-gold-400 transition-all flex items-center gap-2"
          >
            预约咨询 <ExternalLink size={18} />
          </button>
        </div>
        
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden border-8 border-white/5">
            <img src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&q=80&w=1000" alt="Tarot Reading" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-8 -left-8 glass p-8 rounded-3xl max-w-xs animate-float">
            <div className="flex items-center gap-1 text-gold-500 mb-2">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-sm italic text-white/80 mb-4">"解读非常精准，帮我度过了最迷茫的时期，强烈推荐！"</p>
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">— 匿名客户</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 bg-mystic-950">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
            <Star className="text-mystic-950 fill-mystic-950" size={16} />
          </div>
          <span className="text-lg font-serif font-bold tracking-widest gold-text">MYSTIC TAROT</span>
        </div>
        <p className="text-white/40 max-w-sm leading-relaxed text-sm">
          塔罗不仅是占卜，更是一面镜子，映照出你内心深处未曾察觉的真相。
          愿你在塔罗之境找到属于你的光。
        </p>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gold-500">快速链接</h4>
        <ul className="space-y-4 text-sm text-white/60">
          <li><a href="#daily" className="hover:text-gold-400 transition-colors">每日抽牌</a></li>
          <li><a href="#library" className="hover:text-gold-400 transition-colors">牌意大全</a></li>
          <li><a href="#spreads" className="hover:text-gold-400 transition-colors">经典牌阵</a></li>
          <li><a href="#services" className="hover:text-gold-400 transition-colors">专业服务</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gold-500">联系我们</h4>
        <ul className="space-y-4 text-sm text-white/60">
          <li>微信: MysticTarot_Official</li>
          <li>邮箱: contact@mystictarot.com</li>
          <li>地址: 灵感之城星光大道88号</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.3em] text-white/20">
      © 2026 Mystic Tarot. All Rights Reserved. 塔罗之境 版权所有.
    </div>
  </footer>
);

export default function App() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="font-sans selection:bg-gold-500/30">
      <Navbar />
      <main>
        <Hero />
        <DailyDraw />
        <LearningCenter />
        <CardLibrary onCardClick={setSelectedCard} />
        <Spreads />
        <Services onBookClick={() => setIsBookingOpen(true)} />
      </main>
      <Footer />

      <AnimatePresence>
        {selectedCard && (
          <CardModal 
            card={selectedCard} 
            onClose={() => setSelectedCard(null)} 
          />
        )}
        {isBookingOpen && (
          <BookingModal 
            onClose={() => setIsBookingOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
