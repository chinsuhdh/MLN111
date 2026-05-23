import { useState } from 'react';
import AnimatedView from './AnimatedView';

export default function TheorySections() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Dữ liệu đã được tách rõ ràng để tránh lỗi undefined
  const tieuChuanConNguoi = [
    { title: 'Yêu nước, yêu quê hương', desc: 'tinh thần dân tộc và lòng tự hào văn hóa' },
    { title: 'Đoàn kết, nghĩa tình', desc: 'tinh thần tương thân tương ái, gắn kết cộng đồng' },
    { title: 'Lối sống lành mạnh', desc: 'chuẩn mực đạo đức, văn minh và tiến bộ' },
    { title: 'Lao động chăm chỉ', desc: 'sáng tạo, có kỷ luật, tay nghề và năng suất cao' },
    { title: 'Học tập suốt đời', desc: 'tinh thần cầu thị, nâng cao tri thức và kỹ năng' }
  ];

  return (
    <>
      {/* SECTION 1: Cá nhân & Xã hội */}
      <section id="section-canhan-xahoi" className="py-20 lg:py-28 bg-gradient-to-b from-bg to-[#F0F2F5]">
        <div className="w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4 mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <p className="section-eyebrow mb-3">Phần 01</p>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl leading-tight text-navy mb-5">
                  Quan hệ giữa<br/>Cá nhân<br/>&amp; Xã hội
                </h2>
                <div className="w-12 h-1 rounded mb-5 bg-gradient-to-r from-navy to-dred"></div>
                <blockquote className="pl-4 border-l-4 italic font-serif text-sm leading-relaxed text-body/65 border-beige">
                  "Con người tự làm nên lịch sử của mình, nhưng không phải làm theo ý muốn tùy tiện mà trong những hoàn cảnh trực tiếp đã có sẵn."
                  <cite className="block mt-2 not-italic font-sans text-xs font-semibold text-dred">— Karl Marx</cite>
                </blockquote>
                <p className="mt-5 text-sm text-body/55 leading-relaxed">
                  Biện chứng giữa cá nhân và xã hội là nền tảng trong triết học Mác–Lênin về bản chất con người.
                </p>

                {/* ẢNH MINH HỌA SECTION 1: KARL MARX */}
                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-navy/10 relative group h-48 lg:h-64">
                  <img 
                    src="https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/karl-marx-gettyimages-514679914?_a=BAVMn6DY0" 
                    alt="Karl Marx" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white/70 text-xs font-serif italic">Karl Marx (1818 – 1883)</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <AnimatedView delay={0.05} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-navy/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2">
                        <circle cx="12" cy="8" r="4"/><path d="M4 20v-2a8 8 0 0116 0v2"/>
                      </svg>
                    </div>
                    <p className="section-eyebrow tracking-widest">Luận điểm 01</p>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-navy mb-3">Sự thống nhất giữa cái chung và cái riêng</h3>
                  <p className="text-sm leading-relaxed text-body/70">
                    Con người vừa mang <strong>bản chất loài</strong> (lý trí, ngôn ngữ, lao động sáng tạo) vừa mang <strong>tính cá thể</strong> độc đáo. Cái chung tồn tại trong và thông qua cái riêng.
                  </p>
                  <div className="mt-4 pt-4 border-t border-navy/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-beige"></span>
                    <span className="text-xs text-body/45 font-medium">Bản thể luận · Triết học Mác</span>
                  </div>
                </AnimatedView>

                <AnimatedView delay={0.15} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-dred/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <p className="section-eyebrow tracking-widest text-dred">Luận điểm 02</p>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-navy mb-3">Cá nhân và xã hội không thể tách rời</h3>
                  <p className="text-sm leading-relaxed text-body/70">
                    Xã hội do cá nhân hợp thành, quan hệ giữa họ là <strong>tất yếu lịch sử</strong>. Cá nhân chỉ phát triển đầy đủ trong lòng xã hội.
                  </p>
                  <div className="mt-4 pt-4 border-t border-dred/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-dred"></span>
                    <span className="text-xs text-body/45 font-medium">Quan hệ biện chứng · Tất yếu lịch sử</span>
                  </div>
                </AnimatedView>

                <AnimatedView delay={0.25} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-beige/15">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88A5A" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </div>
                    <p className="section-eyebrow tracking-widest text-beige-dark">Luận điểm 03</p>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-navy mb-3">Tính giai cấp và tính nhân loại</h3>
                  <p className="text-sm leading-relaxed text-body/70">
                    Mỗi cá nhân mang <strong>tính giai cấp</strong> — phản ánh vị trí trong cơ cấu sản xuất — đồng thời mang <strong>giá trị chung nhân loại</strong>.
                  </p>
                  <div className="mt-4 pt-4 border-t border-beige/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-beige"></span>
                    <span className="text-xs text-body/45 font-medium">Giai cấp · Giá trị phổ quát</span>
                  </div>
                </AnimatedView>

                <AnimatedView delay={0.35} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-navy/10">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <p className="section-eyebrow tracking-widest">Luận điểm 04</p>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-navy mb-3">Ý nghĩa phương pháp luận</h3>
                  <p className="text-sm leading-relaxed text-body/70">
                    Cần tránh hai khuynh hướng: <strong>đề cao quá mức cá nhân chủ nghĩa</strong> hoặc <strong>tuyệt đối hóa xã hội</strong> (xóa bỏ quyền cá nhân).
                  </p>
                  <div className="mt-4 pt-4 border-t border-navy/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-navy"></span>
                    <span className="text-xs text-body/45 font-medium">Phương pháp luận · Thực tiễn</span>
                  </div>
                </AnimatedView>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Quần chúng & Lãnh tụ */}
      <section id="section-quanchung" className="py-20 lg:py-28 bg-bg">
            <div className="w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28">
            <AnimatedView className="text-center mb-14">
            <p className="section-eyebrow mb-3">Phần 02</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-navy mb-4">
              Quần chúng Nhân dân &amp; Lãnh tụ
            </h2>
            <p className="text-body/60 max-w-xl mx-auto text-sm leading-relaxed">
              Lực lượng sáng tạo lịch sử và vai trò dẫn dắt — mối quan hệ biện chứng không thể tách rời.
            </p>
            <div className="w-16 h-0.5 mx-auto mt-5 bg-gradient-to-r from-navy to-dred"></div>
          </AnimatedView>

          <div className="grid lg:grid-cols-5 gap-5">
            <AnimatedView className="lg:col-span-3 rounded-3xl overflow-hidden relative min-h-[400px] bg-gradient-to-br from-navy via-navy-dark to-[#0F1F35] group">
              {/* ẢNH MINH HỌA NỀN QUẦN CHÚNG CHÌM: LÊNIN VÀ QUẦN CHÚNG */}
              <img 
                src="https://file3.qdnd.vn/data/images/0/2022/04/21/thuthuytv/lenin.jpg?dpi=150&quality=100&w=870" 
                alt="V.I. Lenin và Quần chúng nhân dân" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F35] via-[#0F1F35]/60 to-transparent"></div>
              
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-[radial-gradient(circle,#8B1E3F,transparent)] translate-x-[30%] translate-y-[-30%]"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-8 bg-[radial-gradient(circle,#D4A373,transparent)] translate-x-[-30%] translate-y-[30%]"></div>

              <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-beige/20 border border-beige/30 backdrop-blur-sm">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="1.8">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <p className="text-beige text-xs font-semibold uppercase tracking-widest mb-3 opacity-90 drop-shadow-md">Lực lượng cốt lõi</p>
                  <h3 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-5 leading-tight drop-shadow-lg">Quần chúng<br/>Nhân dân</h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-sm drop-shadow-md">
                    Theo chủ nghĩa Mác–Lênin, quần chúng nhân dân là chủ thể sáng tạo lịch sử, bao gồm những người lao động và tầng lớp tiến bộ xã hội.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl p-4 bg-white/10 border border-white/10 backdrop-blur-md">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 bg-beige/25">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2.2"><path d="M12 20V10M5 20V4M19 20v-8"/></svg>
                    </div>
                    <p className="text-white text-xs font-semibold mb-1">Lực lượng sản xuất</p>
                    <p className="text-white/70 text-xs">Cơ bản nhất, tạo ra của cải vật chất</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white/10 border border-white/10 backdrop-blur-md">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 bg-beige/25">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <p className="text-white text-xs font-semibold mb-1">Động lực cách mạng</p>
                    <p className="text-white/70 text-xs">Thúc đẩy biến đổi xã hội tiến bộ</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white/10 border border-white/10 backdrop-blur-md">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 bg-beige/25">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <p className="text-white text-xs font-semibold mb-1">Sáng tạo văn hóa</p>
                    <p className="text-white/70 text-xs">Nguồn gốc mọi giá trị văn hóa</p>
                  </div>
                </div>
              </div>
            </AnimatedView>

            <div className="lg:col-span-2 flex flex-col gap-5">
              <AnimatedView delay={0.1} className="glass-card rounded-3xl p-7 flex-1 relative overflow-hidden group">
                {/* ẢNH MINH HỌA NỀN LÃNH TỤ CHÌM: V.I. LENIN */}
                <img 
                  src="https://baotanghochiminh.vn/pic/Customer/images/N%C4%83m%202020/496.jpg" 
                  alt="V.I. Lenin" 
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.06] mix-blend-darken transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-dred/10">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="section-eyebrow mb-1 text-dred">Vai trò quan trọng</p>
                      <h3 className="font-serif font-bold text-xl text-navy mb-3">Vai trò Lãnh tụ</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-body/70 mt-2">
                    Lãnh tụ — những cá nhân xuất sắc được lịch sử lựa chọn — có nhiệm vụ <strong>định hướng tư tưởng</strong>, tổ chức phong trào và dẫn dắt quần chúng.
                  </p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-dred/10 text-dred">Định hướng</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-dred/10 text-dred">Tổ chức</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-dred/10 text-dred">Dẫn dắt</span>
                  </div>
                </div>
              </AnimatedView>

              <AnimatedView delay={0.2} className="glass-card rounded-3xl p-7 flex-1 border-l-4 border-l-beige">
                <img 
                  src="https://www.quanlynhanuoc.vn/wp-content/uploads/2021/05/a-nh%C3%A2n-1.jpg" 
                  alt="V.I. Lenin" 
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.06] mix-blend-darken transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-beige/15">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B88A5A" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                    </svg>
                  </div>
                  <div>
                    <p className="section-eyebrow mb-1 text-beige-dark">Biện chứng</p>
                    <h3 className="font-serif font-bold text-xl text-navy mb-3">Mối quan hệ biện chứng</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-body/70 mt-2 relative z-10">
                  Quần chúng và lãnh tụ thống nhất trong <strong>mục đích giải phóng</strong>. Nhân dân quyết định tiến trình lịch sử, lãnh tụ dẫn đường.
                </p>
                <div className="mt-5 p-3 rounded-xl text-xs italic font-serif bg-beige/10 text-dred border-l-3 border-beige relative z-10">
                  "Nhân dân quyết định · Lãnh tụ dẫn đường"
                </div>
              </AnimatedView>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Tư tưởng Hồ Chí Minh */}
      <section id="section-hcm" className="py-20 lg:py-28 relative overflow-hidden">
        
        {/* LỚP 1: MÀU NỀN TỐI SẪM */}
        <div className="absolute inset-0 bg-[#0F1F35]"></div>
        
        {/* LỚP 2: ẢNH CHỦ TỊCH HỒ CHÍ MINH (Tăng Opacity, dùng chế độ Luminosity để hòa trộn xám) */}
        <div 
          className="absolute inset-0 bg-[url('https://cdn-i2.congthuong.vn/stores/news_dataimages/2023/082023/29/09/thuc-hien-di-chuc-cua-chu-tich-ho-chi-minh-ve-xay-dung-dang-cam-quyen-120230829092300.5710900.jpg?rt=20230829092332')] 
                     bg-cover bg-[center_top_10%] bg-no-repeat opacity-30 mix-blend-luminosity pointer-events-none"
        ></div>

        {/* LỚP 3: GRADIENT PHỦ LÊN TRÊN ĐỂ GIẢM MÀU ẢNH (Tạo hiệu ứng Cinematic) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F35]/90 via-navy/80 to-dred/85 pointer-events-none"></div>
        
        {/* Hạt chấm bi trang trí */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,_#D4A373_1px,_transparent_1px),_radial-gradient(circle_at_80%_50%,_#D4A373_1px,_transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28">
          <AnimatedView className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-beige/15 border border-beige/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-beige"></span>
              <p className="section-eyebrow mb-0 text-beige tracking-widest">Phần 03 · Tư tưởng Hồ Chí Minh</p>
            </div>

            <div className="font-serif text-8xl leading-none mb-2 opacity-20 text-beige">&ldquo;</div>

            <blockquote className="max-w-4xl mx-auto">
              <p className="quote-text font-serif font-bold leading-snug italic" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)' }}>
                Chữ người, nghĩa hẹp là gia đình, anh em, họ hàng, bầu bạn. Nghĩa rộng là đồng bào cả nước. Rộng nữa là cả loài người.
              </p>
              <footer className="mt-6">
                <cite className="font-sans not-italic text-sm font-semibold tracking-wider text-beige opacity-85">— Hồ Chí Minh</cite>
              </footer>
            </blockquote>
          </AnimatedView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatedView className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-navy/50 border border-navy">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <p className="text-beige text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">01</p>
              <h4 className="font-serif font-bold text-white text-lg mb-3 leading-tight">Quan niệm về con người</h4>
              <p className="text-white/60 text-xs leading-relaxed">Con người là mục tiêu và động lực của sự nghiệp cách mạng. Giải phóng nhân dân là sứ mệnh tối cao.</p>
            </AnimatedView>

            <AnimatedView delay={0.1} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-dred/40 border border-dred/60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <p className="text-beige text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">02</p>
              <h4 className="font-serif font-bold text-white text-lg mb-3 leading-tight">Giải phóng &amp; Hạnh phúc</h4>
              <p className="text-white/60 text-xs leading-relaxed">"Độc lập — Tự do — Hạnh phúc" là tư tưởng nhất quán. Hạnh phúc của nhân dân là thước đo thành công.</p>
            </AnimatedView>

            <AnimatedView delay={0.2} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-beige/20 border border-beige/40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <p className="text-beige text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">03</p>
              <h4 className="font-serif font-bold text-white text-lg mb-3 leading-tight">Lấy dân làm gốc</h4>
              <p className="text-white/60 text-xs leading-relaxed">Sự nghiệp cách mạng là <em className="text-beige/80">của dân, do dân, vì dân</em>. Nhân dân là chủ nhân đất nước.</p>
            </AnimatedView>

            <AnimatedView delay={0.3} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-navy/50 border border-navy">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <p className="text-beige text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">04</p>
              <h4 className="font-serif font-bold text-white text-lg mb-3 leading-tight">Phát triển toàn diện</h4>
              <p className="text-white/60 text-xs leading-relaxed">"Trồng người" là chiến lược lâu dài, xây dựng con người <em className="text-beige/80">vừa hồng vừa chuyên</em>.</p>
            </AnimatedView>
          </div>
        </div>
      </section>

      {/* SECTION 4: Quan điểm của Đảng */}
      <section id="section-dang" className="py-20 lg:py-28 bg-gradient-to-b from-[#F0F2F5] to-bg">
        <div className="w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28">
          <AnimatedView className="text-center mb-14">
            <p className="section-eyebrow mb-3">Phần 04</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-navy mb-4">
              Quan điểm của Đảng hiện nay
            </h2>
            <p className="text-body/60 max-w-xl mx-auto text-sm leading-relaxed">
              Đảng Cộng sản Việt Nam kế thừa và phát triển sáng tạo quan niệm về con người trong thời kỳ đổi mới.
            </p>
            <div className="w-16 h-0.5 mx-auto mt-5 bg-gradient-to-r from-navy to-dred"></div>
          </AnimatedView>

          {/* CHIA GRID 2 CỘT CHO SECTION 4 */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Cột trái chứa các Accordions */}
            <div className="lg:col-span-7 space-y-4">
              {/* Accordion 1 */}
              <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === 1 ? 'border-dred/25' : ''}`}>
                <button onClick={() => toggleAccordion(1)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-navy/10">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-dred mb-0.5">Luận điểm I</p>
                      <h3 className="font-serif font-bold text-lg text-navy group-hover:text-dred transition-colors duration-200">
                        Con người là trung tâm của đổi mới
                      </h3>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 bg-dred/10 transition-transform duration-300 ${activeAccordion === 1 ? 'rotate-45' : ''}`}>
                    <svg width="14" height="14" fill="none" stroke="#8B1E3F" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeAccordion === 1 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="ml-14 border-l-2 pl-6 border-navy/10">
                      <p className="text-sm leading-relaxed text-body/70 mb-4">
                        Đại hội Đảng xác định mục tiêu tổng quát là xây dựng đất nước <strong>"Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"</strong>.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-navy/5 border border-navy/10">
                          <p className="text-xs font-semibold text-navy mb-1">Mục tiêu phát triển</p>
                          <p className="text-xs text-body/60">Nâng cao đời sống vật chất, tinh thần toàn diện</p>
                        </div>
                        <div className="p-3 rounded-xl bg-dred/5 border border-dred/10">
                          <p className="text-xs font-semibold text-dred mb-1">Con người trung tâm</p>
                          <p className="text-xs text-body/60">Động lực của CNH-HĐH và phát triển bền vững</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 2 */}
              <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === 2 ? 'border-dred/25' : ''}`}>
                <button onClick={() => toggleAccordion(2)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-dred/10">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-dred mb-0.5">Luận điểm II</p>
                      <h3 className="font-serif font-bold text-lg text-navy group-hover:text-dred transition-colors duration-200">
                        Tiêu chuẩn xây dựng con người Việt Nam
                      </h3>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 bg-dred/10 transition-transform duration-300 ${activeAccordion === 2 ? 'rotate-45' : ''}`}>
                    <svg width="14" height="14" fill="none" stroke="#8B1E3F" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeAccordion === 2 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="ml-14 border-l-2 pl-6 border-dred/10">
                      <p className="text-sm leading-relaxed text-body/70 mb-4">5 tiêu chuẩn cơ bản thời kỳ mới:</p>
                      <div className="space-y-2.5">
                        {tieuChuanConNguoi.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-dred/5">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-dred">
                              <span className="text-white text-xs font-bold">{i + 1}</span>
                            </div>
                            <p className="text-sm text-body/70"><strong>{item.title}</strong> — {item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Accordion 3 */}
              <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === 3 ? 'border-dred/25' : ''}`}>
                <button onClick={() => toggleAccordion(3)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-beige/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B88A5A" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-dred mb-0.5">Luận điểm III</p>
                      <h3 className="font-serif font-bold text-lg text-navy group-hover:text-dred transition-colors duration-200">
                        Giải pháp thực hiện trong thực tiễn
                      </h3>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 bg-dred/10 transition-transform duration-300 ${activeAccordion === 3 ? 'rotate-45' : ''}`}>
                    <svg width="14" height="14" fill="none" stroke="#8B1E3F" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeAccordion === 3 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="ml-14 border-l-2 pl-6 border-beige/30">
                      <p className="text-sm leading-relaxed text-body/70 mb-5">Nhóm giải pháp chiến lược:</p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="p-4 rounded-xl text-center bg-navy/5 border border-navy/10">
                            <p className="text-xs font-bold text-navy mb-1">Kết hợp lợi ích</p>
                            <p className="text-xs text-body/55">Hài hòa cá nhân, tập thể, xã hội</p>
                        </div>
                        <div className="p-4 rounded-xl text-center bg-dred/5 border border-dred/10">
                            <p className="text-xs font-bold text-dred mb-1">Đào tạo nhân lực</p>
                            <p className="text-xs text-body/55">Phát triển nhân lực chất lượng cao</p>
                        </div>
                        <div className="p-4 rounded-xl text-center bg-beige/10 border border-beige/20">
                            <p className="text-xs font-bold text-beige-dark mb-1">Chống suy thoái</p>
                            <p className="text-xs text-body/55">Ngăn chặn suy thoái tư tưởng</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ẢNH MINH HỌA SECTION 4: CHỦ TỊCH HỒ CHÍ MINH VÀ NHÂN DÂN */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <AnimatedView delay={0.2} direction="left" className="h-[460px] rounded-3xl overflow-hidden shadow-xl border-4 border-white/60 relative group">
                <img 
                  src="https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/ho-chi-minh-2?_a=BAVMn6DY0" 
                  alt="Chủ tịch Hồ Chí Minh" 
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent flex flex-col justify-end p-8">
                  <div className="w-10 h-1 mb-4 bg-dred rounded"></div>
                  <h3 className="text-white font-serif font-bold text-2xl mb-2">Con người là trung tâm</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Đào tạo và phát triển toàn diện nguồn nhân lực, hướng đến mục tiêu "Dân giàu, nước mạnh, công bằng, văn minh" dựa trên nền tảng tư tưởng cốt lõi.
                  </p>
                </div>
              </AnimatedView>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}