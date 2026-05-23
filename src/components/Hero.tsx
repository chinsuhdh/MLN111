'use client'; 
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import AnimatedView from './AnimatedView';
import Tooltip from './Tooltip';

type QuoteData = {
  text: string;
  author: string;
  source: string;
  year: string;
};

type NodeData = {
  title: string;
  desc: string;
  quote: string;
  cite: string;
  orbit: 'inner' | 'middle' | 'outer';
  relations?: string[];
};

const QUOTE_DATABASE: Record<string, QuoteData> = {
  core: { text: "Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội.", author: "Karl Marx", source: "Luận cương về Phoi-ơ-bắc", year: "1845" },
  ca_nhan: { text: "Mỗi cá nhân là một thực thể xã hội mang tính cá nhân.", author: "Giáo trình Triết học", source: "NXB Chính trị Quốc gia", year: "2021" },
  xa_hoi: { text: "Tồn tại xã hội quyết định ý thức xã hội.", author: "C.Mác & Ph.Ăng-ghen", source: "Hệ tư tưởng Đức", year: "1846" },
  nhan_dan: { text: "Quần chúng nhân dân là chủ thể sáng tạo chân chính của lịch sử.", author: "V.I.Lênin", source: "Toàn tập V.I.Lênin", year: "1917" },
  giai_cap: { text: "Lịch sử tất cả các xã hội tồn tại từ trước đến nay chỉ là lịch sử đấu tranh giai cấp.", author: "C.Mác & Ph.Ăng-ghen", source: "Tuyên ngôn Đảng Cộng sản", year: "1848" },
  lich_su: { text: "Con người làm ra lịch sử của chính mình, nhưng không phải làm theo ý muốn tùy tiện.", author: "Karl Marx", source: "Ngày 18 tháng Sương mù", year: "1852" },
  hanh_phuc: { text: "Hạnh phúc là đấu tranh.", author: "Karl Marx", source: "Lời tự bạch", year: "1865" },
  idle_1: { text: "Vô luận việc gì đều do con người làm ra, và từ nhỏ đến to, từ gần đến xa, đều thế cả.", author: "Hồ Chí Minh", source: "Sửa đổi lối làm việc", year: "1947" },
  idle_2: { text: "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.", author: "Hồ Chí Minh", source: "Bài nói chuyện", year: "1958" },
};

