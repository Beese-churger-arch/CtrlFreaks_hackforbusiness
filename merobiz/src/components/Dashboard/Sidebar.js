import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../css/sidebar.css";

// MAIN FEATURE ICONS
function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12L12 4l9 8"/><path d="M9 21V9h6v12"/>
    </svg>
  );
}
function PricingIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 7l10 10M7 17L17 7" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  );
}
function ReceiptIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  );
}
function FraudIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 4v5c0 5-3.8 9.4-8 11-4.2-1.6-8-6-8-11V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function BatchIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

// UTILITIES ICONS
function ProfileIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4"/>
      <path d="M16 20v-2a4 4 0 0 0-8 0v2"/>
    </svg>
  );
}
function HelpIcon({ active }) {
  return (
    <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-1a4 4 0 1 0-4-4"/>
      <circle cx="12" cy="18" r="1"/>
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="8" x2="23" y2="8"/>
      <line x1="5" y1="14" x2="23" y2="14"/>
      <line x1="5" y1="20" x2="23" y2="20"/>
    </svg>
  );
}

// NAVIGATION LINKS
const navLinks = [
  { to: "/dashboard", label: "Home", icon: HomeIcon },
  { to: "/dashboard/pricing", label: "Dynamic Pricing", icon: PricingIcon },
  { to: "/dashboard/receipt", label: "Receipt Processing", icon: ReceiptIcon },
  { to: "/dashboard/fraud", label: "Fraud Detection (single transaction)", icon: FraudIcon },
  { to: "/dashboard/fraud-batch", label: "Fraud Detection (batch)", icon: BatchIcon },
  { section: "Utilities" },
  { to: "/profile", label: "Profile", icon: ProfileIcon },
  { to: "/help", label: "Help", icon: HelpIcon }
];

export default function Sidebar() {
  // COLLAPSED BY DEFAULT
  const [expanded, setExpanded] = useState(false);

  const handleToggleKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      setExpanded((val) => !val);
    }
  };

  return (
    <aside className={`sidebar${expanded ? " expanded" : ""}`} role="complementary" aria-label="Main Sidebar" tabIndex={-1}>
      <button
        className="sidebar__toggle"
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={expanded}
        onClick={() => setExpanded((val) => !val)}
        onKeyDown={handleToggleKey}
      >
        <MenuIcon />
      </button>
      <nav className="sidebar__nav" aria-label="Sidebar Navigation">
        <ul>
          {navLinks.map((item, idx) =>
            item.section ? (
              <li key={item.section} className="sidebar__section" aria-hidden="true">
                {expanded && <span>{item.section}</span>}
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
                  aria-label={item.label}
                  tabIndex={0}
                >
                  <span className="sidebar__icon">
                    {item.icon ? <item.icon active={window.location.pathname === item.to} /> : null}
                  </span>
                  {expanded && <span className="sidebar__text">{item.label}</span>}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}
