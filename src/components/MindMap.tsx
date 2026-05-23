import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AnimatedView from './AnimatedView';

// Tạo các vì sao (background stars)
const generateStars = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleDuration: Math.random() * 3 + 2,
    twinkleDelay: Math.random() * 5,
  }));
};

const generateSpaceDust = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 30 + 15,
    z: Math.random() * 300 - 150,
  }));
};

export default function ConstellationMindMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [stars, setStars] = useState<{id: number, x: number, y: number, size: number, opacity: number, twinkleDuration: number, twinkleDelay: number}[]>([]);
  const [spaceDust, setSpaceDust] = useState<{id: number, x: number, y: number, size: number, duration: number, z: number}[]>([]);

  useEffect(() => {
    setStars(generateStars(150));
    setSpaceDust(generateSpaceDust(40));
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [25, -25]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);

  const layerOuterX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const layerOuterY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  
  const layerInnerX = useTransform(smoothX, [-0.5, 0.5], [-50, 50]);
  const layerInnerY = useTransform(smoothY, [-0.5, 0.5], [-50, 50]);

  const layerCenterX = useTransform(smoothX, [-0.5, 0.5], [-90, 90]);
  const layerCenterY = useTransform(smoothY, [-0.5, 0.5], [-90, 90]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (touch.clientX - rect.left) / rect.width - 0.5;
    const yPct = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleReset = () => {
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
    <section id="section-mindmap" className="py-24 lg:py-36 bg-[#030712] text-[#E2E8F0] relative overflow-hidden">
      
      {/* VŨ TRỤ: Bầu trời đầy sao */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,24,39,1)_0%,rgba(3,7,18,1)_100%)]" />
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{ 
              left: `${star.x}%`, top: `${star.y}%`, 
              width: star.size, height: star.size,
              opacity: star.opacity 
            }}
            animate={{ opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3] }}
            transition={{ duration: star.twinkleDuration, delay: star.twinkleDelay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="w-full max-w-none mx-auto px-4 md:px-16 2xl:px-28 relative z-10">
        <AnimatedView className="text-center mb-16 lg:mb-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#64FFDA] mb-4 drop-shadow-[0_0_8px_rgba(100,255,218,0.5)]">
            Phần 04 · Không gian Tư tưởng
          </p>
          <h2 className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#94A3B8] text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Chòm sao Khái niệm
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Khám phá mạng lưới liên kết đa chiều. Vuốt hoặc chạm vào các vì sao để kết nối không gian.
          </p>
        </AnimatedView>

        <AnimatedView delay={0.2} className="max-w-[1440px] mx-auto w-full">
          <div 
            className="relative w-full p-2 md:p-6 lg:p-12 touch-none"
            style={{ perspective: 1500 }}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleReset}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleReset}
            onTouchCancel={handleReset}
          >
            {/* BỤI VŨ TRỤ */}
            <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
              {spaceDust.map((p) => (
                <motion.div
                  key={`dust-${p.id}`}
                  className="absolute rounded-full bg-[#64FFDA]"
                  style={{ 
                    left: `${p.x}%`, top: `${p.y}%`, 
                    width: p.size, height: p.size,
                    translateZ: p.z,
                    filter: p.z < 0 ? 'blur(3px)' : 'blur(1px)',
                    opacity: p.z < 0 ? 0.2 : 0.5
                  }}
                  animate={{ 
                    y: [0, -100, 0], 
                    x: [0, Math.random() * 40 - 20, 0],
                  }}
                  transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </div>

            {/* LAYER CHÍNH: MẶT PHẲNG CHÒM SAO */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-[10/12] md:aspect-[16/10] min-h-[70vh] md:min-h-[700px] scale-[1.1] sm:scale-100"
            >
              <svg viewBox="0 0 960 620" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  {/* --- KHÔNG DÙNG BLUR FILTER NỮA. DÙNG RADIAL GRADIENT ĐỂ TRÒN HOÀN HẢO --- */}
                  
                  {/* SUN - LÕI TRUNG TÂM */}
                  <radialGradient id="star-sun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="20%" stopColor="#FEF08A" />
                    <stop offset="100%" stopColor="#EAB308" />
                  </radialGradient>
                  <radialGradient id="glow-sun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#CA8A04" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#854D0E" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#422006" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* CYAN - XANH NGỌC */}
                  <radialGradient id="star-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="30%" stopColor="#5EEAD4" />
                    <stop offset="100%" stopColor="#0D9488" />
                  </radialGradient>
                  <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#115E59" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#042F2E" stopOpacity="0" />
                  </radialGradient>

                  {/* PURPLE - TÍM */}
                  <radialGradient id="star-purple" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="30%" stopColor="#D8B4FE" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </radialGradient>
                  <radialGradient id="glow-purple" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#581C87" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B0764" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* ================= BACKGROUND LINES ================= */}
                {/* Đặt opacity = 0 mặc định, chỉ sáng khi nhấn */}
                <motion.g 
                  style={{ x: layerOuterX, y: layerOuterY, translateZ: -120 }} 
                  opacity={hoveredNode ? 0.3 : 0} 
                  className="transition-opacity duration-700 pointer-events-none"
                >
                  <g stroke="#334155" strokeWidth="1" strokeDasharray="3 8">
                    <line x1="100" y1="100" x2="860" y2="520" />
                    <line x1="860" y1="100" x2="100" y2="520" />
                  </g>
                </motion.g>

                {/* ================= TIA NỐI CONSTELLATION ================= */}
                {/* Ẩn mặc định (opacity: 0). Sáng rực rỡ khi nhấn vào bất kỳ Node nào */}
                <motion.g 
                  style={{ x: layerInnerX, y: layerInnerY, translateZ: 0 }}
                  opacity={hoveredNode ? 0.8 : 0} 
                  className="transition-opacity duration-500 pointer-events-none"
                >
                  <path d="M480 310 L480 120 M480 310 L765 310 M480 310 L480 500 M480 310 L195 310" 
                        stroke="#64FFDA" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.8"
                        className="animate-[dashMove_15s_linear_infinite]" />
                  
                  <polygon points="480,120 765,310 480,500 195,310" 
                           stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.4" />

                  <g stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.6">
                    <line x1="480" y1="120" x2="330" y2="48" /><line x1="480" y1="120" x2="630" y2="48" />
                    <line x1="765" y1="310" x2="890" y2="188" /><line x1="765" y1="310" x2="890" y2="432" />
                    <line x1="195" y1="310" x2="70" y2="188" /><line x1="195" y1="310" x2="70" y2="432" />
                    <line x1="480" y1="500" x2="360" y2="585" /><line x1="480" y1="500" x2="600" y2="585" />
                  </g>
                </motion.g>

                {/* ================= 8 HÀNH TINH VỆ TINH ================= */}
                <motion.g 
                  style={{ x: layerInnerX, y: layerInnerY, translateZ: 40 }} 
                  opacity={isDimmed('NODE') ? 0.2 : 1} 
                  className="transition-opacity duration-500 cursor-default"
                >
                  <g style={{ transformOrigin: '330px 48px' }} className="animate-[breatheCenter_6s_ease-in-out_infinite]">
                    <circle cx="330" cy="48" r="35" fill="url(#glow-cyan)" />
                    <circle cx="330" cy="48" r="10" fill="url(#star-cyan)" />
                    <text x="330" y="22" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">BẢN CHẤT LOÀI</text>
                  </g>
                  <g style={{ transformOrigin: '630px 48px' }} className="animate-[breatheCenter_7s_ease-in-out_infinite_reverse]">
                    <circle cx="630" cy="48" r="32" fill="url(#glow-purple)" />
                    <circle cx="630" cy="48" r="8" fill="url(#star-purple)" />
                    <text x="630" y="22" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">TÍNH CÁ THỂ</text>
                  </g>
                  <g style={{ transformOrigin: '890px 188px' }} className="animate-[breatheCenter_5s_ease-in-out_infinite]">
                    <circle cx="890" cy="188" r="40" fill="url(#glow-cyan)" />
                    <circle cx="890" cy="188" r="12" fill="url(#star-cyan)" />
                    <text x="890" y="235" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">GIAI CẤP</text>
                  </g>
                  <g style={{ transformOrigin: '890px 432px' }} className="animate-[breatheCenter_8s_ease-in-out_infinite]">
                    <circle cx="890" cy="432" r="35" fill="url(#glow-purple)" />
                    <circle cx="890" cy="432" r="10" fill="url(#star-purple)" />
                    <text x="890" y="475" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">NHÀ NƯỚC</text>
                  </g>
                  <g style={{ transformOrigin: '70px 188px' }} className="animate-[breatheCenter_6.5s_ease-in-out_infinite]">
                    <circle cx="70" cy="188" r="38" fill="url(#glow-purple)" />
                    <circle cx="70" cy="188" r="11" fill="url(#star-purple)" />
                    <text x="70" y="235" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">ĐỊNH HƯỚNG</text>
                  </g>
                  <g style={{ transformOrigin: '70px 432px' }} className="animate-[breatheCenter_7.5s_ease-in-out_infinite_reverse]">
                    <circle cx="70" cy="432" r="32" fill="url(#glow-cyan)" />
                    <circle cx="70" cy="432" r="8" fill="url(#star-cyan)" />
                    <text x="70" y="475" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">TỔ CHỨC</text>
                  </g>
                  <g style={{ transformOrigin: '360px 585px' }} className="animate-[breatheCenter_5.5s_ease-in-out_infinite]">
                    <circle cx="360" cy="585" r="35" fill="url(#glow-cyan)" />
                    <circle cx="360" cy="585" r="10" fill="url(#star-cyan)" />
                    <text x="360" y="625" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">LỰC LƯỢNG SX</text>
                  </g>
                  <g style={{ transformOrigin: '600px 585px' }} className="animate-[breatheCenter_6.2s_ease-in-out_infinite]">
                    <circle cx="600" cy="585" r="40" fill="url(#glow-purple)" />
                    <circle cx="600" cy="585" r="12" fill="url(#star-purple)" />
                    <text x="600" y="625" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="1">CM XÃ HỘI</text>
                  </g>
                </motion.g>

                {/* ================= 4 NGÔI SAO CHÍNH ================= */}
                <motion.g style={{ x: layerCenterX, y: layerCenterY, translateZ: 120 }}>
                  
                  {/* onPointer kết hợp cả Hover chuột lẫn Chạm ngón tay */}
                  <motion.g 
                    onPointerEnter={() => setHoveredNode('CA_NHAN')} 
                    onPointerLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('CA_NHAN') ? 0.3 : 1}>
                    <circle cx="480" cy="120" r="70" fill="url(#glow-cyan)" />
                    <circle cx="480" cy="120" r="25" fill="url(#star-cyan)" />
                    <circle cx="480" cy="120" r="40" stroke="#2DD4BF" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 4" className="animate-[spin_15s_linear_infinite]" style={{ transformOrigin: '480px 120px' }} />
                    <text x="480" y="70" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="600" fill="#FFF" letterSpacing="2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>CÁ NHÂN</text>
                  </motion.g>

                  <motion.g 
                    onPointerEnter={() => setHoveredNode('XA_HOI')} 
                    onPointerLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('XA_HOI') ? 0.3 : 1}>
                    <circle cx="765" cy="310" r="80" fill="url(#glow-purple)" />
                    <circle cx="765" cy="310" r="28" fill="url(#star-purple)" />
                    <circle cx="765" cy="310" r="45" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '765px 310px' }} />
                    <text x="765" y="260" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="600" fill="#FFF" letterSpacing="2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>XÃ HỘI</text>
                  </motion.g>

                  <motion.g 
                    onPointerEnter={() => setHoveredNode('LANH_TU')} 
                    onPointerLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('LANH_TU') ? 0.3 : 1}>
                    <circle cx="195" cy="310" r="70" fill="url(#glow-purple)" />
                    <circle cx="195" cy="310" r="25" fill="url(#star-purple)" />
                    <circle cx="195" cy="310" r="40" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 4" className="animate-[spin_15s_linear_infinite_reverse]" style={{ transformOrigin: '195px 310px' }} />
                    <text x="195" y="260" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="600" fill="#FFF" letterSpacing="2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>LÃNH TỤ</text>
                  </motion.g>

                  <motion.g 
                    onPointerEnter={() => setHoveredNode('QUAN_CHUNG')} 
                    onPointerLeave={() => setHoveredNode(null)} 
                    className="cursor-pointer transition-all duration-500" opacity={isDimmed('QUAN_CHUNG') ? 0.3 : 1}>
                    <circle cx="480" cy="500" r="80" fill="url(#glow-cyan)" />
                    <circle cx="480" cy="500" r="28" fill="url(#star-cyan)" />
                    <circle cx="480" cy="500" r="45" stroke="#2DD4BF" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 4" className="animate-[spin_18s_linear_infinite]" style={{ transformOrigin: '480px 500px' }} />
                    <text x="480" y="565" textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="600" fill="#FFF" letterSpacing="2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>QUẦN CHÚNG</text>
                  </motion.g>
                </motion.g>

                {/* ================= NGÔI SAO TRUNG TÂM ================= */}
                <motion.g 
                  style={{ x: layerCenterX, y: layerCenterY, translateZ: 250 }}
                  onPointerEnter={() => setHoveredNode('CENTER')} 
                  onPointerLeave={() => setHoveredNode(null)}
                  className="cursor-crosshair transition-opacity duration-500"
                >
                  <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    
                    {/* Hào quang lớn nhất (thay thế triệt để ô vuông sáng) */}
                    <circle cx="480" cy="310" r="140" fill="url(#glow-sun)" />
                    {/* Lõi rực rỡ */}
                    <circle cx="480" cy="310" r="40" fill="url(#star-sun)" />
                    
                    {/* Vòng xoay */}
                    <circle cx="480" cy="310" r="80" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="15 30" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: '480px 310px' }} />
                    <circle cx="480" cy="310" r="95" stroke="#FFF" strokeWidth="0.5" fill="none" opacity="0.3" className="animate-[spin_20s_linear_infinite_reverse]" style={{ transformOrigin: '480px 310px' }} />
                    
                    {/* Text đã được gỡ bỏ thẻ <rect> nền vuông, sử dụng textShadow đậm để tạo chiều sâu */}
                    <text x="480" y="315" textAnchor="middle" fontFamily="Inter" fontSize="18" fontWeight="800" fill="#FFF" letterSpacing="3" style={{ textShadow: '0 4px 15px rgba(0,0,0,1), 0 0 10px #FDE047' }}>
                      CON NGƯỜI
                    </text>
                  </motion.g>
                </motion.g>

              </svg>
            </motion.div>
          </div>
        </AnimatedView>
      </div>
    </section>
  );
}