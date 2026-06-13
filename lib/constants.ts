import { IntroFeatureProps } from "@/app/(root)/shared/types";
import { TbFileSearch } from "react-icons/tb";
import { SiComma } from "react-icons/si";
import { TbBrandDatabricks } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { IoIosFlash } from "react-icons/io";
import { MdBalance } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { LuHeartPulse } from "react-icons/lu";
import { BsGearWide } from "react-icons/bs";

// Brand color - used in JS files where CSS variables aren't available
export const BRAND_COLOR = "#212a3b"; // Dark blue-gray
export const BRAND_COLOR_HOVER = "#3d485e"; // Medium blue-gray

// Sample books for the homepage (using Open Library covers)
export const sampleBooks = [
  {
    _id: "1",
    title: "Clean Code",
    author: "Robert Cecil Martin",
    slug: "clean-code",
    coverURL: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "2",
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    slug: "javascript-the-definitive-guide",
    coverURL: "https://covers.openlibrary.org/b/isbn/9780596805524-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "3",
    title: "Brave New World",
    author: "Aldous Huxley",
    slug: "brave-new-world",
    coverURL: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "4",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    slug: "rich-dad-poor-dad",
    coverURL: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "5",
    title: "Deep Work",
    author: "Cal Newport",
    slug: "deep-work",
    coverURL: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "6",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    slug: "how-to-win-friends-and-influence-people",
    coverURL: "https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "7",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    slug: "the-power-of-habit",
    coverURL: "https://covers.openlibrary.org/b/isbn/9781400069286-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "8",
    title: "Atomic Habits",
    author: "James Clear",
    slug: "atomic-habits",
    coverURL: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "9",
    title: "The Courage to Be Disliked",
    author: "Fumitake Koga & Ichiro Kishimi",
    slug: "the-courage-to-be-disliked",
    coverURL: "https://covers.openlibrary.org/b/isbn/9781501197274-L.jpg",
    coverColor: "#f8f4e9",
  },
  {
    _id: "10",
    title: "1984",
    author: "George Orwell",
    slug: "1984",
    coverURL: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    coverColor: "#f8f4e9",
  },
];

// File validation helpers
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_PDF_TYPES = ["application/pdf"];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Pre-configured VAPI assistant ID (hardcoded for this app)
export const ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID!;

// 11Labs Voice IDs - Optimized for conversational AI
// Voices selected for natural, engaging book conversations
export const voiceOptions = {
  // Male voices
  dave: {
    id: "CYw3kZ02Hs0563khs1Fj",
    name: "Dave",
    description: "Young male, British-Essex, casual & conversational",
  },
  daniel: {
    id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel",
    description: "Middle-aged male, British, authoritative but warm",
  },
  chris: {
    id: "iP95p4xoKVk53GoZ742B",
    name: "Chris",
    description: "Male, casual & easy-going",
  },
  // Female voices
  rachel: {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    description: "Young female, American, calm & clear",
  },
  sarah: {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
    description: "Young female, American, soft & approachable",
  },
};

// Voice categories for the selector UI
export const voiceCategories = {
  male: ["dave", "daniel", "chris"],
  female: ["rachel", "sarah"],
};

// Default voice
export const DEFAULT_VOICE = "rachel";

// ElevenLabs voice settings optimized for conversational AI
export const VOICE_SETTINGS = {
  stability: 0.45, // Lower for more emotional, dynamic delivery (0.30-0.50 is natural)
  similarityBoost: 0.75, // Enhances clarity without distortion
  style: 0, // Keep at 0 for conversational AI (higher = more latency, less stable)
  useSpeakerBoost: true, // Improves voice quality
  speed: 1.0, // Natural conversation speed
};

// VAPI configuration for natural conversation
// NOTE: These settings should be configured in the VAPI Dashboard for the assistant
// They are kept here for reference and documentation purposes
export const VAPI_DASHBOARD_CONFIG = {
  // Turn-taking settings
  startSpeakingPlan: {
    smartEndpointingEnabled: true,
    waitSeconds: 0.4,
  },
  stopSpeakingPlan: {
    numWords: 2,
    voiceSeconds: 0.2,
    backoffSeconds: 1.0,
  },
  // Timing settings
  silenceTimeoutSeconds: 30,
  responseDelaySeconds: 0.4,
  llmRequestDelaySeconds: 0.1,
  // Conversation features
  backgroundDenoisingEnabled: true,
  backchannelingEnabled: true,
  fillerInjectionEnabled: false,
};

