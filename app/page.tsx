"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Phone,
  MessageCircle,
  FileText,
  Star,
  Check,
  Sparkles,
  X,
  Heart,
  Send,
  CheckCircle2,
  Menu,
  ChevronDown,
  Clock,
  ShieldCheck,
  Award
} from "lucide-react";

// --- CONFIGURABLE CONSTANTS ---
const WHATSAPP_NUMBER = "15550199999"; // Replace with real agency number
const AGENCY_PHONE = "+15550199999";

// --- DATA STRUCTURES ---
interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  size: number; // in m²
  type: "Villa" | "Estate" | "Penthouse" | "Cabin";
  image: string;
  description: string;
  highlights: string[];
}

const PROPERTIES: Property[] = [
  {
    id: "glass-pavilion",
    name: "The Glass Pavilion",
    location: "Quebec, Canada",
    price: 2850000,
    beds: 3,
    baths: 3.5,
    size: 320,
    type: "Villa",
    image: "https://picsum.photos/seed/glasspavilion/1200/800",
    description: "An architectural masterpiece nestled in pristine pine forests, designed with highly efficient thermal double-glazed walls to merge luxury with nature.",
    highlights: ["Triple-pane glass facade", "Geothermal climate control", "Natural oak cabinetry", "Integrated glass skywell"]
  },
  {
    id: "obsidian-house",
    name: "Obsidian House",
    location: "Montreal, Canada",
    price: 3400000,
    beds: 4,
    baths: 4.5,
    size: 410,
    type: "Estate",
    image: "https://picsum.photos/seed/obsidianhouse/1200/800",
    description: "A bold statement in architectural minimalism, featuring heavy-gauge black steel columns, dark basalt cladding, and a dramatic lakeside infinity pool.",
    highlights: ["Smart facade tinting", "Lakefront private deck", "Basalt masonry fireplace", "4-car subterranean gallery"]
  },
  {
    id: "misty-pines",
    name: "Misty Pines Retreat",
    location: "Laurentian Mountains, Quebec",
    price: 1950000,
    beds: 2,
    baths: 2,
    size: 180,
    type: "Cabin",
    image: "https://picsum.photos/seed/mistypines/1200/800",
    description: "Perfect seclusion in the high altitudes, featuring a cantilevered platform hovering over mountain mists and a beautiful suspended concrete fire pit.",
    highlights: ["Elevated structural platform", "Panoramic cedar sauna", "Suspended hearth fire", "Off-grid backup power system"]
  },
  {
    id: "steel-sky",
    name: "Steel & Sky Penthouse",
    location: "Vancouver, Canada",
    price: 4200000,
    beds: 3,
    baths: 4,
    size: 290,
    type: "Penthouse",
    image: "https://picsum.photos/seed/steelsky/1200/800",
    description: "Sky-high luxury overlooking the harbor. This penthouse features 360-degree skyline views, bronze accents, and a private glass terrace with a skypool.",
    highlights: ["Private speed elevator", "Wraparound skyline glass terrace", "Gaggenau master chef kitchen", "Custom bronze framing"]
  }
];

// Floor Plan Room data mapping for the Interactive House Plan section
interface RoomPlan {
  id: string;
  name: string;
  area: string;
  x: number; // percentage coordinates for visual SVG representation
  y: number;
  w: number;
  h: number;
}

const FLOOR_PLANS: Record<string, { modelName: string; totalArea: string; rooms: RoomPlan[] }> = {
  "glass-pavilion": {
    modelName: "The Glass Pavilion Layout",
    totalArea: "92 m² (Main Wing)",
    rooms: [
      { id: "living", name: "Living Room", area: "21 m²", x: 5, y: 5, w: 45, h: 40 },
      { id: "dining", name: "Dining Room", area: "9.3 m²", x: 55, y: 5, w: 40, h: 20 },
      { id: "kitchen", name: "Studio-Kitchen", area: "9.3 m²", x: 55, y: 28, w: 40, h: 17 },
      { id: "lounge", name: "TV Lounge", area: "9 m²", x: 5, y: 50, w: 30, h: 22 },
      { id: "master", name: "Master Bedroom", area: "15.6 m²", x: 40, y: 50, w: 30, h: 45 },
      { id: "guest", name: "Guest Bedroom", area: "11.1 m²", x: 74, y: 50, w: 21, h: 25 },
      { id: "bathroom", name: "Bathroom", area: "8.9 m²", x: 5, y: 76, w: 30, h: 19 },
      { id: "hallway", name: "Hallways & Wardrobe", area: "7.4 m²", x: 74, y: 79, w: 21, h: 16 }
    ]
  },
  "obsidian-house": {
    modelName: "Obsidian House Layout",
    totalArea: "145 m² (Lakeside Pavilion)",
    rooms: [
      { id: "living", name: "Grand Lakeside Living", area: "42 m²", x: 5, y: 5, w: 50, h: 50 },
      { id: "kitchen", name: "Chef's Culinary Suite", area: "18 m²", x: 60, y: 5, w: 35, h: 25 },
      { id: "dining", name: "Glass-Enclosed Dining", area: "15 m²", x: 60, y: 35, w: 35, h: 20 },
      { id: "master", name: "Master Lakeside Suite", area: "32 m²", x: 5, y: 60, w: 40, h: 35 },
      { id: "guest", name: "Executive Guest Wing", area: "20 m²", x: 50, y: 60, w: 25, h: 35 },
      { id: "bathroom", name: "Basalt Spa Bath", area: "12 m²", x: 80, y: 60, w: 15, h: 20 },
      { id: "hallway", name: "Gallery Foyer", area: "6 m²", x: 80, y: 83, w: 15, h: 12 }
    ]
  }
};

const SERVICES = [
  { id: "01", title: "PROPERTY SHOWCASE", desc: "Interactive physical & virtual walks of ultra-premium estates with absolute privacy.", image: "https://picsum.photos/seed/showcase/600/450" },
  { id: "02", title: "SITE PLANNING", desc: "Expert geological, sun-angle, and privacy-buffer analysis for bespoke glass structural integration.", image: "https://picsum.photos/seed/siteplanning/600/450" },
  { id: "03", title: "BUILDING DESIGN", desc: "Full steel-frame and precision glass structural blueprints combining elegant luxury with thermal performance.", image: "https://picsum.photos/seed/buildingdesign/600/450" },
  { id: "04", title: "SPACE PLANNING", desc: "Optimizing panoramic flow, lighting geometry, and bespoke high-end interiors to suit your lifestyle.", image: "https://picsum.photos/seed/spaceplanning/600/450" }
];

const GOOGLE_REVIEWS = [
  { name: "Julian V.", role: "Architectural Collector", stars: 5, review: "Glasshaven exceeded our wildest expectations. The thermal performance of our glass pavilion is outstanding even in harsh winter. Absolute masters of modern luxury.", date: "July 2026", initial: "J" },
  { name: "Elena Rostova", role: "Lakeside Estate Owner", stars: 5, review: "From initial site planning to the finished Obsidian House, the journey was seamless. Their attention to steel-to-glass structural joints and structural safety is unparalleled.", date: "April 2026", initial: "E" },
  { name: "Marcus Thorne", role: "Penthouse Owner", stars: 5, review: "The 360-degree harbor framing in our penthouse feels completely immersive. Truly professional team, responsive, and deeply passionate about progressive design.", date: "June 2026", initial: "M" }
];