const IDLE_KEYS = ['core', 'idle_1', 'nhan_dan', 'idle_2', 'giai_cap'];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); 
    let i = 0;
    
    const segmenter = new Intl.Segmenter('vi', { granularity: 'grapheme' });
    const segments = Array.from(segmenter.segment(text)).map(s => s.segment);

    const typingInterval = setInterval(() => {
      if (i <= segments.length) {
        setDisplayedText(segments.slice(0, i).join(''));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-0.75 h-[0.9em] bg-dred ml-1 align-middle opacity-70"
      />
    </span>
  );
};

const philosophicalContent: Record<string, NodeData> = {
  core: { title: 'CON NGƯỜI', desc: 'Bản chất con người là tổng hòa các quan hệ xã hội. Con người vừa là chủ thể sáng tạo, vừa là sản phẩm của lịch sử.', quote: '"Trong tính hiện thực của nó..."', cite: '— Karl Marx', orbit: 'inner' },
  ca_nhan: { title: 'CÁ NHÂN', desc: 'Cá nhân không tồn tại biệt lập mà luôn gắn liền với xã hội. Quan hệ cá nhân - xã hội là tiền đề tồn tại của cả hai.', quote: '"Mỗi cá nhân là một thực thể..."', cite: '— Giáo trình Triết học', orbit: 'inner', relations: ['core', 'xa_hoi'] },
  xa_hoi: { title: 'XÃ HỘI', desc: 'Môi trường tồn tại của con người. Trong xã hội có giai cấp, sự thống nhất và mâu thuẫn giữa cá nhân và xã hội mang tính lịch sử.', quote: '"Tồn tại xã hội quyết định..."', cite: '— C.Mác & Ph.Ăng-ghen', orbit: 'middle', relations: ['core', 'ca_nhan', 'nhan_dan', 'giai_cap'] },
  nhan_dan: { title: 'NHÂN DÂN', desc: 'Lực lượng cơ bản sản xuất ra mọi của cải vật chất và tinh thần, là động lực cơ bản của mọi cuộc cách mạng xã hội.', quote: '"Quần chúng nhân dân là chủ thể..."', cite: '— V.I.Lênin', orbit: 'outer', relations: ['core', 'xa_hoi', 'lich_su'] },
  giai_cap: { title: 'GIAI CẤP', desc: 'Trong xã hội có đối kháng, tính giai cấp quyết định địa vị, lợi ích và hệ tư tưởng của mỗi con người cụ thể.', quote: '"Lịch sử tất cả các xã hội..."', cite: '— Tuyên ngôn của Đảng Cộng sản', orbit: 'outer', relations: ['xa_hoi', 'lich_su'] },
  lich_su: { title: 'LỊCH SỬ', desc: 'Sự vận động tất yếu khách quan. Con người tạo ra lịch sử nhưng dưới những điều kiện kế thừa từ quá khứ.', quote: '"Con người làm ra lịch sử..."', cite: '— Karl Marx', orbit: 'outer', relations: ['nhan_dan', 'giai_cap', 'core'] },
  hanh_phuc: { title: 'HẠNH PHÚC', desc: 'Mục tiêu tối thượng của triết học Mác là giải phóng con người, mang lại tự do và hạnh phúc toàn diện.', quote: '"Hạnh phúc là đấu tranh."', cite: '— Karl Marx', orbit: 'inner', relations: ['core'] }
};

export default function Hero() {
  const [activeNode, setActiveNode] = useState<string | null>(null); 
  const [hoveredNode, setHoveredNode] = useState<string | null>(null); 
  const [idleIndex, setIdleIndex] = useState(0);

  useEffect(() => {
    if (hoveredNode !== null || activeNode !== null) return; 
    const interval = setInterval(() => {
      setIdleIndex((prev) => (prev + 1) % IDLE_KEYS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [hoveredNode, activeNode]);

  const currentQuoteKey = hoveredNode || activeNode || IDLE_KEYS[idleIndex];
  const currentQuote = QUOTE_DATABASE[currentQuoteKey] || QUOTE_DATABASE['core'];
  const nodeData = activeNode ? philosophicalContent[activeNode] : null;
  
  const isDimmed = (nodeId: string) => {
    if (!activeNode) return false;
    if (activeNode === nodeId) return false;
    if (philosophicalContent[activeNode]?.relations?.includes(nodeId)) return false;
    return true;
  };

  const getNodeFill = (nodeId: string, defaultFill: string) => {
    if (activeNode === nodeId) return defaultFill; 
    if (hoveredNode === nodeId) return defaultFill;
    if (hoveredNode && philosophicalContent[hoveredNode]?.relations?.includes(nodeId)) return defaultFill;
    return "#526175"; 
  };

  const floatingQuoteVariants: Variants = { 
    animate: { y: [-2, 2, -2], opacity: [0.35, 0.6, 0.35], transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } } 
  };
  
  const lineDrawVariants: Variants = { 
    hidden: { pathLength: 0, opacity: 0 }, 
    visible: (custom: number) => ({ 
      pathLength: 1, 
      opacity: 0.4, 
      transition: { pathLength: { delay: custom * 0.1 + 0.3, duration: 1.5, ease: "easeOut" }, opacity: { delay: custom * 0.1 + 0.3, duration: 0.5 } } 
    }) 
  };
  
  const nodeVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } },
    active: { scale: 1.05, y: -8, filter: "url(#active-softer-glow)", transition: { type: "spring", stiffness: 300, damping: 20 } },
    dimmed: { scale: 0.95, opacity: 0.15, transition: { duration: 0.5 } },
    normal: { scale: 1, opacity: 1, y: 0, filter: "none", transition: { duration: 0.5 } }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center py-16 2xl:py-24 overflow-hidden relative bg-[#FAF9F6]">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('/textures/noise.png')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,249,246,0.5)_100%)]" />

      <div className="w-full max-w-none px-6 md:px-16 2xl:px-28 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 2xl:gap-28 items-center">

          <AnimatedView>
            <p className="section-eyebrow text-base md:text-lg 2xl:text-xl mb-6 md:mb-8">
              Triết học Mác – Lênin · Tư tưởng Hồ Chí Minh
            </p>

            <h1 className="font-serif font-bold leading-[1.05] mb-8 md:mb-10 2xl:mb-14 text-navy text-5xl md:text-6xl 2xl:text-8xl">
              CON NGƯỜI
              <br />
              <span className="hero-title-accent">TRONG TRIẾT HỌC</span>
              <br />
              <span className="text-navy">MÁC – LÊNIN &amp;</span>
              <br />
              <em className="font-serif italic text-dred">Tư tưởng Hồ Chí Minh</em>
            </h1>

            <div className="leading-relaxed text-body/70 mb-10 md:mb-12 2xl:mb-16 text-xl md:text-2xl 2xl:text-3xl max-w-4xl">
              Nghiên cứu toàn diện về quan niệm con người — từ{' '}
              <Tooltip term="Bản thể luận" definition="Ngành triết học nghiên cứu bản chất của tồn tại. Trong triết học Mác, bản thể luận duy vật khẳng định vật chất là nền tảng của mọi thực tại, con người được quy định bởi tồn tại xã hội.">
                bản chất xã hội
              </Tooltip>
              , quan hệ biện chứng{' '}
              <Tooltip term="Tất yếu lịch sử" definition="Quy luật khách quan trong sự phát triển xã hội — những điều kiện lịch sử nhất định tất yếu dẫn đến những kết quả nhất định, không phụ thuộc vào ý chí chủ quan của cá nhân.">
                cá nhân–xã hội
              </Tooltip>
              , đến vai trò của quần chúng nhân dân và lãnh tụ. Con người vừa là sản phẩm của hoàn cảnh, vừa là{' '}
              <Tooltip term="Chủ thể thực tiễn" definition="Con người thông qua hoạt động thực tiễn, đặc biệt là lao động sản xuất, để cải tạo tự nhiên và xã hội, qua đó tự sáng tạo ra chính bản thân mình và làm ra lịch sử.">
                chủ thể thực tiễn
              </Tooltip>{' '}
              cải tạo thế giới.
            </div>

            <div className="relative pl-6 2xl:pl-8 mb-12 2xl:mb-16 border-l-4 border-beige/60 min-h-40 flex flex-col justify-center">
              <span className="absolute -top-6 -left-3 text-[120px] leading-none font-serif text-navy/5 pointer-events-none select-none">
                ❝
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuote.text} 
                  initial={{ opacity: 0, filter: "blur(4px)", x: -10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <p className="font-serif italic text-body/80 leading-relaxed text-xl md:text-2xl 2xl:text-3xl min-h-20">
                    <TypewriterText text={currentQuote.text} />
                  </p>
                  
                  <div className="mt-5 flex items-center gap-4 flex-wrap">
                    <cite className="not-italic font-sans font-bold text-dred tracking-wider uppercase text-sm md:text-base">
                      — {currentQuote.author}
                    </cite>
                    <span className="w-6 h-px bg-navy/20 hidden sm:block"></span>
                    <span className="font-sans text-[11px] md:text-xs tracking-widest text-navy/50 uppercase font-semibold bg-navy/5 px-2 py-1 rounded">
                      {currentQuote.source} · {currentQuote.year}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-14 md:mb-16 2xl:mb-20">
              <a href="#section-canhan-xahoi" className="inline-flex items-center justify-center gap-3 px-8 py-5 md:px-10 md:py-6 2xl:px-14 2xl:py-8 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-linear-to-br from-navy to-navy-light text-lg md:text-xl 2xl:text-2xl">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                Khám phá nội dung
              </a>
              <a href="#section-hcm" className="inline-flex items-center justify-center gap-3 px-8 py-5 md:px-10 md:py-6 2xl:px-14 2xl:py-8 rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-dred border-2 border-dred bg-transparent hover:bg-dred/5 text-lg md:text-xl 2xl:text-2xl">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Tư tưởng Hồ Chí Minh
              </a>
            </div>

            <div className="pt-8 2xl:pt-12 border-t border-navy/10 grid grid-cols-3 gap-8 md:gap-12 2xl:gap-20">
              {[ { value: '4', label: 'Chủ đề lớn', color: 'text-navy' }, { value: '12', label: 'Luận điểm', color: 'text-dred' }, { value: '∞', label: 'Giá trị thực tiễn', color: 'text-beige' } ].map(({ value, label, color }) => (
                <div key={label}>
                  <p className={`font-serif font-bold ${color} text-5xl md:text-6xl 2xl:text-8xl leading-none`}>{value}</p>
                  <p className="text-body/50 font-medium mt-2 text-base md:text-lg 2xl:text-xl">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedView>

          <AnimatedView delay={0.25} direction="left" className="flex items-center justify-center w-full lg:-translate-y-12 2xl:-translate-y-20 relative">
            <motion.div 
              className="relative w-full max-w-2xl 2xl:max-w-4xl mx-auto"
              style={{ perspective: 1000 }}
              whileHover={{ rotateX: 2, rotateY: -2 }} 
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-96 h-96 2xl:w-150 2xl:h-150 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(30,58,95,0.1)_0%,transparent_70%)]" />
              </div>

              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-label="Biểu đồ tương quan con người và xã hội">
                <defs>
                  <radialGradient id="hero-core-grad" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#2A4F80" /> <stop offset="100%" stopColor="#1E3A5F" />
                  </radialGradient>
                  <filter id="active-softer-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <g fontFamily="Inter, serif" fontStyle="italic" fontSize="5.5" fill="#D4A373" letterSpacing="0.5" className="pointer-events-none">
                  {[ { x: 260, y: 80, rot: -12, text: '"Thống nhất cái chung & cái riêng"' }, { x: 60, y: 80, rot: 15, text: '"Lãnh tụ dẫn đường"' }, { x: 70, y: 340, rot: -8, text: '"Quần chúng là chủ thể lịch sử"' }, { x: 260, y: 345, rot: 10, text: '"Mục tiêu giải phóng con người"' }, { x: 135, y: 155, rot: -25, text: 'Bản thể luận', sz: 4.5, op: 0.3 } ].map((q, i) => (
                    <motion.text key={i} x={q.x} y={q.y} transform={`rotate(${q.rot} ${q.x} ${q.y})`} fontSize={q.sz || 5.5} opacity={q.op || 0.55} variants={floatingQuoteVariants} animate="animate">{q.text}</motion.text>
                  ))}
                </g>

                <g className="orbits pointer-events-none">
                  <motion.circle cx="200" cy="200" r="175" stroke="#8B1E3F" strokeWidth="1" strokeDasharray="8 6" opacity={0.15} animate={{ opacity: (hoveredNode && philosophicalContent[hoveredNode]?.orbit === 'outer') ? 0.4 : 0.15 }} transition={{ duration: 0.5 }}/>
                  <motion.circle cx="200" cy="200" r="145" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" animate={{ opacity: (hoveredNode && philosophicalContent[hoveredNode]?.orbit === 'middle') ? 0.4 : 0.15 }} transition={{ duration: 0.5 }}/>
                  <motion.circle cx="200" cy="200" r="110" stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="2 5" opacity="0.15" animate={{ opacity: (hoveredNode && philosophicalContent[hoveredNode]?.orbit === 'inner') ? 0.4 : 0.15 }} transition={{ duration: 0.5 }}/>
                </g>

                <g className="lines pointer-events-none" strokeWidth="2" strokeDasharray="4 4" opacity="0.4">
                  {[ { id: 'ca_nhan', x: 200, y: 52, color: '#1E3A5F' }, { id: 'xa_hoi', x: 340, y: 290, color: '#8B1E3F' }, { id: 'nhan_dan', x: 60, y: 290, color: '#2A4F80' }, { id: 'giai_cap', x: 362.5, y: 138, color: '#8B1E3F', w: 1.5, das: '3 4' }, { id: 'lich_su', x: 35, y: 138, color: '#1E3A5F', w: 1.5, das: '3 4' }, { id: 'hanh_phuc', x: 200, y: 357, color: '#D4A373' } ].map((l, i) => (
                    <motion.path key={l.id} d={`M200 200 L${l.x} ${l.y}`} stroke={l.color} strokeWidth={l.w || 2} strokeDasharray={l.das || "4 4"} custom={i} initial="hidden" animate="visible" variants={lineDrawVariants} />
                  ))}
                </g>

                <g className="thought-flows pointer-events-none">
                  {[ { cx: 155, cy: 120, r: 4, fill: '#D4A373', delay: '0.5s' }, { cx: 265, cy: 108, r: 4, fill: '#8B1E3F', delay: '1s' }, { cx: 310, cy: 210, r: 5, fill: '#1E3A5F', delay: '1.5s' }, { cx: 95, cy: 225, r: 4, fill: '#D4A373', delay: '0.8s' }, { cx: 138, cy: 315, r: 4, fill: '#8B1E3F', delay: '1.3s' }, { cx: 262, cy: 320, r: 4, fill: '#1E3A5F', delay: '0.3s' }, ].map((p, i) => (
                    <circle key={i} {...p} opacity="0.6" className="svg-node-slow" style={{ animationDelay: p.delay }} />
                  ))}
                </g>

                <motion.g 
                  id="core" className="cursor-pointer" 
                  onClick={() => setActiveNode(activeNode === 'core' ? null : 'core')}
                  onMouseEnter={() => setHoveredNode('core')}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={isDimmed('core') ? 'dimmed' : (activeNode === 'core' ? 'active' : 'normal')}
                  whileHover="hover" variants={nodeVariants} style={{ transformOrigin: "200px 200px" }}
                >
                  <motion.circle cx="200" cy="200" r={48} stroke="#D4A373" strokeWidth="0.5" opacity="0.3" animate={{ r: [48, 51, 48] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
                  {activeNode === 'core' && ( <motion.circle cx="200" cy="200" r={48} stroke="#D4A373" strokeWidth="1" opacity="0.8" initial={{ r: 48 }} animate={{ r: 56, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} fill="none"/> )}
                  <circle cx="200" cy="200" r="48" fill="url(#hero-core-grad)" opacity="0.95" />
                  <circle cx="200" cy="200" r="48" stroke="#D4A373" strokeWidth="2" opacity="0.8" fill="none" />
                  <text x="200" y="204.5" textAnchor="middle" fontFamily="Inter" fontSize="12" fontWeight="800" fill="#ffffff" letterSpacing="1">CON NGƯỜI</text>
                </motion.g>

                {[
                  { id: 'ca_nhan', cx: 200, cy: 52, r: 32, fill: '#1E3A5F', text: 'CÁ NHÂN', textX: 200, textY: 56, sz: 10 },
                  { id: 'xa_hoi', cx: 340, cy: 290, r: 32, fill: '#8B1E3F', text: 'XÃ HỘI', textX: 340, textY: 294, sz: 10 },
                  { id: 'nhan_dan', cx: 60, cy: 290, r: 32, fill: '#2A4F80', text: 'NHÂN DÂN', textX: 60, textY: 294, sz: 10 },
                  { id: 'giai_cap', cx: 362.5, cy: 138, r: 24, fill: '#8B1E3F', text: 'GIAI CẤP', textX: 362.5, textY: 141, sz: 8, fw: 800 },
                  { id: 'lich_su', cx: 35, cy: 138, r: 24, fill: '#1E3A5F', text: 'LỊCH SỬ', textX: 35, textY: 141, sz: 8 },
                  { id: 'hanh_phuc', cx: 200, cy: 357, r: 24, fill: '#D4A373', text: 'HẠNH PHÚC', textX: 200, textY: 360, sz: 7.5, fw: 800, textFill: 'white' }
                ].map((n) => (
                  <motion.g 
                    key={n.id} id={n.id} className="cursor-pointer"
                    onClick={() => setActiveNode(activeNode === n.id ? null : n.id)}
                    onMouseEnter={() => setHoveredNode(n.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    animate={isDimmed(n.id) ? 'dimmed' : (activeNode === n.id ? 'active' : 'normal')}
                    whileHover="hover" variants={nodeVariants} style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                  >
                    {activeNode === n.id && ( <motion.circle cx={n.cx} cy={n.cy} r={n.r || 24} stroke={n.id === 'hanh_phuc' ? '#1E3A5F' : '#D4A373'} strokeWidth="1" opacity="0.8" initial={{ r: n.r || 24 }} animate={{ r: (n.r || 24) + 8, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} fill="none"/> )}
                    {getNodeFill(n.id, n.fill) === n.fill && !isDimmed(n.id) && activeNode !== n.id && hoveredNode && philosophicalContent[hoveredNode]?.relations?.includes(n.id) && ( <motion.circle cx={n.cx} cy={n.cy} r={(n.r || 24) + 2} fill={n.fill} opacity={0.2} animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity }}/> )}
                    
                    <motion.circle cx={n.cx} cy={n.cy} r={n.r} fill={getNodeFill(n.id, n.fill)} opacity={getNodeFill(n.id, n.fill) === '#526175' ? 0.6 : 0.95} transition={{ duration: 0.5 }} />
                    <circle cx={n.cx} cy={n.cy} r={n.r} stroke={n.id === 'hanh_phuc' ? '#1E3A5F' : '#D4A373'} strokeWidth={n.fw === 800 ? 1.5 : 1} fill="none" opacity={isDimmed(n.id) ? 0.2 : (n.id === 'hanh_phuc' ? 0.3 : 0.8)} />
                    <text x={n.textX} y={n.textY} textAnchor="middle" fontFamily="Inter" fontSize={n.sz} fontWeight={n.fw || 700} fill={n.textFill || "white"} letterSpacing="0.5" opacity={isDimmed(n.id) ? 0.3 : 1}>
                      {n.text}
                    </text>
                  </motion.g>
                ))}
              </svg>

              <AnimatePresence>
                {activeNode && nodeData && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 5, scale: 0.98 }} 
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute z-50 p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(30,58,95,0.15)] border border-beige/30 w-72 md:w-80 pointer-events-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <button onClick={() => setActiveNode(null)} className="absolute top-4 right-4 text-body/40 hover:text-dred transition-colors"> 
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg> 
                    </button>
                    <h4 className="font-serif font-bold text-navy text-xl mb-2 tracking-wider uppercase pr-6 border-b border-navy/10 pb-2 inline-block">
                      {nodeData.title}
                    </h4>
                    <p className="text-body/80 text-sm mb-4 leading-relaxed">{nodeData.desc}</p>
                    <div className="bg-beige/10 p-3 rounded-lg border-l-2 border-dred">
                      <p className="font-serif italic text-navy/90 text-sm leading-relaxed mb-1">{nodeData.quote}</p>
                      <cite className="block not-italic font-sans font-bold text-dred tracking-wider uppercase text-[10px] opacity-80">{nodeData.cite}</cite>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-body/40 mt-8 2xl:mt-12 font-medium uppercase tracking-widest text-sm md:text-base 2xl:text-xl">
                Cõi mạng tri thức: Con người – Xã hội – Lịch sử
              </p>
            </motion.div>
          </AnimatedView>
        </div>
      </div>
    </section>
  );
}