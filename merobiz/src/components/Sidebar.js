// import React, { useState } from "react";
// import "../css/sidebar.css";

// const navItems = [
//   { section: "", items: [
//     { label: "Home", icon: HomeIcon, link: "#", aria: "Home" }
//   ]},
//   { section: "Data", items: [
//     { label: "Users", icon: UsersIcon, link: "#", aria: "Users" },
//     { label: "Cards", icon: CardsIcon, link: "#", aria: "Cards" },
//     { label: "List", icon: ListIcon, link: "#", aria: "List" }
//   ]},
//   { section: "Pages", items: [
//     { label: "Profile", icon: ProfileIcon, link: "#", aria: "Profile", active: true },
//     { label: "Calendar", icon: CalendarIcon, link: "#", aria: "Calendar" },
//     { label: "Help", icon: HelpIcon, link: "#", aria: "Help" }
//   ]},
//   { section: "Charts", items: [
//     { label: "Bar Chart", icon: BarChartIcon, link: "#", aria: "Bar Chart" },
//     { label: "Pie Chart", icon: PieChartIcon, link: "#", aria: "Pie Chart" },
//     { label: "Line Chart", icon: LineChartIcon, link: "#", aria: "Line Chart" },
//     { label: "Map", icon: MapIcon, link: "#", aria: "Map" }
//   ]}
// ];

// // SVG icon components
// function HomeIcon({ active }) {
//   return (
//     <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <path d="M3 12L12 4l9 8"/><path d="M9 21V9h6v12"/>
//     </svg>
//   );
// }
// function UsersIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
//       <circle cx="9" cy="7" r="4"/>
//       <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
//       <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//     </svg>
//   );
// }
// function CardsIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <rect x="3" y="7" width="18" height="13" rx="2"/>
//       <path d="M16 3v4M8 3v4M3 11h18"/>
//     </svg>
//   );
// }
// function ListIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <line x1="8" y1="6" x2="21" y2="6"/>
//       <line x1="8" y1="12" x2="21" y2="12"/>
//       <line x1="8" y1="18" x2="21" y2="18"/>
//       <circle cx="4" cy="6" r="1.5"/>
//       <circle cx="4" cy="12" r="1.5"/>
//       <circle cx="4" cy="18" r="1.5"/>
//     </svg>
//   );
// }
// function ProfileIcon({ active }) {
//   return (
//     <svg width="24" height="24" fill="none" stroke={active ? "#6366f1" : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <circle cx="12" cy="8" r="4"/>
//       <path d="M16 20v-2a4 4 0 0 0-8 0v2"/>
//     </svg>
//   );
// }
// function CalendarIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <rect x="3" y="5" width="18" height="16" rx="2"/>
//       <path d="M16 3v4M8 3v4M3 11h18"/>
//     </svg>
//   );
// }
// function HelpIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <circle cx="12" cy="12" r="10"/>
//       <path d="M12 16v-1a4 4 0 1 0-4-4"/>
//       <circle cx="12" cy="18" r="1"/>
//     </svg>
//   );
// }
// function BarChartIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <rect x="3" y="12" width="4" height="8" rx="1"/>
//       <rect x="9" y="8" width="4" height="12" rx="1"/>
//       <rect x="15" y="4" width="4" height="16" rx="1"/>
//     </svg>
//   );
// }
// function PieChartIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <path d="M21 12A9 9 0 1 1 12 3v9z"/>
//       <path d="M12 3a9 9 0 0 1 9 9h-9z"/>
//     </svg>
//   );
// }
// function LineChartIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <polyline points="4 14 8 10 12 14 16 10 20 14"/>
//     </svg>
//   );
// }
// function MapIcon() {
//   return (
//     <svg width="24" height="24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
//       <line x1="8" y1="2" x2="8" y2="18"/>
//       <line x1="16" y1="6" x2="16" y2="22"/>
//     </svg>
//   );
// }
// function MenuIcon() {
//   return (
//     <svg width="28" height="28" fill="none" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//       <line x1="5" y1="8" x2="23" y2="8"/>
//       <line x1="5" y1="14" x2="23" y2="14"/>
//       <line x1="5" y1="20" x2="23" y2="20"/>
//     </svg>
//   );
// }

// export default function Sidebar() {
//   const [expanded, setExpanded] = useState(true);

//   // Keyboard accessibility for toggle
//   const handleToggleKey = (e) => {
//     if (e.key === " " || e.key === "Enter") {
//       setExpanded((val) => !val);
//     }
//   };

