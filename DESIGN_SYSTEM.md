# Academic Excellence Design System

## 🎨 Full Color Palette

### 🔵 Primary (Blue Javeriana)
| Shade | Hex Code | Usage |
| :--- | :--- | :--- |
| **50** | `#eef3f9` | Ultra-light backgrounds |
| **100** | `#dce7f3` | Subtle hover backgrounds |
| **200** | `#b9cfe7` | Borders on light mode |
| **300** | `#97b7db` | Decorative elements |
| **400** | `#749fcf` | Secondary branding |
| **500** | `#2C5697` | **Main Brand / Primary Buttons** |
| **600** | `#234579` | Hover states (Primary) |
| **700** | `#1a345b` | Active states / Darker accents |
| **800** | `#12233c` | Deep backgrounds |
| **900** | `#09111e` | Typography (Contrast) |

### 🟡 Secondary (Gold Javeriana)
| Shade | Hex Code | Usage |
| :--- | :--- | :--- |
| **50** | `#fffbeb` | Warning backgrounds |
| **100** | `#fff6d6` | Subtle highlight |
| **200** | `#ffedad` | Accent borders |
| **300** | `#ffe485` | Soft accents |
| **400** | `#ffdb5c` | Visual cues |
| **500** | `#ffc107` | **Accent Action / High Priority Badges** |
| **600** | `#dba607` | Hover states (Secondary) |
| **700** | `#997e00` | Darker gold accents |
| **800** | `#665400` | Deep gold / Contrast |
| **900** | `#332a00` | Dark text on gold |

### ⚪ Neutral (Grayscale)
| Shade | Hex Code | Usage |
| :--- | :--- | :--- |
| **50** | `#F8F9FA` | Main Page Background |
| **100** | `#F1F3F5` | Secondary backgrounds |
| **200** | `#E9ECEF` | Component borders (Light) |
| **300** | `#DEE2E6` | Input borders |
| **400** | `#CED4DA` | Placeholder text |
| **500** | `#ADB5BD` | Disabled states |
| **600** | `#6C757D` | Secondary text |
| **700** | `#495057` | Main Body text |
| **800** | `#343A40` | Headings (Subtle) |
| **900** | `#212529` | **Main Headings** |
| **950** | `#0a0e1a` | Dark mode background |

---

## ✍️ Typography
| Level | Font | Size | Weight | Case |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | Noto Serif | 32px | Bold | Normal |
| **H2** | Noto Serif | 24px | Semibold | Normal |
| **Body** | Public Sans | 16px | Regular | Normal |
| **Small** | Public Sans | 14px | Regular | Normal |
| **Label** | Public Sans | 12px | Semibold | UPPERCASE |

---

## 📐 Geometry & Spacing
| Token | Value | Target |
| :--- | :--- | :--- |
| **Base Unit** | 4px | Padding/Margins multiplier |
| **rounded** | 8px | Standard cards |
| **rounded-md** | 6px | Inputs, Buttons |
| **rounded-lg** | 12px | Primary layout containers |
| **Border** | 1px | All outlines |

---

## 🧩 Component Specs

### 🔘 Buttons
- **Primary**: `bg-primary-500`, `text-white`, `rounded-md`
- **Secondary**: `border-primary-500`, `text-primary-500`, `bg-transparent`
- **Ghost**: `text-primary-500`, `hover:bg-primary-50`

### ⌨️ Inputs
- **Base**: `bg-neutral-50`, `border-neutral-300`, `rounded-md`
- **Focus**: `ring-2`, `ring-primary-500/20`, `border-primary-500`

### 🗂️ Cards
- **Container**: `bg-white`, `border-neutral-200`, `rounded-lg`, `shadow-sm`

---

## 🛠️ Iconography (Lucide)
- **Stroke Width**: `2px`
- **Size (Table)**: `16px`
- **Size (Button)**: `20px`
- **Size (Header)**: `24px`

---

## 🚫 Global Constraints (Critical)
- **NO** extra colors (use only tokens above).
- **NO** soft/bubble UI (`rounded-xl` or `rounded-full` prohibited).
- **NO** decorative-only icons.
- **NO** arbitrary spacing (must use 4px scale).
- **YES** Institutional, corporate, and functional aesthetic.