// Clerk appearance overrides - Warm Literary Style
// Note: Tailwind requires static class names at build time, so we hardcode color values here
export const CLERK_AUTH_APPEARANCE_OVERRIDE = {
  rootBox: "mx-auto",
  card: "shadow-none border-none rounded-xl bg-transparent",
  headerTitle: "!text-2xl font-bold text-[#212a3b]",
  headerSubtitle: "!mt-3 !text-sm text-[#3d485e]",
  socialButtonsBlockButton:
    "!border border-[rgba(33,42,59,0.12)] hover:bg-[#212a3b]/10 transition-all h-12 text-lg !rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)]",
  socialButtonsBlockButtonText: "font-medium !text-[#212a3b] !text-lg",
  formButtonPrimary:
    "bg-[#212a3b] hover:bg-[#3d485e] text-white font-medium !border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)] normal-case !h-12 !text-lg !rounded-xl",
  formFieldInput:
    "!border !border-[rgba(33,42,59,0.12)] !rounded-xl focus:ring-[#212a3b] focus:border-[#212a3b] !h-12 !min-h-12 !text-lg !bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06)]",
  formFieldLabel: "text-[#212a3b] font-medium text-lg",
  footerActionLink: "text-[#212a3b] hover:text-[#3d485e] text-base font-medium",
};

export const buildFeatures: IntroFeatureProps[] = [
  {
    Icon: TbFileSearch,
    title: "Multi-document Search",
    description: "Search cross thousands of documents.",
    color: "blue",
    bgcolor: "bg-sky-200",
  },
  {
    Icon: SiComma,
    title: "Citations",
    description: "Every answer links back to the source.",
    color: "purple",
    bgcolor: "bg-purple-100",
  },
  {
    Icon: TbBrandDatabricks,
    title: "Parent-Child Retrieval",
    description: "Context without losing precision.",
    color: "green",
    bgcolor: "bg-green-100",
  },
  {
    Icon: MdSecurity,
    title: "Workspace Isolation",
    description: "Keep customer data separated.",
    color: "purple",
    bgcolor: "bg-purple-100",
  },
  {
    Icon: MdLock,
    title: "Enterprise Security",
    description: "Designed for sensitive information.",
    color: "blue",
    bgcolor: "bg-sky-200",
  },
  {
    Icon: IoIosFlash,
    title: "Fast Retrieval",
    description: "Answers in seconds.",
    color: "orange",
    bgcolor: "bg-orange-100",
  },
];

export const designedFeatures: IntroFeatureProps[] = [
  {
    Icon: MdBalance,
    title: "Legal",
    description: "Contracts, case files, and leagl research.",
    color: "blue",
    divcolor: "bg-sky-200",
    bgcolor: "bg-sky-100",
  },
  {
    Icon: FaCalculator,
    title: "Accounting",
    description: "Policies, regulations, and financial reports.",
    color: "green",
    divcolor: "bg-green-200",
    bgcolor: "bg-green-100",
  },
  {
    Icon: LuHeartPulse,
    title: "Healthcare",
    description: "Clinical guidelines and procedures.",
    color: "purple",
    divcolor: "bg-purple-200",
    bgcolor: "bg-purple-100",
  },
  {
    Icon: BsGearWide,
    title: "Engineering",
    description: "Technical docs, manuals, and specs.",
    color: "orange",
    divcolor: "bg-orange-200",
    bgcolor: "bg-orange-100",
  },
];

export const featuresTitle: string[] = [
  "Build for trusted knowledge",
  "Designed for knowledge-intensive teams",
];

export const navItems = [
  { label: "Product", href: "/bookfield" },
  { label: "Solution", href: "/solution" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Resources", href: "/Resources" },
];

export const bookNavItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/bookfield" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];
