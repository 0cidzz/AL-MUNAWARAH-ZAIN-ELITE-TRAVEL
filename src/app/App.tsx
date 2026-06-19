import { useState, useEffect, useRef } from "react";
import logoImg from "../imports/661720000_18078770678153267_5742773759806895744_n.jpg";
import {
  Shield, Star, Users, Award, CheckCircle, Phone, Mail, MapPin,
  ChevronDown, ChevronRight, Play, Menu, X, ArrowRight, Quote,
  Calendar, Plane, Hotel, Clock, MessageCircle, FileText, Globe,
  Heart, Sparkles
} from "lucide-react";

/* ─── Helpers ─── */
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/* ─── Data ─── */
const packages = [
  {
    category: "umrah",
    badge: "POPULER",
    name: "Umrah Reguler Hemat",
    price: "Rp 28.500.000",
    duration: "9 Hari",
    departure: "Setiap Bulan",
    airline: "Saudi Arabian Airlines",
    hotel: "Bintang 3",
    hotelMakkah: "Al Kiswah Tower",
    hotelMadinah: "Grand Wahid",
    facilities: ["Visa Umrah", "Tiket PP", "Hotel Transit", "Makan 3x", "Pembimbing Ibadah", "Manasik"],
    highlight: false,
  },
  {
    category: "umrah",
    badge: "TERLARIS",
    name: "Umrah Premium Plus",
    price: "Rp 42.500.000",
    duration: "12 Hari",
    departure: "Pilihan Tanggal",
    airline: "Garuda Indonesia",
    hotel: "Bintang 4",
    hotelMakkah: "Pullman Zamzam",
    hotelMadinah: "Mövenpick Anbiaa",
    facilities: ["Visa Umrah", "Tiket PP Business", "Hotel Bintang 4", "Makan 3x Buffet", "Pembimbing Senior", "Manasik", "City Tour", "Asuransi"],
    highlight: true,
  },
  {
    category: "umrah",
    badge: "EKSKLUSIF",
    name: "Umrah VIP Elite",
    price: "Rp 68.000.000",
    duration: "14 Hari",
    departure: "Sesuai Request",
    airline: "Garuda Indonesia",
    hotel: "Bintang 5",
    hotelMakkah: "Swissotel Makkah",
    hotelMadinah: "Anantara Madinah",
    facilities: ["Visa Umrah Priority", "First Class Cabin", "Suite Room", "Butler Service", "Private Guide", "Ziarah Lengkap", "Shopping Tour", "Spa & Wellness"],
    highlight: false,
  },
  {
    category: "haji",
    badge: "KHUSUS",
    name: "Haji Khusus Reguler",
    price: "Rp 185.000.000",
    duration: "40 Hari",
    departure: "Sesuai BPIH",
    airline: "Garuda Indonesia",
    hotel: "Bintang 4",
    hotelMakkah: "Le Meridien",
    hotelMadinah: "Sheraton Madinah",
    facilities: ["Visa Haji Resmi", "Tiket PP", "Hotel Dekat Masjid", "Makan 3x", "Pembimbing Haji", "Manasik 6 Bulan", "Perlengkapan Haji"],
    highlight: false,
  },
  {
    category: "haji",
    badge: "PREMIUM",
    name: "Haji Khusus Premium",
    price: "Rp 235.000.000",
    duration: "40 Hari",
    departure: "Sesuai BPIH",
    airline: "Garuda Indonesia",
    hotel: "Bintang 5",
    hotelMakkah: "Hilton Makkah",
    hotelMadinah: "Conrad Madinah",
    facilities: ["Visa Haji Prioritas", "Business Class", "Suite Room", "Makan 3x Buffet", "Dokter Pendamping", "Manasik Intensif", "Perlengkapan Premium", "Asuransi Jiwa"],
    highlight: true,
  },
];

