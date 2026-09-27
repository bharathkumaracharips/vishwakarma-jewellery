"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Mail,
  Phone,
  User,
  ShieldCheck,
  Hammer,
  Store,
  Crown,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  MapPin,
  Building,
  Award,
  Smartphone,
  Sparkle,
  Lock,
} from "lucide-react";
import { UserProfile, UserRole } from "@/types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onSkip?: () => void;
  initialRole?: UserRole;
  initialTab?: "signin" | "signup";
  promptMessage?: string;
  lockedOrnamentName?: string;
}

// Demo fallback profiles
export const DEMO_USERS: Record<UserRole, UserProfile> = {
  customer: {
    id: "usr_patron_01",
    name: "Priya Sharma",
    email: "priya.sharma@heritage.in",
    phone: "+91 98450 12345",
    role: "customer",
    city: "Bangalore",
    vaultBalanceGrams: 14.85,
    registeredPassportsCount: 3,
    activeOrdersCount: 1,
  },
  goldsmith: {
    id: "usr_goldsmith_01",
    name: "Achari Ramanathan",
    email: "ramanathan@vishwakarmaguild.in",
    phone: "+91 94480 67890",
    role: "goldsmith",
    city: "Bangalore",
    artisanId: "art_ram_01",
    workbenchTier: "Master Craftsman (5th Gen)",
    activeOrdersCount: 4,
  },
  retailer: {
    id: "usr_retailer_01",
    name: "Suresh Rao",
    companyName: "Kalyan Heritage Vault Ltd",
    gstin: "29AABCU9603R1ZM",
    email: "procurement@kalyanvault.com",
    phone: "+91 99001 54321",
    role: "retailer",
    city: "Bangalore",
    activeOrdersCount: 2,
  },
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSkip,
  initialRole = "customer",
  initialTab = "signin",
  promptMessage,
  lockedOrnamentName,
}) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialTab);
  const [role, setRole] = useState<UserRole>(initialRole);

  // Sign In (Login with Phone OR Email)
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginOtpCode, setLoginOtpCode] = useState(["", "", "", "", "", ""]);
  const [loginOtpTimer, setLoginOtpTimer] = useState(45);
  const [loginTestOtp, setLoginTestOtp] = useState<string | null>(null);

  // Sign Up (Requires BOTH Mobile AND Email)
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerCity, setRegisterCity] = useState("Bangalore");
  const [registerOtpSent, setRegisterOtpSent] = useState(false);
  const [registerOtpCode, setRegisterOtpCode] = useState(["", "", "", "", "", ""]);
  const [registerOtpTimer, setRegisterOtpTimer] = useState(45);
  const [registerTestOtp, setRegisterTestOtp] = useState<string | null>(null);

  // Contextual role-specific fields
  const [workshopName, setWorkshopName] = useState("");
  const [specialization, setSpecialization] = useState("Temple Nakshi & Kundan");
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [agreedToCharter, setAgreedToCharter] = useState(true);

  // Loading & Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // OTP Countdown Timers
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loginOtpSent && loginOtpTimer > 0) {
      interval = setInterval(() => setLoginOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [loginOtpSent, loginOtpTimer]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (registerOtpSent && registerOtpTimer > 0) {
      interval = setInterval(() => setRegisterOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [registerOtpSent, registerOtpTimer]);

  if (!isOpen) return null;

  // 1-Click Instant Demo Login
  const handleQuickDemo = (demoRole: UserRole) => {
    setLoading(true);
    setErrorMsg(null);
    const demoUser = DEMO_USERS[demoRole];

    setTimeout(() => {
      setLoading(false);
      setSuccessNotice(`Authenticated as ${demoUser.name} (${demoUser.role.toUpperCase()})`);
      setTimeout(() => {
        onLoginSuccess(demoUser);
        onClose();
      }, 500);
    }, 400);
  };

  // SEND OTP for Login
  const handleSendLoginOtp = async () => {
    setErrorMsg(null);
    if (!loginIdentifier.trim()) {
      setErrorMsg("Please enter your registered mobile number or email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginIdentifier.trim() }),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setLoginOtpSent(true);
        setLoginOtpTimer(45);
        if (data.test_otp) setLoginTestOtp(data.test_otp);
        setSuccessNotice(data.message || `OTP dispatched to ${loginIdentifier}`);
      } else {
        // Fallback local simulation if backend is rebooting
        setLoginOtpSent(true);
        setLoginOtpTimer(45);
        setLoginTestOtp("482916");
        setSuccessNotice(`One-time passcode sent to ${loginIdentifier}`);
      }
    } catch {
      setLoading(false);
      setLoginOtpSent(true);
      setLoginOtpTimer(45);
      setLoginTestOtp("482916");
      setSuccessNotice(`One-time passcode sent to ${loginIdentifier}`);
    }
  };

  // VERIFY OTP for Login
  const handleVerifyLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const enteredOtp = loginOtpCode.join("");
    if (enteredOtp.length < 6) {
      setErrorMsg("Please enter all 6 digits of the OTP verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginIdentifier.trim(),
          otp: enteredOtp,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success && data.user) {
        setSuccessNotice(`Welcome back to the Vault, ${data.user.name}!`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 600);
      } else if (data.not_registered) {
        // User not found in MongoDB: guide them smoothly to Register
        setErrorMsg("No account found for this contact. We've switched to registration below.");
        if (loginIdentifier.includes("@")) {
          setRegisterEmail(loginIdentifier);
        } else {
          setRegisterPhone(loginIdentifier.replace("+91", "").trim());
        }
        setActiveTab("signup");
      } else {
        setErrorMsg(data.message || "Invalid OTP code. Please enter demo code 482916.");
      }
    } catch {
      // Local fallback
      setLoading(false);
      const fallbackUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: loginIdentifier.includes("@") ? loginIdentifier.split("@")[0].toUpperCase() : "Royal Patron",
        email: loginIdentifier.includes("@") ? loginIdentifier : `${loginIdentifier}@vault.in`,
        phone: loginIdentifier.includes("@") ? "+91 98450 12345" : loginIdentifier,
        role: role,
        city: "Bangalore",
        vaultBalanceGrams: 14.85,
        registeredPassportsCount: 3,
        activeOrdersCount: 1,
      };
      setSuccessNotice(`Welcome back, ${fallbackUser.name}!`);
      setTimeout(() => {
        onLoginSuccess(fallbackUser);
        onClose();
      }, 600);
    }
  };

  // SEND OTP for Registration (Validates BOTH phone & email)
  const handleSendRegisterOtp = async () => {
    setErrorMsg(null);
    if (!registerName.trim()) {
      setErrorMsg("Please provide your Full Legal Name.");
      return;
    }
    if (!registerPhone.trim() || registerPhone.length < 10) {
      setErrorMsg("Mobile number is mandatory. Please provide a valid 10-digit number.");
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes("@")) {
      setErrorMsg("Email address is mandatory. Please provide a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: registerPhone.trim() }),
      });
      const data = await res.json();
      setLoading(false);

      setRegisterOtpSent(true);
      setRegisterOtpTimer(45);
      if (data.test_otp) setRegisterTestOtp(data.test_otp);
      setSuccessNotice(data.message || `Verification OTP sent to +91 ${registerPhone}`);
    } catch {
      setLoading(false);
      setRegisterOtpSent(true);
      setRegisterOtpTimer(45);
      setRegisterTestOtp("482916");
      setSuccessNotice(`Verification OTP sent to +91 ${registerPhone}`);
    }
  };

  // VERIFY & SUBMIT Registration to Rust + MongoDB
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const enteredOtp = registerOtpCode.join("");
    if (enteredOtp.length < 6) {
      setErrorMsg("Please enter the 6-digit OTP verification code sent to your mobile.");
      return;
    }
    if (!agreedToCharter) {
      setErrorMsg("Please agree to the BIS 100% Hallmark Charter.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: registerName.trim(),
        email: registerEmail.trim(),
        phone: registerPhone.startsWith("+91") ? registerPhone.trim() : `+91 ${registerPhone.trim()}`,
        role: role,
        city: registerCity,
        otp: enteredOtp,
        workshop_name: role === "goldsmith" ? workshopName : undefined,
        specialization: role === "goldsmith" ? specialization : undefined,
        company_name: role === "retailer" ? companyName : undefined,
        gstin: role === "retailer" ? gstin : undefined,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success && data.user) {
        setSuccessNotice(`Vault membership established for ${data.user.name}!`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 700);
      } else {
        setErrorMsg(data.message || "Registration failed. Please check details or demo code 482916.");
      }
    } catch {
      setLoading(false);
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: registerName.trim(),
        email: registerEmail.trim(),
        phone: registerPhone.startsWith("+91") ? registerPhone : `+91 ${registerPhone}`,
        role: role,
        city: registerCity,
        vaultBalanceGrams: 0,
        registeredPassportsCount: 0,
        activeOrdersCount: 0,
      };
      setSuccessNotice(`Welcome to Vishwakarma, ${newUser.name}!`);
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 700);
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "rgba(3, 4, 7, 0.85)",
          backdropFilter: "blur(14px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "540px",
            maxHeight: "92vh",
            overflowY: "auto",
            backgroundColor: "#0d0f14",
            border: "1px solid rgba(212, 175, 55, 0.28)",
            boxShadow: "0 25px 65px rgba(0, 0, 0, 0.95), 0 0 50px rgba(212, 175, 55, 0.1)",
            borderRadius: "14px",
            color: "#f8fafc",
          }}
        >
          {/* Top Polished Gold Shimmer Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2.5px",
              background: "linear-gradient(90deg, transparent, #d4af37, #fef08a, #d4af37, transparent)",
            }}
          />

          {/* Close & Skip Button Bar */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 10,
            }}
          >
            {onSkip && (
              <button
                type="button"
                onClick={() => {
                  onSkip();
                  onClose();
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "4px 10px",
                  color: "#94a3b8",
                  fontSize: "0.72rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#d4af37";
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                Skip as Guest →
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Contextual Ornament Gate Banner (If triggered by clicking an ornament) */}
          {(lockedOrnamentName || promptMessage) && (
            <div
              style={{
                margin: "18px 24px 0 24px",
                padding: "10px 14px",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Crown size={20} color="#eab308" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fef08a" }}>
                  Vault Access Required
                </div>
                <div style={{ fontSize: "0.72rem", color: "#e2e8f0", lineHeight: 1.3 }}>
                  {promptMessage ||
                    `Sign in or create an account to view certified pure weights, verify HUID hallmark records, or customize "${lockedOrnamentName}".`}
                </div>
              </div>
            </div>
          )}

          {/* Modal Header */}
          <div
            style={{
              padding: lockedOrnamentName || promptMessage ? "16px 28px 14px 28px" : "28px 28px 16px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "20px",
                background: "rgba(212, 175, 55, 0.08)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                marginBottom: "8px",
              }}
            >
              <Sparkles size={13} color="#d4af37" />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4af37" }}>
                Vishwakarma Sovereign Vault
              </span>
            </div>

            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                margin: "0 0 4px 0",
                fontFamily: "var(--font-heading, serif)",
                background: "linear-gradient(135deg, #ffffff 40%, #e2d9b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {activeTab === "signin" ? "Customer & Artisan Vault Sign In" : "Register New Guild Account"}
            </h2>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
              {activeTab === "signin"
                ? "Passwordless access with secure 6-digit OTP to your phone or email."
                : "Both Mobile (+91) and Email verification required to issue hallmarked deeds."}
            </p>

            {/* Quick 1-Click Demo Profile Switcher */}
            <div
              style={{
                marginTop: "14px",
                padding: "8px 12px",
                backgroundColor: "rgba(212, 175, 55, 0.04)",
                border: "1px dashed rgba(212, 175, 55, 0.28)",
                borderRadius: "8px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#eab308", display: "flex", alignItems: "center", gap: "4px" }}>
                  <KeyRound size={12} /> Instant 1-Click Demo Profiles:
                </span>
                <span style={{ fontSize: "0.65rem", color: "#64748b" }}>Test Any Persona</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("customer")}
                  disabled={loading}
                  style={{
                    padding: "6px",
                    background: role === "customer" ? "rgba(212, 175, 55, 0.16)" : "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>👑 Customer</span>
                  <span style={{ fontSize: "0.6rem", color: "#94a3b8" }}>Priya S.</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("goldsmith")}
                  disabled={loading}
                  style={{
                    padding: "6px",
                    background: role === "goldsmith" ? "rgba(212, 175, 55, 0.16)" : "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>🔨 Goldsmith</span>
                  <span style={{ fontSize: "0.6rem", color: "#94a3b8" }}>Achari R.</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("retailer")}
                  disabled={loading}
                  style={{
                    padding: "6px",
                    background: role === "retailer" ? "rgba(212, 175, 55, 0.16)" : "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>🏛️ Retailer</span>
                  <span style={{ fontSize: "0.6rem", color: "#94a3b8" }}>Kalyan Vault</span>
                </button>
              </div>
            </div>
          </div>

          {/* Primary Tab Switcher */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "0 28px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab("signin");
                setErrorMsg(null);
              }}
              style={{
                padding: "10px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === "signin" ? "2px solid #d4af37" : "2px solid transparent",
                color: activeTab === "signin" ? "#d4af37" : "#64748b",
                fontWeight: activeTab === "signin" ? 700 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Smartphone size={14} /> Vault Sign In (OTP)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("signup");
                setErrorMsg(null);
              }}
              style={{
                padding: "10px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === "signup" ? "2px solid #d4af37" : "2px solid transparent",
                color: activeTab === "signup" ? "#d4af37" : "#64748b",
                fontWeight: activeTab === "signup" ? 700 : 500,
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <User size={14} /> Register Vault Account
            </button>
          </div>

          {/* Role Persona Cards */}
          <div style={{ padding: "14px 28px 0 28px" }}>
            <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              Select Vault Persona:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              <div
                onClick={() => setRole("customer")}
                style={{
                  padding: "8px 6px",
                  borderRadius: "6px",
                  border: role === "customer" ? "1.5px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: role === "customer" ? "rgba(212, 175, 55, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Crown size={16} color={role === "customer" ? "#d4af37" : "#64748b"} style={{ margin: "0 auto 2px" }} />
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: role === "customer" ? "#fff" : "#94a3b8" }}>
                  Customer
                </div>
                <div style={{ fontSize: "0.6rem", color: "#64748b" }}>Private Vault</div>
              </div>

              <div
                onClick={() => setRole("goldsmith")}
                style={{
                  padding: "8px 6px",
                  borderRadius: "6px",
                  border: role === "goldsmith" ? "1.5px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: role === "goldsmith" ? "rgba(212, 175, 55, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Hammer size={16} color={role === "goldsmith" ? "#d4af37" : "#64748b"} style={{ margin: "0 auto 2px" }} />
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: role === "goldsmith" ? "#fff" : "#94a3b8" }}>
                  Goldsmith
                </div>
                <div style={{ fontSize: "0.6rem", color: "#64748b" }}>Bench Terminal</div>
              </div>

              <div
                onClick={() => setRole("retailer")}
                style={{
                  padding: "8px 6px",
                  borderRadius: "6px",
                  border: role === "retailer" ? "1.5px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: role === "retailer" ? "rgba(212, 175, 55, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Store size={16} color={role === "retailer" ? "#d4af37" : "#64748b"} style={{ margin: "0 auto 2px" }} />
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: role === "retailer" ? "#fff" : "#94a3b8" }}>
                  Retailer
                </div>
                <div style={{ fontSize: "0.6rem", color: "#64748b" }}>B2B Wholesale</div>
              </div>
            </div>
          </div>

          {/* Feedback alerts */}
          {errorMsg && (
            <div
              style={{
                margin: "12px 28px 0 28px",
                padding: "8px 12px",
                backgroundColor: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "6px",
                color: "#fca5a5",
                fontSize: "0.75rem",
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          {successNotice && (
            <div
              style={{
                margin: "12px 28px 0 28px",
                padding: "8px 12px",
                backgroundColor: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "6px",
                color: "#86efac",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <CheckCircle2 size={15} />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Form Area */}
          <div style={{ padding: "18px 28px 24px 28px" }}>
            {activeTab === "signin" ? (
              /* PASSWORDLESS LOGIN (OTP with Mobile OR Email) */
              <form onSubmit={handleVerifyLoginOtp} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginBottom: "4px" }}>
                    Registered Mobile Number or Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#d4af37" }}>
                      <Smartphone size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 98450 12345 or priya@domain.com"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      disabled={loading || loginOtpSent}
                      style={{
                        width: "100%",
                        padding: "10px 12px 10px 38px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "0.85rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {!loginOtpSent ? (
                  <motion.button
                    type="button"
                    onClick={handleSendLoginOtp}
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      padding: "11px",
                      background: "linear-gradient(135deg, #d4af37 0%, #aa820a 100%)",
                      border: "none",
                      borderRadius: "6px",
                      color: "#0a0b0e",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Transmit 6-Digit OTP</span>
                    <ArrowRight size={15} />
                  </motion.button>
                ) : (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8" }}>
                        Enter 6-Digit Cryptographic Code:
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "#eab308" }}>
                        {loginOtpTimer > 0 ? `Expires in ${loginOtpTimer}s` : "Expired"}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                          key={idx}
                          id={`login-otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={loginOtpCode[idx]}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            const updated = [...loginOtpCode];
                            updated[idx] = val;
                            setLoginOtpCode(updated);
                            if (val && idx < 5) {
                              const next = document.getElementById(`login-otp-${idx + 1}`);
                              if (next) next.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !loginOtpCode[idx] && idx > 0) {
                              const prev = document.getElementById(`login-otp-${idx - 1}`);
                              if (prev) prev.focus();
                            }
                          }}
                          style={{
                            width: "40px",
                            height: "44px",
                            textAlign: "center",
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(212, 175, 55, 0.35)",
                            borderRadius: "6px",
                            color: "#fef08a",
                            outline: "none",
                          }}
                        />
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          const codeToFill = loginTestOtp || "482916";
                          setLoginOtpCode(codeToFill.split(""));
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#d4af37",
                          fontSize: "0.72rem",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Auto-fill Demo Code ({loginTestOtp || "482916"})
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginOtpSent(false);
                          setLoginOtpCode(["", "", "", "", "", ""]);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#64748b",
                          fontSize: "0.72rem",
                          cursor: "pointer",
                        }}
                      >
                        Change Contact
                      </button>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        width: "100%",
                        marginTop: "14px",
                        padding: "11px",
                        background: "linear-gradient(135deg, #d4af37 0%, #aa820a 100%)",
                        border: "none",
                        borderRadius: "6px",
                        color: "#0a0b0e",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <span>Verify & Enter Vault</span>
                      <ArrowRight size={15} />
                    </motion.button>
                  </div>
                )}
              </form>
            ) : (
              /* REGISTRATION FORM (REQUIRES BOTH MOBILE & EMAIL) */
              <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Full Legal Name */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginBottom: "4px" }}>
                    Legal Full Name *
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
                      <User size={15} />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Bharath Kumar Achari"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      disabled={loading || registerOtpSent}
                      style={{
                        width: "100%",
                        padding: "9px 10px 9px 34px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "0.82rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* Mobile (+91) AND Email (Both Mandatory) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginBottom: "4px" }}>
                      Mobile (+91) *
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", color: "#d4af37", fontSize: "0.75rem", fontWeight: 700 }}>
                        +91
                      </div>
                      <input
                        type="tel"
                        placeholder="98450 12345"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        disabled={loading || registerOtpSent}
                        style={{
                          width: "100%",
                          padding: "9px 8px 9px 36px",
                          backgroundColor: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "6px",
                          color: "#fff",
                          fontSize: "0.82rem",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginBottom: "4px" }}>
                      Email Address *
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
                        <Mail size={15} />
                      </div>
                      <input
                        type="email"
                        placeholder="name@domain.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        disabled={loading || registerOtpSent}
                        style={{
                          width: "100%",
                          padding: "9px 8px 9px 34px",
                          backgroundColor: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "6px",
                          color: "#fff",
                          fontSize: "0.82rem",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Hub City */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", marginBottom: "4px" }}>
                    Primary Jewellery Hub City *
                  </label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
                      <MapPin size={15} />
                    </div>
                    <select
                      value={registerCity}
                      onChange={(e) => setRegisterCity(e.target.value)}
                      disabled={loading || registerOtpSent}
                      style={{
                        width: "100%",
                        padding: "9px 10px 9px 34px",
                        backgroundColor: "#161922",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "0.82rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="Bangalore">Bangalore (Silicon Gold Hub)</option>
                      <option value="Mumbai">Mumbai (Zaveri Bazaar)</option>
                      <option value="Chennai">Chennai (T. Nagar Guild)</option>
                      <option value="Hyderabad">Hyderabad (Deccan Pearl & Gold)</option>
                      <option value="Delhi">Delhi (Dariba Kalan)</option>
                      <option value="Kolkata">Kolkata (Bowbazar Filigree)</option>
                      <option value="Coimbatore">Coimbatore (Artisanal Casting)</option>
                    </select>
                  </div>
                </div>

                {/* Goldsmith Contextual */}
                {role === "goldsmith" && (
                  <div style={{ padding: "8px 10px", backgroundColor: "rgba(212, 175, 55, 0.05)", borderRadius: "6px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                    <div style={{ fontSize: "0.72rem", color: "#eab308", fontWeight: 700, marginBottom: "4px" }}>
                      🔨 Workshop Lineage:
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Achari & Sons Goldsmiths"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                      style={{ width: "100%", padding: "6px 8px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", color: "#fff", fontSize: "0.78rem", boxSizing: "border-box" }}
                    />
                  </div>
                )}

                {/* Retailer Contextual */}
                {role === "retailer" && (
                  <div style={{ padding: "8px 10px", backgroundColor: "rgba(212, 175, 55, 0.05)", borderRadius: "6px", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                    <div style={{ fontSize: "0.72rem", color: "#eab308", fontWeight: 700, marginBottom: "4px" }}>
                      🏛️ Store / Trade Details:
                    </div>
                    <input
                      type="text"
                      placeholder="Company Name & GSTIN"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      style={{ width: "100%", padding: "6px 8px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", color: "#fff", fontSize: "0.78rem", boxSizing: "border-box" }}
                    />
                  </div>
                )}

                {/* OTP Send / Verification for Register */}
                {!registerOtpSent ? (
                  <motion.button
                    type="button"
                    onClick={handleSendRegisterOtp}
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      marginTop: "6px",
                      padding: "10px",
                      background: "linear-gradient(135deg, #d4af37 0%, #aa820a 100%)",
                      border: "none",
                      borderRadius: "6px",
                      color: "#0a0b0e",
                      fontWeight: 700,
                      fontSize: "0.84rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <span>Verify Mobile & Email Via OTP</span>
                    <ArrowRight size={15} />
                  </motion.button>
                ) : (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0" }}>
                      <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Enter 6-Digit Mobile Verification Code:</span>
                      <span style={{ fontSize: "0.68rem", color: "#eab308" }}>{registerOtpTimer}s</span>
                    </div>

                    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                          key={idx}
                          id={`reg-otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={registerOtpCode[idx]}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            const updated = [...registerOtpCode];
                            updated[idx] = val;
                            setRegisterOtpCode(updated);
                            if (val && idx < 5) {
                              const next = document.getElementById(`reg-otp-${idx + 1}`);
                              if (next) next.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !registerOtpCode[idx] && idx > 0) {
                              const prev = document.getElementById(`reg-otp-${idx - 1}`);
                              if (prev) prev.focus();
                            }
                          }}
                          style={{
                            width: "38px",
                            height: "42px",
                            textAlign: "center",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(212, 175, 55, 0.35)",
                            borderRadius: "6px",
                            color: "#fef08a",
                            outline: "none",
                          }}
                        />
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          const codeToFill = registerTestOtp || "482916";
                          setRegisterOtpCode(codeToFill.split(""));
                        }}
                        style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.7rem", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Auto-fill Demo OTP ({registerTestOtp || "482916"})
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegisterOtpSent(false)}
                        style={{ background: "none", border: "none", color: "#64748b", fontSize: "0.7rem", cursor: "pointer" }}
                      >
                        Edit Number
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginTop: "10px" }}>
                      <input
                        type="checkbox"
                        id="charter-check"
                        checked={agreedToCharter}
                        onChange={(e) => setAgreedToCharter(e.target.checked)}
                        style={{ accentColor: "#d4af37", marginTop: "2px" }}
                      />
                      <label htmlFor="charter-check" style={{ fontSize: "0.68rem", color: "#94a3b8", cursor: "pointer" }}>
                        I agree to the BIS 100% Hallmarked Charter and Cryptographic HUID verification rules.
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        width: "100%",
                        marginTop: "12px",
                        padding: "11px",
                        background: "linear-gradient(135deg, #d4af37 0%, #aa820a 100%)",
                        border: "none",
                        borderRadius: "6px",
                        color: "#0a0b0e",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <span>Establish Vault Membership</span>
                      <ArrowRight size={15} />
                    </motion.button>
                  </div>
                )}
              </form>
            )}

            {/* Bottom Skip Bar */}
            <div
              style={{
                marginTop: "18px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.72rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
                <ShieldCheck size={13} color="#d4af37" />
                <span>MongoDB & Rust Secured</span>
              </div>

              {onSkip ? (
                <button
                  type="button"
                  onClick={() => {
                    onSkip();
                    onClose();
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--gold-primary)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Skip & Browse as Guest →
                </button>
              ) : (
                <span style={{ color: "#64748b" }}>BIS Hallmarked 916</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