//   return (
//     <aside
//       className={`sidebar${expanded ? " expanded" : ""}`}
//       role="complementary"
//       aria-label="Main Sidebar"
//       tabIndex={-1}
//     >
//       <button
//         className="sidebar__toggle"
//         aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
//         aria-expanded={expanded}
//         onClick={() => setExpanded((val) => !val)}
//         onKeyDown={handleToggleKey}
//       >
//         <MenuIcon />
//       </button>
//       <nav className="sidebar__nav" aria-label="Sidebar Navigation">
//         <ul>
//           {navItems.map((section, idx) => (
//             <React.Fragment key={idx}>
//               {section.section && (
//                 <li className="sidebar__section" aria-hidden="true">
//                   {expanded && <span>{section.section}</span>}
//                 </li>
//               )}
//               {section.items.map((item, i) => (
//                 <li key={item.label}>
//                   <a
//                     href={item.link}
//                     className={`sidebar__link${item.active ? " active" : ""}`}
//                     aria-label={item.aria}
//                     tabIndex={0}
//                   >
//                     <span className="sidebar__icon">
//                       <item.icon active={item.active} />
//                     </span>
//                     {expanded && <span className="sidebar__text">{item.label}</span>}
//                   </a>
//                 </li>
//               ))}
//             </React.Fragment>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }


import React, { useState } from "react";
import "../css/sidebar.css";
import { useAccessibility } from '../contexts/AccessibilityContext';

// ... (all icon components remain the same) ...

const navItems = [
  { section: "", items: [
    { label: "Home", icon: HomeIcon, link: "#", aria: "Home" }
  ]},
  { section: "Data", items: [
    { label: "Users", icon: UsersIcon, link: "#", aria: "Users" },
    { label: "Cards", icon: CardsIcon, link: "#", aria: "Cards" },
    { label: "List", icon: ListIcon, link: "#", aria: "List" }
  ]},
  { section: "Pages", items: [
    { label: "Profile", icon: ProfileIcon, link: "#", aria: "Profile", active: true },
    { label: "Calendar", icon: CalendarIcon, link: "#", aria: "Calendar" },
    { label: "Help", icon: HelpIcon, link: "#", aria: "Help" }
  ]},
  { section: "Charts", items: [
    { label: "Bar Chart", icon: BarChartIcon, link: "#", aria: "Bar Chart" },
    { label: "Pie Chart", icon: PieChartIcon, link: "#", aria: "Pie Chart" },
    { label: "Line Chart", icon: LineChartIcon, link: "#", aria: "Line Chart" },
    { label: "Map", icon: MapIcon, link: "#", aria: "Map" }
  ]}
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const { accessibilityOn } = useAccessibility();

  // Speak text aloud
  const speak = (text) => {
    if (accessibilityOn && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard accessibility for toggle
  const handleToggleKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      setExpanded((val) => !val);
      speak(expanded ? "Collapse sidebar" : "Expand sidebar");
      e.preventDefault();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, sectionIndex, itemIndex) => {
    if (!accessibilityOn) return;
    
    const totalItems = navItems.flatMap(section => section.items).length;
    const currentIndex = navItems
      .slice(0, sectionIndex)
      .reduce((acc, section) => acc + section.items.length, 0) + itemIndex;

    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((currentIndex + 1) % totalItems);
        e.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIndex((currentIndex - 1 + totalItems) % totalItems);
        e.preventDefault();
        break;
      case 'Enter':
        speak(`Navigating to ${navItems[sectionIndex].items[itemIndex].label}`);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <aside
      className={`sidebar${expanded ? " expanded" : ""}`}
      role="complementary"
      aria-label="Main Sidebar"
      tabIndex={-1}
    >
      <button
        className="sidebar__toggle"
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        aria-expanded={expanded}
        onClick={() => setExpanded((val) => !val)}
        onKeyDown={handleToggleKey}
        onMouseEnter={() => accessibilityOn && speak(expanded ? "Collapse sidebar" : "Expand sidebar")}
        onFocus={() => accessibilityOn && speak(expanded ? "Collapse sidebar" : "Expand sidebar")}
      >
        <MenuIcon />
      </button>
      <nav className="sidebar__nav" aria-label="Sidebar Navigation">
        <ul>
          {navItems.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {section.section && (
                <li 
                  className="sidebar__section" 
                  aria-hidden="true"
                  tabIndex={accessibilityOn ? 0 : -1}
                  onFocus={() => accessibilityOn && speak(section.section)}
                >
                  {expanded && <span>{section.section}</span>}
                </li>
              )}
              {section.items.map((item, itemIndex) => {
                const globalIndex = navItems
                  .slice(0, sectionIndex)
                  .reduce((acc, sec) => acc + sec.items.length, 0) + itemIndex;
                  
                return (
                  <li key={item.label}>
                    <a
                      href={item.link}
                      className={`sidebar__link${item.active ? " active" : ""} ${
                        focusedIndex === globalIndex && accessibilityOn ? "focused" : ""
                      }`}
                      aria-label={item.aria}
                      tabIndex={accessibilityOn ? 0 : -1}
                      onMouseEnter={() => accessibilityOn && speak(item.label)}
                      onFocus={() => {
                        setFocusedIndex(globalIndex);
                        accessibilityOn && speak(item.label);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, sectionIndex, itemIndex)}
                    >
                      <span className="sidebar__icon">
                        <item.icon active={item.active} />
                      </span>
                      {expanded && <span className="sidebar__text">{item.label}</span>}
                    </a>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