const testimonials = [
  { name: "Hj. Siti Rahmawati", city: "Mataram, NTB", year: "2024", rating: 5, text: "MasyaAllah, pelayanan AL-MUNAWARAH ZAIN ELITE TRAVEL luar biasa. Dari manasik hingga kembali ke tanah air, semua terlayani dengan sangat profesional. Tim pembimbing selalu siap membantu kapanpun dibutuhkan.", avatar: "SR" },
  { name: "H. Ahmad Fauzi", city: "Lombok Tengah, NTB", year: "2023", rating: 5, text: "Alhamdulillah bisa menjalankan ibadah haji dengan tenang berkat bimbingan travel ini. Hotel dekat Masjid, makanan enak, dan pembimbing yang sabar. Sangat recommended untuk keluarga.", avatar: "AF" },
  { name: "Ustadzah Nuraini", city: "Sumbawa Besar, NTB", year: "2024", rating: 5, text: "Sudah 2 kali umrah bersama Al-Munawarah, dan selalu puas. Transparansi harga, tidak ada biaya tersembunyi. Insya Allah akan kembali lagi untuk yang ketiga kalinya.", avatar: "NN" },
  { name: "H. Bambang Setiawan", city: "Dompu, NTB", year: "2023", rating: 5, text: "Awalnya ragu karena banyak travel yang tidak amanah. Tapi Al-Munawarah terbukti terpercaya — izin resmi Kemenag, dokumen lengkap, dan pelayanan tulus dari hati.", avatar: "BS" },
];

const faqs = [
  { q: "Apa saja syarat untuk mendaftar umrah?", a: "Syarat utama: paspor aktif minimal 7 bulan, foto 4x6 background putih, KTP, KK, buku nikah/akta kelahiran, dan vaksin meningitis. Untuk jamaah wanita di bawah 45 tahun wajib didampingi mahram." },
  { q: "Berapa lama proses visa umrah?", a: "Proses visa umrah biasanya memakan waktu 7-14 hari kerja setelah semua dokumen lengkap. Kami mengurus visa langsung ke Kedutaan Saudi melalui sistem resmi Kemenag." },
  { q: "Apakah harga paket sudah all-inclusive?", a: "Ya, harga paket kami sudah termasuk: tiket pesawat PP, visa umrah, hotel sesuai paket, konsumsi 3x sehari, transportasi selama di Tanah Suci, pembimbing ibadah, dan manasik. Tidak ada biaya tersembunyi." },
  { q: "Bagaimana cara pembayaran paket umrah?", a: "Kami menerima pembayaran dengan sistem DP 30% untuk konfirmasi kursi, kemudian pelunasan 60 hari sebelum keberangkatan. Tersedia cicilan 0% untuk beberapa kartu kredit partner kami." },
  { q: "Apakah Al-Munawarah terdaftar resmi di Kemenag?", a: "Ya, PT. AL-MUNAWARAH ZAIN ELITE TRAVEL telah terdaftar dan mendapat izin resmi dari Kementerian Agama RI dengan nomor izin yang dapat diverifikasi langsung di website resmi Kemenag." },
  { q: "Apakah ada pendampingan selama di Tanah Suci?", a: "Tentu. Setiap rombongan didampingi oleh pembimbing ibadah bersertifikat yang berpengalaman minimal 10 tahun. Tersedia juga dokter pendamping untuk paket premium." },
];

