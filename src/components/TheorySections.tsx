import { useState } from 'react';
import AnimatedView from './AnimatedView';

export default function TheorySections() {
  const [activeCaseAccordion, setActiveCaseAccordion] = useState<number | null>(1);

  const toggleCaseAccordion = (index: number) => {
    setActiveCaseAccordion(activeCaseAccordion === index ? null : index);
  };

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
              {/* ẢNH MINH HỌA NỀN QUẦN CHÚNG CHÌM */}
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

      {/* SECTION 3: Phân tích tình huống (Case Study) */}
      <section id="section-casestudy" className="py-20 lg:py-28 bg-gradient-to-b from-[#F0F2F5] to-bg">
        <div className="w-full max-w-none mx-auto px-6 md:px-16 2xl:px-28">
          <AnimatedView className="text-center mb-14">
            <p className="section-eyebrow mb-3">Phần 03</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-navy mb-4">
              Phân tích Tình huống Thực tế
            </h2>
            <p className="text-body/60 max-w-xl mx-auto text-sm leading-relaxed">
              Bài toán Cá nhân – Tập thể qua trường hợp "Trưởng nhóm C" tại Câu lạc bộ sinh viên.
            </p>
            <div className="w-16 h-0.5 mx-auto mt-5 bg-gradient-to-r from-navy to-dred"></div>
          </AnimatedView>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Cột trái: Mô tả tình huống */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <AnimatedView delay={0.1} className="glass-card p-8 rounded-3xl border-l-4 border-dred shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-dred/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-navy">Trường hợp "Trưởng nhóm C"</h3>
                </div>
                <div className="space-y-4 text-sm text-body/80 leading-relaxed">
                  <p>
                    Một CLB sinh viên tổ chức chiến dịch tình nguyện lớn. Trưởng nhóm C rất nổi tiếng trên mạng, được xem như <strong>“linh hồn”</strong> của chương trình.
                  </p>
                  <p>
                    C thường tự quyết định mọi việc vì tin rằng mình có <em>tầm nhìn tốt hơn</em>. Các thành viên ban đầu ủng hộ, nhưng dần cảm thấy bị xem nhẹ, chỉ làm theo lệnh.
                  </p>
                  <p className="p-4 bg-red-50 text-red-900 rounded-xl border border-red-100">
                    <strong>Hậu quả:</strong> Khi chiến dịch gặp sự cố (thiếu kinh phí, tổ chức kém), C đổ lỗi cho “đội ngũ không đủ năng lực”, còn các thành viên cho rằng C độc đoán.
                  </p>
                </div>
              </AnimatedView>
            </div>

            {/* Cột phải: Phân tích theo Mác - Lênin (Sử dụng Accordion) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Accordion 1 */}
              <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeCaseAccordion === 1 ? 'border-dred/25 shadow-md' : ''}`}>
                <button onClick={() => toggleCaseAccordion(1)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-navy/10">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-navy/60 mb-0.5">Yêu cầu 01</p>
                      <h3 className="font-serif font-bold text-lg text-navy group-hover:text-dred transition-colors duration-200">
                        Mối quan hệ Cá nhân – Tập thể
                      </h3>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 bg-navy/5 transition-transform duration-300 ${activeCaseAccordion === 1 ? 'rotate-45 bg-dred/10' : ''}`}>
                    <svg width="14" height="14" fill="none" stroke={activeCaseAccordion === 1 ? "#8B1E3F" : "#1E3A5F"} strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeCaseAccordion === 1 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="ml-14 border-l-2 pl-6 border-navy/10">
                      <ul className="space-y-3 text-sm text-body/70 leading-relaxed list-disc list-inside marker:text-navy/30">
                        <li>
                          Theo triết học Mác – Lênin, bản chất con người là <strong>"tổng hòa những quan hệ xã hội"</strong>. Cá nhân và tập thể có mối quan hệ thống nhất biện chứng, không thể tồn tại biệt lập. Tập thể là môi trường để cá nhân phát huy năng lực.
                        </li>
                        <li>
                          Trong tình huống, trưởng nhóm C đã <strong>tuyệt đối hóa vai trò cá nhân</strong> và tự tách mình ra khỏi tập thể khi cho rằng chỉ mình mới có "tầm nhìn tốt hơn".
                        </li>
                        <li>
                          Hậu quả của việc phá vỡ tính biện chứng này là các thành viên trong tập thể cảm thấy bị xem nhẹ, trở nên thụ động (chỉ làm theo lệnh). Khi cá nhân tách rời khỏi sức mạnh của tập thể, chiến dịch tất yếu đi đến thất bại.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 2 */}
              <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeCaseAccordion === 2 ? 'border-dred/25 shadow-md' : ''}`}>
                <button onClick={() => toggleCaseAccordion(2)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-dred/10">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-navy/60 mb-0.5">Yêu cầu 02</p>
                      <h3 className="font-serif font-bold text-lg text-navy group-hover:text-dred transition-colors duration-200">
                        Vai trò của "Lãnh tụ" và Tập thể
                      </h3>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 bg-navy/5 transition-transform duration-300 ${activeCaseAccordion === 2 ? 'rotate-45 bg-dred/10' : ''}`}>
                    <svg width="14" height="14" fill="none" stroke={activeCaseAccordion === 2 ? "#8B1E3F" : "#1E3A5F"} strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeCaseAccordion === 2 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="ml-14 border-l-2 pl-6 border-dred/10 space-y-4 text-sm text-body/70 leading-relaxed">
                      <div>
                        <strong className="text-dred">Vai trò của tập thể (quần chúng):</strong>
                        <p className="mt-1">
                          Chủ nghĩa Mác – Lênin khẳng định <em>"Quần chúng nhân dân là chủ thể sáng tạo chân chính của lịch sử"</em>. Trong câu lạc bộ, các thành viên chính là lực lượng cơ bản trực tiếp tạo ra sự thành công của chiến dịch. Khi C xem nhẹ tập thể, anh ta đã làm mất đi động lực nền tảng nhất.
                        </p>
                      </div>
                      <div>
                        <strong className="text-dred">Vai trò của "lãnh tụ" C:</strong>
                        <p className="mt-1">
                          Lãnh tụ là những cá nhân kiệt xuất do phong trào quần chúng tạo ra, có nhiệm vụ định hướng, tổ chức phong trào, nhưng <strong>phải luôn gắn bó mật thiết và dựa vào sức mạnh của quần chúng</strong>. C đã mắc sai lầm nghiêm trọng khi trở nên độc đoán, tự đứng trên tập thể. Việc đổ lỗi cho đội ngũ đi ngược lại hoàn toàn với bản chất của một lãnh tụ theo quan điểm Mác-xít.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 3 */}
              <div className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${activeCaseAccordion === 3 ? 'border-dred/25 shadow-md' : ''}`}>
                <button onClick={() => toggleCaseAccordion(3)} className="w-full flex items-center justify-between p-6 text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-beige/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B88A5A" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-navy/60 mb-0.5">Yêu cầu 03</p>
                      <h3 className="font-serif font-bold text-lg text-navy group-hover:text-dred transition-colors duration-200">
                        Liên hệ thực tiễn & Xây dựng con người
                      </h3>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 bg-navy/5 transition-transform duration-300 ${activeCaseAccordion === 3 ? 'rotate-45 bg-dred/10' : ''}`}>
                    <svg width="14" height="14" fill="none" stroke={activeCaseAccordion === 3 ? "#8B1E3F" : "#1E3A5F"} strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeCaseAccordion === 3 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="ml-14 border-l-2 pl-6 border-beige/30 space-y-3">
                      <div className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-beige/20 text-beige-dark font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                        <p className="text-sm text-body/70"><strong>Nhận thức đúng đắn về bản thể luận:</strong> Mỗi cá nhân cần được giáo dục để hiểu rằng năng lực của bản thân chỉ có thể phát huy tối đa giá trị khi được đặt trong và phục vụ cho lợi ích chung của tập thể.</p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-beige/20 text-beige-dark font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                        <p className="text-sm text-body/70"><strong>Thực hành nguyên tắc tập trung dân chủ:</strong> Khuyến khích sự tự do phát triển tư duy, năng lực và sự sáng tạo của mỗi cá nhân, nhưng mọi quyết định hành động lớn phải được thảo luận công khai và tôn trọng sức mạnh, trí tuệ của đa số. (Đúng với tinh thần của C.Mác: <em>"Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người"</em>).</p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-beige/20 text-beige-dark font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                        <p className="text-sm text-body/70"><strong>Tránh thái cực cực đoan:</strong> Không rơi vào chủ nghĩa cá nhân độc đoán, ích kỷ (như sai lầm của trưởng nhóm C), nhưng cũng không rơi vào tâm lý đám đông cào bằng, ỷ lại, triệt tiêu đi cái tôi sáng tạo của mỗi con người.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}