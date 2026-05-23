import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AnimatedView from './AnimatedView';

// Tạo các hạt bụi lơ lửng trong không gian
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    z: Math.random() * 200 - 100, // Thêm trục Z cho hạt bụi
  }));
};

export default function MindMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, duration: number, delay: number, z: number}[]>([]);

  useEffect(() => {
    setParticles(generateParticles(40));
  }, []);

  // --- MOUSE TRACKING & VẬT LÝ 2.5D ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  // Phân tách chiều sâu (Parallax)
  const layerOuterX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const layerOuterY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  
  const layerInnerX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const layerInnerY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const layerCenterX = useTransform(smoothX, [-0.5, 0.5], [-60, 60]);
  const layerCenterY = useTransform(smoothY, [-0.5, 0.5], [-60, 60]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isDimmed = (nodeType: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === 'CENTER') return false;
    if (hoveredNode === nodeType) return false;
    return true;
  };

  return (
    <section id="section-mindmap" className="py-24 lg:py-36 bg-[#0B1221] text-[#F8F5EF] relative overflow-hidden">
      
      {/* KHÔNG GIAN NỀN TRỐNG ĐỒNG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen flex items-center justify-center">
        <div className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] rounded-full border-[40px] border-dashed border-[#D4A373] animate-[spin_120s_linear_infinite]" />
        <div className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full border-[20px] border-dotted border-[#D4A373] animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28 relative z-10">
        <AnimatedView className="text-center mb-16 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A373] mb-4">Phần 04 · Không gian Tư tưởng</p>
          <h2 className="font-serif font-bold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Chòm sao Khái niệm
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Mô hình tương tác ba chiều thể hiện sự vận động biện chứng giữa các thực thể cốt lõi trong triết học Mác–Lênin.
          </p>
          <div className="w-24 h-0.5 mx-auto mt-8 bg-gradient-to-r from-transparent via-[#8B1E3F] to-transparent" />
        </AnimatedView>

        <AnimatedView delay={0.2} className="max-w-[1200px] mx-auto w-full">
          <div 
            className="relative w-full p-6 lg:p-12"
            style={{ perspective: 2000 }}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* HẠT BỤI VỚI Z-DEPTH */}
            <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-[#D4A373]"
                  style={{ 
                    left: `${p.x}%`, top: `${p.y}%`, 
                    width: p.size, height: p.size,
                    translateZ: p.z,
                    filter: p.z < 0 ? 'blur(2px)' : 'none',
                    opacity: p.z < 0 ? 0.3 : 0.6
                  }}
                  animate={{ 
                    y: [0, -100, 0], 
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, p.z < 0 ? 0.3 : 0.6, 0] 
                  }}
                  transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </div>

            {/* SVG TRUNG TÂM VỚI CAMERA DRIFT NHẸ */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, -8, 0] }} // Camera drift nhẹ theo trục Y
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-[16/10] min-h-[500px]"
            >
              <svg viewBox="0 0 960 620" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="mm-center" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A52348" />
                    <stop offset="100%" stopColor="#6D1832" />
                  </radialGradient>
                  <radialGradient id="mm-navy" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#2A4F80" />
                    <stop offset="100%" stopColor="#1E3A5F" />
                  </radialGradient>
                  <radialGradient id="mm-beige" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#E0BF9A" />
                    <stop offset="100%" stopColor="#C49A6C" />
                  </radialGradient>
                  
                  <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* LAYER ĐƯỜNG LIÊN KẾT (XA NHẤT + BỊ BLUR) */}
                <motion.g 
                  style={{ x: layerOuterX, y: layerOuterY, translateZ: -80, filter: 'blur(1.5px)' }} 
                  opacity={hoveredNode ? 0.2 : 0.8} 
                  className="transition-opacity duration-500"
                >
                  <line x1="480" y1="130" x2="760" y2="310" stroke="#8B1E3F" strokeWidth="1" strokeDasharray="5 7" />
                  <line x1="760" y1="310" x2="480" y2="490" stroke="#8B1E3F" strokeWidth="1" strokeDasharray="5 7" />
                  <line x1="480" y1="490" x2="200" y2="310" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="5 7" />
                  <line x1="200" y1="310" x2="480" y2="130" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="5 7" />

                  <path d="M480 310 L480 148 M480 310 L742 310 M480 310 L480 472 M480 310 L218 310" 
                        stroke="#D4A373" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.5"
                        className="animate-[dashMove_20s_linear_infinite]" />
                </motion.g>

                {/* LAYER TIA NỐI VỆ TINH */}
                <motion.g style={{ x: layerInnerX, y: layerInnerY, translateZ: 20 }}>
                  <g stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="4 5" opacity={isDimmed('NODE') ? 0.1 : 1} className="transition-opacity duration-500">
                    <line x1="480" y1="102" x2="330" y2="52" /><line x1="480" y1="102" x2="630" y2="52" />
                    <line x1="788" y1="310" x2="890" y2="190" /><line x1="788" y1="310" x2="890" y2="430" />
                    <line x1="172" y1="310" x2="70" y2="190" /><line x1="172" y1="310" x2="70" y2="430" />
                    <line x1="480" y1="518" x2="360" y2="585" /><line x1="480" y1="518" x2="600" y2="585" />
                  </g>
                </motion.g>

                {/* 8 NÚT VỆ TINH NHỎ (FLOATING) */}
                <motion.g 
                  style={{ x: layerInnerX, y: layerInnerY, translateZ: 40 }} 
                  animate={{ y: [-3, 3, -3] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  opacity={isDimmed('NODE') ? 0.2 : 1} 
                  className="transition-opacity duration-500 cursor-default pointer-events-none"
                >
                  {/* Bản chất loài */}
                  <g className="animate-[orbitSlow_10s_linear_infinite]" style={{ transformOrigin: '330px 48px' }}>
                    <circle cx="330" cy="48" r="30" fill="rgba(30,58,95,0.8)" stroke="rgba(212,163,115,0.4)" strokeWidth="1.2" />
                    <text x="330" y="44" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Bản chất</text>
                    <text x="330" y="57" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">loài</text>
                  </g>
                  {/* Tính cá thể */}
                  <g className="animate-[orbitSlow_12s_linear_infinite_reverse]" style={{ transformOrigin: '630px 48px' }}>
                    <circle cx="630" cy="48" r="30" fill="rgba(30,58,95,0.8)" stroke="rgba(212,163,115,0.4)" strokeWidth="1.2" />
                    <text x="630" y="44" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Tính cá</text>
                    <text x="630" y="57" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">thể</text>
                  </g>
                  {/* ... CÁC VỆ TINH KHÁC GIỮ NGUYÊN CODE BÊN TRONG ... */}
                  <g className="animate-[orbitSlow_15s_linear_infinite]" style={{ transformOrigin: '890px 188px' }}>
                    <circle cx="890" cy="188" r="30" fill="rgba(139,30,63,0.8)" stroke="rgba(212,163,115,0.4)" strokeWidth="1.2" />
                    <text x="890" y="184" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Giai</text>
                    <text x="890" y="197" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">cấp</text>
                  </g>
                  <g className="animate-[orbitSlow_14s_linear_infinite_reverse]" style={{ transformOrigin: '890px 432px' }}>
                    <circle cx="890" cy="432" r="30" fill="rgba(139,30,63,0.8)" stroke="rgba(212,163,115,0.4)" strokeWidth="1.2" />
                    <text x="890" y="428" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">Nhà</text>
                    <text x="890" y="441" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="600" fill="white" opacity="0.9">nước</text>
                  </g>
                  <g className="animate-[orbitSlow_11s_linear_infinite]" style={{ transformOrigin: '70px 188px' }}>
                    <circle cx="70" cy="188" r="30" fill="rgba(212,163,115,0.8)" stroke="rgba(30,58,95,0.4)" strokeWidth="1.2" />
                    <text x="70" y="184" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">Định</text>
                    <text x="70" y="197" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">hướng</text>
                  </g>
                  <g className="animate-[orbitSlow_13s_linear_infinite_reverse]" style={{ transformOrigin: '70px 432px' }}>
                    <circle cx="70" cy="432" r="30" fill="rgba(212,163,115,0.8)" stroke="rgba(30,58,95,0.4)" strokeWidth="1.2" />
                    <text x="70" y="428" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">Tổ</text>
                    <text x="70" y="441" textAnchor="middle" fontFamily="Inter" fontSize="8" fontWeight="700" fill="#152B47" opacity="0.95">chức</text>
                  </g>
                  <g className="animate-[orbitSlow_16s_linear_infinite]" style={{ transformOrigin: '360px 585px' }}>
                    <circle cx="360" cy="585" r="30" fill="rgba(30,58,95,0.8)" stroke="rgba(212,163,115,0.4)" strokeWidth="1.2" />
                    <text x="360" y="581" textAnchor="middle" fontFamily="Inter" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">Lực lượng</text>
                    <text x="360" y="594" textAnchor="middle" fontFamily="Inter" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">sản xuất</text>
                  </g>
                  <g className="animate-[orbitSlow_12s_linear_infinite_reverse]" style={{ transformOrigin: '600px 585px' }}>
                    <circle cx="600" cy="585" r="30" fill="rgba(30,58,95,0.8)" stroke="rgba(212,163,115,0.4)" strokeWidth="1.2" />
                    <text x="600" y="581" textAnchor="middle" fontFamily="Inter" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">CM</text>
                    <text x="600" y="594" textAnchor="middle" fontFamily="Inter" fontSize="7.5" fontWeight="600" fill="white" opacity="0.9">Xã hội</text>
                  </g>
                </motion.g>

                {/* 4 NÚT CHÍNH VỚI FLOATING & Z-DEPTH */}
                <motion.g style={{ x: layerInnerX, y: layerInnerY, translateZ: 80 }}>
                  <motion.g 
                    animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    onMouseEnter={() => setHoveredNode('CA_NHAN')} onMouseLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('CA_NHAN') ? 0.3 : 1}>
                    <circle cx="480" cy="120" r="52" fill="url(#mm-navy)" filter={hoveredNode === 'CA_NHAN' ? "url(#glow-soft)" : ""} opacity="0.97" />
                    <circle cx="480" cy="120" r="52" stroke="#D4A373" strokeWidth="1.8" fill="none" opacity="0.45" />
                    <text x="480" y="114" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="800" fill="white" opacity="0.97">CÁ NHÂN</text>
                    <text x="480" y="130" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="rgba(255,255,255,0.6)">Individual</text>
                  </motion.g>

                  <motion.g 
                    animate={{ y: [4, -4, 4] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                    onMouseEnter={() => setHoveredNode('XA_HOI')} onMouseLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('XA_HOI') ? 0.3 : 1}>
                    <circle cx="765" cy="310" r="52" fill="url(#mm-center)" filter={hoveredNode === 'XA_HOI' ? "url(#glow-soft)" : ""} opacity="0.95" />
                    <circle cx="765" cy="310" r="52" stroke="#D4A373" strokeWidth="1.8" fill="none" opacity="0.45" />
                    <text x="765" y="304" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="800" fill="white" opacity="0.97">XÃ HỘI</text>
                    <text x="765" y="320" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="rgba(255,255,255,0.6)">Society</text>
                  </motion.g>

                  <motion.g 
                    animate={{ y: [-4, 4, -4] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    onMouseEnter={() => setHoveredNode('LANH_TU')} onMouseLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('LANH_TU') ? 0.3 : 1}>
                    <circle cx="195" cy="310" r="52" fill="url(#mm-beige)" filter={hoveredNode === 'LANH_TU' ? "url(#glow-soft)" : ""} opacity="0.97" />
                    <circle cx="195" cy="310" r="52" stroke="#1E3A5F" strokeWidth="1.8" fill="none" opacity="0.45" />
                    <text x="195" y="304" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="800" fill="#152B47" opacity="0.97">LÃNH TỤ</text>
                    <text x="195" y="320" textAnchor="middle" fontFamily="Inter" fontSize="8" fill="rgba(21,43,71,0.65)">Leader</text>
                  </motion.g>

                  <motion.g 
                    animate={{ y: [5, -5, 5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    onMouseEnter={() => setHoveredNode('QUAN_CHUNG')} onMouseLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('QUAN_CHUNG') ? 0.3 : 1}>
                    <circle cx="480" cy="500" r="52" fill="url(#mm-navy)" filter={hoveredNode === 'QUAN_CHUNG' ? "url(#glow-soft)" : ""} opacity="0.97" />
                    <circle cx="480" cy="500" r="52" stroke="#D4A373" strokeWidth="1.8" fill="none" opacity="0.45" />
                    <text x="480" y="491" textAnchor="middle" fontFamily="Inter" fontSize="9.5" fontWeight="800" fill="white" opacity="0.97">QUẦN CHÚNG</text>
                    <text x="480" y="507" textAnchor="middle" fontFamily="Inter" fontSize="9.5" fontWeight="800" fill="white" opacity="0.97">NHÂN DÂN</text>
                  </motion.g>
                </motion.g>

                {/* NÚT TRUNG TÂM (CON NGƯỜI) - CAO NHẤT */}
                <motion.g 
                  style={{ x: layerCenterX, y: layerCenterY, translateZ: 150 }}
                  onMouseEnter={() => setHoveredNode('CENTER')} 
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-crosshair transition-opacity duration-500"
                >
                  <motion.g animate={{ y: [-6, 6, -6] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="animate-[breatheCenter_4s_ease-in-out_infinite]">
                    <circle cx="480" cy="310" r="80" fill="url(#mm-center)" filter="url(#glow-strong)" opacity="0.97" />
                    <circle cx="480" cy="310" r="85" stroke="#D4A373" strokeWidth="1.5" fill="none" opacity="0.8" className="animate-[spin_10s_linear_infinite]" strokeDasharray="10 20" />
                    <circle cx="480" cy="310" r="68" stroke="#F8F5EF" strokeWidth="0.8" fill="none" opacity="0.25" />
                    <text x="480" y="298" textAnchor="middle" fontFamily="Inter" fontSize="12" fontWeight="800" fill="white" opacity="0.97" letterSpacing="0.5">CON NGƯỜI</text>
                    <text x="480" y="316" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#D4A373" opacity="0.9">Tổng hòa các</text>
                    <text x="480" y="330" textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#D4A373" opacity="0.9">quan hệ xã hội</text>
                  </motion.g>
                </motion.g>

                {/* HẠT SVG NHỎ ĐIỂM XUYẾT */}
                <circle cx="155" cy="120" r="3.5" fill="#D4A373" opacity="0.45" className="animate-[pulse-circle_3.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
                <circle cx="810" cy="130" r="3" fill="#8B1E3F" opacity="0.4" className="animate-[pulse-circle_3.5s_ease-in-out_infinite]" style={{ animationDelay: '1.1s' }} />
                <circle cx="840" cy="480" r="4" fill="#1E3A5F" opacity="0.4" className="animate-[pulse-circle_3.5s_ease-in-out_infinite]" style={{ animationDelay: '1.8s' }} />
                <circle cx="120" cy="490" r="3.5" fill="#D4A373" opacity="0.4" className="animate-[pulse-circle_3.5s_ease-in-out_infinite]" style={{ animationDelay: '0.7s' }} />
                <circle cx="480" cy="40" r="3" fill="#8B1E3F" opacity="0.35" className="animate-[pulse-circle_3.5s_ease-in-out_infinite]" style={{ animationDelay: '1.4s' }} />

              </svg>
            </motion.div>
            
            {/* POST PROCESSING EFFECT: LỚP VIGNETTE MỜ VIỀN */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,18,33,0.7)_100%)] mix-blend-multiply rounded-[2.5rem]" />
          </div>
        </AnimatedView>
      </div>
    </section>
  );
}