const stats = [
  { value: "5000+", label: "Jamaah Dilayani", icon: Users },
  { value: "120+", label: "Keberangkatan", icon: Plane },
  { value: "15+", label: "Tahun Pengalaman", icon: Award },
  { value: "98%", label: "Kepuasan Jamaah", icon: Heart },
];

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?w=600&h=800&fit=crop&auto=format", alt: "Aerial view of Masjidil Haram", span: "row-span-2" },
  { url: "https://images.unsplash.com/photo-1692977579997-948328cdb7d2?w=600&h=400&fit=crop&auto=format", alt: "Masjid Nabawi green dome", span: "" },
  { url: "https://images.unsplash.com/photo-1660794487140-6779d42162c1?w=600&h=400&fit=crop&auto=format", alt: "Pilgrims in white ihram", span: "" },
  { url: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=600&h=500&fit=crop&auto=format", alt: "Masjid interior marble columns", span: "" },
  { url: "https://images.unsplash.com/photo-1627790497727-41fb43f961be?w=600&h=400&fit=crop&auto=format", alt: "Mosque minaret architecture", span: "" },
  { url: "https://images.unsplash.com/photo-1513072064285-240f87fa81e8?w=600&h=600&fit=crop&auto=format", alt: "Kaaba tawaf crowd aerial", span: "row-span-2" },
];

/* ─── Sub-components ─── */

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const navLinks = ["Tentang Kami", "Paket", "Legalitas", "Galeri", "Testimoni", "FAQ", "Kontak"];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logoImg}
              alt="PT. Al-Munawarah Zain Elite Travel"
              className="h-12 w-12 object-cover rounded-lg"
            />
            <div className="hidden sm:block">
              <div className={cn(
                "font-bold text-xs leading-tight tracking-wide transition-colors duration-500",
                scrolled ? "text-[#0D6E4F]" : "text-white"
              )} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                AL-MUNAWARAH ZAIN
              </div>
              <div className="text-[#C8A54B] text-[9px] tracking-[0.2em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Elite Travel
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-200",
                  scrolled
                    ? "text-[#111827] hover:text-[#0D6E4F]"
                    : "text-white/90 hover:text-white"
                )}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/6281234567890"
              className="flex items-center gap-2 bg-[#0D6E4F] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#0b5c41] transition-colors duration-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
            >
              <MessageCircle size={15} />
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Menu */}
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open
              ? <X size={24} className={scrolled ? "text-[#111827]" : "text-white"} />
              : <Menu size={24} className={scrolled ? "text-[#111827]" : "text-white"} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-black/5 py-6 px-6">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-[#111827] text-sm font-medium border-b border-black/5 last:border-0"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {link}
            </a>
          ))}
          <a
            href="https://wa.me/6281234567890"
            className="mt-4 flex items-center justify-center gap-2 bg-[#0D6E4F] text-white w-full py-3 text-sm font-semibold"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
          >
            <MessageCircle size={15} />
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a1a12]">
        <img
          src="https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?w=1920&h=1080&fit=crop&auto=format"
          alt="Masjidil Haram Makkah aerial view"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a12]/90 via-[#0a1a12]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a12]/70 via-transparent to-transparent" />
      </div>

      {/* Islamic geometric pattern overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,0 80,20 80,60 40,80 0,60 0,20" fill="none" stroke="#C8A54B" strokeWidth="0.5"/>
              <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="#C8A54B" strokeWidth="0.5"/>
              <circle cx="40" cy="40" r="8" fill="none" stroke="#C8A54B" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#C8A54B]" />
            <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Izin Resmi Kemenag RI
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white leading-[1.05]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Bersama{" "} <br />
              <span className="italic text-[#C8A54B]">
                Al-Munawarah Zain Elite Travel
              </span>
              <br />
              Wujudkan langkah spiritual Anda
              <br />
              menuju Baitullah
            </h1>

          <p className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            15+ tahun melayani lebih dari 5.000 jamaah dengan standar premium, pembimbing bersertifikat, dan transparansi penuh.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#paket"
              className="group flex items-center justify-center gap-3 bg-[#C8A54B] text-[#111827] px-8 py-4 font-semibold text-sm tracking-wide hover:bg-[#b8943d] transition-all duration-300"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
            >
              Lihat Paket
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="https://wa.me/6281234567890"
              className="group flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 font-medium text-sm tracking-wide hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
            >
              <MessageCircle size={16} />
              Konsultasi Gratis
            </a>
          </div>

          {/* Mini Trust Badges */}
          <div className="flex flex-wrap gap-6 mt-14 pt-8 border-t border-white/10">
            {[
              { label: "5.000+ Jamaah", icon: Users },
              { label: "Izin Kemenag Resmi", icon: Shield },
              { label: "15 Tahun Pengalaman", icon: Award },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} className="text-[#C8A54B]" />
                <span className="text-white/60 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      
    </section>
  );
}