export default function GlasshavenHome() {
  // --- STATE MANAGEMENT ---
  // Search state
  const [filterLocation, setFilterLocation] = React.useState("All");
  const [filterType, setFilterType] = React.useState("All");
  const [filterPrice, setFilterPrice] = React.useState("All");
  const [filterBeds, setFilterBeds] = React.useState("All");
  const [selectedNeighborhood, setSelectedNeighborhood] = React.useState<string | null>(null);

  // Interactive house plan state
  const [selectedPlanId, setSelectedPlanId] = React.useState("glass-pavilion");
  const [hoveredRoomId, setHoveredRoomId] = React.useState<string | null>(null);

  // Favorites state (persisted)
  const [favorites, setFavorites] = React.useState<string[]>([]);
  
  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const [quotePropertyId, setQuotePropertyId] = React.useState<string>("");
  const [selectedPropertyForViewing, setSelectedPropertyForViewing] = React.useState<Property | null>(null);

  // Form submission state
  const [contactForm, setContactForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    dealType: "Buy",
    propertyType: "Villa",
    location: "Quebec",
    budget: "$2.0M - $3.0M",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [submissionHistory, setSubmissionHistory] = React.useState<any[]>([]);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // AI Chat Assistant state
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Greetings. I am your Glasshaven Architectural Advisor. How may I assist you with our luxury portfolio or custom architectural plan layouts today?" }
  ]);
  const [chatInput, setChatInput] = React.useState("");
  const [isChatLoading, setIsChatLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  // --- VALUATION LEAD MAGNET STATE ---
  const [valStep, setValStep] = React.useState(1);
  const [valType, setValType] = React.useState<"Villa" | "Estate" | "Penthouse" | "Cabin">("Villa");
  const [valBeds, setValBeds] = React.useState(3);
  const [valLocation, setValLocation] = React.useState("Quebec");
  const [valCondition, setValCondition] = React.useState("Turnkey Luxury");
  const [valName, setValName] = React.useState("");
  const [valEmail, setValEmail] = React.useState("");
  const [valPhone, setValPhone] = React.useState("");
  const [valEstimate, setValEstimate] = React.useState<{ min: number; max: number } | null>(null);
  const [valSubmitted, setValSubmitted] = React.useState(false);

  // --- MORTGAGE & YIELD CALCULATOR STATE ---
  const [calcPrice, setCalcPrice] = React.useState(2850000);
  const [calcDownPercent, setCalcDownPercent] = React.useState(20);
  const [calcInterestRate, setCalcInterestRate] = React.useState(4.5);
  const [calcTermYears, setCalcTermYears] = React.useState(30);

  // Mortgage calculations
  const downPaymentAmount = (calcPrice * calcDownPercent) / 100;
  const loanAmount = Math.max(0, calcPrice - downPaymentAmount);
  const monthlyRate = calcInterestRate / 100 / 12;
  const totalPayments = calcTermYears * 12;
  const monthlyPrincipalInterest =
    monthlyRate > 0 && totalPayments > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      : loanAmount / (totalPayments || 1);
  const estimatedMonthlyTaxIns = (calcPrice * 0.012) / 12;
  const totalMonthlyPayment = Math.round(monthlyPrincipalInterest + estimatedMonthlyTaxIns);
  const estimatedAnnualYield = (((calcPrice * 0.075) / calcPrice) * 100).toFixed(1);

  const handleCalculateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    let base = 2200000;
    if (valType === "Estate") base = 3100000;
    if (valType === "Penthouse") base = 3800000;
    if (valType === "Cabin") base = 1700000;

    base += (valBeds - 2) * 350000;
    if (valLocation === "Vancouver") base += 600000;
    if (valLocation === "Montreal") base += 400000;
    if (valCondition === "Turnkey Luxury") base += 250000;

    const min = Math.round((base * 0.94) / 10000) * 10000;
    const max = Math.round((base * 1.08) / 10000) * 10000;

    setValEstimate({ min, max });
    setValSubmitted(true);
  };

  // Scroll visibility
  const [isScrolled, setIsScrolled] = React.useState(false);

  // --- REACT HOOKS & PERSISTENCE ---
  React.useEffect(() => {
    // Load favorites and history on mount
    const savedFavs = localStorage.getItem("glasshaven_favs");
    const savedHistory = localStorage.getItem("glasshaven_submissions");

    const timer = setTimeout(() => {
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      if (savedHistory) setSubmissionHistory(JSON.parse(savedHistory));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedPropertyForViewing) setSelectedPropertyForViewing(null);
        if (isQuoteModalOpen) setIsQuoteModalOpen(false);
        if (isChatOpen) setIsChatOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPropertyForViewing, isQuoteModalOpen, isChatOpen, isMobileMenuOpen]);

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  // Handle saving favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(item => item !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("glasshaven_favs", JSON.stringify(updated));
  };

  // --- CHAT CONCIERGE API CALL ---
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { role: "user", content: userMsg }].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });
      const data = await response.json();
      if (response.ok && data.text) {
        setChatMessages(prev => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setChatMessages(prev => [...prev, { role: "assistant", content: data.error || "Our advisor is momentarily on a private site tour. Please contact our human office via WhatsApp or the Enquiry Form below." }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Apologies, connection to the advisor was interrupted. Please send a direct WhatsApp enquiry for immediate assistance." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // --- SUBMIT BESPOKE QUOTE / ENQUIRY ---
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission = {
      ...contactForm,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      id: "enq_" + Date.now()
    };
    const updatedHistory = [newSubmission, ...submissionHistory];
    setSubmissionHistory(updatedHistory);
    localStorage.setItem("glasshaven_submissions", JSON.stringify(updatedHistory));
    
    setFormSubmitted(true);
    // Reset form except name/email for conv
    setContactForm(prev => ({
      ...prev,
      message: ""
    }));

    // Auto-close success after 6s
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  // Prefill quote form for a specific property
  const triggerQuoteForProperty = (propId: string) => {
    const prop = PROPERTIES.find(p => p.id === propId);
    if (prop) {
      setContactForm(prev => ({
        ...prev,
        propertyType: prop.type,
        location: prop.location,
        budget: `$${(prop.price / 1000000).toFixed(1)}M - $${((prop.price + 500000) / 1000000).toFixed(1)}M`,
        message: `Bespoke enquiry regarding "${prop.name}". Please arrange a private physical or virtual tour of this luxury glass residence.`
      }));
    }
    setQuotePropertyId(propId);
    setIsQuoteModalOpen(true);
  };

  // Filter logic
  const filteredProperties = PROPERTIES.filter(p => {
    if (filterLocation !== "All" && !p.location.includes(filterLocation)) return false;
    if (filterType !== "All" && p.type !== filterType) return false;
    if (filterBeds !== "All" && p.beds < parseInt(filterBeds)) return false;
    if (filterPrice !== "All") {
      const priceM = p.price / 1000000;
      if (filterPrice === "under-2m" && priceM >= 2) return false;
      if (filterPrice === "2m-3m" && (priceM < 2 || priceM > 3)) return false;
      if (filterPrice === "over-3m" && priceM <= 3) return false;
    }
    return true;
  });

  // Generate perfect prefilled WhatsApp link
  const generateWhatsAppLink = (text: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const defaultWALink = generateWhatsAppLink("Hello Glasshaven, I would like to enquire about your luxury glass villas and floor planning services.");

  return (
    <div className="min-h-screen bg-[#0B0E10] text-[#E2E8F0] font-sans antialiased selection:bg-[#C5A880]/30 selection:text-white">
      {/* Skip to Main Content Link for WCAG Keyboard Nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#C5A880] text-black font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider"
      >
        Skip to Main Content
      </a>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href={defaultWALink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 p-4 min-h-[48px] min-w-[48px] bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        aria-label="Contact on WhatsApp"
        id="floating-whatsapp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out text-sm font-medium ml-0 group-hover:ml-2">
          WhatsApp Us
        </span>
      </a>

      {/* --- FLOATING AI CONCIERGE ASSISTANT --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-advisor-heading"
              className="w-[90vw] sm:w-[400px] h-[500px] bg-[#12161A] border border-[#1A2026] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
              id="ai-chat-window"
            >
              {/* Header */}
              <div className="p-4 bg-[#181E24] border-b border-[#1A2026] flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-[#C5A880] rounded-full animate-pulse" />
                  <div>
                    <h4 id="ai-advisor-heading" className="text-sm font-semibold text-white tracking-wider">GLASSHAVEN ADVISOR</h4>
                    <p className="text-xs text-slate-300">AI Luxury Concierge • Server-Side</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] flex items-center justify-center"
                  aria-label="Close Chat Window"
                  id="close-chat-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800" aria-live="polite">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#C5A880] text-black rounded-tr-none font-medium"
                          : "bg-[#181E24] text-[#E2E8F0] border border-[#232B32] rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#181E24] border border-[#232B32] rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                      <div className="flex gap-1.5 items-center justify-center py-1 px-2">
                        <div className="w-2 h-2 bg-[#C5A880] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-[#C5A880] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-[#C5A880] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Preset Prompts */}
              <div className="px-4 py-2 border-t border-[#1A2026] bg-[#0E1215] flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                {[
                  "Is Obsidian House available?",
                  "Which villa is under $3M?",
                  "Are custom floor plans offered?",
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(txt);
                    }}
                    className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-[#1A2026] text-slate-200 py-1.5 px-3 min-h-[36px] rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    {txt}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="p-3 bg-[#12161A] border-t border-[#1A2026] flex gap-2">
                <input
                  type="text"
                  id="chat-input-field"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about properties, floor plans, services..."
                  className="flex-1 bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3 py-2.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                  aria-label="Ask AI Concierge"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="bg-[#C5A880] text-black font-semibold hover:bg-[#DBC3A3] active:scale-95 disabled:bg-slate-800 disabled:text-slate-500 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-lg transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  aria-label="Send Chat Message"
                  id="send-chat-btn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 min-h-[48px] bg-[#C5A880] hover:bg-[#DBC3A3] active:scale-95 text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          aria-label="Toggle AI Concierge Advisor"
          id="floating-ai-advisor"
        >
          <Sparkles className="w-6 h-6 text-black animate-pulse" />
          <span className="text-sm uppercase tracking-widest hidden md:inline pr-1">AI Concierge</span>
        </button>
      </div>

      {/* --- STICKY HEADER --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0E10]/95 backdrop-blur-md border-b border-[#1A2026] py-3"
            : "bg-transparent py-5"
        }`}
        id="main-header"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex flex-col items-start gap-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-lg p-1">
            <span className="text-2xl font-black tracking-[0.35em] text-white transition-colors duration-300 group-hover:text-[#C5A880] font-sans">
              GLASSHAVEN
            </span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-slate-300 font-mono pl-1">
              Pure Modernism
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {[
              { label: "Home", href: "#home" },
              { label: "Valuation", href: "#valuation" },
              { label: "Properties", href: "#properties" },
              { label: "Calculator", href: "#calculator" },
              { label: "Guides", href: "#market-guides" },
              { label: "Plans", href: "#floor-plans" },
              { label: "Coverage", href: "#coverage" },
              { label: "Packages", href: "#packages" },
              { label: "Reviews", href: "#reviews" },
              { label: "Contact", href: "#contact" }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-[11px] uppercase tracking-widest font-medium text-slate-300 hover:text-white transition-colors py-2 relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-[#C5A880] after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#valuation"
              className="text-[11px] uppercase tracking-wider font-semibold text-black bg-[#C5A880] hover:bg-[#DBC3A3] transition-colors py-2.5 px-4 min-h-[44px] rounded-lg flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] active:scale-95 shadow-md font-mono"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Valuation</span>
            </a>
            <a
              href={`tel:${AGENCY_PHONE}`}
              className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A880] hover:text-white transition-colors py-2.5 px-3.5 min-h-[44px] border border-[#C5A880]/30 hover:border-white rounded-lg flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] active:scale-95"
              id="header-call-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Agency</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 min-h-[44px] min-w-[44px] lg:hidden text-slate-300 hover:text-white transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-lg"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
            id="mobile-menu-toggle"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#12161A] border-b border-[#1A2026] overflow-hidden"
              id="mobile-nav-drawer"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-center">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Properties", href: "#properties" },
                  { label: "Floor Plans", href: "#floor-plans" },
                  { label: "Services", href: "#services" },
                  { label: "About", href: "#about" },
                  { label: "Reviews", href: "#reviews" },
                  { label: "Contact", href: "#contact" }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-slate-200 hover:text-white py-2.5 block font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <a
                    href={`tel:${AGENCY_PHONE}`}
                    className="text-xs uppercase tracking-wider font-semibold text-center border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] py-3 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsQuoteModalOpen(true);
                    }}
                    className="text-xs uppercase tracking-wider font-semibold text-center bg-[#C5A880] text-black py-3 min-h-[44px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] flex items-center justify-center"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main id="main-content">
        {/* --- HERO SECTION --- */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-14 sm:pt-32 sm:pb-16 md:pb-24 overflow-hidden"
          aria-labelledby="hero-title"
        >
          {/* Underlay Luxury House Background with Zoom */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')"
              }}
            />
            {/* Subtle dark gradient overlay to maintain high contrast accessibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E10] via-[#0B0E10]/80 to-[#0B0E10]/55" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center w-full">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-[1px] w-6 bg-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.45em] text-[#C5A880] font-semibold">
                EXCLUSIVE ARCHITECTURAL LIVING
              </span>
              <span className="h-[1px] w-6 bg-[#C5A880]" />
            </motion.div>

            {/* Main Title (World-class aesthetic pairing) */}
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-[0.1em] uppercase font-light text-white leading-[1.1] mb-6"
            >
              A New Standard <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                of Modern Living
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-200 font-sans max-w-2xl leading-relaxed mb-10 text-center"
            >
              We curate and engineer ultra-modern glass-walled residences across Quebec&apos;s most breathtaking wilderness settings. Precision framing meets flawless vistas.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              id="hero-ctas"
            >
              <button
                onClick={() => {
                  setContactForm(prev => ({ ...prev, message: "Requesting custom brochure and project specifications. Please contact my profile." }));
                  setIsQuoteModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] bg-[#C5A880] hover:bg-[#DBC3A3] active:scale-95 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#C5A880]/10 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              >
                <FileText className="w-4 h-4" />
                Request a Quote
              </button>

              <a
                href="#valuation"
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] bg-[#12161A]/90 hover:bg-[#1A2026] active:scale-95 text-[#C5A880] border border-[#C5A880]/40 hover:border-[#C5A880] font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] font-mono shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                Instant Valuation
              </a>

              <a
                href={generateWhatsAppLink("Hello Glasshaven, I'm interested in talking with an advisor regarding architectural showcases.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] bg-transparent text-slate-200 hover:text-white font-semibold uppercase tracking-widest text-xs transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Message
              </a>
            </motion.div>

            {/* TRUST & ACCREDITATION BADGES STRIP */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/60 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 items-center justify-center text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-slate-300"
            >
              <div className="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 bg-[#12161A]/80 backdrop-blur-sm rounded-lg border border-[#1A2026] hover:border-[#C5A880]/30 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span><strong className="text-white font-bold">RICS</strong> Certified</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 bg-[#12161A]/80 backdrop-blur-sm rounded-lg border border-[#1A2026] hover:border-[#C5A880]/30 transition-colors">
                <Award className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span><strong className="text-white font-bold">ARLA</strong> Propertymark</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 bg-[#12161A]/80 backdrop-blur-sm rounded-lg border border-[#1A2026] hover:border-[#C5A880]/30 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span><strong className="text-white font-bold">TPO</strong> Approved</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 sm:p-2.5 bg-[#12161A]/80 backdrop-blur-sm rounded-lg border border-[#1A2026] hover:border-[#C5A880]/30 transition-colors">
                <Clock className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span><strong className="text-white font-bold">CMP</strong> Protected</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 p-2 sm:p-2.5 bg-[#12161A]/80 backdrop-blur-sm rounded-lg border border-[#1A2026] hover:border-[#C5A880]/30 transition-colors">
                <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880] shrink-0" />
                <span><strong className="text-white font-bold">4.9★</strong> Trustpilot</span>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono pl-1 text-slate-300">
                Scroll to explore
              </span>
              <div className="w-5 h-8 border border-slate-500/80 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-[#C5A880] rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- INTEGRATED SEARCH FILTER PANEL --- */}
        <section className="relative z-20 max-w-6xl mx-auto px-4 mt-6 sm:mt-8 md:-mt-10 lg:-mt-14" aria-labelledby="filter-heading">
          <div className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-[#C5A880]" />
              <h2 id="filter-heading" className="text-xs uppercase tracking-widest font-semibold text-white">
                Filter Portfolio In Real-Time
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="filter-location" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">
                  Location
                </label>
                <select
                  id="filter-location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-[#0B0E10] border border-[#1A2026] text-white rounded-lg px-3 py-2.5 min-h-[44px] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  <option value="All">All Locations</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Montreal">Montreal</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Laurentians">Laurentians</option>
                </select>
              </div>

              {/* Type */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="filter-type" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">
                  Residency Type
                </label>
                <select
                  id="filter-type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-[#0B0E10] border border-[#1A2026] text-white rounded-lg px-3 py-2.5 min-h-[44px] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  <option value="All">All Types</option>
                  <option value="Villa">Villa</option>
                  <option value="Estate">Estate</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Cabin">Cabin</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="filter-price" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">
                  Price Limit
                </label>
                <select
                  id="filter-price"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="bg-[#0B0E10] border border-[#1A2026] text-white rounded-lg px-3 py-2.5 min-h-[44px] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  <option value="All">Any Price</option>
                  <option value="under-2m">Under $2.0M</option>
                  <option value="2m-3m">$2.0M - $3.0M</option>
                  <option value="over-3m">Over $3.0M</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="filter-beds" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">
                  Min Bedrooms
                </label>
                <select
                  id="filter-beds"
                  value={filterBeds}
                  onChange={(e) => setFilterBeds(e.target.value)}
                  className="bg-[#0B0E10] border border-[#1A2026] text-white rounded-lg px-3 py-2.5 min-h-[44px] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  <option value="All">Any</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                </select>
              </div>

              {/* Reset Filters / Stats Display */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => {
                    setFilterLocation("All");
                    setFilterType("All");
                    setFilterPrice("All");
                    setFilterBeds("All");
                  }}
                  className="bg-[#1C2228] hover:bg-[#252E36] active:scale-95 text-slate-200 hover:text-white py-2.5 px-3 min-h-[44px] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  Reset Filters ({filteredProperties.length} found)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- INSTANT ONLINE PROPERTY VALUATION TOOL --- */}
        <section id="valuation" className="py-20 bg-[#12161A]/40 border-y border-[#1A2026] mt-16" aria-labelledby="valuation-heading">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
                INSTANT SELLER TOOL
              </span>
              <h2 id="valuation-heading" className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide">
                INSTANT ONLINE <span className="font-extrabold text-[#C5A880]">VALUATION</span>
              </h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Estimate your luxury property&apos;s current market valuation in 60 seconds based on structural quality, location, and regional demand indices.
              </p>
            </div>

            <div className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-10 shadow-2xl">
              {!valSubmitted ? (
                <form onSubmit={handleCalculateValuation} className="space-y-8">
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#1A2026] pb-4">
                    <span className="text-[#C5A880] font-bold">VALUATION ENGINE ACTIVE</span>
                    <span>STEP 1 OF 1</span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {/* Property Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Property Type</label>
                      <select
                        value={valType}
                        onChange={(e) => setValType(e.target.value as any)}
                        className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                      >
                        <option value="Villa">Villa Pavilion</option>
                        <option value="Estate">Lakeside Estate</option>
                        <option value="Penthouse">Sky Penthouse</option>
                        <option value="Cabin">Secluded Cabin</option>
                      </select>
                    </div>

                    {/* Bedrooms */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Bedrooms</label>
                      <select
                        value={valBeds}
                        onChange={(e) => setValBeds(parseInt(e.target.value))}
                        className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                      >
                        <option value={2}>2 Bedrooms</option>
                        <option value={3}>3 Bedrooms</option>
                        <option value={4}>4+ Bedrooms</option>
                      </select>
                    </div>

                    {/* Region */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Region</label>
                      <select
                        value={valLocation}
                        onChange={(e) => setValLocation(e.target.value)}
                        className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                      >
                        <option value="Quebec">Quebec Wilderness</option>
                        <option value="Montreal">Montreal Metro</option>
                        <option value="Vancouver">Vancouver Waterfront</option>
                        <option value="Laurentians">Laurentians</option>
                      </select>
                    </div>

                    {/* Condition */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Condition</label>
                      <select
                        value={valCondition}
                        onChange={(e) => setValCondition(e.target.value)}
                        className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                      >
                        <option value="Turnkey Luxury">Turnkey Luxury</option>
                        <option value="Custom Build">Custom Architectural</option>
                        <option value="Renovated">Newly Renovated</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C5A880] hover:bg-[#DBC3A3] text-black font-bold uppercase tracking-widest text-xs py-4 min-h-[48px] rounded-xl transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] flex items-center justify-center gap-2 font-mono"
                  >
                    <Sparkles className="w-4 h-4" />
                    Calculate Estimated Market Value Now
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono rounded-full uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Valuation Report Generated
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-mono block mb-1">
                      Estimated Valuation Range
                    </span>
                    <h3 className="text-4xl sm:text-5xl font-mono font-extrabold text-[#C5A880]">
                      ${valEstimate?.min.toLocaleString()} — ${valEstimate?.max.toLocaleString()} USD
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 font-sans">
                      Based on current regional sales data for {valType}s with {valBeds} beds in {valLocation}.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#1A2026] flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setValSubmitted(false)}
                      className="px-6 py-3 border border-slate-700 hover:border-slate-400 text-slate-200 text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors"
                    >
                      Recalculate
                    </button>
                    <button
                      onClick={() => {
                        setContactForm(prev => ({
                          ...prev,
                          propertyType: valType,
                          location: valLocation,
                          budget: `$${((valEstimate?.min || 2000000) / 1000000).toFixed(1)}M - $${((valEstimate?.max || 3000000) / 1000000).toFixed(1)}M`,
                          message: `Requesting official certified PDF valuation report for my ${valType} in ${valLocation}.`
                        }));
                        setIsQuoteModalOpen(true);
                      }}
                      className="px-8 py-3 bg-[#C5A880] hover:bg-[#DBC3A3] text-black text-xs uppercase tracking-widest font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Get Certified Valuation PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      {/* --- FEATURED PROPERTIES SECTION --- */}
      <section id="properties" className="py-24 max-w-7xl mx-auto px-4 md:px-8" aria-labelledby="properties-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-2 font-mono">
              CURATED COLLECTION
            </span>
            <h2 id="properties-heading" className="text-3xl md:text-4xl font-sans uppercase font-light text-white tracking-wide">
              Featured <span className="font-extrabold text-slate-100">Properties</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-md font-sans leading-relaxed">
            Every home represents a synthesis of architectural vision and structural safety. Hover to reveal structural highlights.
          </p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-[#1A2026] bg-[#12161A]/30 rounded-2xl">
            <p className="text-slate-300 mb-4">No exclusive residences match your filter settings.</p>
            <button
              onClick={() => {
                setFilterLocation("All");
                setFilterType("All");
                setFilterPrice("All");
                setFilterBeds("All");
              }}
              className="text-xs uppercase bg-[#C5A880] text-black font-semibold py-3 px-6 rounded-lg min-h-[44px] hover:bg-[#DBC3A3] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {filteredProperties.map((p, idx) => {
              const isSaved = favorites.includes(p.id);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-[#12161A] border border-[#1A2026] hover:border-[#C5A880]/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group h-full hover:shadow-xl hover:shadow-[#C5A880]/5"
                >
                  {/* Property Image & Badge Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={p.image}
                      alt={`Exterior view of ${p.name} in ${p.location}`}
                      loading="lazy"
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Header Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <span className="bg-[#0B0E10]/90 backdrop-blur-md text-[#C5A880] font-mono text-[10px] font-semibold tracking-widest uppercase py-1.5 px-3 rounded-md border border-[#C5A880]/20">
                        {p.type}
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(p.id, e)}
                        className={`p-2.5 min-h-[44px] min-w-[44px] rounded-full ${
                          isSaved ? "bg-[#C5A880] text-black" : "bg-[#0B0E10]/85 text-white hover:text-[#C5A880]"
                        } transition-all active:scale-95 backdrop-blur-md border border-[#1A2026] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]`}
                        aria-label={isSaved ? `Remove ${p.name} from saved favorites` : `Save ${p.name} to favorites`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Bottom Price Overlay */}
                    <div className="absolute bottom-4 left-4 bg-[#0B0E10]/95 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-[#1A2026]">
                      <span className="text-white font-mono font-bold text-lg">
                        ${(p.price / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Location */}
                      <div className="flex items-center gap-1.5 text-slate-300 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span className="text-xs uppercase tracking-wider font-mono font-medium">{p.location}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-sans uppercase font-bold tracking-wide text-white mb-3">
                        {p.name}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                        {p.description}
                      </p>

                      {/* Highlights / Features list */}
                      <div className="mb-6 grid grid-cols-2 gap-2 text-xs border-t border-[#1A2026] pt-4">
                        {p.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-slate-200 font-sans">
                            <div className="w-1.5 h-1.5 bg-[#C5A880] rounded-full shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specs Row */}
                    <div>
                      <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-[#1A2026] mb-6">
                        <div className="flex flex-col items-center">
                          <span className="text-slate-300 text-[9px] uppercase tracking-wider font-mono font-medium">Bedrooms</span>
                          <span className="text-white font-mono font-bold text-sm flex items-center gap-1 mt-0.5">
                            <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" /> {p.beds}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-slate-300 text-[9px] uppercase tracking-wider font-mono font-medium">Baths</span>
                          <span className="text-white font-mono font-bold text-sm flex items-center gap-1 mt-0.5">
                            <Bath className="w-3.5 h-3.5 text-[#C5A880]" /> {p.baths}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-slate-300 text-[9px] uppercase tracking-wider font-mono font-medium">Area</span>
                          <span className="text-white font-mono font-bold text-sm flex items-center gap-1 mt-0.5">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" /> {p.size} m²
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => triggerQuoteForProperty(p.id)}
                          className="bg-[#1C2228] hover:bg-[#252E36] active:scale-95 text-white py-3 min-h-[44px] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-[#2B353E] hover:border-slate-400 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                        >
                          Enquire Now
                        </button>
                        <a
                          href={generateWhatsAppLink(`Hello Glasshaven, I'm highly interested in scheduling a tour of "${p.name}". Please share details.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#C5A880] hover:bg-[#DBC3A3] active:scale-95 text-black py-3 min-h-[44px] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                        >
                          <MessageCircle className="w-4 h-4 text-black" />
                          WhatsApp Tour
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- MORTGAGE & FINANCIAL YIELD CALCULATOR SECTION --- */}
      <section id="calculator" className="py-24 bg-[#0B0E10] border-t border-[#1A2026]" aria-labelledby="calc-heading">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              FINANCIAL INTELLIGENCE TOOL
            </span>
            <h2 id="calc-heading" className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide">
              MORTGAGE & <span className="font-extrabold text-[#C5A880]">YIELD CALCULATOR</span>
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Calculate your monthly financing terms, estimated property taxes, and expected gross rental yields in real-time.
            </p>
          </div>

          <div className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-10 shadow-2xl grid lg:grid-cols-2 gap-10">
            {/* Input Controls */}
            <div className="space-y-6">
              {/* Property Purchase Price */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 uppercase tracking-wider">Property Price</span>
                  <span className="text-[#C5A880] font-bold">${calcPrice.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min={800000}
                  max={8000000}
                  step={50000}
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A880] bg-slate-900 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Down Payment % */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-300 uppercase tracking-wider">Down Payment ({calcDownPercent}%)</span>
                  <span className="text-[#C5A880] font-bold">${downPaymentAmount.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={calcDownPercent}
                  onChange={(e) => setCalcDownPercent(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A880] bg-slate-900 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Interest Rate & Loan Term */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium block mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="12"
                    value={calcInterestRate}
                    onChange={(e) => setCalcInterestRate(parseFloat(e.target.value) || 4.5)}
                    className="w-full bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium block mb-2">Loan Term (Years)</label>
                  <select
                    value={calcTermYears}
                    onChange={(e) => setCalcTermYears(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="bg-[#0B0E10] border border-[#1A2026] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono block mb-2">ESTIMATED MONTHLY OUTLAY</span>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-[#C5A880] mb-6">
                  ${totalMonthlyPayment.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
                </div>

                <div className="space-y-3 font-mono text-xs border-t border-[#1A2026] pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Principal & Interest:</span>
                    <span className="text-slate-200">${Math.round(monthlyPrincipalInterest).toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Taxes & Insurance:</span>
                    <span className="text-slate-200">${Math.round(estimatedMonthlyTaxIns).toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Loan Financing:</span>
                    <span className="text-slate-200">${loanAmount.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#1A2026] text-emerald-400 font-bold">
                    <span>Projected Annual Rental Yield:</span>
                    <span>~{estimatedAnnualYield}% ROI</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setContactForm(prev => ({
                    ...prev,
                    budget: `$${(calcPrice / 1000000).toFixed(2)}M`,
                    message: `Financing inquiry regarding $${calcPrice.toLocaleString()} USD residence with $${totalMonthlyPayment.toLocaleString()}/mo estimated outlay.`
                  }));
                  setIsQuoteModalOpen(true);
                }}
                className="mt-6 w-full bg-[#C5A880] hover:bg-[#DBC3A3] text-black font-bold uppercase tracking-widest text-xs py-3.5 min-h-[44px] rounded-lg transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              >
                Apply for Pre-Approved Financing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- REGIONAL MARKET INTELLIGENCE HUB --- */}
      <section id="market-guides" className="py-24 bg-[#12161A]/40 border-t border-[#1A2026]" aria-labelledby="guides-heading">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              LOCAL MARKET INTELLIGENCE
            </span>
            <h2 id="guides-heading" className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide">
              PRIME INVESTMENT <span className="font-extrabold text-slate-100">REGIONS</span>
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Explore key market metrics, average price appreciation, and rental yields across Canada&apos;s most desirable architectural havens.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { region: "Quebec Wilderness", avgPrice: "$2.4M", yield: "8.2%", thermalRating: "Triple-Pane A+", tag: "High Demand", img: "https://picsum.photos/seed/quebecguide/600/400" },
              { region: "Laurentian Mountains", avgPrice: "$1.95M", yield: "9.1%", thermalRating: "Geothermal A+", tag: "Ski & Retreat", img: "https://picsum.photos/seed/laurentianguide/600/400" },
              { region: "Vancouver Waterfront", avgPrice: "$4.2M", yield: "6.8%", thermalRating: "Harbor Glass A+", tag: "Ultra-Luxury", img: "https://picsum.photos/seed/vancouverguide/600/400" },
              { region: "Montreal Metro", avgPrice: "$3.4M", yield: "7.5%", thermalRating: "Basalt Steel A+", tag: "Urban Modernism", img: "https://picsum.photos/seed/montrealguide/600/400" }
            ].map((g, idx) => (
              <div key={idx} className="bg-[#12161A] border border-[#1A2026] rounded-2xl overflow-hidden group hover:border-[#C5A880]/40 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={g.img} alt={g.region} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#0B0E10]/90 text-[#C5A880] text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#C5A880]/30">
                    {g.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-4">{g.region}</h3>
                  <div className="space-y-2 font-mono text-xs text-slate-300 border-t border-[#1A2026] pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Property Price:</span>
                      <span className="text-white font-bold">{g.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Rental Yield:</span>
                      <span className="text-emerald-400 font-bold">{g.yield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Thermal Index:</span>
                      <span className="text-[#C5A880]">{g.thermalRating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setContactForm(prev => ({ ...prev, location: g.region, message: `Requesting detailed market intelligence dossier for ${g.region}.` }));
                      setIsQuoteModalOpen(true);
                    }}
                    className="w-full mt-5 bg-[#1C2228] hover:bg-[#252E36] text-white text-[11px] font-bold uppercase tracking-widest py-2.5 rounded-lg border border-[#2B353E] transition-colors"
                  >
                    Request Regional Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES / DESIGN BLUEPRINT SECTION --- */}
      <section id="services" className="py-24 bg-[#12161A]/40 border-y border-[#1A2026]" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              BESPOKE CAPABILITIES
            </span>
            <h2 id="services-heading" className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide">
              OUR <span className="font-extrabold text-slate-100">SERVICES</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#12161A] border border-[#1A2026] rounded-2xl overflow-hidden p-6 flex flex-col justify-between group hover:border-[#C5A880]/30 transition-all duration-300 hover:scale-[1.01]"
              >
                <div>
                  {/* Service Image with elegant hover zoom */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-slate-900">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      loading="lazy"
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* ID index and title */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-black font-mono text-[#C5A880]/40 group-hover:text-[#C5A880] transition-colors duration-300">
                      {srv.id}
                    </span>
                    <h3 className="text-sm font-extrabold tracking-wider text-white">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed font-sans mb-6">
                    {srv.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setContactForm(prev => ({
                      ...prev,
                      message: `Inquiring about service: "${srv.title}". Please have a specialized planning architect contact my profile.`
                    }));
                    setIsQuoteModalOpen(true);
                  }}
                  className="text-[10px] uppercase tracking-widest font-bold text-[#C5A880] group-hover:text-white transition-colors duration-200 mt-auto text-left flex items-center gap-1 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
                >
                  Learn More &rarr;
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE HOUSE PLAN SECTION (Inspired directly by reference layout & specs list) --- */}
      <section id="floor-plans" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-2 font-mono">
              DYNAMIC INTERACTIVE BLUEPRINT
            </span>
            <h2 className="text-3xl md:text-4xl font-sans uppercase font-light text-white tracking-wide">
              BESPOKE <span className="font-extrabold text-slate-100">HOUSE PLAN</span>
            </h2>
          </div>

          {/* Model Switcher tabs */}
          <div className="flex gap-2 p-1 bg-[#12161A] border border-[#1A2026] rounded-xl self-start md:self-auto">
            <button
              onClick={() => {
                setSelectedPlanId("glass-pavilion");
                setHoveredRoomId(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
                selectedPlanId === "glass-pavilion"
                  ? "bg-[#C5A880] text-black"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              The Glass Pavilion
            </button>
            <button
              onClick={() => {
                setSelectedPlanId("obsidian-house");
                setHoveredRoomId(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
                selectedPlanId === "obsidian-house"
                  ? "bg-[#C5A880] text-black"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              Obsidian House
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left specification table (Direct styling match from reference image) */}
          <div className="lg:col-span-5 bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-[#1A2026] pb-4 mb-6">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">MODEL LAYOUT</span>
                <h3 className="text-xl font-bold tracking-wide text-white uppercase mt-1">
                  {FLOOR_PLANS[selectedPlanId].modelName}
                </h3>
                <p className="text-xs text-[#C5A880] font-mono mt-1 uppercase tracking-widest">
                  THE AREA IS {FLOOR_PLANS[selectedPlanId].totalArea}
                </p>
              </div>

              {/* Specs Rooms List */}
              <div className="space-y-1 font-mono text-xs">
                {FLOOR_PLANS[selectedPlanId].rooms.map((room) => (
                  <div
                    key={room.id}
                    onMouseEnter={() => setHoveredRoomId(room.id)}
                    onMouseLeave={() => setHoveredRoomId(null)}
                    className={`flex justify-between items-center py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      hoveredRoomId === room.id
                        ? "bg-[#C5A880]/15 text-[#C5A880] border-l-2 border-[#C5A880]"
                        : "text-slate-300 hover:bg-[#1E252C]/40 hover:text-white border-l-2 border-transparent"
                    }`}
                  >
                    <span className="font-sans font-medium">{room.name}</span>
                    <span className="font-mono text-[11px] font-semibold text-slate-400">{room.area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[#1A2026] mt-8">
              <button
                onClick={() => {
                  setContactForm(prev => ({
                    ...prev,
                    message: `Requesting direct AutoCAD/PDF floor layout blueprint for "${FLOOR_PLANS[selectedPlanId].modelName}" showing structural steel calculations.`
                  }));
                  setIsQuoteModalOpen(true);
                }}
                className="w-full bg-[#1C2228] hover:bg-slate-800 border border-[#2B353E] hover:border-[#C5A880] text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-[#C5A880]" />
                Request Bespoke Layout Blueprints
              </button>
            </div>
          </div>

          {/* Right SVG Layout Renderer (Highly polished 2D outline representation) */}
          <div className="lg:col-span-7 bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center relative overflow-hidden">
            <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-slate-500 font-mono">
              Click Rooms to Inspect
            </span>

            {/* Interactive SVG Floor Plan */}
            <div className="w-full max-w-[500px] aspect-[1.1/1] relative border border-[#1A2026] bg-[#0B0E10] rounded-xl p-4 flex items-center justify-center shadow-inner">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full select-none"
                aria-label="Interactive Floor Plan Diagram"
              >
                {/* Outer Glass Shell Boundary */}
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  fill="none"
                  stroke="rgba(197, 168, 128, 0.25)"
                  strokeWidth="0.75"
                  strokeDasharray="2,2"
                />

                {/* Draw rooms dynamically */}
                {FLOOR_PLANS[selectedPlanId].rooms.map((room) => {
                  const isActive = hoveredRoomId === room.id;
                  return (
                    <g
                      key={room.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`${room.name}, area: ${room.area}`}
                      onMouseEnter={() => setHoveredRoomId(room.id)}
                      onMouseLeave={() => setHoveredRoomId(null)}
                      onFocus={() => setHoveredRoomId(room.id)}
                      onBlur={() => setHoveredRoomId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setHoveredRoomId(room.id);
                        }
                      }}
                      className="cursor-pointer focus-visible:outline-none"
                    >
                      {/* Room Area Rectangle */}
                      <motion.rect
                        x={room.x}
                        y={room.y}
                        width={room.w}
                        height={room.h}
                        fill={isActive ? "rgba(197, 168, 128, 0.12)" : "rgba(25, 33, 40, 0.45)"}
                        stroke={isActive ? "#C5A880" : "rgba(197, 168, 128, 0.3)"}
                        strokeWidth={isActive ? "1" : "0.5"}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Text details inside room */}
                      <text
                        x={room.x + room.w / 2}
                        y={room.y + room.h / 2 - 1}
                        textAnchor="middle"
                        fill={isActive ? "#C5A880" : "#E2E8F0"}
                        fontSize={room.w < 25 ? "2" : "2.8"}
                        fontWeight="600"
                        fontFamily="sans-serif"
                      >
                        {room.name}
                      </text>
                      <text
                        x={room.x + room.w / 2}
                        y={room.y + room.h / 2 + 3.5}
                        textAnchor="middle"
                        fill="rgba(148, 163, 184, 0.9)"
                        fontSize="2.2"
                        fontFamily="monospace"
                      >
                        {room.area}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active inspection feedback */}
            <div className="mt-6 w-full text-center">
              <AnimatePresence mode="wait">
                {hoveredRoomId ? (
                  <motion.div
                    key={hoveredRoomId}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-[#C5A880] font-mono uppercase tracking-widest bg-slate-900 border border-[#1A2026] py-1.5 px-4 rounded-full inline-block"
                  >
                    Inspecting: {FLOOR_PLANS[selectedPlanId].rooms.find(r => r.id === hoveredRoomId)?.name} • {FLOOR_PLANS[selectedPlanId].rooms.find(r => r.id === hoveredRoomId)?.area}
                  </motion.div>
                ) : (
                  <div className="text-xs text-slate-500 font-mono tracking-widest py-1.5 px-4 inline-block">
                    Hover over rooms or list items to view specs
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- SELLER & LANDLORD SERVICE TIER COMPARISON MATRIX --- */}
      <section id="packages" className="py-24 bg-[#0B0E10] border-t border-[#1A2026]" aria-labelledby="packages-heading">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              TRANSPARENT PRICING & GUARANTEE
            </span>
            <h2 id="packages-heading" className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide">
              SELLER & LANDLORD <span className="font-extrabold text-[#C5A880]">PACKAGES</span>
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Transparent management fees with zero hidden surcharges. Designed for discerning estate owners and investors.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Package 1: Let Only */}
            <div className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-8 flex flex-col justify-between hover:border-slate-600 transition-all">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">BASIC LISTING</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-1 mb-2">Let Only</h3>
                <div className="text-3xl font-mono font-bold text-[#C5A880] mb-6">
                  5% <span className="text-xs text-slate-400 font-sans font-normal">flat commission fee</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 border-t border-[#1A2026] pt-6 font-sans">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ultra-HD Architectural Photography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Global Buyer & Tenant Portal Listing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Comprehensive Financial Background Checks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certified Contract Drafting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setContactForm(prev => ({ ...prev, message: "Enquiring about the Let Only / Basic Listing service package (5%)." }));
                  setIsQuoteModalOpen(true);
                }}
                className="mt-8 w-full bg-[#1C2228] hover:bg-[#252E36] text-white font-semibold uppercase tracking-widest text-xs py-3.5 min-h-[44px] rounded-lg border border-[#2B353E] transition-all"
              >
                Select Let Only
              </button>
            </div>

            {/* Package 2: Rent Collection (Featured) */}
            <div className="bg-[#12161A] border-2 border-[#C5A880] rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-[#C5A880]/10 transform lg:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-black font-mono text-[9px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                MOST POPULAR CHOICE
              </span>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">FULL RENT MANAGEMENT</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-1 mb-2">Rent Collection</h3>
                <div className="text-3xl font-mono font-bold text-[#C5A880] mb-6">
                  10% <span className="text-xs text-slate-400 font-sans font-normal">monthly management fee</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-200 border-t border-[#1A2026] pt-6 font-sans">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Everything included in Let Only</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated Monthly Rent Collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Quarterly Structural & Thermal Audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>24/7 Urgent Repair Concierge</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setContactForm(prev => ({ ...prev, message: "Enquiring about the Rent Collection & Management service package (10%)." }));
                  setIsQuoteModalOpen(true);
                }}
                className="mt-8 w-full bg-[#C5A880] hover:bg-[#DBC3A3] text-black font-bold uppercase tracking-widest text-xs py-3.5 min-h-[44px] rounded-lg transition-all shadow-md"
              >
                Select Rent Collection
              </button>
            </div>

            {/* Package 3: Bespoke VIP Management */}
            <div className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-8 flex flex-col justify-between hover:border-slate-600 transition-all">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">VIP ESTATE STEWARDSHIP</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-1 mb-2">Bespoke Management</h3>
                <div className="text-3xl font-mono font-bold text-[#C5A880] mb-6">
                  15% <span className="text-xs text-slate-400 font-sans font-normal">VIP estate management</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 border-t border-[#1A2026] pt-6 font-sans">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Everything in Rent Collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Geothermal & Solar Systems Maintenance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Personal Estate Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tax & Accounting Financial Reporting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setContactForm(prev => ({ ...prev, message: "Enquiring about the Bespoke VIP Estate Stewardship package (15%)." }));
                  setIsQuoteModalOpen(true);
                }}
                className="mt-8 w-full bg-[#1C2228] hover:bg-[#252E36] text-white font-semibold uppercase tracking-widest text-xs py-3.5 min-h-[44px] rounded-lg border border-[#2B353E] transition-all"
              >
                Select Bespoke VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION (Elegant values) --- */}
      <section className="py-24 bg-[#12161A]/30 border-t border-[#1A2026]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              ESTABLISHED TRUST
            </span>
            <h2 className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide">
              WHY CHOOSE <span className="font-extrabold text-slate-100">US</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Award className="w-6 h-6 text-[#C5A880]" />, title: "Trusted Local Experts", desc: "A combined decade of architectural experience navigating strict local winter thermal codes and shoreline rules safely." },
              { icon: <ShieldCheck className="w-6 h-6 text-[#C5A880]" />, title: "Verified Properties", desc: "Every plot and glass structural joint is pre-screened, soil-tested, and certified by premium regional engineers." },
              { icon: <Clock className="w-6 h-6 text-[#C5A880]" />, title: "Transparent Engineering", desc: "Clear project budgets, zero undisclosed engineering surcharges, and comprehensive material specifications." }
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-8 hover:border-[#C5A880]/20 transition-all group duration-300"
              >
                <div className="p-3 bg-slate-900 border border-[#1A2026] rounded-xl inline-block mb-6 group-hover:bg-[#C5A880]/10 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold tracking-wide uppercase text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GOOGLE REVIEWS SECTION (Social proof) --- */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
            TESTIMONIALS & RATING
          </span>
          <h2 className="text-3xl md:text-4xl font-sans uppercase font-light text-white tracking-wide">
            Google <span className="font-extrabold text-slate-100">Reviews</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
            ))}
            <span className="text-xs font-bold font-mono text-white ml-2">5.0 RATING (28 REVIEWS)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {GOOGLE_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Date and rating */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{rev.date}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-sans italic mb-8">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Author profile avatar representation */}
              <div className="flex items-center gap-3 border-t border-slate-800/60 pt-4 mt-auto">
                <div className="w-9 h-9 bg-slate-800 text-[#C5A880] font-mono text-sm font-bold flex items-center justify-center rounded-full border border-[#1A2026]">
                  {rev.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://g.co/create-review-placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest font-semibold border border-slate-800 hover:border-slate-500 text-slate-300 hover:text-white py-3 px-6 rounded-lg transition-colors inline-block"
          >
            View Our Google Business Profile
          </a>
        </div>
      </section>

      {/* --- ABOUT US SECTION (Story and stats) --- */}
      <section id="about" className="py-24 bg-[#12161A]/40 border-y border-[#1A2026]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive counters and text */}
          <div className="lg:col-span-7">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              ESTATE DEVELOPMENT TEAM
            </span>
            <h2 className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide mb-6">
              ABOUT <span className="font-extrabold text-slate-100">GLASSHAVEN</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              Founded in Montreal by award-winning structural glass engineers, Glasshaven develops hyper-curated wilderness properties where modern steel structures and clear glass merge.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 font-sans">
              Our structures use intelligent high-efficiency insulation, multi-glazed active temperature panels, and structural-grade dark steel to ensure absolute durability, wind tolerance, and structural safety under intense winter conditions.
            </p>

            {/* Editable Stats Block */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#1A2026] pt-8">
              <div>
                <span className="text-2xl sm:text-4xl font-mono font-black text-white">$14M+</span>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider font-mono mt-1">Properties Sold</p>
              </div>
              <div>
                <span className="text-2xl sm:text-4xl font-mono font-black text-white">100%</span>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider font-mono mt-1">Clients Proud</p>
              </div>
              <div>
                <span className="text-2xl sm:text-4xl font-mono font-black text-white">12 Years</span>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider font-mono mt-1">Aesthetic Focus</p>
              </div>
            </div>
          </div>

          {/* Right: Immersive Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#1A2026]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Glasshaven architect consulting on-site"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- HIGH-CONVERSION CTA SECTION --- */}
      <section className="py-24 bg-gradient-to-r from-slate-950 via-[#12161A] to-slate-950 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-sans uppercase font-light text-white tracking-wide mb-6">
            Ready to Find Your <span className="font-extrabold text-[#C5A880]">Perfect Property?</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed mb-10">
            Select an action below to instantly connect with our expert advisory board, or request a complete structural floor plan brochure.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => {
                setContactForm(prev => ({ ...prev, message: "Requesting personal advisory callback regarding available glass architectural plots." }));
                setIsQuoteModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#DBC3A3] text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-colors"
            >
              Request a Callback
            </button>
            <a
              href={generateWhatsAppLink("Hello Glasshaven, I'm ready to find our luxury property. Please connect me to an executive advisor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-white text-white font-bold uppercase tracking-widest text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* --- CONTACT & QUOTE ENQUIRY FORM SECTION --- */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left contact info directory (Local SEO compliance) */}
          <div className="lg:col-span-5">
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3 font-mono">
              DIRECT CHANNELS
            </span>
            <h2 className="text-3xl md:text-4xl font-sans uppercase font-light text-white tracking-wide mb-8">
              Request a <span className="font-extrabold text-slate-100">Callback</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Prefer a physical portfolio presentation or private site tour? Connect with our Montreal advisory desk directly or complete the encrypted briefing document.
            </p>

            <div className="space-y-6">
              {/* Phone Channel */}
              <a
                href={`tel:${AGENCY_PHONE}`}
                className="flex items-center gap-4 p-4 bg-[#12161A] border border-[#1A2026] hover:border-[#C5A880]/25 rounded-xl transition-all"
              >
                <div className="p-3 bg-slate-900 text-[#C5A880] rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Phone Helpline</span>
                  <p className="text-white font-mono font-bold text-sm mt-0.5">{AGENCY_PHONE}</p>
                </div>
              </a>

              {/* Email Channel */}
              <a
                href="mailto:advisor@glasshaven.com"
                className="flex items-center gap-4 p-4 bg-[#12161A] border border-[#1A2026] hover:border-[#C5A880]/25 rounded-xl transition-all"
              >
                <div className="p-3 bg-slate-900 text-[#C5A880] rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Enquiry Desk</span>
                  <p className="text-white font-mono font-bold text-sm mt-0.5">advisor@glasshaven.com</p>
                </div>
              </a>

              {/* Office Address (Local SEO) */}
              <div className="flex items-center gap-4 p-4 bg-[#12161A] border border-[#1A2026] rounded-xl">
                <div className="p-3 bg-slate-900 text-[#C5A880] rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Headquarters</span>
                  <p className="text-slate-300 text-xs mt-0.5">700 Rue De La Gauchetière, Montreal, QC, Canada</p>
                </div>
              </div>
            </div>

            {/* Submission Log History (Functional state display!) */}
            {submissionHistory.length > 0 && (
              <div className="mt-12 bg-[#12161A] border border-[#1A2026] rounded-2xl p-6">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#C5A880] mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Active Tour Enquiries ({submissionHistory.length})
                </h4>
                <div className="space-y-3 max-h-[160px] overflow-y-auto">
                  {submissionHistory.map((sub, sIdx) => (
                    <div key={sIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px]">
                      <div className="flex justify-between text-slate-500 font-mono mb-1">
                        <span>{sub.date}</span>
                        <span className="text-[#C5A880]">{sub.dealType} - {sub.propertyType}</span>
                      </div>
                      <p className="text-white font-semibold">{sub.name} • {sub.budget}</p>
                      {sub.message && <p className="text-slate-400 mt-1 truncate">{sub.message}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right contact form with full validation and success states */}
          <div className="lg:col-span-7 bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-10 relative">
            <h3 className="text-xl font-bold tracking-wide text-white uppercase mb-6">
              Bespoke Enquiry Form
            </h3>

            {formSubmitted && (
              <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500 text-emerald-200 text-sm rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Enquiry Transmitted Securely</h4>
                  <p className="text-xs text-slate-300">Our Montreal structural architects and regional advisors have logged your brief. We will contact you shortly.</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleFormSubmit} className="space-y-4" aria-label="Bespoke Enquiry Form">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Full Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. Julian Vance"
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-phone" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. +1 555-0199"
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. julian@vance-corp.com"
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                  />
                </div>

                {/* Deal Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-deal-type" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Interest Type</label>
                  <select
                    id="contact-deal-type"
                    name="dealType"
                    value={contactForm.dealType}
                    onChange={handleFormChange}
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <option value="Buy">Bespoke Acquisition (Buy)</option>
                    <option value="Rent">Exclusive Lease (Rent)</option>
                    <option value="Custom">Custom Floor Planning</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Property Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-property-type" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Residency Class</label>
                  <select
                    id="contact-property-type"
                    name="propertyType"
                    value={contactForm.propertyType}
                    onChange={handleFormChange}
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <option value="Villa">Villa Pavilion</option>
                    <option value="Estate">Lakeside Estate</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Cabin">Secluded Cabin</option>
                  </select>
                </div>

                {/* Preferred Location */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-location" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Target Location</label>
                  <select
                    id="contact-location"
                    name="location"
                    value={contactForm.location}
                    onChange={handleFormChange}
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <option value="Quebec">Quebec Wilderness</option>
                    <option value="Montreal">Montreal Metropolitan</option>
                    <option value="Vancouver">Vancouver Waterfront</option>
                    <option value="Laurentians">Laurentian Mountains</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-budget" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Target Budget</label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={contactForm.budget}
                    onChange={handleFormChange}
                    className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    <option value="under-2m">Under $2.0M</option>
                    <option value="2m-3m">$2.0M - $3.0M</option>
                    <option value="over-3m">Over $3.0M</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Brief / Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Share any details about your specific timeline, plot requirements, or preferred layouts..."
                  className="bg-slate-950 border border-[#1A2026] text-white text-sm rounded-lg px-3.5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C5A880] hover:bg-[#DBC3A3] active:scale-95 text-black font-bold uppercase tracking-widest text-xs py-4 min-h-[48px] rounded-xl transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                id="contact-submit-btn"
              >
                Send Request Securely
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- REGIONAL COVERAGE & TRUST MATRIX DASHBOARD --- */}
      <section id="coverage" className="py-20 bg-[#0B0E10] border-t border-[#1A2026] relative overflow-hidden" aria-labelledby="coverage-heading">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-[#12161A]/95 border border-[#1F262E] hover:border-[#C5A880]/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300">
            
            {/* Header Badge */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A222A] border border-[#2B3542] text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.25em] font-semibold mb-4 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>WE&apos;RE IN THE NEIGHBORHOOD</span>
              </div>
              
              <h2 id="coverage-heading" className="text-2xl sm:text-4xl md:text-5xl font-sans font-light uppercase tracking-wide text-white mb-4">
                Proudly Serving <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#C5A880]">Premier Enclaves</span>
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Our specialized architectural advisory team covers all premier enclaves and surrounding luxury wilderness communities. Wherever your dream estate is, our private advisors are nearby.
              </p>
            </div>

            {/* Interactive Neighborhood Pills Cloud */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto mb-14">
              {[
                { name: "Mont-Tremblant", region: "Laurentians" },
                { name: "Westmount", region: "Montreal" },
                { name: "Outremont", region: "Montreal" },
                { name: "Charlevoix", region: "Quebec" },
                { name: "Vancouver Waterfront", region: "Vancouver" },
                { name: "Golden Square Mile", region: "Montreal" },
                { name: "Laurentian Mountains", region: "Laurentians" },
                { name: "Lac-Beauport", region: "Quebec" },
                { name: "Senneville", region: "Montreal" },
                { name: "Whistler", region: "Vancouver" },
                { name: "Point Grey", region: "Vancouver" },
                { name: "Shaughnessy", region: "Vancouver" },
                { name: "Estérel", region: "Laurentians" },
                { name: "Magog Lakefront", region: "Quebec" },
                { name: "Coal Harbour", region: "Vancouver" },
                { name: "North Hatley", region: "Quebec" },
                { name: "Baie-Saint-Paul", region: "Quebec" },
                { name: "Town of Mount Royal", region: "Montreal" },
                { name: "West Vancouver", region: "Vancouver" },
                { name: "Lions Bay", region: "Vancouver" }
              ].map((item, idx) => {
                const isSelected = selectedNeighborhood === item.name;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedNeighborhood(item.name);
                      setFilterLocation(item.region);
                      const showcase = document.getElementById("properties");
                      if (showcase) {
                        showcase.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shadow-sm flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] active:scale-95 ${
                      isSelected
                        ? "bg-[#C5A880] text-black border border-[#C5A880] shadow-md shadow-[#C5A880]/20 font-bold"
                        : "bg-[#0B0E10]/85 hover:bg-[#1C232B] border border-[#222A33] hover:border-[#C5A880]/60 text-slate-200 hover:text-white"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isSelected ? "bg-black" : "bg-[#C5A880]/70 group-hover:bg-[#C5A880]"
                    }`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom 4 Trust Pillars Strip */}
            <div className="pt-10 border-t border-[#1F262E] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-start">
              
              {/* Pillar 1 */}
              <div className="flex items-center gap-3.5 group">
                <div className="p-3 rounded-2xl bg-[#0B0E10] border border-[#1F262E] group-hover:border-[#C5A880]/40 transition-colors shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide">Licensed & Insured</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs">Full fiduciary & asset coverage</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-center gap-3.5 group">
                <div className="p-3 rounded-2xl bg-[#0B0E10] border border-[#1F262E] group-hover:border-[#C5A880]/40 transition-colors shrink-0 shadow-sm">
                  <Award className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide">RICS & OACIQ Certified</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs">Chartered luxury brokerage</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-center gap-3.5 group">
                <div className="p-3 rounded-2xl bg-[#0B0E10] border border-[#1F262E] group-hover:border-[#C5A880]/40 transition-colors shrink-0 shadow-sm">
                  <Star className="w-6 h-6 fill-[#C5A880] text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide">4.9-Star Elite</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs">500+ Verified luxury reviews</p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-center gap-3.5 group">
                <div className="p-3 rounded-2xl bg-[#0B0E10] border border-[#1F262E] group-hover:border-[#C5A880]/40 transition-colors shrink-0 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide">Background Checked</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs">Strictly confidential advisors</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-300 text-xs border-t border-[#1A2026] py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex flex-col items-start gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded p-1">
              <span className="text-xl font-black tracking-[0.35em] text-white font-sans">
                GLASSHAVEN
              </span>
              <span className="text-[8px] uppercase tracking-[0.45em] text-slate-400 font-mono pl-0.5">
                Pure Modernism
              </span>
            </a>
            <p className="text-slate-400 pr-4 leading-relaxed">
              Precision design meets absolute wilderness. We develop steel-framed, thermal glass residences that redefine modern real estate.
            </p>
          </div>

          {/* Nav Directory */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#home" className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded">Home Showcase</a></li>
              <li><a href="#properties" className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded">Our Portfolio</a></li>
              <li><a href="#floor-plans" className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded">Floor Plan Layouts</a></li>
              <li><a href="#coverage" className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded">Regional Coverage</a></li>
              <li><a href="#services" className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded">Planning Services</a></li>
              <li><a href="#reviews" className="hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded">Client Reviews</a></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Core Capabilities</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>01 Property Showcase Tours</li>
              <li>02 Sun & Privacy Site Planning</li>
              <li>03 High-Efficiency Building Design</li>
              <li>04 Bespoke Space Layouts</li>
              <li>05 AI Advisory Matchmaker</li>
            </ul>
          </div>

          {/* Social & Contact (Local SEO) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">Contact & Social</h4>
            <p className="text-slate-300 font-mono">{AGENCY_PHONE}<br />advisor@glasshaven.com</p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 min-h-[44px] min-w-[44px] bg-slate-900 border border-[#1A2026] rounded-lg text-slate-300 hover:text-white transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]" aria-label="Instagram Profile">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 min-h-[44px] min-w-[44px] bg-slate-900 border border-[#1A2026] rounded-lg text-slate-300 hover:text-white transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]" aria-label="Facebook Profile">
                FB
              </a>
              <a href={defaultWALink} target="_blank" rel="noopener noreferrer" className="p-2.5 min-h-[44px] min-w-[44px] bg-slate-900 border border-[#1A2026] rounded-lg text-slate-300 hover:text-[#C5A880] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]" aria-label="WhatsApp Hotline">
                WA
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-mono">
          <p>© {new Date().getFullYear()} Glasshaven Real Estate Ltd. All structural engineering reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">Terms of Service</a>
            <span>•</span>
            <a href="#sitemap" className="hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* --- REUSABLE BESPOKE QUOTE REQUEST MODAL --- */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute inset-0 bg-[#0B0E10]/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#12161A] border border-[#1A2026] rounded-2xl p-6 sm:p-8 shadow-2xl z-10"
              id="quote-modal-content"
            >
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-label="Close Quote Request Modal"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[#C5A880] text-[9px] uppercase tracking-wider font-mono">ACQUISITION INQUIRY</span>
                <h3 id="modal-title" className="text-lg font-extrabold tracking-wide text-white uppercase mt-1">
                  {quotePropertyId 
                    ? `Enquire about "${PROPERTIES.find(p => p.id === quotePropertyId)?.name}"`
                    : "Request Bespoke Quote"
                  }
                </h3>
              </div>

              {formSubmitted ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-0.5">Callback Brief Received</h4>
                    <p>Our Quebec-licensed advisors will reach out to schedule your tour shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" aria-label="Acquisition Inquiry Form">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-name" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Full Name *</label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. Julian Vance"
                      className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-phone" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Phone Number *</label>
                      <input
                        type="tel"
                        id="modal-phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleFormChange}
                        required
                        placeholder="e.g. +1 555-0199"
                        className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-email" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Email Address *</label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleFormChange}
                        required
                        placeholder="e.g. julian@vance-corp.com"
                        className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-message" className="text-[10px] uppercase tracking-wider text-slate-300 font-mono font-medium">Your Specific Brief</label>
                    <textarea
                      id="modal-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleFormChange}
                      rows={3}
                      className="bg-slate-950 border border-[#1A2026] text-white text-xs rounded-lg px-3.5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] placeholder-slate-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C5A880] hover:bg-[#DBC3A3] active:scale-95 text-black font-bold uppercase tracking-widest text-[10px] py-4 min-h-[44px] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  >
                    Submit Advisory Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
