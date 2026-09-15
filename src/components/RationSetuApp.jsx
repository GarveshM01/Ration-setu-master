import React, { useState, useReducer, useMemo, useEffect, createContext, useContext } from "react";

/* =========================================================================
   INLINE ICON SET — no external icon library. Lucide-style 24x24 stroke
   icons, hand-drawn as plain SVG so the artifact runs with zero extra deps.
   ========================================================================= */
function IconBase({ children, size = 24, color = "currentColor", strokeWidth = 2, style, ...rest }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={style} {...rest}
    >
      {children}
    </svg>
  );
}

const Home = (p) => (
  <IconBase {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1v-9" /></IconBase>
);
const Ticket = (p) => (
  <IconBase {...p}>
    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
    <path d="M13 6v2M13 11v2M13 16v2" />
  </IconBase>
);
const QrCode = (p) => (
  <IconBase {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM19 14h2v2M14 19h2M19 19h2v2h-2" />
  </IconBase>
);
const Users = (p) => (
  <IconBase {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconBase>
);
const Bell = (p) => (
  <IconBase {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></IconBase>
);
const User = (p) => (
  <IconBase {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></IconBase>
);
const ChevronLeft = (p) => <IconBase {...p}><path d="M15 18l-6-6 6-6" /></IconBase>;
const CheckCircle2 = (p) => (
  <IconBase {...p}><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></IconBase>
);
const Wheat = (p) => (
  <IconBase {...p}>
    <path d="M12 22V4" /><path d="M8 6l4-2 4 2" /><path d="M8 10l4-2 4 2" /><path d="M8 14l4-2 4 2" /><path d="M9 22h6" />
  </IconBase>
);
const History = (p) => (
  <IconBase {...p}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 7v5l4 2" /></IconBase>
);
const ShieldCheck = (p) => (
  <IconBase {...p}><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></IconBase>
);
const LayoutDashboard = (p) => (
  <IconBase {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
  </IconBase>
);
const Languages = (p) => (
  <IconBase {...p}>
    <path d="M4 5h7" /><path d="M7 3v2c0 4-2 7-5 8" /><path d="M3 13c2 0 4-1 5-3" />
    <path d="M13 21l4-9 4 9" /><path d="M14.5 18h5" />
  </IconBase>
);
const ArrowRight = (p) => <IconBase {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></IconBase>;
const Scan = (p) => (
  <IconBase {...p}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M3 12h18" />
  </IconBase>
);
const LogOut = (p) => (
  <IconBase {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></IconBase>
);
const Info = (p) => (
  <IconBase {...p}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></IconBase>
);
const TrendingUp = (p) => <IconBase {...p}><path d="M3 17l6-6 4 4 7-8" /><path d="M15 7h5v5" /></IconBase>;
const BarChart3 = (p) => (
  <IconBase {...p}>
    <path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" />
  </IconBase>
);
const AlertTriangle = (p) => (
  <IconBase {...p}><path d="M12 2L1 21h22L12 2z" /><path d="M12 9v5" /><path d="M12 17h.01" /></IconBase>
);
const Package = (p) => (
  <IconBase {...p}><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></IconBase>
);
const Phone = (p) => (
  <IconBase {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
  </IconBase>
);
const KeyRound = (p) => (
  <IconBase {...p}><circle cx="8" cy="15" r="4" /><path d="M10.5 12.5L20 3" /><path d="M17 6l3 3" /><path d="M14 9l2 2" /></IconBase>
);
const IdCard = (p) => (
  <IconBase {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><path d="M13 10h6" /><path d="M13 14h4" /></IconBase>
);
const Navigation = (p) => <IconBase {...p}><path d="M3 11l18-8-8 18-2-8-8-2z" /></IconBase>;
const ClipboardCheck = (p) => (
  <IconBase {...p}><rect x="6" y="4" width="12" height="16" rx="2" /><path d="M9 4V2h6v2" /><path d="M9 12l2 2 4-4" /></IconBase>
);
const Sparkles = (p) => (
  <IconBase {...p}>
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
    <path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9z" />
  </IconBase>
);
const ScanLine = (p) => (
  <IconBase {...p}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M3 12h18" />
  </IconBase>
);
const UserCheck = (p) => (
  <IconBase {...p}><circle cx="9" cy="8" r="4" /><path d="M2 21v-1a6 6 0 0 1 6-6h2" /><path d="M17 12l2 2 4-4" /></IconBase>
);
const RefreshCw = (p) => (
  <IconBase {...p}><path d="M21 12a9 9 0 1 1-2.6-6.4" /><path d="M21 4v5h-5" /></IconBase>
);

/* =========================================================================
   RATION SETU — Student Innovation Prototype (SIH)
   Design tokens
   ========================================================================= */
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');`;

/* Official Ration Setu logo (provided asset, unmodified) */
import RATION_SETU_LOGO from "../assets/ration-setu-logo.png";
const LOGO_SRC = RATION_SETU_LOGO;

const C = {
  navy: "#17324D",
  navyDeep: "#0B2239",
  bg: "#F7F9FC",
  cream: "#EEF3F7",
  green: "#16805C",
  greenBg: "#E7F5EF",
  gold: "#D99A2B",
  goldBg: "#FFF4DD",
  red: "#C44747",
  redBg: "#FDECEC",
  grey: "#64748B",
  greyLine: "#DCE4EC",
  white: "#FFFFFF",
};

/* =========================================================================
   TRANSLATIONS
   ========================================================================= */
const dict = {
  appName: { hi: "राशन सेतु", en: "Ration Setu" },
  tagline: { hi: "राशन लेना, अब आसान।", en: "Ration Lena, Ab Aasan." },
  usp: { hi: "एक कतार। दो तरीके। कम इंतज़ार।", en: "One Queue. Two Ways. Less Waiting." },
  studentProto: { hi: "छात्र नवाचार प्रोटोटाइप", en: "Student Innovation Prototype" },
  getStarted: { hi: "शुरू करें", en: "Get Started" },
  welcome: { hi: "राशन सेतु में स्वागत है", en: "Welcome to Ration Setu" },
  mobileNumber: { hi: "मोबाइल नंबर", en: "Mobile Number" },
  sendOtp: { hi: "OTP भेजें", en: "Send OTP" },
  enterOtp: { hi: "OTP दर्ज करें", en: "Enter OTP" },
  demoOtpHint: { hi: "डेमो हेतु कोई भी 6 अंक डालें", en: "Demo: enter any 6 digits" },
  verify: { hi: "सत्यापित करें", en: "Verify" },
  rationCardNumber: { hi: "राशन कार्ड नंबर", en: "Ration Card Number" },
  continue: { hi: "आगे बढ़ें", en: "Continue" },
  namaste: { hi: "नमस्ते", en: "Namaste" },
  myRationCard: { hi: "मेरा राशन कार्ड", en: "My Ration Card" },
  familyMembers: { hi: "परिवार सदस्य", en: "Family Members" },
  assignedFps: { hi: "आवंटित दुकान", en: "Assigned FPS" },
  myEntitlement: { hi: "मेरा हक़", en: "My Entitlement" },
  currentQueue: { hi: "वर्तमान कतार स्थिति", en: "Current Queue Status" },
  nowServing: { hi: "अभी सेवा में", en: "Now Serving" },
  myToken: { hi: "मेरा टोकन", en: "My Token" },
  peopleAhead: { hi: "आगे लोग", en: "People Ahead" },
  estWait: { hi: "अनुमानित प्रतीक्षा", en: "Estimated Wait" },
  min: { hi: "मिनट", en: "min" },
  bookToken: { hi: "ऑनलाइन स्लॉट बुक करें", en: "Book Online Slot" },
  scanFpsQr: { hi: "ऑफ़लाइन QR टोकन प्राप्त करें", en: "Get Offline QR Token" },
  bookOnlineDesc: { hi: "घर से समय चुनें", en: "Choose a time from home" },
  offlineQrDesc: { hi: "दुकान पर QR स्कैन करें", en: "Scan QR at the shop" },
  viewRationDetails: { hi: "राशन विवरण देखें", en: "View Ration Details" },
  noTokenYet: { hi: "अभी कोई टोकन बुक नहीं है", en: "No token booked yet" },
  bookNow: { hi: "अभी बुक करें", en: "Book Now" },
  home: { hi: "होम", en: "Home" },
  queue: { hi: "कतार", en: "Queue" },
  notif: { hi: "सूचनाएं", en: "Alerts" },
  profile: { hi: "प्रोफ़ाइल", en: "Profile" },
  entitlementTitle: { hi: "राशन हक़ विवरण", en: "Ration Entitlement" },
  entQty: { hi: "आवंटित मात्रा", en: "Entitled Quantity" },
  availAtFps: { hi: "आपकी दुकान पर उपलब्धता", en: "Available at Assigned FPS" },
  entNote: {
    hi: "यहाँ दिखाया गया हक़ आपकी पंजीकृत PDS जानकारी पर आधारित है। यह डेमो डेटा है।",
    en: "Entitlement shown is based on your registered PDS information. This is demo data.",
  },
  available: { hi: "उपलब्ध", en: "Available" },
  limited: { hi: "सीमित", en: "Limited" },
  unavailable: { hi: "अनुपलब्ध", en: "Unavailable" },
  bookSlotTitle: { hi: "अपनी बारी बुक करें", en: "Book Your Distribution Slot" },
  distActive: { hi: "वितरण चालू है", en: "Distribution Active" },
  chooseSlot: { hi: "समय चुनें", en: "Choose a time slot" },
  confirmToken: { hi: "टोकन पक्का करें", en: "Confirm Token" },
  slotCapacityNote: {
    hi: "क्षमता ऑनलाइन और QR दोनों उपयोगकर्ताओं के लिए साझा है — यह लचीला रहता है।",
    en: "Capacity is shared between online and QR users — it stays flexible.",
  },
  unifiedTitle: { hi: "दो तरीके। एक कतार।", en: "Two Ways to Join. One Fair Queue." },
  unifiedSub: {
    hi: "घर से टोकन बुक करें या दुकान पर QR स्कैन करें — दोनों एक ही कतार में जुड़ते हैं।",
    en: "Book from home or scan QR at the shop — both enter the same queue.",
  },
  onlineTokenLbl: { hi: "ऑनलाइन टोकन", en: "Online Token" },
  qrTokenLbl: { hi: "QR / ऑफ़लाइन टोकन", en: "QR / Offline Token" },
  unifiedQueueLbl: { hi: "एकीकृत कतार", en: "Unified Queue" },
  scanTitle: { hi: "दुकान का QR स्कैन करें", en: "Scan FPS QR" },
  scanSub: { hi: "क्या आप दुकान पर हैं? QR स्कैन करके कतार में शामिल हों।", en: "At the ration shop? Scan the QR to join the queue." },
  tapToScan: { hi: "स्कैन करने हेतु टैप करें (डेमो)", en: "Tap to simulate scan" },
  fpsVerified: { hi: "दुकान सत्यापित ✓", en: "FPS Verified ✓" },
  verifyDetails: { hi: "अपना विवरण जांचें", en: "Verify your details" },
  generateToken: { hi: "टोकन बनाएं", en: "Generate Token" },
  yourToken: { hi: "आपका टोकन", en: "Your Token" },
  scheduled: { hi: "निर्धारित समय", en: "Scheduled" },
  status: { hi: "स्थिति", en: "Status" },
  waiting: { hi: "प्रतीक्षा में", en: "Waiting" },
  serving: { hi: "सेवा में", en: "Serving" },
  completed: { hi: "पूर्ण", en: "Completed" },
  noshow: { hi: "अनुपस्थित", en: "No Show" },
  viewLiveQueue: { hi: "लाइव कतार देखें", en: "View Live Queue" },
  getDirections: { hi: "रास्ता दिखाएं", en: "Get Directions" },
  liveQueueTitle: { hi: "लाइव कतार", en: "Live Queue" },
  upcomingTokens: { hi: "आगामी टोकन", en: "Upcoming Tokens" },
  yourTokenTag: { hi: "आपका टोकन", en: "Your token" },
  notifTitle: { hi: "सूचनाएं", en: "Notifications" },
  historyTitle: { hi: "राशन इतिहास", en: "Transaction History" },
  noHistoryYet: { hi: "अभी तक कोई नई प्राप्ति नहीं", en: "No new distribution yet" },
  profileTitle: { hi: "प्रोफ़ाइल", en: "Profile" },
  logout: { hi: "लॉग आउट", en: "Log Out" },
  fpsStock: { hi: "दुकान स्टॉक स्थिति", en: "FPS Stock Status" },
  disclaimerShort: {
    hi: "यह एक छात्र प्रोटोटाइप है — सरकारी डेटाबेस से नहीं जुड़ा।",
    en: "This is a student prototype — not connected to any government database.",
  },
  demoScript: { hi: "डेमो चरण", en: "Demo Steps" },
  // Dealer
  dealerPortal: { hi: "डीलर पोर्टल", en: "Dealer Portal" },
  officialPortal: { hi: "आधिकारिक पोर्टल", en: "Official Portal" },
  dealerLogin: { hi: "डीलर लॉगिन", en: "Dealer Login" },
  dealerId: { hi: "FPS / डीलर ID", en: "FPS / Dealer ID" },
  dealerPin: { hi: "सुरक्षा PIN", en: "Security PIN" },
  dealerSignIn: { hi: "पोर्टल में प्रवेश करें", en: "Sign in to portal" },
  demoDealerHint: { hi: "डेमो: FPS-102 और PIN 1234", en: "Demo: FPS-102 and PIN 1234" },
  invalidDealerLogin: { hi: "गलत ID या PIN। डेमो विवरण जांचें।", en: "Incorrect ID or PIN. Check the demo details." },
  todaysOverview: { hi: "आज का सारांश", en: "Today's Overview" },
  totalTokens: { hi: "कुल टोकन", en: "Total Tokens" },
  avgWait: { hi: "औसत प्रतीक्षा", en: "Average Wait" },
  callNext: { hi: "अगला टोकन बुलाएं", en: "Call Next Token" },
  markNoShow: { hi: "अनुपस्थित घोषित करें", en: "Mark No-Show" },
  verifyToken: { hi: "टोकन सत्यापित करें", en: "Verify Token" },
  enterTokenId: { hi: "टोकन संख्या डालें", en: "Enter token number" },
  beneficiary: { hi: "लाभार्थी", en: "Beneficiary" },
  completeDistribution: { hi: "वितरण पूर्ण करें", en: "Complete Distribution" },
  generateOtp: { hi: "वितरण सत्यापन शुरू करें", en: "Start distribution verification" },
  enterDistributionOtp: { hi: "लाभार्थी का टोकन दोबारा दर्ज करें", en: "Re-enter beneficiary token" },
  otpSentDemo: { hi: "डेमो में टोकन ही OTP है", en: "In this demo, the token acts as the OTP" },
  otpRequired: { hi: "वितरण पूरा करने के लिए OTP आवश्यक है।", en: "OTP is required to complete distribution." },
  invalidOtp: { hi: "गलत OTP। कृपया लाभार्थी से फिर पूछें।", en: "Incorrect OTP. Ask the beneficiary again." },
  beneficiaryNameOnly: { hi: "केवल लाभार्थी का नाम दिखाया गया है", en: "Only beneficiary name is shown" },
  distCompleted: { hi: "वितरण पूर्ण हुआ ✓", en: "Distribution Completed ✓" },
  mode: { hi: "तरीका", en: "Mode" },
  time: { hi: "समय", en: "Time" },
  token: { hi: "टोकन", en: "Token" },
  // Admin
  adminPortal: { hi: "एडमिन विश्लेषण", en: "Admin Analytics" },
  aiPrediction: { hi: "AI-सहायित अनुमान", en: "AI-assisted Prediction" },
  aiAnomaly: { hi: "AI असामान्यता चेतावनी", en: "AI Anomaly Alert" },
  aiDemand: { hi: "AI मांग पूर्वानुमान", en: "AI Demand Forecast" },
  noShows: { hi: "अनुपस्थित", en: "No-Shows" },
  roleSwitch: { hi: "डेमो दृश्य", en: "Demo View" },
  roleBen: { hi: "लाभार्थी", en: "Beneficiary" },
  roleDealer: { hi: "आधिकारिक पोर्टल", en: "Official Portal" },
  roleAdmin: { hi: "एडमिन", en: "Admin" },

  // e-Ration Card
  eCardTitle: { hi: "डिजिटल ई-राशन कार्ड", en: "Digital e-Ration Card" },
  cardType: { hi: "कार्ड प्रकार", en: "Card Type" },
  cardCategory: { hi: "श्रेणी", en: "Category" },
  ekycStatus: { hi: "e-KYC स्थिति", en: "e-KYC Status" },
  ekycVerified: { hi: "सत्यापित", en: "Verified" },
  ekycPending: { hi: "लंबित", en: "Pending" },
  priorityHousehold: { hi: "प्राथमिकता परिवार (PHH)", en: "Priority Household (PHH)" },
  issuedQty: { hi: "वितरित", en: "Issued" },
  remainingQty: { hi: "शेष", en: "Remaining" },

  // Family
  viewFamily: { hi: "परिवार देखें", en: "View Family" },
  familyTitle: { hi: "परिवार सदस्य", en: "Family Members" },
  relationship: { hi: "संबंध", en: "Relationship" },
  age: { hi: "आयु", en: "Age" },
  self: { hi: "स्वयं", en: "Self" },
  spouse: { hi: "पति/पत्नी", en: "Spouse" },
  son: { hi: "पुत्र", en: "Son" },
  daughter: { hi: "पुत्री", en: "Daughter" },
  mother: { hi: "माता", en: "Mother" },

  // Receipts / history
  viewReceipt: { hi: "रसीद देखें", en: "View Receipt" },
  receiptTitle: { hi: "डिजिटल रसीद", en: "Digital Receipt" },
  transactionId: { hi: "लेन-देन ID", en: "Transaction ID" },
  date: { hi: "तारीख", en: "Date" },
  shop: { hi: "दुकान", en: "Shop" },
  itemsDistributed: { hi: "वितरित सामग्री", en: "Items Distributed" },
  downloadReceipt: { hi: "रसीद डाउनलोड करें", en: "Download Receipt" },

  // Stock
  outOfStock: { hi: "अनुपलब्ध", en: "Out of Stock" },
  shopLevelNote: { hi: "यह जानकारी केवल आपकी दुकान के स्तर पर है।", en: "This information is at your assigned shop's level only." },

  // Complaints
  complaintsTitle: { hi: "शिकायत / विसंगति", en: "Complaints / Discrepancy" },
  fileComplaint: { hi: "+ नई शिकायत दर्ज करें", en: "+ File a New Complaint" },
  noComplaintsYet: { hi: "अभी तक कोई शिकायत दर्ज नहीं", en: "No complaints filed yet" },
  complaintId: { hi: "शिकायत ID", en: "Complaint ID" },
  complaintType: { hi: "समस्या का प्रकार चुनें", en: "Select issue type" },
  complaintDesc: { hi: "समस्या का विवरण (वैकल्पिक)", en: "Describe the issue (optional)" },
  submitComplaint: { hi: "शिकायत जमा करें", en: "Submit Complaint" },
  statusSubmitted: { hi: "जमा हुई", en: "Submitted" },
  statusReview: { hi: "समीक्षा में", en: "Under Review" },
  statusResolved: { hi: "समाधान हुआ", en: "Resolved" },
  advanceDemo: { hi: "स्थिति अपडेट करें (डेमो)", en: "Update Status (demo)" },
  issueUnderweigh: { hi: "कम तौल", en: "Under-weighing" },
  issueWrongQty: { hi: "गलत मात्रा", en: "Incorrect quantity" },
  issueNoStock: { hi: "स्टॉक अनुपलब्ध", en: "Stock unavailable" },
  issueNotReceived: { hi: "लेन-देन दिखा पर राशन नहीं मिला", en: "Transaction shown but ration not received" },
  issueDealer: { hi: "डीलर संबंधी समस्या", en: "Dealer-related issue" },
  issueOther: { hi: "अन्य समस्या", en: "Other issue" },
  optionalTokenRef: { hi: "संबंधित टोकन (वैकल्पिक)", en: "Related token (optional)" },

  // Dealer enhancements
  onlineTokensLbl: { hi: "ऑनलाइन टोकन", en: "Online Tokens" },
  qrTokensLbl: { hi: "QR टोकन", en: "QR Tokens" },
  pendingBeneficiaries: { hi: "प्रतीक्षारत लाभार्थी", en: "Pending Beneficiaries" },
  estCompletion: { hi: "अनुमानित समापन", en: "Est. Completion" },
  cancelToken: { hi: "टोकन रद्द करें", en: "Cancel Token" },
  cancelTokenConfirm: { hi: "क्या आप यह टोकन रद्द करना चाहते हैं?", en: "Do you want to cancel this token?" },
  tokenCancelled: { hi: "टोकन रद्द हो गया", en: "Token Cancelled" },
  cancelBeforeVisit: { hi: "निर्धारित समय से पहले रद्द किया जा सकता है।", en: "You can cancel before the scheduled time." },
  entitlementCompare: { hi: "आधिकारिक हक़ बनाम वितरित मात्रा", en: "Official entitlement vs distributed" },
  auditTimeline: { hi: "वितरण ऑडिट समयरेखा", en: "Distribution audit timeline" },
  stockAlert: { hi: "दुकान स्टॉक चेतावनी", en: "Shop stock alert" },
  demoSecurityNote: { hi: "यह डेमो है: असली OTP केवल लाभार्थी के फोन पर भेजा जाएगा।", en: "Demo only: a production OTP must be sent privately to the beneficiary." },
};

const LangCtx = createContext({ lang: "hi", t: (k) => k });
function useT() {
  const { lang, t } = useContext(LangCtx);
  return { lang, t };
}

/* =========================================================================
   APP STATE — the unified queue engine
   ========================================================================= */
const initialQueue = [
  { id: "A120", mode: "online", status: "serving", time: "9:10", name: "सुनीता देवी / Sunita Devi" },
  { id: "A121", mode: "qr", status: "waiting", time: "9:30", name: "राजेश कुमार / Rajesh Kumar" },
  { id: "A122", mode: "online", status: "waiting", time: "9:50", name: "मोहित वर्मा / Mohit Verma" },
  { id: "A123", mode: "qr", status: "waiting", time: "10:10", name: "कविता बाई / Kavita Bai" },
];

/* Digital e-Ration Card demo data (Requirement: keep realistic, government-service-like) */
const CARD_INFO = {
  cardNo: "MP-45-1234-5678",
  name: "सीमा देवी / Seema Devi",
  categoryKey: "priorityHousehold",
  ekyc: "ekycVerified",
  familyCount: 5,
};

const FAMILY_MEMBERS = [
  { name: "सीमा देवी / Seema Devi", relKey: "self", age: 34, ekyc: "ekycVerified" },
  { name: "रमेश कुमार / Ramesh Kumar", relKey: "spouse", age: 38, ekyc: "ekycVerified" },
  { name: "आरव कुमार / Aarav Kumar", relKey: "son", age: 12, ekyc: "ekycVerified" },
  { name: "अंशिका कुमारी / Anshika Kumari", relKey: "daughter", age: 8, ekyc: "ekycPending" },
  { name: "कमला देवी / Kamla Devi", relKey: "mother", age: 61, ekyc: "ekycVerified" },
];

const RECEIPT_ITEMS_DEFAULT = [
  { name: { hi: "गेहूं", en: "Wheat" }, entitled: "5 kg", qty: "5 kg" },
  { name: { hi: "चावल", en: "Rice" }, entitled: "5 kg", qty: "5 kg" },
  { name: { hi: "चीनी", en: "Sugar" }, entitled: "1 kg", qty: "1 kg" },
];

const initialState = {
  queue: initialQueue,
  userTokenId: null, // set once beneficiary books/scans
  notifications: [
    { icon: "bell", title: { hi: "मासिक हक़ उपलब्ध है", en: "Monthly Entitlement Available" }, body: { hi: "सितंबर 2026 के लिए आपका मासिक हक़ उपलब्ध है।", en: "Your monthly entitlement for September 2026 is available." } },
  ],
  history: [
    {
      month: { hi: "अगस्त 2026", en: "August 2026" }, token: "A089", status: "completed",
      date: "14 August 2026", shop: "FPS-102 · Shanti Nagar", txnId: "TXN-20260814-089",
      items: RECEIPT_ITEMS_DEFAULT,
    },
    {
      month: { hi: "जुलाई 2026", en: "July 2026" }, token: "A052", status: "completed",
      date: "12 July 2026", shop: "FPS-102 · Shanti Nagar", txnId: "TXN-20260712-052",
      items: RECEIPT_ITEMS_DEFAULT,
    },
  ],
  complaints: [],
  completedCount: 34,
  totalToday: 42,
  avgWaitMin: 18,
  pendingDistribution: null,
  auditLog: [
    { event: "Token created", detail: "Demo queue initialized", time: "09:00 AM" },
  ],
};

const STORAGE_KEY = "ration-setu-demo-state-v1";

function loadInitialState() {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;
    const parsed = JSON.parse(saved);
    return {
      ...initialState,
      ...parsed,
      queue: Array.isArray(parsed.queue) ? parsed.queue : initialState.queue,
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : initialState.notifications,
      history: Array.isArray(parsed.history) ? parsed.history : initialState.history,
      complaints: Array.isArray(parsed.complaints) ? parsed.complaints : initialState.complaints,
      auditLog: Array.isArray(parsed.auditLog) ? parsed.auditLog : initialState.auditLog,
    };
  } catch {
    return initialState;
  }
}

let complaintSeq = 1042;

let slotClock = 630; // minutes after 9:00 => next slot at 10:30

function nextSlotLabel() {
  slotClock += 20;
  const h = Math.floor(slotClock / 60) + 9;
  const m = slotClock % 60;
  const hour12 = h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function auditEntry(event, detail) {
  return { event, detail, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
}

function reducer(state, action) {
  switch (action.type) {
    case "BOOK_ONLINE": {
      if (state.queue.some((q) => q.id === "A124")) return state;
      const time = "10:30 AM";
      const newQueue = [...state.queue, { id: "A124", mode: "online", status: "waiting", time, name: "सीमा देवी / Seema Devi (आप/You)" }];
      return {
        ...state,
        queue: newQueue,
        userTokenId: "A124",
        auditLog: [auditEntry("Token created", "A124 online booking"), ...state.auditLog],
        notifications: [
          { icon: "check", title: { hi: "ऑनलाइन स्लॉट पक्का हुआ", en: "Online Slot Confirmed" }, body: { hi: "आपका ऑनलाइन स्लॉट पक्का हो गया है। टोकन A124, 10:30 AM के लिए बुक हुआ।", en: "Your online slot is confirmed. Token A124 booked for 10:30 AM." } },
          ...state.notifications,
        ],
      };
    }
    case "GENERATE_QR_TOKEN": {
      // dealer / walk-in flow — generates A125 into the SAME queue
      if (state.queue.some((q) => q.id === "A125")) return state;
      const time = nextSlotLabel();
      const newQueue = [...state.queue, { id: "A125", mode: "qr", status: "waiting", time, name: "इमरान खान / Imran Khan" }];
      return { ...state, queue: newQueue, userTokenId: "A125", auditLog: [auditEntry("Token created", "A125 offline QR"), ...state.auditLog] };
    }
    case "CANCEL_TOKEN": {
      if (!state.userTokenId) return state;
      const token = state.queue.find((q) => q.id === state.userTokenId);
      if (!token || token.status !== "waiting") return state;
      return {
        ...state,
        queue: state.queue.filter((q) => q.id !== state.userTokenId),
        userTokenId: null,
        auditLog: [auditEntry("Token cancelled", token.id), ...state.auditLog],
        notifications: [
          { icon: "check", title: { hi: "टोकन रद्द हो गया", en: "Token Cancelled" }, body: { hi: `टोकन ${token.id} रद्द कर दिया गया है।`, en: `Token ${token.id} has been cancelled.` } },
          ...state.notifications,
        ],
      };
    }
    case "GENERATE_DISTRIBUTION_OTP": {
      const token = state.queue.find((q) => q.id === action.tokenId);
      if (!token || token.status !== "serving") return state;
      return { ...state, pendingDistribution: { tokenId: token.id, otp: token.id } };
    }
    case "COMPLETE_DISTRIBUTION": {
      const pending = state.pendingDistribution;
      if (!pending || pending.tokenId !== action.tokenId || pending.otp !== action.otp) return state;
      const completedQueue = state.queue.map((q) => q.id === pending.tokenId ? { ...q, status: "completed" } : q);
      const nextWaiting = completedQueue.findIndex((q) => q.status === "waiting");
      const queue = nextWaiting === -1
        ? completedQueue
        : completedQueue.map((q, index) => index === nextWaiting ? { ...q, status: "serving" } : q);
      const completedToken = state.queue.find((q) => q.id === pending.tokenId);
      const isUserToken = pending.tokenId === state.userTokenId;
      return {
        ...state,
        queue,
        pendingDistribution: null,
        completedCount: state.completedCount + 1,
        history: isUserToken && completedToken ? [{
          month: { hi: "सितंबर 2026", en: "September 2026" }, token: completedToken.id, status: "completed",
          date: "15 September 2026", shop: "FPS-102 · Shanti Nagar", txnId: `TXN-20260915-${completedToken.id}`,
          items: action.items || RECEIPT_ITEMS_DEFAULT,
          audit: [auditEntry("Distribution verified", `Token ${pending.tokenId}`), ...state.auditLog],
        }, ...state.history] : state.history,
        auditLog: [
          auditEntry("OTP verified", `Token ${pending.tokenId}; distribution recorded`),
          ...state.auditLog,
        ],
        notifications: isUserToken ? [
          { icon: "check", title: { hi: "राशन सफलतापूर्वक वितरित हुआ", en: "Ration Distributed Successfully" }, body: { hi: `टोकन ${pending.tokenId} का वितरण OTP से सत्यापित हुआ।`, en: `Distribution for token ${pending.tokenId} was verified by OTP.` } },
          ...state.notifications,
        ] : state.notifications,
      };
    }
    case "CALL_NEXT": {
      const q = [...state.queue];
      const servingIdx = q.findIndex((t) => t.status === "serving");
      if (servingIdx !== -1) return state;
      const nextIdx = q.findIndex((t) => t.status === "waiting");
      if (nextIdx !== -1) {
        q[nextIdx] = { ...q[nextIdx], status: "serving" };
      }
      const called = nextIdx === -1 ? null : q[nextIdx];
      return {
        ...state,
        queue: q,
        auditLog: called ? [auditEntry("Token called", called.id), ...state.auditLog] : state.auditLog,
      };
    }
    case "MARK_NOSHOW": {
      const q = [...state.queue];
      const servingIdx = q.findIndex((t) => t.status === "serving");
      if (servingIdx === -1) return state;
      q[servingIdx] = { ...q[servingIdx], status: "noshow" };
      const nextIdx = q.findIndex((t) => t.status === "waiting");
      if (nextIdx !== -1) q[nextIdx] = { ...q[nextIdx], status: "serving" };
      return { ...state, queue: q };
    }
    case "FILE_COMPLAINT": {
      complaintSeq += 1;
      const complaint = {
        id: `RS-CMP-${complaintSeq}`,
        typeKey: action.typeKey,
        desc: action.desc || "",
        tokenRef: action.tokenRef || "",
        status: "submitted",
        date: "12 September 2026",
      };
      return { ...state, complaints: [complaint, ...state.complaints] };
    }
    case "ADVANCE_COMPLAINT": {
      const order = ["submitted", "review", "resolved"];
      const complaints = state.complaints.map((c) => {
        if (c.id !== action.id) return c;
        const idx = order.indexOf(c.status);
        const next = order[Math.min(idx + 1, order.length - 1)];
        return { ...c, status: next };
      });
      return { ...state, complaints };
    }
    default:
      return state;
  }
}

/* =========================================================================
   SMALL UI PRIMITIVES
   ========================================================================= */
function Btn({ children, onClick, variant = "primary", icon: Icon, full, disabled, size = "md" }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "Inter, sans-serif", fontWeight: 600,
    borderRadius: 14, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", transition: "transform .12s ease, opacity .12s ease",
    opacity: disabled ? 0.5 : 1, width: full ? "100%" : "auto",
  };
  const sizes = { md: { padding: "13px 20px", fontSize: 15 }, sm: { padding: "9px 14px", fontSize: 13.5 } };
  const variants = {
    primary: { background: C.navy, color: C.white },
    green: { background: C.green, color: C.white },
    gold: { background: C.gold, color: C.navyDeep },
    outline: { background: "transparent", color: C.navy, border: `1.5px solid ${C.navy}` },
    ghost: { background: C.cream, color: C.navy },
    danger: { background: "transparent", color: C.red, border: `1.5px solid ${C.red}` },
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
    >
      {Icon && <Icon size={size === "sm" ? 15 : 18} />}
      {children}
    </button>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.white, borderRadius: 18, padding: 16,
        border: `1px solid ${C.greyLine}`, boxShadow: "0 1px 3px rgba(15,42,74,0.05)",
        cursor: onClick ? "pointer" : "default", ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatusPill({ status }) {
  const { t } = useT();
  const map = {
    waiting: { bg: C.goldBg, fg: "#8A6410", label: t(dict.waiting) },
    serving: { bg: C.greenBg, fg: C.green, label: t(dict.serving) },
    completed: { bg: "#EAF0F6", fg: C.grey, label: t(dict.completed) },
    noshow: { bg: C.redBg, fg: C.red, label: t(dict.noshow) },
  };
  const s = map[status] || map.waiting;
  return (
    <span style={{ background: s.bg, color: s.fg, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function StockPill({ level }) {
  const { t } = useT();
  const map = {
    available: { bg: C.greenBg, fg: C.green, label: t(dict.available) },
    limited: { bg: C.goldBg, fg: "#8A6410", label: t(dict.limited) },
    out: { bg: C.redBg, fg: C.red, label: t(dict.outOfStock) },
  };
  const s = map[level] || map.available;
  return (
    <span style={{ background: s.bg, color: s.fg, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function EkycPill({ statusKey }) {
  const { t } = useT();
  const verified = statusKey === "ekycVerified";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700,
      padding: "3px 9px", borderRadius: 999,
      background: verified ? C.greenBg : C.goldBg, color: verified ? C.green : "#8A6410",
    }}>
      <CheckCircle2 size={11} />
      {t(dict[statusKey])}
    </span>
  );
}

function ModePill({ mode }) {
  const { t } = useT();
  const isOnline = mode === "online";
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999,
      background: isOnline ? "#EAF0FB" : "#FBEFE0", color: isOnline ? "#2A5CA8" : "#9C6A16",
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      {isOnline ? <Phone size={10} /> : <QrCode size={10} />}
      {isOnline ? t(dict.onlineTokenLbl) : t(dict.qrTokenLbl)}
    </span>
  );
}

function ScreenHeader({ title, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 20px 6px" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: C.cream, border: "none", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronLeft size={18} color={C.navy} />
        </button>
      )}
      <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 19, fontWeight: 700, color: C.navy, margin: 0 }}>{title}</h2>
    </div>
  );
}

function Logo({ size = 34 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <img
        src={LOGO_SRC}
        alt="Ration Setu"
        style={{ width: size, height: size, objectFit: "contain", flexShrink: 0, display: "block" }}
      />
      <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: size * 0.5, color: C.navy, letterSpacing: -0.3 }}>
        Ration<span style={{ color: C.green }}>Setu</span>
      </span>
    </div>
  );
}

/* Unified queue visual — the single "bold" design moment */
function UnifiedQueueDiagram() {
  const { t } = useT();
  return (
    <div style={{ background: C.navy, borderRadius: 20, padding: "22px 18px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(232,169,60,0.12)" }} />
      <p style={{ color: C.gold, fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 15.5, margin: "0 0 14px", position: "relative" }}>
        {t(dict.unifiedTitle)}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 10px", marginBottom: 8 }}>
            <Phone size={14} color="#8FB8E8" />
            <span style={{ color: "#CFE0F5", fontSize: 12.5, fontWeight: 600 }}>{t(dict.onlineTokenLbl)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 10px" }}>
            <QrCode size={14} color="#F0C77E" />
            <span style={{ color: "#F3DBAE", fontSize: 12.5, fontWeight: 600 }}>{t(dict.qrTokenLbl)}</span>
          </div>
        </div>
        <ArrowRight size={20} color="rgba(255,255,255,0.4)" />
        <div style={{ background: C.gold, color: C.navyDeep, borderRadius: 12, padding: "16px 14px", fontWeight: 800, fontFamily: "Poppins, sans-serif", fontSize: 13, textAlign: "center", lineHeight: 1.25, minWidth: 90 }}>
          {t(dict.unifiedQueueLbl)}
        </div>
      </div>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: "14px 0 0", position: "relative" }}>{t(dict.unifiedSub)}</p>
    </div>
  );
}

/* Login page background (Requirement: used ONLY on the Login screen, unmodified) */
import LOGIN_BG from "../assets/login-bg.png";

/* =========================================================================
   RESPONSIVE APP SHELL (replaces the old fixed-size phone-bezel mockup)
   Mobile: fills the viewport naturally, like a real mobile web app.
   Tablet/Desktop: becomes a centered, softly-rounded content column —
   NOT a phone mockup — so the site reads as a proper responsive web app.
   ========================================================================= */
function AppShell({ children, footer }) {
  return (
    <div className="rs-shell">
      <div className="rs-shell-scroll">{children}</div>
      {footer && <div className="rs-shell-footer">{footer}</div>}
    </div>
  );
}


function BottomNav({ active, onNav }) {
  const { t } = useT();
  const items = [
    { key: "home", label: t(dict.home), icon: Home },
    { key: "queue", label: t(dict.queue), icon: Users },
    { key: "notif", label: t(dict.notif), icon: Bell },
    { key: "profile", label: t(dict.profile), icon: User },
  ];
  return (
    <div style={{ display: "flex", background: C.white, borderTop: `1px solid ${C.greyLine}`, padding: "8px 4px 12px" }}>
      {items.map((it) => {
        const isActive = active === it.key;
        return (
          <button key={it.key} onClick={() => onNav(it.key)} style={{
            flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 0",
          }}>
            <it.icon size={19} color={isActive ? C.navy : C.grey} strokeWidth={isActive ? 2.4 : 2} />
            <span style={{ fontSize: 10.5, fontWeight: isActive ? 700 : 500, color: isActive ? C.navy : C.grey }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   BENEFICIARY SCREENS
   ========================================================================= */
function SplashScreen({ onStart }) {
  const { t } = useT();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "50px 28px 34px", background: `linear-gradient(180deg, ${C.bg} 0%, #F4EEDD 100%)`, textAlign: "center" }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: C.grey, letterSpacing: 0.4, background: C.cream, padding: "5px 12px", borderRadius: 999 }}>
        {t(dict.studentProto)}
      </span>
      <div>
        <img
          src={LOGO_SRC}
          alt="Ration Setu"
          style={{ margin: "0 auto 22px", width: 92, height: 92, objectFit: "contain", display: "block" }}
        />
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 30, color: C.navy, margin: "0 0 8px" }}>
          Ration<span style={{ color: C.green }}>Setu</span>
        </h1>
        <p style={{ fontSize: 15.5, color: C.navy, fontWeight: 600, margin: "0 0 6px" }}>{t(dict.tagline)}</p>
        <p style={{ fontSize: 13, color: C.grey, margin: 0 }}>{t(dict.usp)}</p>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
          <button type="button" onClick={() => onStart("hi")} style={{ flex: 1, border: `1.5px solid ${C.green}`, background: C.greenBg, color: C.green, borderRadius: 10, padding: "9px 8px", fontWeight: 700, cursor: "pointer" }}>हिंदी</button>
          <button type="button" onClick={() => onStart("en")} style={{ flex: 1, border: `1.5px solid ${C.navy}`, background: C.white, color: C.navy, borderRadius: 10, padding: "9px 8px", fontWeight: 700, cursor: "pointer" }}>English</button>
        </div>
        <Btn full icon={ArrowRight} onClick={() => onStart()}>{t(dict.getStarted)}</Btn>
        <p style={{ fontSize: 10.5, color: C.grey, marginTop: 14 }}>{t(dict.disclaimerShort)}</p>
      </div>
    </div>
  );
}

function LoginScreen({ onDone }) {
  const { t } = useT();
  const [step, setStep] = useState(0); // 0 mobile, 1 otp, 2 card, done
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [card, setCard] = useState("");

  return (
    <div style={{ position: "relative", minHeight: "100%", overflow: "hidden" }}>
      {/* Background layer — blurred, ONLY on this screen. Not applied to any sibling/child content. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url(${LOGIN_BG})`, backgroundSize: "cover", backgroundPosition: "center",
          filter: "blur(10px)", transform: "scale(1.1)", // scale hides blurred edge fringing
        }}
      />
      {/* Readability overlay — sits between the blurred image and the sharp content */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(250,247,240,0.86)" }} />

      {/* Sharp foreground content — untouched by the blur filter above */}
      <div style={{ position: "relative", zIndex: 2, padding: "26px 22px" }}>
        <Logo size={38} />
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: C.navy, margin: "26px 0 22px" }}>{t(dict.welcome)}</h2>

        {step === 0 && (
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: C.grey }}>{t(dict.mobileNumber)}</label>
            <div style={{ display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.greyLine}`, borderRadius: 12, padding: "12px 14px", margin: "8px 0 20px" }}>
              <span style={{ color: C.grey, marginRight: 8, fontWeight: 600 }}>+91</span>
              <input value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98XXXXXXXX"
                style={{ border: "none", outline: "none", fontSize: 15, flex: 1, background: "transparent", fontFamily: "Inter" }} />
            </div>
            <Btn full icon={Phone} disabled={mobile.length < 10} onClick={() => setStep(1)}>{t(dict.sendOtp)}</Btn>
          </div>
        )}

        {step === 1 && (
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: C.grey }}>{t(dict.enterOtp)}</label>
            <div style={{ margin: "8px 0 6px" }}>
              <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="••••••"
                style={{ width: "100%", boxSizing: "border-box", letterSpacing: 8, textAlign: "center", fontSize: 20, border: `1.5px solid ${C.greyLine}`, borderRadius: 12, padding: "12px 14px", fontFamily: "Inter", outline: "none" }} />
            </div>
            <p style={{ fontSize: 11.5, color: C.grey, margin: "0 0 20px" }}>{t(dict.demoOtpHint)}</p>
            <Btn full icon={KeyRound} disabled={otp.length < 6} onClick={() => setStep(2)}>{t(dict.verify)}</Btn>
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: C.grey }}>{t(dict.rationCardNumber)}</label>
            <div style={{ margin: "8px 0 20px" }}>
              <input value={card} onChange={(e) => setCard(e.target.value)} placeholder="MP-45-1234-5678"
                style={{ width: "100%", boxSizing: "border-box", fontSize: 15, border: `1.5px solid ${C.greyLine}`, borderRadius: 12, padding: "12px 14px", fontFamily: "Inter", outline: "none" }} />
            </div>
            <Btn full icon={IdCard} disabled={card.length < 4} onClick={onDone}>{t(dict.continue)}</Btn>
          </div>
        )}

        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 28 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: i <= step ? C.green : C.greyLine }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DealerLoginScreen({ onLogin }) {
  const { t } = useT();
  const [dealerId, setDealerId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (dealerId.trim().toUpperCase() === "FPS-102" && pin === "1234") {
      setError("");
      onLogin();
      return;
    }
    setError(t(dict.invalidDealerLogin));
  };

  return (
    <div style={{ maxWidth: 460, width: "100%", margin: "0 auto" }}>
      <Card style={{ padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <Logo size={52} />
          <h2 style={{ fontFamily: "Poppins, sans-serif", color: C.navy, fontSize: 22, margin: "14px 0 5px" }}>{t(dict.dealerLogin)}</h2>
          <p style={{ color: C.grey, fontSize: 12.5, margin: 0 }}>{t(dict.officialPortal)}</p>
        </div>
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: C.grey, marginBottom: 7 }}>{t(dict.dealerId)}</label>
        <input
          value={dealerId}
          onChange={(e) => setDealerId(e.target.value)}
          placeholder="FPS-102"
          autoComplete="username"
          style={{ width: "100%", border: `1.5px solid ${C.greyLine}`, borderRadius: 10, padding: "12px 13px", fontSize: 14, outline: "none", marginBottom: 14 }}
        />
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: C.grey, marginBottom: 7 }}>{t(dict.dealerPin)}</label>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          placeholder="••••"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          style={{ width: "100%", border: `1.5px solid ${C.greyLine}`, borderRadius: 10, padding: "12px 13px", fontSize: 14, outline: "none", marginBottom: 8 }}
        />
        <p style={{ color: C.grey, fontSize: 11.5, margin: "0 0 16px" }}>{t(dict.demoDealerHint)}</p>
        {error && <p role="alert" style={{ color: C.red, fontSize: 12.5, margin: "0 0 12px" }}>{error}</p>}
        <Btn full icon={ShieldCheck} disabled={!dealerId.trim() || pin.length !== 4} onClick={submit}>{t(dict.dealerSignIn)}</Btn>
      </Card>
    </div>
  );
}

function HomeScreen({ state, dispatch, onNav, lang, setLang }) {
  const { t } = useT();
  const userToken = state.queue.find((q) => q.id === state.userTokenId);
  const uIdx = state.queue.findIndex((q) => q.id === state.userTokenId);
  const ahead = uIdx === -1 ? 0 : state.queue.slice(0, uIdx).filter((q) => q.status === "waiting" || q.status === "serving").length;
  const serving = state.queue.find((q) => q.status === "serving");

  return (
    <div style={{ padding: "18px 18px 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo size={32} />
        <button onClick={() => setLang(lang === "hi" ? "en" : "hi")} style={{ display: "flex", alignItems: "center", gap: 5, background: C.cream, border: "none", borderRadius: 999, padding: "6px 11px", cursor: "pointer" }}>
          <Languages size={13} color={C.navy} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: C.navy }}>{lang === "hi" ? "EN" : "हि"}</span>
        </button>
      </div>

      <p style={{ fontSize: 16, color: C.navy, fontWeight: 600, margin: "18px 0 14px" }}>{t(dict.namaste)}, सीमा जी 👋</p>

      <Card style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 8px" }}>{t(dict.myRationCard)}</p>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, color: C.navy, margin: "0 0 10px" }}>MP-45-1234-5678</p>
        <div style={{ display: "flex", gap: 18 }}>
          <div>
            <p style={{ fontSize: 10.5, color: C.grey, margin: 0 }}>{t(dict.familyMembers)}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.navy, margin: "2px 0 0" }}>5</p>
          </div>
          <div>
            <p style={{ fontSize: 10.5, color: C.grey, margin: 0 }}>{t(dict.assignedFps)}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.navy, margin: "2px 0 0" }}>FPS-102, Shanti Nagar</p>
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: 0 }}>{t(dict.currentQueue)}</p>
          {serving && <StatusPill status="serving" />}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 10.5, color: C.grey, margin: 0 }}>{t(dict.nowServing)}</p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.green, margin: "2px 0 0" }}>{serving ? serving.id : "—"}</p>
          </div>
          <div>
            <p style={{ fontSize: 10.5, color: C.grey, margin: 0 }}>{t(dict.myToken)}</p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.navy, margin: "2px 0 0" }}>{userToken ? userToken.id : "—"}</p>
          </div>
          <div>
            <p style={{ fontSize: 10.5, color: C.grey, margin: 0 }}>{t(dict.peopleAhead)}</p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 800, color: C.navy, margin: "2px 0 0" }}>{userToken ? ahead : "—"}</p>
          </div>
        </div>
        {userToken && (
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 12, color: C.grey, margin: "0 0 10px" }}>{t(dict.estWait)}: <b style={{ color: C.navy }}>{ahead * 6} {t(dict.min)}</b></p>
            {userToken.status === "waiting" && (
              <Btn
                full
                size="sm"
                variant="danger"
                icon={AlertTriangle}
                onClick={() => {
                  if (window.confirm(t(dict.cancelTokenConfirm))) dispatch({ type: "CANCEL_TOKEN" });
                }}
              >
                {t(dict.cancelToken)}
              </Btn>
            )}
          </div>
        )}
      </Card>

      {!userToken && (
        <Card style={{ marginBottom: 14, background: C.goldBg, border: "none" }}>
          <p style={{ fontSize: 13, color: "#7A5A0F", fontWeight: 600, margin: "0 0 10px" }}>{t(dict.noTokenYet)}</p>
          <Btn size="sm" icon={Ticket} onClick={() => onNav("book")}>{t(dict.bookNow)}</Btn>
        </Card>
      )}

      <p style={{ fontSize: 11, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 8px" }}>{t(dict.usp)}</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => onNav("book")} style={{
          flex: 1, textAlign: "left", cursor: "pointer", border: "none", borderRadius: 16,
          background: C.navy, color: C.white, padding: "14px 12px",
        }}>
          <Ticket size={20} color={C.gold} style={{ marginBottom: 8 }} />
          <p style={{ margin: 0, fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{t(dict.bookToken)}</p>
          <p style={{ margin: "3px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.65)" }}>{t(dict.bookOnlineDesc)}</p>
        </button>
        <button onClick={() => onNav("scan")} style={{
          flex: 1, textAlign: "left", cursor: "pointer", borderRadius: 16,
          background: C.white, color: C.navy, padding: "14px 12px", border: `1.5px solid ${C.navy}`,
        }}>
          <Scan size={20} color={C.navy} style={{ marginBottom: 8 }} />
          <p style={{ margin: 0, fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{t(dict.scanFpsQr)}</p>
          <p style={{ margin: "3px 0 0", fontSize: 10.5, color: C.grey }}>{t(dict.offlineQrDesc)}</p>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
        <Btn full variant="ghost" size="sm" icon={Wheat} onClick={() => onNav("entitlement")}>{t(dict.viewRationDetails)}</Btn>
        <Btn full variant="ghost" size="sm" icon={Users} onClick={() => onNav("family")}>{t(dict.viewFamily)}</Btn>
        <Btn full variant="ghost" size="sm" icon={History} onClick={() => onNav("profile")}>{t(dict.historyTitle)}</Btn>
        <Btn full variant="ghost" size="sm" icon={AlertTriangle} onClick={() => onNav("complaints")}>{t(dict.complaintsTitle)}</Btn>
      </div>
    </div>
  );
}

function EntitlementScreen({ onBack, onNav }) {
  const { t } = useT();
  const items = [
    { icon: Wheat, name: { hi: "गेहूं", en: "Wheat" }, entitled: "5 kg", issued: "5 kg", remaining: "0 kg", stock: "available" },
    { icon: Package, name: { hi: "चावल", en: "Rice" }, entitled: "5 kg", issued: "5 kg", remaining: "0 kg", stock: "available" },
    { icon: Package, name: { hi: "चीनी", en: "Sugar" }, entitled: "1 kg", issued: "1 kg", remaining: "0 kg", stock: "limited" },
    { icon: Package, name: { hi: "मिट्टी का तेल", en: "Kerosene" }, entitled: "2 L", issued: "0 L", remaining: "2 L", stock: "out" },
  ];
  return (
    <div>
      <ScreenHeader title={t(dict.eCardTitle)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        {/* Digital e-Ration Card */}
        <div style={{ background: C.navy, borderRadius: 18, padding: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 10.5, margin: "0 0 4px", letterSpacing: 0.4 }}>{t(dict.rationCardNumber)}</p>
              <p style={{ color: C.white, fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 16, margin: 0 }}>{CARD_INFO.cardNo}</p>
            </div>
            <IdCard size={26} color={C.gold} />
          </div>
          <p style={{ color: C.white, fontSize: 14, fontWeight: 600, margin: "0 0 10px" }}>{CARD_INFO.name}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, margin: 0 }}>{t(dict.cardCategory)}</p>
              <p style={{ color: C.gold, fontSize: 12.5, fontWeight: 700, margin: "2px 0 0" }}>{t(dict[CARD_INFO.categoryKey])}</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, margin: 0 }}>{t(dict.familyMembers)}</p>
              <p style={{ color: C.white, fontSize: 12.5, fontWeight: 700, margin: "2px 0 0" }}>{CARD_INFO.familyCount}</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, margin: 0 }}>{t(dict.ekycStatus)}</p>
              <div style={{ marginTop: 3 }}><EkycPill statusKey={CARD_INFO.ekyc} /></div>
            </div>
          </div>
        </div>

        {onNav && (
          <Btn full size="sm" variant="ghost" icon={Users} onClick={() => onNav("family")}>{t(dict.viewFamily)}</Btn>
        )}

        <p style={{ fontSize: 12.5, color: C.grey, margin: "18px 0 4px" }}>September 2026 · {t(dict.familyMembers)}: {CARD_INFO.familyCount}</p>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "12px 0 10px" }}>{t(dict.entQty)}</p>
        <div style={{ background: C.goldBg, borderRadius: 12, padding: 11, display: "flex", gap: 8, marginBottom: 12 }}>
          <AlertTriangle size={15} color="#8A6410" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, color: "#7A5A0F", fontSize: 11.5, lineHeight: 1.4 }}>
            {t(dict.stockAlert)}: {t({ hi: "चीनी सीमित है और मिट्टी का तेल उपलब्ध नहीं है।", en: "Sugar is limited and kerosene is out of stock." })}
          </p>
        </div>
        {items.map((it) => (
          <Card key={it.name.en} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <it.icon size={18} color={C.navy} />
                </div>
                <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 14.5 }}>{t(it.name)}</p>
              </div>
              <StockPill level={it.stock} />
            </div>
            <div style={{ display: "flex", gap: 16, paddingLeft: 50 }}>
              <div>
                <p style={{ fontSize: 10, color: C.grey, margin: 0 }}>{t(dict.entQty)}</p>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, margin: "2px 0 0" }}>{it.entitled}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: C.grey, margin: 0 }}>{t(dict.issuedQty)}</p>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, margin: "2px 0 0" }}>{it.issued}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: C.grey, margin: 0 }}>{t(dict.remainingQty)}</p>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, margin: "2px 0 0" }}>{it.remaining}</p>
              </div>
            </div>
          </Card>
        ))}
        <div style={{ background: C.cream, borderRadius: 14, padding: 14, marginTop: 8, display: "flex", gap: 10 }}>
          <Info size={16} color={C.grey} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: C.grey, margin: 0, lineHeight: 1.5 }}>{t(dict.entNote)} {t(dict.shopLevelNote)}</p>
        </div>
      </div>
    </div>
  );
}

function FamilyScreen({ onBack }) {
  const { t } = useT();
  return (
    <div>
      <ScreenHeader title={t(dict.familyTitle)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        {FAMILY_MEMBERS.map((m, i) => (
          <Card key={i} style={{ marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={17} color={C.navy} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 14 }}>{m.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11.5, color: C.grey }}>{t(dict[m.relKey])} · {t(dict.age)} {m.age}</p>
              </div>
            </div>
            <EkycPill statusKey={m.ekyc} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReceiptScreen({ receipt, onBack, lang }) {
  const { t } = useT();
  if (!receipt) return <div><ScreenHeader title={t(dict.receiptTitle)} onBack={onBack} /></div>;
  return (
    <div>
      <ScreenHeader title={t(dict.receiptTitle)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        <div style={{ textAlign: "center", padding: "10px 0 18px" }}>
          <CheckCircle2 size={38} color={C.green} style={{ marginBottom: 8 }} />
          <p style={{ fontWeight: 700, color: C.navy, fontSize: 15, margin: 0 }}>{t(dict.distCompleted)}</p>
        </div>
        <Card style={{ marginBottom: 16 }}>
          <Row label={t(dict.transactionId)} value={receipt.txnId} />
          <Row label={t(dict.token)} value={receipt.token} />
          <Row label={t(dict.date)} value={receipt.date} />
          <Row label={t(dict.shop)} value={receipt.shop} last />
        </Card>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.itemsDistributed)}</p>
        <Card style={{ marginBottom: 16 }}>
          {receipt.items.map((it, i) => (
            <Row key={i} label={it.name[lang]} value={`${it.qty} / ${it.entitled || it.qty}`} last={i === receipt.items.length - 1} />
          ))}
        </Card>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.entitlementCompare)}</p>
        <Card style={{ marginBottom: 16 }}>
          {receipt.items.map((it, i) => (
            <Row key={i} label={it.name[lang]} value={`${it.entitled || it.qty} → ${it.qty}`} last={i === receipt.items.length - 1} />
          ))}
        </Card>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.auditTimeline)}</p>
        <Card style={{ marginBottom: 16 }}>
          {(receipt.audit || []).slice(0, 6).map((entry, i) => (
            <Row key={i} label={entry.event} value={entry.time} last={i === Math.min((receipt.audit || []).length, 6) - 1} />
          ))}
        </Card>
        <Btn full variant="outline" icon={IdCard} onClick={() => {}}>{t(dict.downloadReceipt)}</Btn>
      </div>
    </div>
  );
}

function ComplaintFormScreen({ dispatch, onBack, onSubmitted }) {
  const { t } = useT();
  const types = ["issueUnderweigh", "issueWrongQty", "issueNoStock", "issueNotReceived", "issueDealer", "issueOther"];
  const [typeKey, setTypeKey] = useState(types[0]);
  const [tokenRef, setTokenRef] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div>
      <ScreenHeader title={t(dict.fileComplaint)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.complaintType)}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {types.map((k) => (
            <button key={k} onClick={() => setTypeKey(k)} style={{
              textAlign: "left", padding: "11px 13px", borderRadius: 12, cursor: "pointer", fontSize: 13.5, fontWeight: 600,
              border: `1.5px solid ${typeKey === k ? C.navy : C.greyLine}`,
              background: typeKey === k ? C.navy : C.white, color: typeKey === k ? C.white : C.navy,
            }}>
              {t(dict[k])}
            </button>
          ))}
        </div>

        <label style={{ fontSize: 12, fontWeight: 600, color: C.grey }}>{t(dict.optionalTokenRef)}</label>
        <input value={tokenRef} onChange={(e) => setTokenRef(e.target.value)} placeholder="A124"
          style={{ width: "100%", boxSizing: "border-box", fontSize: 13.5, border: `1.5px solid ${C.greyLine}`, borderRadius: 10, padding: "10px 12px", margin: "6px 0 14px", fontFamily: "Inter", outline: "none" }} />

        <label style={{ fontSize: 12, fontWeight: 600, color: C.grey }}>{t(dict.complaintDesc)}</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3}
          style={{ width: "100%", boxSizing: "border-box", fontSize: 13.5, border: `1.5px solid ${C.greyLine}`, borderRadius: 10, padding: "10px 12px", margin: "6px 0 18px", fontFamily: "Inter", outline: "none", resize: "none" }} />

        <Btn full icon={AlertTriangle} onClick={() => { dispatch({ type: "FILE_COMPLAINT", typeKey, tokenRef, desc }); onSubmitted(); }}>
          {t(dict.submitComplaint)}
        </Btn>
      </div>
    </div>
  );
}

function ComplaintsScreen({ state, dispatch, onBack, onNav }) {
  const { t, lang } = useT();
  const statusMap = { submitted: "statusSubmitted", review: "statusReview", resolved: "statusResolved" };
  const statusColor = { submitted: { bg: C.goldBg, fg: "#8A6410" }, review: { bg: "#EAF0FB", fg: "#2A5CA8" }, resolved: { bg: C.greenBg, fg: C.green } };
  return (
    <div>
      <ScreenHeader title={t(dict.complaintsTitle)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        <Btn full size="sm" icon={AlertTriangle} onClick={() => onNav("complaintForm")}>{t(dict.fileComplaint)}</Btn>
        <div style={{ marginTop: 16 }}>
          {state.complaints.length === 0 ? (
            <p style={{ color: C.grey, fontSize: 12.5, textAlign: "center", marginTop: 20 }}>{t(dict.noComplaintsYet)}</p>
          ) : state.complaints.map((c) => {
            const sc = statusColor[c.status];
            return (
              <Card key={c.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 13.5 }}>{t(dict[c.typeKey])}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: C.grey }}>{t(dict.complaintId)}: {c.id} · {c.date}</p>
                  </div>
                  <span style={{ background: sc.bg, color: sc.fg, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>
                    {t(dict[statusMap[c.status]])}
                  </span>
                </div>
                {c.desc && <p style={{ margin: "6px 0 0", fontSize: 12, color: C.grey }}>{c.desc}</p>}
                {c.status !== "resolved" && (
                  <div style={{ marginTop: 10 }}>
                    <Btn size="sm" variant="ghost" icon={RefreshCw} onClick={() => dispatch({ type: "ADVANCE_COMPLAINT", id: c.id })}>{t(dict.advanceDemo)}</Btn>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BookTokenScreen({ state, dispatch, onBack, onBooked }) {
  const { t } = useT();
  const alreadyBooked = state.queue.some((q) => q.id === "A124");
  const slots = ["9:00 AM", "9:20 AM", "9:40 AM", "10:00 AM", "10:20 AM", "10:30 AM"];
  const [selected, setSelected] = useState("10:30 AM");

  return (
    <div>
      <ScreenHeader title={t(dict.bookSlotTitle)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        <Card style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 14.5 }}>FPS-102 · Shanti Nagar</p>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: C.grey }}>{t(dict.nowServing)}: A120 · {t(dict.estWait)} 18 {t(dict.min)}</p>
          </div>
          <StatusPill status="serving" />
        </Card>

        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.chooseSlot)}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 14 }}>
          {slots.map((s) => (
            <button key={s} onClick={() => setSelected(s)} style={{
              padding: "12px 8px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 13.5,
              border: `1.5px solid ${selected === s ? C.navy : C.greyLine}`,
              background: selected === s ? C.navy : C.white, color: selected === s ? C.white : C.navy,
            }}>
              {s}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 11.5, color: C.grey, margin: "0 0 18px", lineHeight: 1.5 }}>{t(dict.slotCapacityNote)}</p>

        {alreadyBooked ? (
          <Btn full variant="ghost" icon={CheckCircle2} disabled>{t(dict.completed)}: A124</Btn>
        ) : (
          <Btn full icon={CheckCircle2} onClick={() => { dispatch({ type: "BOOK_ONLINE" }); onBooked(); }}>
            {t(dict.confirmToken)}
          </Btn>
        )}
      </div>
    </div>
  );
}

function ScanScreen({ state, dispatch, onBack, onDone }) {
  const { t } = useT();
  const [phase, setPhase] = useState("scan"); // scan -> verified -> details -> generated
  const already = state.queue.some((q) => q.id === state.userTokenId);

  return (
    <div>
      <ScreenHeader title={t(dict.scanTitle)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        {phase === "scan" && (
          <>
            <p style={{ fontSize: 13, color: C.grey, margin: "0 0 20px" }}>{t(dict.scanSub)}</p>
            <button onClick={() => setPhase("verified")} style={{
              width: "100%", aspectRatio: "1", borderRadius: 20, border: `2.5px dashed ${C.navy}`,
              background: C.cream, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 12, cursor: "pointer", marginBottom: 16,
            }}>
              <ScanLine size={54} color={C.navy} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: C.navy }}>{t(dict.tapToScan)}</span>
            </button>
          </>
        )}

        {phase === "verified" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.green, fontWeight: 700, marginBottom: 16 }}>
              <CheckCircle2 size={19} /> {t(dict.fpsVerified)}
            </div>
            <Card style={{ marginBottom: 16 }}>
              <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 15 }}>FPS-102 · Shanti Nagar</p>
              <p style={{ margin: "6px 0 0", fontSize: 12.5, color: C.grey }}>{t(dict.nowServing)}: A120 · {t(dict.estWait)} 18 {t(dict.min)}</p>
            </Card>
            <Btn full icon={UserCheck} onClick={() => setPhase("details")}>{t(dict.verifyDetails)}</Btn>
          </>
        )}

        {phase === "details" && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, margin: "0 0 8px" }}>{t(dict.verifyDetails)}</p>
              <p style={{ margin: "0 0 4px", fontSize: 13.5, color: C.navy }}><b>{t(dict.rationCardNumber)}:</b> XXXX-1234</p>
              <p style={{ margin: 0, fontSize: 13.5, color: C.navy }}><b>{t(dict.familyMembers)}:</b> 5</p>
            </Card>
            <Btn full icon={Ticket} onClick={() => { dispatch({ type: "GENERATE_QR_TOKEN" }); setPhase("generated"); }}>
              {t(dict.generateToken)}
            </Btn>
          </>
        )}

        {phase === "generated" && (
          <div style={{ textAlign: "center", paddingTop: 10 }}>
            <CheckCircle2 size={40} color={C.green} style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 13, color: C.grey, margin: "0 0 4px" }}>{t(dict.token)}</p>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 32, fontWeight: 800, color: C.navy, margin: "0 0 14px" }}>A125</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              <ModePill mode="qr" />
              <StatusPill status="waiting" />
            </div>
            <p style={{ fontSize: 12, color: C.grey, marginBottom: 20 }}>
              {t(dict.unifiedSub)}
            </p>
            <Btn full icon={Users} onClick={onDone}>{t(dict.viewLiveQueue)}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

function MyTokenScreen({ state, dispatch, onBack, onNav }) {
  const { t } = useT();
  const userToken = state.queue.find((q) => q.id === state.userTokenId);
  const uIdx = state.queue.findIndex((q) => q.id === state.userTokenId);
  const ahead = uIdx === -1 ? 0 : state.queue.slice(0, uIdx).filter((q) => q.status === "waiting" || q.status === "serving").length;
  const serving = state.queue.find((q) => q.status === "serving");

  if (!userToken) {
    return (
      <div>
        <ScreenHeader title={t(dict.myToken)} onBack={onBack} />
        <div style={{ padding: 40, textAlign: "center" }}>
          <Ticket size={36} color={C.greyLine} style={{ marginBottom: 12 }} />
          <p style={{ color: C.grey, fontSize: 13.5, marginBottom: 18 }}>{t(dict.noTokenYet)}</p>
          <Btn icon={Ticket} onClick={() => onNav("book")}>{t(dict.bookNow)}</Btn>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader title={t(dict.myToken)} onBack={onBack} />
      <div style={{ padding: "8px 18px" }}>
        <div style={{ background: C.navy, borderRadius: 20, padding: 22, textAlign: "center", marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11.5, margin: "0 0 6px", letterSpacing: 0.4 }}>{t(dict.yourToken)}</p>
          <p style={{ color: C.white, fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 44, margin: "0 0 12px" }}>{userToken.id}</p>
          <div style={{ display: "inline-block", background: C.white, padding: 10, borderRadius: 12 }}>
            <QrCode size={72} color={C.navyDeep} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14 }}>
            <ModePill mode={userToken.mode} />
            <StatusPill status={userToken.status} />
          </div>
        </div>

        <Card style={{ marginBottom: 16 }}>
          <Row label={t(dict.scheduled)} value={userToken.time} />
          <Row label={t(dict.nowServing)} value={serving ? serving.id : "—"} />
          <Row label={t(dict.peopleAhead)} value={ahead} />
          <Row label={t(dict.estWait)} value={`${ahead * 6} ${t(dict.min)}`} />
          <Row label={t(dict.assignedFps)} value="FPS-102" last />
        </Card>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><Btn full variant="outline" icon={Users} onClick={() => onNav("queue")}>{t(dict.viewLiveQueue)}</Btn></div>
          <div style={{ flex: 1 }}><Btn full variant="ghost" icon={Navigation} onClick={() => {}}>{t(dict.getDirections)}</Btn></div>
        </div>
        {userToken.status === "waiting" && (
          <div style={{ marginTop: 12 }}>
            <Btn
              full
              variant="danger"
              icon={AlertTriangle}
              onClick={() => {
                if (window.confirm(t(dict.cancelTokenConfirm))) {
                  dispatch({ type: "CANCEL_TOKEN" });
                  onNav("home");
                }
              }}
            >
              {t(dict.cancelToken)}
            </Btn>
            <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: 11.5, color: C.grey }}>{t(dict.cancelBeforeVisit)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, last }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: last ? "none" : `1px solid ${C.greyLine}` }}>
      <span style={{ fontSize: 12.5, color: C.grey }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{value}</span>
    </div>
  );
}

function LiveQueueScreen({ state, lang }) {
  const { t } = useT();
  const serving = state.queue.find((q) => q.status === "serving");
  const visibleQueue = state.queue.filter((q) => q.status !== "completed" && q.status !== "noshow");

  return (
    <div>
      <ScreenHeader title={t(dict.liveQueueTitle)} />
      <div style={{ padding: "8px 18px" }}>
        <Card style={{ marginBottom: 14, textAlign: "center", background: C.greenBg, border: "none" }}>
          <p style={{ fontSize: 11.5, color: "#1E6B49", margin: "0 0 4px", fontWeight: 700 }}>{t(dict.nowServing)}</p>
          <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 30, color: C.green, margin: 0 }}>{serving ? serving.id : "—"}</p>
        </Card>

        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.upcomingTokens)}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {visibleQueue.map((q) => {
            const isUser = q.id === state.userTokenId;
            return (
              <div key={q.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 13px",
                borderRadius: 14, background: isUser ? C.goldBg : C.white, border: `1.5px solid ${isUser ? C.gold : C.greyLine}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 15, color: C.navy, minWidth: 44 }}>{q.id}</span>
                  <ModePill mode={q.mode} />
                  {isUser && <span style={{ fontSize: 10.5, fontWeight: 700, color: "#8A6410" }}>({t(dict.yourTokenTag)})</span>}
                </div>
                <StatusPill status={q.status} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NotifScreen({ state }) {
  const { t, lang } = useT();
  const iconFor = (i) => (i === "check" ? CheckCircle2 : Bell);
  return (
    <div>
      <ScreenHeader title={t(dict.notifTitle)} />
      <div style={{ padding: "8px 18px" }}>
        {state.notifications.length === 0 && (
          <p style={{ color: C.grey, fontSize: 13, textAlign: "center", marginTop: 30 }}>—</p>
        )}
        {state.notifications.map((n, i) => {
          const Icon = iconFor(n.icon);
          return (
            <Card key={i} style={{ marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: n.icon === "check" ? C.greenBg : C.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={n.icon === "check" ? C.green : "#9C6A16"} />
              </div>
              <div>
                <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 13.5, color: C.navy }}>{n.title[lang]}</p>
                <p style={{ margin: 0, fontSize: 12.5, color: C.grey, lineHeight: 1.4 }}>{n.body[lang]}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ProfileScreen({ state, onLogout, lang, setLang, onViewReceipt }) {
  const { t } = useT();
  return (
    <div>
      <ScreenHeader title={t(dict.profileTitle)} />
      <div style={{ padding: "8px 18px" }}>
        <Card style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={22} color={C.navy} />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: C.navy }}>सीमा देवी · Seema Devi</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: C.grey }}>MP-45-1234-5678</p>
          </div>
        </Card>

        <Card style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.navy }}>{dict.roleSwitch ? (lang === "hi" ? "भाषा" : "Language") : ""}</span>
            <button onClick={() => setLang(lang === "hi" ? "en" : "hi")} style={{ display: "flex", alignItems: "center", gap: 5, background: C.cream, border: "none", borderRadius: 999, padding: "6px 12px", cursor: "pointer" }}>
              <Languages size={13} color={C.navy} />
              <span style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{lang === "hi" ? "हिंदी" : "English"}</span>
            </button>
          </div>
        </Card>

        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.grey, letterSpacing: 0.3, margin: "0 0 10px" }}>{t(dict.historyTitle)}</p>
        {state.history.length === 0 ? (
          <p style={{ color: C.grey, fontSize: 12.5 }}>{t(dict.noHistoryYet)}</p>
        ) : state.history.map((h, i) => (
          <Card key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: h.txnId ? 10 : 0 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13.5, color: C.navy }}>{h.month[lang]}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11.5, color: C.grey }}>{t(dict.token)} {h.token}</p>
              </div>
              <StatusPill status="completed" />
            </div>
            {h.txnId && (
              <Btn size="sm" variant="ghost" icon={IdCard} onClick={() => onViewReceipt && onViewReceipt(h)}>{t(dict.viewReceipt)}</Btn>
            )}
          </Card>
        ))}

        <div style={{ marginTop: 20 }}>
          <Btn full variant="danger" icon={LogOut} onClick={onLogout}>{t(dict.logout)}</Btn>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   BENEFICIARY APP SHELL
   ========================================================================= */
function BeneficiaryApp({ state, dispatch, lang, setLang }) {
  const [screen, setScreen] = useState("splash");
  const [navTab, setNavTab] = useState("home");
  const [activeReceipt, setActiveReceipt] = useState(null);

  const goTab = (tab) => { setNavTab(tab); setScreen(tab); };
  const navFromHome = (dest) => {
    // keep bottom-nav highlight in sync when Home's quick links jump to a tab screen
    if (["home", "queue", "notif", "profile"].includes(dest)) { goTab(dest); } else { setScreen(dest); }
  };

  let content;
  let showNav = false;

  switch (screen) {
    case "splash":
      content = <SplashScreen onStart={(selectedLang) => { if (selectedLang) setLang(selectedLang); setScreen("login"); }} />;
      break;
    case "login":
      content = <LoginScreen onDone={() => { setScreen("home"); setNavTab("home"); }} />;
      break;
    case "home":
      content = <HomeScreen state={state} dispatch={dispatch} onNav={navFromHome} lang={lang} setLang={setLang} />;
      showNav = true;
      break;
    case "entitlement":
      content = <EntitlementScreen onBack={() => setScreen("home")} onNav={setScreen} />;
      break;
    case "family":
      content = <FamilyScreen onBack={() => setScreen("home")} />;
      break;
    case "complaints":
      content = <ComplaintsScreen state={state} dispatch={dispatch} onBack={() => setScreen("home")} onNav={setScreen} />;
      break;
    case "complaintForm":
      content = <ComplaintFormScreen dispatch={dispatch} onBack={() => setScreen("complaints")} onSubmitted={() => setScreen("complaints")} />;
      break;
    case "receipt":
      content = <ReceiptScreen receipt={activeReceipt} onBack={() => setScreen("profile")} lang={lang} />;
      break;
    case "book":
      content = <BookTokenScreen state={state} dispatch={dispatch} onBack={() => setScreen("home")} onBooked={() => setScreen("token")} />;
      break;
    case "scan":
      content = <ScanScreen state={state} dispatch={dispatch} onBack={() => setScreen("home")} onDone={() => goTab("queue")} />;
      break;
    case "token":
      content = <MyTokenScreen state={state} dispatch={dispatch} onBack={() => setScreen("home")} onNav={setScreen} />;
      break;
    case "queue":
      content = <LiveQueueScreen state={state} lang={lang} />;
      showNav = true;
      break;
    case "notif":
      content = <NotifScreen state={state} />;
      showNav = true;
      break;
    case "profile":
      content = (
        <ProfileScreen
          state={state} lang={lang} setLang={setLang}
          onLogout={() => setScreen("splash")}
          onViewReceipt={(h) => { setActiveReceipt(h); setScreen("receipt"); }}
        />
      );
      showNav = true;
      break;
    default:
      content = null;
  }

  return (
    <AppShell footer={showNav ? <BottomNav active={navTab} onNav={goTab} /> : null}>
      {content}
    </AppShell>
  );
}

/* =========================================================================
   DEALER DASHBOARD
   ========================================================================= */
function DealerDashboard({ state, dispatch, lang }) {
  const { t } = useT();
  const [verifyId, setVerifyId] = useState("");
  const [verified, setVerified] = useState(null);
  const [distributionOtp, setDistributionOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [distributed, setDistributed] = useState({ wheat: "5 kg", rice: "5 kg", sugar: "1 kg" });

  const waitingCount = state.queue.filter((q) => q.status === "waiting").length;
  const servingCount = state.queue.filter((q) => q.status === "serving").length;
  const visible = state.queue.filter((q) => q.status !== "completed" && q.status !== "noshow");
  const onlineCount = state.queue.filter((q) => q.mode === "online" && q.status !== "noshow").length;
  const qrCount = state.queue.filter((q) => q.mode === "qr" && q.status !== "noshow").length;
  const pendingCount = waitingCount + servingCount;
  const dealerStock = [
    { name: { hi: "गेहूं", en: "Wheat" }, level: "available" },
    { name: { hi: "चावल", en: "Rice" }, level: "available" },
    { name: { hi: "चीनी", en: "Sugar" }, level: "limited" },
    { name: { hi: "मिट्टी का तेल", en: "Kerosene" }, level: "out" },
  ];

  const doVerify = () => {
    const found = state.queue.find((q) => q.id.toUpperCase() === verifyId.trim().toUpperCase());
    setDistributionOtp("");
    setOtpError("");
    setVerified(found && found.status !== "completed" && found.status !== "noshow" ? found : "notfound");
  };

  const generateOtp = () => {
    dispatch({ type: "GENERATE_DISTRIBUTION_OTP", tokenId: verified.id });
    setDistributionOtp("");
    setOtpError("");
  };

  const completeWithOtp = () => {
    if (!state.pendingDistribution || state.pendingDistribution.tokenId !== verified.id) {
      setOtpError(t(dict.otpRequired));
      return;
    }
    if (distributionOtp !== state.pendingDistribution.otp) {
      setOtpError(t(dict.invalidOtp));
      return;
    }
    dispatch({
      type: "COMPLETE_DISTRIBUTION",
      tokenId: verified.id,
      otp: distributionOtp,
      items: [
        { name: { hi: "गेहूं", en: "Wheat" }, entitled: "5 kg", qty: distributed.wheat },
        { name: { hi: "चावल", en: "Rice" }, entitled: "5 kg", qty: distributed.rice },
        { name: { hi: "चीनी", en: "Sugar" }, entitled: "1 kg", qty: distributed.sugar },
      ],
    });
    setVerified(null);
    setVerifyId("");
    setDistributionOtp("");
    setOtpError("");
  };

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
        <Logo size={36} />
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 14 }}>{t(dict.officialPortal)}</p>
          <p style={{ margin: 0, fontSize: 12, color: C.grey }}>FPS-102 · Shanti Nagar</p>
        </div>
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: C.grey, letterSpacing: 0.4, margin: "0 0 10px" }}>{t(dict.todaysOverview)}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10, marginBottom: 12 }}>
        <StatBox label={t(dict.totalTokens)} value={state.totalToday} />
        <StatBox label={t(dict.pendingBeneficiaries)} value={pendingCount} accent={C.gold} />
        <StatBox label={t(dict.completed)} value={state.completedCount} accent={C.grey} />
        <StatBox label={t(dict.avgWait)} value={`${state.avgWaitMin} ${t(dict.min)}`} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10, marginBottom: 20 }}>
        <StatBox label={t(dict.onlineTokensLbl)} value={onlineCount} accent={"#2A5CA8"} />
        <StatBox label={t(dict.qrTokensLbl)} value={qrCount} accent={"#9C6A16"} />
        <StatBox label={t(dict.serving)} value={servingCount} accent={C.green} />
        <StatBox label={t(dict.estCompletion)} value={"1:20 PM"} />
      </div>

      <div className="rs-dealer-grid" style={{ display: "grid", gap: 18, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.grey, letterSpacing: 0.4, margin: 0 }}>{t(dict.liveQueueTitle)}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn size="sm" variant="outline" icon={QrCode} onClick={() => dispatch({ type: "GENERATE_QR_TOKEN" })}>A125 QR</Btn>
              <Btn size="sm" variant="danger" icon={AlertTriangle} onClick={() => dispatch({ type: "MARK_NOSHOW" })}>{t(dict.markNoShow)}</Btn>
            </div>
          </div>

          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div className="rs-table-scroll">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
                <thead>
                  <tr style={{ background: C.cream }}>
                    {[t(dict.token), t(dict.beneficiary), t(dict.status)].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, color: C.grey, fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((q) => (
                    <tr key={q.id} style={{ borderTop: `1px solid ${C.greyLine}`, background: q.status === "serving" ? C.greenBg : "transparent" }}>
                      <td style={{ padding: "11px 14px", fontWeight: 800, color: C.navy, fontFamily: "Poppins, sans-serif" }}>{q.id}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: C.navy, fontWeight: 600 }}>{q.name.split(" / ")[1] || q.name}</td>
                      <td style={{ padding: "11px 14px" }}><StatusPill status={q.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div style={{ marginTop: 14 }}>
            <Btn full size="md" icon={ArrowRight} onClick={() => dispatch({ type: "CALL_NEXT" })}>{t(dict.callNext)}</Btn>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.grey, letterSpacing: 0.4, margin: "0 0 10px" }}>{t(dict.verifyToken)}</p>
          <Card>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input value={verifyId} onChange={(e) => setVerifyId(e.target.value)} placeholder={t(dict.enterTokenId)}
                style={{ flex: 1, border: `1.5px solid ${C.greyLine}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, outline: "none", fontFamily: "Inter" }} />
              <Btn size="sm" icon={ClipboardCheck} onClick={doVerify}>{t(dict.verify)}</Btn>
            </div>
            {verified === "notfound" && <p style={{ color: C.red, fontSize: 12.5 }}>{t(dict.token)} {t(dict.unavailable)}</p>}
            {verified && verified !== "notfound" && (
              <div>
                <Row label={t(dict.token)} value={verified.id} />
                <Row label={t(dict.beneficiary)} value={verified.name.split(" / ")[1] || verified.name} />
                <Row label={t(dict.status)} value={<StatusPill status={verified.status} />} last />
                {verified.status === "serving" && (
                  <div style={{ marginTop: 12 }}>
                    {!state.pendingDistribution && (
                      <Btn full size="sm" variant="green" icon={KeyRound} onClick={generateOtp}>{t(dict.generateOtp)}</Btn>
                    )}
                    {state.pendingDistribution?.tokenId === verified.id && (
                      <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: C.greenBg }}>
                        <p style={{ margin: "0 0 8px", color: C.green, fontSize: 12, fontWeight: 700 }}>{t(dict.otpSentDemo)}: <strong>{verified.id}</strong></p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                          {[
                            ["wheat", "Wheat"],
                            ["rice", "Rice"],
                            ["sugar", "Sugar"],
                          ].map(([key, label]) => (
                            <label key={key} style={{ fontSize: 10.5, color: C.grey }}>
                              {label}
                              <input
                                value={distributed[key]}
                                onChange={(e) => setDistributed((current) => ({ ...current, [key]: e.target.value }))}
                                style={{ width: "100%", border: `1px solid ${C.greyLine}`, borderRadius: 7, padding: "7px 5px", marginTop: 3, fontSize: 11 }}
                              />
                            </label>
                          ))}
                        </div>
                        <p style={{ margin: "0 0 8px", color: C.grey, fontSize: 11 }}>{t(dict.demoSecurityNote)}</p>
                        <input
                          value={distributionOtp}
                          onChange={(e) => { setDistributionOtp(e.target.value.replace(/\D/g, "").slice(0, 4)); setOtpError(""); }}
                          placeholder="••••"
                          inputMode="numeric"
                          style={{ width: "100%", border: `1.5px solid ${C.greyLine}`, borderRadius: 9, padding: "10px 12px", fontSize: 16, letterSpacing: 5, textAlign: "center", outline: "none", marginBottom: 8 }}
                        />
                        {otpError && <p style={{ margin: "0 0 8px", color: C.red, fontSize: 11.5 }}>{otpError}</p>}
                        <Btn full size="sm" variant="green" icon={CheckCircle2} disabled={distributionOtp.length !== 4} onClick={completeWithOtp}>{t(dict.completeDistribution)}</Btn>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {!verified && <p style={{ fontSize: 12, color: C.grey, margin: 0 }}>e.g. A120, A124</p>}
          </Card>

          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.grey, letterSpacing: 0.4, margin: "0 0 10px" }}>{t(dict.fpsStock)}</p>
            <Card>
              {dealerStock.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i === dealerStock.length - 1 ? "none" : `1px solid ${C.greyLine}` }}>
                  <span style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>{s.name[lang]}</span>
                  <StockPill level={s.level} />
                </div>
              ))}
            </Card>
          </div>

          <div style={{ marginTop: 14 }}>
            <UnifiedQueueDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, accent }) {
  return (
    <Card style={{ textAlign: "left" }}>
      <p style={{ margin: "0 0 4px", fontSize: 11, color: C.grey, fontWeight: 600 }}>{label}</p>
      <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 22, color: accent || C.navy }}>{value}</p>
    </Card>
  );
}

/* =========================================================================
   ADMIN DASHBOARD (secondary, kept concise)
   ========================================================================= */
function AdminDashboard({ state }) {
  const { t } = useT();
  const noShows = state.queue.filter((q) => q.status === "noshow").length;
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Logo size={34} />
        <p style={{ margin: 0, fontWeight: 700, color: C.navy, fontSize: 14 }}>{t(dict.adminPortal)}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10, marginBottom: 22 }}>
        <StatBox label={t(dict.totalTokens)} value={state.totalToday} />
        <StatBox label={t(dict.completed)} value={state.completedCount} accent={C.green} />
        <StatBox label={t(dict.avgWait)} value={`${state.avgWaitMin} ${t(dict.min)}`} />
        <StatBox label={t(dict.noShows)} value={noShows} accent={C.red} />
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: C.grey, letterSpacing: 0.4, margin: "0 0 10px" }}>
        {t(dict.aiPrediction)} <Sparkles size={12} style={{ verticalAlign: -1 }} />
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 12 }}>
        <InsightCard icon={TrendingUp} color={C.green} title={t(dict.aiPrediction)} body={lang => lang === "hi" ? "अनुमानित औसत प्रतीक्षा: 15–20 मिनट" : "Expected average wait: 15–20 min"} />
        <InsightCard icon={AlertTriangle} color={C.gold} title={t(dict.aiAnomaly)} body={lang => lang === "hi" ? "FPS-102 पर असामान्य वितरण पैटर्न पाया गया" : "Unusual distribution pattern detected at FPS-102"} />
        <InsightCard icon={BarChart3} color={C.navy} title={t(dict.aiDemand)} body={lang => lang === "hi" ? "कल की अनुमानित मांग: उच्च" : "Expected demand tomorrow: High"} />
      </div>

      <div style={{ marginTop: 18, background: C.cream, borderRadius: 14, padding: 14, display: "flex", gap: 10 }}>
        <Info size={16} color={C.grey} style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12, color: C.grey, margin: 0, lineHeight: 1.5 }}>
          {t(dict.disclaimerShort)} {" "}
          {t({ hi: "AI अंतर्दृष्टियाँ इस डेमो में सिम्युलेटेड हैं, वास्तविक प्रशिक्षित मॉडल से नहीं।", en: "AI insights in this demo are simulated, not from a real trained model." })}
        </p>
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, color, title, body }) {
  const { lang } = useT();
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={15} color={color} />
        </div>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 12.5, color: C.navy }}>{title}</p>
      </div>
      <p style={{ margin: 0, fontSize: 12.5, color: C.grey, lineHeight: 1.4 }}>{body(lang)}</p>
    </Card>
  );
}

/* =========================================================================
   ROOT APP
   ========================================================================= */
export default function RationSetuApp() {
  const [lang, setLang] = useState("hi");
  const [role, setRole] = useState("beneficiary");
  const [dealerAuthenticated, setDealerAuthenticated] = useState(false);
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const t = (entry) => (entry && entry[lang] ? entry[lang] : entry?.en || "");

  return (
    <LangCtx.Provider value={{ lang, t }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        body { margin: 0; }
        input:focus { border-color: ${C.navy} !important; }
        textarea:focus { border-color: ${C.navy} !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${C.greyLine}; border-radius: 3px; }

        /* ===== Responsive beneficiary app shell (replaces the old fixed phone-bezel mockup) ===== */
        .rs-page {
          padding: 24px 20px 30px;
          background:
            radial-gradient(circle at 12% 0%, rgba(22,128,92,0.07), transparent 28rem),
            #F1F5F9 !important;
        }
        .rs-role-switch { flex-wrap: wrap; }

        .rs-shell {
          background: ${C.bg};
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          width: 100%;
          min-height: calc(100vh - 132px);
          border: 1px solid rgba(220,228,236,0.9);
          box-shadow: 0 14px 40px rgba(23,50,77,0.08);
        }
        .rs-shell-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .rs-shell-footer { flex-shrink: 0; }

        /* Desktop uses the same product shell as a real operations dashboard. */
        @media (min-width: 640px) {
          .rs-shell {
            width: min(100%, 1080px);
            margin: 0 auto;
            border-radius: 20px;
            min-height: 640px;
            max-height: none;
          }
        }
        @media (min-width: 1024px) {
          .rs-shell {
            width: min(100%, 1080px);
          }
        }

        /* Dealer/Admin dashboards: keep tables from breaking layout on narrow screens */
        .rs-table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }

        /* Dealer dashboard: single column on phones/tablets, two columns on wide screens */
        .rs-dealer-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) {
          .rs-dealer-grid { grid-template-columns: 1.4fr 1fr; }
        }

        @media (max-width: 640px) {
          .rs-page { padding: 12px 8px 20px; }
          .rs-shell { box-shadow: 0 6px 20px rgba(23,50,77,0.06); }
        }

        button { font-family: Inter, 'Noto Sans Devanagari', sans-serif; }
        button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 3px solid rgba(22,128,92,0.25);
          outline-offset: 2px;
        }
      `}</style>
      <div className="rs-page" style={{ fontFamily: "Inter, 'Noto Sans Devanagari', sans-serif", minHeight: "100vh" }}>
        {/* Role switcher — for demo/judge navigation, not part of the beneficiary product itself */}
        <div style={{ maxWidth: 1080, margin: "0 auto 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.navy }}>
            <img src={LOGO_SRC} alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
            <div>
              <p style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 15 }}>Ration<span style={{ color: C.green }}>Setu</span></p>
              <p style={{ margin: "1px 0 0", color: C.grey, fontSize: 10.5, fontWeight: 600 }}>{t(dict.studentProto)}</p>
            </div>
          </div>
          <div className="rs-role-switch" style={{ display: "flex", background: "rgba(255,255,255,0.88)", borderRadius: 12, padding: 4, border: `1px solid ${C.greyLine}`, gap: 3, boxShadow: "0 3px 12px rgba(23,50,77,0.05)" }}>
            {[
              { key: "beneficiary", label: t(dict.roleBen), icon: User },
              { key: "dealer", label: t(dict.roleDealer), icon: LayoutDashboard },
            ].map((r) => (
              <button key={r.key} onClick={() => { setRole(r.key); if (r.key !== "dealer") setDealerAuthenticated(false); }} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 9,
                border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12.5,
                background: role === r.key ? C.navy : "transparent", color: role === r.key ? C.white : C.grey,
              }}>
                <r.icon size={13} /> {r.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {role === "beneficiary" && <BeneficiaryApp state={state} dispatch={dispatch} lang={lang} setLang={setLang} />}
          {role === "dealer" && !dealerAuthenticated && <DealerLoginScreen onLogin={() => setDealerAuthenticated(true)} />}
          {role === "dealer" && dealerAuthenticated && <DealerDashboard state={state} dispatch={dispatch} lang={lang} />}
          {role === "admin" && <AdminDashboard state={state} />}
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: C.grey, marginTop: 22 }}>
          {t(dict.studentProto)} · {t(dict.disclaimerShort)}
        </p>
      </div>
    </LangCtx.Provider>
  );
}