function WhyChooseUs() {
  const pillars = [
    {
      icon: Shield,
      title: "Legalitas Resmi",
      desc: "Terdaftar dan berizin resmi dari Kementerian Agama RI. NIB, NPWP, dan sertifikat dapat diverifikasi.",
      detail: "No. Izin: D/376/2009"
    },
    {
      icon: Award,
      title: "15+ Tahun Berpengalaman",
      desc: "Sejak 2009, kami telah melayani ribuan jamaah dari seluruh Nusa Tenggara Barat dengan track record terbaik.",
      detail: "Est. 2009, Mataram"
    },
    {
      icon: Users,
      title: "Pembimbing Profesional",
      desc: "Setiap rombongan didampingi pembimbing ibadah bersertifikat dengan pengalaman minimal 10 tahun.",
      detail: "Bersertifikat Kemenag"
    },
    {
      icon: Star,
      title: "Pelayanan Premium",
      desc: "Hotel dekat Masjid, konsumsi halal berkualitas, transportasi nyaman, dan layanan 24 jam selama di Tanah Suci.",
      detail: "Hotel ≥ Bintang 3"
    },
  ];

  return (
    <section id="tentang-kami" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
              <img
                src="https://images.unsplash.com/photo-1660794487140-6779d42162c1?w=700&h=900&fit=crop&auto=format"
                alt="Pilgrims performing tawaf"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D6E4F]/40 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 bg-[#0D6E4F] text-white p-6 shadow-2xl" style={{ borderRadius: "2px" }}>
              <div className="text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>5.000+</div>
              <div className="text-white/80 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Jamaah Dilayani</div>
              <div className="text-[#C8A54B] text-xs mt-2 tracking-widest uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sejak 2009</div>
            </div>
            {/* Gold accent line */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C8A54B] opacity-60" />
          </div>

          {/* Right: Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C8A54B]" />
              <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Mengapa Kami
              </span>
            </div>
            <h2 className="text-[#111827] mb-6" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em"
            }}>
              Dipercaya Ribuan Jamaah<br />
              <span className="italic text-[#0D6E4F]">Seluruh Indonesia</span>
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed mb-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              PT. AL-MUNAWARAH ZAIN ELITE TRAVEL hadir sebagai mitra ibadah terpercaya yang memadukan profesionalisme modern dengan nilai-nilai keislaman yang kuat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.map(({ icon: Icon, title, desc, detail }) => (
                <div key={title} className="group p-5 border border-black/5 hover:border-[#0D6E4F]/20 hover:bg-[#F9F6F1] transition-all duration-300" style={{ borderRadius: "2px" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0D6E4F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0D6E4F] transition-colors duration-300">
                      <Icon size={16} className="text-[#0D6E4F] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-[#111827] font-semibold text-sm mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                      <p className="text-[#6B7280] text-xs leading-relaxed mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{desc}</p>
                      <span className="text-[#C8A54B] text-xs font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{detail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  const [activeTab, setActiveTab] = useState<"umrah" | "haji">("umrah");
  const filtered = packages.filter(p => p.category === activeTab);

  return (
    <section id="paket" className="py-28 bg-[#F9F6F1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C8A54B]" />
            <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Paket Pilihan
            </span>
            <div className="h-px w-8 bg-[#C8A54B]" />
          </div>
          <h2 className="text-[#111827] mb-4" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em"
          }}>
            Paket Ibadah <span className="italic text-[#0D6E4F]">Terbaik Kami</span>
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tersedia berbagai pilihan paket dengan fasilitas lengkap, harga transparan, dan pembimbing berpengalaman.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-black/10 p-1 bg-white" style={{ borderRadius: "2px" }}>
            {(["umrah", "haji"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-2.5 text-sm font-semibold tracking-wide capitalize transition-all duration-200",
                  activeTab === tab
                    ? "bg-[#0D6E4F] text-white"
                    : "text-[#6B7280] hover:text-[#111827]"
                )}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "1px" }}
              >
                Paket {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <div
              key={pkg.name}
              className={cn(
                "relative flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden",
                pkg.highlight
                  ? "bg-[#0D6E4F] border-[#0D6E4F] text-white"
                  : "bg-white border-black/5 text-[#111827]"
              )}
              style={{ borderRadius: "2px" }}
            >
              {/* Badge */}
              <div className={cn(
                "absolute top-4 right-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase",
                pkg.highlight
                  ? "bg-[#C8A54B] text-[#111827]"
                  : "bg-[#0D6E4F]/10 text-[#0D6E4F]"
              )} style={{ borderRadius: "1px" }}>
                {pkg.badge}
              </div>

              {/* Content */}
              <div className="p-7 flex-1">
                <div className={cn("text-xs tracking-widest uppercase mb-2", pkg.highlight ? "text-white/60" : "text-[#6B7280]")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {pkg.duration} · {pkg.airline}
                </div>
                <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  {pkg.name}
                </h3>
                <div className={cn("text-2xl font-bold mb-5", pkg.highlight ? "text-[#C8A54B]" : "text-[#0D6E4F]")} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {pkg.price}
                  <span className={cn("text-sm font-normal ml-1", pkg.highlight ? "text-white/60" : "text-[#6B7280]")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>/orang</span>
                </div>

                {/* Details */}
                <div className={cn("grid grid-cols-2 gap-3 mb-5 text-xs p-4", pkg.highlight ? "bg-white/10" : "bg-[#F9F6F1]")} style={{ borderRadius: "2px" }}>
                  {[
                    { label: "Hotel Makkah", value: pkg.hotelMakkah },
                    { label: "Hotel Madinah", value: pkg.hotelMadinah },
                    { label: "Keberangkatan", value: pkg.departure },
                    { label: "Bintang", value: pkg.hotel },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className={cn("text-[10px] uppercase tracking-wider mb-0.5", pkg.highlight ? "text-white/50" : "text-[#6B7280]")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</div>
                      <div className={cn("font-medium", pkg.highlight ? "text-white" : "text-[#111827]")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Facilities */}
                <ul className="space-y-2">
                  {pkg.facilities.slice(0, 5).map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <CheckCircle size={12} className={pkg.highlight ? "text-[#C8A54B]" : "text-[#0D6E4F]"} />
                      <span className={pkg.highlight ? "text-white/80" : "text-[#6B7280]"}>{f}</span>
                    </li>
                  ))}
                  {pkg.facilities.length > 5 && (
                    <li className={cn("text-xs font-medium", pkg.highlight ? "text-[#C8A54B]" : "text-[#0D6E4F]")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      +{pkg.facilities.length - 5} fasilitas lainnya
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA */}
              <div className={cn("p-7 pt-0 space-y-3")}>
                <a
                  href="https://wa.me/6281234567890"
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold transition-all duration-200",
                    pkg.highlight
                      ? "bg-[#C8A54B] text-[#111827] hover:bg-[#b8943d]"
                      : "bg-[#0D6E4F] text-white hover:bg-[#0b5c41]"
                  )}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
                >
                  <MessageCircle size={14} />
                  Daftar via WhatsApp
                </a>
                <button
                  className={cn(
                    "w-full py-2.5 text-xs font-medium border transition-all duration-200",
                    pkg.highlight
                      ? "border-white/20 text-white/80 hover:bg-white/10"
                      : "border-black/10 text-[#6B7280] hover:border-[#0D6E4F]/30 hover:text-[#0D6E4F]"
                  )}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
                >
                  Lihat Detail Lengkap
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 text-[#0D6E4F] text-sm font-medium hover:gap-3 transition-all duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Butuh paket custom? Hubungi kami <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const [counted, setCounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCounted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#0D6E4F] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#C8A54B"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div key={label} className="text-center px-6 lg:px-10">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full border border-[#C8A54B]/30 flex items-center justify-center">
                  <Icon size={20} className="text-[#C8A54B]" />
                </div>
              </div>
              <div
                className="text-white font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                  opacity: counted ? 1 : 0,
                  transform: counted ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`
                }}
              >
                {value}
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegalitasSection() {
  const docs = [
    { title: "NIB", number: "1234567890", desc: "Nomor Induk Berusaha", icon: FileText, verified: true },
    { title: "NPWP", number: "01.234.567.8-901.000", desc: "Nomor Pokok Wajib Pajak", icon: Globe, verified: true },
    { title: "Izin Kemenag", number: "D/376/2009", desc: "Izin Penyelenggara Umrah", icon: Shield, verified: true },
    { title: "IATA", number: "ID-00123", desc: "International Air Transport Assoc.", icon: Plane, verified: true },
  ];

  return (
    <section id="legalitas" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C8A54B]" />
              <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Legalitas & Kepercayaan
              </span>
            </div>
            <h2 className="text-[#111827] mb-6" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15
            }}>
              Terdaftar Resmi &{" "}
              <span className="italic text-[#0D6E4F]">Terverifikasi</span>
            </h2>
            <p className="text-[#6B7280] mb-8 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Seluruh dokumen legal kami dapat diverifikasi secara online melalui sistem resmi Kementerian Agama RI dan instansi terkait. Keamanan dan kepercayaan jamaah adalah prioritas utama kami.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-[#0D6E4F] text-white px-6 py-3 text-sm font-semibold hover:bg-[#0b5c41] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
              >
                <FileText size={14} />
                Lihat Semua Dokumen
              </a>
              <a
                href="#"
                className="flex items-center gap-2 border border-black/10 text-[#111827] px-6 py-3 text-sm font-medium hover:border-[#0D6E4F]/30 transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
              >
                Verifikasi via Kemenag
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {docs.map(({ title, number, desc, icon: Icon, verified }) => (
              <div
                key={title}
                className="p-6 border border-black/5 hover:border-[#0D6E4F]/20 hover:bg-[#F9F6F1] transition-all duration-300 group"
                style={{ borderRadius: "2px" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#0D6E4F]/10 flex items-center justify-center group-hover:bg-[#0D6E4F] transition-colors duration-300" style={{ borderRadius: "1px" }}>
                    <Icon size={16} className="text-[#0D6E4F] group-hover:text-white transition-colors duration-300" />
                  </div>
                  {verified && (
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1" style={{ borderRadius: "1px" }}>
                      <CheckCircle size={10} className="text-[#0D6E4F]" />
                      <span className="text-[#0D6E4F] text-[10px] font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Verified</span>
                    </div>
                  )}
                </div>
                <div className="font-bold text-lg text-[#111827] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</div>
                <div className="text-[#0D6E4F] text-xs font-mono mb-1">{number}</div>
                <div className="text-[#6B7280] text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimoni" className="py-28 bg-[#F9F6F1] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute top-0 right-0 w-2/5 h-full opacity-10">
        <img
          src="https://images.unsplash.com/photo-1528862973381-9bc5ad6d4227?w=800&h=1200&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C8A54B]" />
            <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Kata Mereka
            </span>
            <div className="h-px w-8 bg-[#C8A54B]" />
          </div>
          <h2 className="text-[#111827]" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em"
          }}>
            Testimoni <span className="italic text-[#0D6E4F]">Jamaah Kami</span>
          </h2>
        </div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white p-10 shadow-sm relative" style={{ borderRadius: "2px" }}>
            <Quote size={40} className="text-[#C8A54B]/20 absolute top-6 left-6" />
            <div className="flex mb-4">
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <Star key={i} size={14} className="text-[#C8A54B] fill-[#C8A54B]" />
              ))}
            </div>
            <p
              className="text-[#111827] text-lg leading-relaxed mb-8 relative z-10"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              "{testimonials[active].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0D6E4F] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-semibold text-[#111827]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {testimonials[active].name}
                </div>
                <div className="text-[#6B7280] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {testimonials[active].city} · Keberangkatan {testimonials[active].year}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "transition-all duration-200",
                i === active
                  ? "w-8 h-2 bg-[#0D6E4F]"
                  : "w-2 h-2 bg-[#0D6E4F]/20 hover:bg-[#0D6E4F]/40"
              )}
              style={{ borderRadius: "1px" }}
            />
          ))}
        </div>

        {/* Grid thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={cn(
                "p-4 text-left border transition-all duration-200",
                i === active
                  ? "border-[#0D6E4F] bg-white"
                  : "border-black/5 bg-white/50 hover:border-[#0D6E4F]/20"
              )}
              style={{ borderRadius: "2px" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", i === active ? "bg-[#0D6E4F]" : "bg-[#6B7280]")} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#111827] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.name.split(" ")[1]}</div>
                  <div className="text-[10px] text-[#6B7280]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.year}</div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={8} className="text-[#C8A54B] fill-[#C8A54B]" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="galeri" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C8A54B]" />
              <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Galeri Perjalanan
              </span>
            </div>
            <h2 className="text-[#111827]" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em"
            }}>
              Momen Tak Terlupakan <span className="italic text-[#0D6E4F]">di Tanah Suci</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0D6E4F] hover:gap-3 transition-all duration-200 whitespace-nowrap"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Lihat Semua <ArrowRight size={14} />
          </a>
        </div>

        {/* Pinterest-style masonry */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: "200px" }}>
          {galleryImages.map(({ url, alt, span }, i) => (
            <div
              key={i}
              className={cn("relative overflow-hidden group cursor-pointer", span)}
              style={{ borderRadius: "2px" }}
            >
              <img
                src={url}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0D6E4F]/0 group-hover:bg-[#0D6E4F]/40 transition-all duration-500 flex items-end p-4">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#F9F6F1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C8A54B]" />
              <span className="text-[#C8A54B] text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                FAQ
              </span>
            </div>
            <h2 className="text-[#111827] mb-6" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15
            }}>
              Pertanyaan yang <span className="italic text-[#0D6E4F]">Sering Ditanyakan</span>
            </h2>
            <p className="text-[#6B7280] mb-8 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Tidak menemukan jawaban yang Anda cari? Hubungi tim kami langsung.
            </p>
            <a
              href="https://wa.me/6281234567890"
              className="flex items-center gap-3 bg-[#0D6E4F] text-white px-6 py-3 text-sm font-semibold hover:bg-[#0b5c41] transition-colors w-fit"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
            >
              <MessageCircle size={14} />
              Tanya via WhatsApp
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn("border transition-all duration-200", open === i ? "border-[#0D6E4F]/20 bg-white" : "border-black/5 bg-white hover:border-black/10")}
                style={{ borderRadius: "2px" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start gap-4 p-5 text-left"
                >
                  <span
                    className={cn("text-sm font-medium leading-relaxed flex-1 transition-colors duration-200", open === i ? "text-[#0D6E4F]" : "text-[#111827]")}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn("text-[#6B7280] flex-shrink-0 mt-0.5 transition-transform duration-300", open === i && "rotate-180")}
                  />
                </button>
                <div className={cn("overflow-hidden transition-all duration-300", open === i ? "max-h-48" : "max-h-0")}>
                  <div className="px-5 pb-5">
                    <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1513072064285-240f87fa81e8?w=1920&h=600&fit=crop&auto=format"
          alt="Kaaba at night aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D6E4F]/85" />
      </div>
      {/* Geometric accent */}
      <div className="absolute top-8 left-8 w-20 h-20 border border-[#C8A54B]/30" style={{ borderRadius: "1px" }} />
      <div className="absolute bottom-8 right-8 w-20 h-20 border border-[#C8A54B]/30" style={{ borderRadius: "1px" }} />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-[#C8A54B]" />
          <Sparkles size={14} className="text-[#C8A54B]" />
          <div className="h-px w-8 bg-[#C8A54B]" />
        </div>
        <h2 className="text-white mb-4" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.15
        }}>
          Siap Menjadi{" "}
          <span className="italic text-[#C8A54B]">Tamu Allah?</span>
        </h2>
        <p className="text-white/70 text-lg mb-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Daftarkan diri Anda sekarang dan mulai perjalanan ibadah yang aman, nyaman, dan penuh keberkahan bersama kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/6281234567890"
            className="flex items-center justify-center gap-3 bg-[#C8A54B] text-[#111827] px-10 py-4 font-bold text-sm tracking-wide hover:bg-[#b8943d] transition-all duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
          >
            <MessageCircle size={16} />
            Daftar Sekarang
          </a>
          <a
            href="#paket"
            className="flex items-center justify-center gap-3 border border-white/30 text-white px-10 py-4 font-medium text-sm hover:bg-white/10 transition-all duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", borderRadius: "2px" }}
          >
            Lihat Paket Lengkap
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    "Layanan": ["Paket Umrah", "Paket Haji Khusus", "Jadwal Keberangkatan", "Daftar Online"],
    "Informasi": ["Tentang Kami", "Legalitas", "Galeri", "Blog & Panduan"],
    "Dukungan": ["FAQ", "Kontak Kami", "Testimoni", "Kebijakan Privasi"],
  };

  return (
    <footer id="kontak" className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="PT. Al-Munawarah Zain Elite Travel"
                className="h-14 w-14 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <div className="text-white font-bold text-sm leading-tight tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  AL-MUNAWARAH ZAIN
                </div>
                <div className="text-[#C8A54B] text-[10px] tracking-[0.2em] uppercase font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Elite Travel
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Mitra perjalanan ibadah haji dan umrah terpercaya di Nusa Tenggara Barat sejak 2009. Izin resmi Kemenag RI.
            </p>
            <div className="space-y-3">
              {[
                { icon: Phone, text: "+62 812-3456-7890", label: "WhatsApp / Telepon" },
                { icon: Mail, text: "info@almunawarahzain.com", label: "Email" },
                { icon: MapPin, text: "Jl. Sriwijaya No. 25, Mataram, NTB 83125", label: "Kantor" },
              ].map(({ icon: Icon, text, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={14} className="text-[#C8A54B] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</div>
                    <div className="text-white/70 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-sm font-semibold mb-5 tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{group}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-white/50 text-sm hover:text-[#C8A54B] transition-colors duration-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © {new Date().getFullYear()} PT. AL-MUNAWARAH ZAIN ELITE TRAVEL. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-[#0D6E4F]" />
            <span className="text-white/30 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Izin Kemenag RI · No. D/376/2009</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Floating Button ─── */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/6281234567890?text=Assalamu%27alaikum,%20saya%20ingin%20bertanya%20tentang%20paket%20umrah%2Fhaji"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 group"
      style={{ borderRadius: "50px" }}
    >
      <svg width="20" height="20" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="text-sm font-semibold max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Konsultasi Gratis
      </span>
    </a>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar scrolled={scrolled} />
      <Hero />
      <WhyChooseUs />
      <PackagesSection />
      <StatsSection />
      <LegalitasSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
