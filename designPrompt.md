# DESIGN SYSTEM REFERENCE
assets/
└── css/
    ├── main.css
    │
    ├── base/
    │   ├── variables.css
    │   ├── reset.css
    │   ├── typography.css
    │   └── animations.css
    │
    ├── layout/
    │   ├── layout.css
    │   ├── sidebar.css
    │   ├── content.css
    │   └── navigation.css
    │
    ├── components/
    │   ├── buttons.css
    │   ├── cards.css
    │   ├── tabs.css
    │   ├── tables.css
    │   ├── code.css
    │   └── notes.css
    │
    ├── pages/
    │   ├── lesson.css
    │   ├── life.css
    │   └── mindmap.css
    │
    └── themes/
        └── dark.css
## variables.css

Variables:
--bg-color,
--card-bg,
--text-color,
--link-color,
--sidebar-bg,
--sidebar-text,
--sidebar-link,
--success,
--warning,
--danger,
--info,
--radius-sm,
--radius-md,
--radius-lg,
--space-xs,
--space-sm,
--space-md,
--space-lg,
--space-xl,
--shadow-sm,
--shadow-md,
--shadow-lg,
--transition-fast,
--transition-normal

---

## reset.css

Global resets:
*,
*::before,
*::after,
body,
img,
button,
input,
table

---

## typography.css

Elements:
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
ul,
ol,
li,
blockquote,
strong,
em

---

## layout.css

Layout:
.layout,
.main,
.container,
.container-fluid

Flex utilities:
.flex,
.flex-column,
.flex-row,
.flex-center,
.flex-between,
.flex-wrap

Grid utilities:
.grid,
.grid-2,
.grid-3,
.grid-4,
.grid-auto

---

## content.css

Content containers:
.content,
.content-wide,
.content-full,
.content-narrow

Helpers:
.content-center,
.content-scroll

---

## sidebar.css

Sidebar:
.sidebar,
.sidebar.closed,
.sidebar.open

Accordion:
.course-header,
.course-header.active,
.course-content,
.arrow

Sidebar links:
.sidebar a

---

## navigation.css

Navigation:
.lesson-nav,
.lesson-nav a,
.nav-icon

Page navigation:
.previous-btn,
.next-btn

---

## buttons.css

Buttons:
.btn,
.btn-outline,
.btn-success,
.btn-warning,
.btn-danger,
.btn-primary,
.btn-secondary

Fixed controls:
#theme-toggle,
#home,
#sidebar-toggle

---

## cards.css

Cards:
.card,
.card-sm,
.card-lg,
.card-outline,
.card-glass

Status cards:
.card-success,
.card-warning,
.card-danger,
.card-info

Card content:
.card-header,
.card-body,
.card-footer

---

## code.css

Code:
pre,
code

Helpers:
.code-wrapper,
.code-title,
.code-terminal,
.code-inline

---

## notes.css

Notes:
.note-box,
.warning-box,
.error-box,
.info-box,
.success-box

Titles:
.note-title,
.warning-title,
.error-title,
.info-title,
.success-title

---

## tables.css

Tables:
table,
th,
td

Helpers:
.table-wrapper,
.table-sm,
.table-lg,
.table-bordered,
.table-striped,
.table-responsive

Columns:
.task

---

## tabs.css

Tabs:
.tabs,
.tab-btn,
.tab-content

Variants:
.tabs-pills,
.tabs-underline,
.tabs-vertical

States:
.tab-btn.active,
.tab-content.active

---

## animations.css

Animations:
fadeIn,
slideUp,
pulse,
float

Animation classes:
.animate-fade,
.animate-slide,
.animate-pulse,
.animate-float

---

## lesson.css

Lesson:
.lesson-header,
.lesson-meta,
.lesson-section,
.lesson-nav

Lesson content:
.lesson-title,
.lesson-subtitle,
.lesson-body

---

## life.css

Container:
.lp-container

Header:
.lp-header

Sections:
.lp-section

Cards:
.lp-card

Warnings:
.lp-warning

Effects:
.lp-bubble

Images:
.lp-img

---

## mindmap.css

Mindmap:
.mindmap-container,
.mindmap-scroll,
.mindmap-root,
.mindmap-branch,
.mindmap-level,
.mindmap-node

Interactive:
.node-expand,
.node-collapse,
.node-active

Layout:
.horizontal-mindmap,
.vertical-mindmap

---

## Dark Mode

Dark mode aware components:

body.dark-mode

.content
.sidebar
.card
.note-box
.warning-box
.error-box
.success-box
.info-box
table
pre
code
.lp-container
.lp-card
.lp-warning
.lp-bubble

---

## Reuse Rules

Prefer:

.card before creating containers

.note-box before creating alerts

.tabs before creating toggles

.table-wrapper before custom table wrappers

.content-wide or content-full before custom widths

.lesson-section before custom lesson blocks

.lp-card only for Life pages

.mindmap-container only for roadmap/mindmap pages