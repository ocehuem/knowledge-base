Yes. For an irregular website folder, **don’t ask OpenCode to “clean everything up” in one shot**. That can easily break paths, JS behavior, images, and existing pages.

The safer approach is to make OpenCode act like a **codebase refactoring agent** with a staged plan:

> **Inventory → Understand → Design structure → Detect dependencies → Refactor → Validate → Clean up → Document**

## 1. First: make a backup

Before OpenCode touches anything:

```text
my-website/
my-website-backup/
```

Or, preferably, initialize Git:

```bash
cd my-website
git init
git add .
git commit -m "backup before restructuring"
```

Then you can always:

```bash
git status
git diff
git restore .
```

if something goes wrong.

---

# 2. OpenCode should NOT modify anything initially

Your first prompt should be **analysis-only**.

OpenCode needs to understand what you actually have before deciding the structure.

Give it this:

```text
I have an existing website project that has grown organically and is currently
very unstructured.

IMPORTANT:
- Do NOT modify, delete, rename, move, or create any files yet.
- First inspect the entire project.
- I want to reorganize the project without changing its current behavior or UI.
- Some files may be duplicated, obsolete, incorrectly named, or placed in
  inconsistent folders.
- Some HTML files may reference CSS/JS/images using relative paths, so dependency
  relationships must be carefully tracked.
- Do not assume that a file is unused just because it looks unused.
- Do not rewrite working code unnecessarily.

Your first task is ONLY to audit the project.

Inspect:
1. Complete folder/file tree
2. All HTML files
3. All CSS files
4. All JS files
5. Images/assets/fonts/icons
6. JSON/data/config files
7. Any README/documentation
8. package.json/package-lock.json or other dependency files if present
9. Git configuration if present
10. Every import/reference between files

For every file determine:
- what it appears to do
- which page/component it belongs to
- what files depend on it
- what files it depends on
- whether it appears duplicated
- whether it appears unused
- whether it appears obsolete
- whether it contains shared functionality
- whether its current filename/location is sensible

Pay particular attention to:
- <script src="">
- <link href="">
- import/export statements
- image paths
- CSS url(...)
- fetch(...)
- JSON/data references
- iframe/embed references
- navigation links
- form actions
- dynamically constructed paths

Do NOT make any changes.

At the end produce:

A. Current project tree
B. File inventory
C. Dependency/reference map
D. Duplicate/similar files
E. Suspected unused files
F. Shared vs page-specific assets
G. Problems with current organization
H. Recommended target folder structure
I. Proposed file moves/renames
J. Risk level for each proposed change
K. Questions/ambiguities that need to be resolved before modifying anything

Do not delete anything.
Do not rename anything.
Do not refactor code yet.
```

### Why this first step matters

You don't want OpenCode deciding:

> `BooksRead.js` looks old → delete it.

when in reality:

```text
BooksRead.html
    ↓
BooksRead.js
    ↓
Chart.js
    ↓
data/books.json
```

or another page may secretly reference it.

---

# 3. Then ask it to design the target structure

Once you have the audit, **do not immediately tell it to move files**.

Give it a second prompt:

```text
Now use the audit you just produced to design the final organization.

Still DO NOT modify the project.

The goal is a clean, maintainable structure while preserving:
- all existing pages
- all existing functionality
- current UI/appearance
- current URLs where practical
- all working assets
- all JavaScript behavior

Design a structure appropriate for this actual project rather than blindly
applying a generic template.

Prefer a structure similar to:

project/
├── pages/
├── css/
├── js/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── data/
└── docs/

BUT adapt it if the project architecture requires something different.

For each proposed move, provide:

OLD PATH → NEW PATH → REASON → DEPENDENCIES AFFECTED → RISK

Also identify:
- files that should remain where they are
- files that should be renamed
- files that should be merged
- files that should NOT be merged
- genuinely unused files
- duplicates that can safely be consolidated

Important:
Do not recommend deleting a file solely because you cannot find a reference.
Mark it as "needs verification" instead.

At the end provide the exact proposed final tree.
Do not make changes yet.
```

---

# 4. Decide your architecture before touching files

For a website like yours, I'd generally aim for something roughly like:

```text
website/
│
├── index.html
│
├── pages/
│   ├── books/
│   │   ├── books.html
│   │   └── ...
│   │
│   ├── ssc/
│   │   ├── ssc-cgl.html
│   │   └── ...
│   │
│   └── ...
│
├── css/
│   ├── global.css
│   ├── components.css
│   └── pages/
│       ├── books.css
│       └── ssc-cgl.css
│
├── js/
│   ├── global.js
│   ├── components/
│   └── pages/
│       ├── books.js
│       └── ssc-cgl.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── data/
│   ├── books.json
│   └── ...
│
└── docs/
```

But **don't force this structure**. If your current project has a different architecture, OpenCode should adapt it.

---

# 5. Then do the actual migration in small batches

This is the important part.

Don't say:

> "Reorganize my whole project."

Instead:

### Phase 1 — assets

```text
Now implement ONLY the asset organization from the approved plan.

Move/rename the relevant:
- images
- icons
- fonts
- static assets

Update every affected reference.

Do not modify application logic.
Do not modify HTML structure unless necessary to update paths.
Do not modify CSS/JS behavior.

After the migration:
1. Search the entire project for references to every old path.
2. Verify every new path exists.
3. Report every changed file.
4. Report any unresolved reference.
5. Do not delete original files yet if there is uncertainty.

Stop after this phase.
```

Then test the website.

---

# 6. Phase 2 — CSS

Then:

```text
Now reorganize ONLY the CSS according to the approved structure.

Goals:
- separate global styles from page-specific styles
- preserve the existing appearance exactly
- preserve selectors unless changing them is necessary
- update all HTML references
- do not redesign anything
- do not change colors, spacing, typography, layout, or responsive behavior

Before merging any CSS files, compare their contents and identify conflicts.

Afterward:
- search for every old CSS path
- verify every new CSS path
- check for duplicate selectors
- check for missing styles
- report all changes

Do not touch JavaScript or HTML logic beyond stylesheet references.
```

---

# 7. Phase 3 — JavaScript

Then:

```text
Now reorganize ONLY the JavaScript.

Separate:
- shared/global JS
- reusable components
- page-specific JS
- data/configuration

IMPORTANT:
Do not rewrite functioning logic merely to make it look cleaner.

Before moving a JS file:
- identify all HTML pages loading it
- identify all imports
- identify global variables/functions it exposes
- identify dependencies on DOM IDs/classes
- identify fetch/data paths

Preserve execution order.

After moving files:
- update script references
- verify imports
- verify data paths
- verify DOM dependencies

Do not delete duplicate/unused files yet unless their removal is completely
verified.
```

---

# 8. Phase 4 — HTML

Only after assets/CSS/JS are stable:

```text
Now reorganize the HTML pages.

Goals:
- put pages into logical folders
- use consistent naming
- preserve page URLs where possible
- update relative paths correctly
- preserve all existing UI and functionality

For every HTML file:
- check CSS paths
- check JS paths
- check image paths
- check links to other pages
- check forms
- check anchors
- check favicon/meta references

Do not redesign the pages.

After migration, search the entire project for references to old HTML paths.
```

---

# 9. Phase 5 — duplicates and dead files

**This should be the last dangerous step.**

Tell OpenCode:

```text
Now perform a cleanup audit after the restructuring.

DO NOT delete anything automatically.

Find:
1. exact duplicate files
2. near-duplicate files
3. files whose functionality has been merged elsewhere
4. files with no references
5. obsolete files
6. empty directories
7. old versions/backups
8. redundant CSS
9. redundant JS

For every candidate deletion provide:

FILE
WHY IT IS SAFE TO DELETE
REFERENCED BY
REPLACED BY
CONFIDENCE: HIGH / MEDIUM / LOW

Only delete files with HIGH confidence.

Do not delete MEDIUM or LOW confidence files.
```

This prevents the classic AI refactoring disaster:

```text
old.html
backup.html
test.html
final.html
final2.html
```

→ AI deletes four because they "look redundant."

---

# 10. Add a project README

After everything works:

```text
Create a concise README.md explaining the final project structure.

Include:
- what the project is
- how to run/open it
- folder structure
- purpose of major folders
- naming conventions
- how pages connect to CSS/JS
- where assets belong
- where data belongs
- rules for adding a new page
- rules for adding a new JS/CSS file

Do not add unnecessary documentation.
```

---

# 11. Very important: use Git checkpoints

If you use Git, do this after every successful phase:

```bash
git add .
git commit -m "Reorganize assets"
```

then:

```bash
git commit -m "Reorganize CSS"
```

then:

```bash
git commit -m "Reorganize JavaScript"
```

then:

```bash
git commit -m "Reorganize HTML pages"
```

then:

```bash
git commit -m "Remove verified obsolete files"
```

This gives you:

```text
Original
   ↓
Assets reorganized
   ↓
CSS reorganized
   ↓
JS reorganized
   ↓
HTML reorganized
   ↓
Cleanup
```

If something breaks, you know **exactly which phase caused it**.

---

# 12. Final validation prompt

After everything:

```text
Perform a final integrity audit of the entire website.

Do not modify anything.

Check:

HTML
- broken links
- missing pages
- duplicate IDs
- missing CSS
- missing JS
- missing images
- incorrect relative paths

CSS
- missing assets
- broken url()
- missing files
- obvious unused page-specific styles

JavaScript
- missing imports
- missing files
- broken fetch paths
- undefined referenced files
- DOM elements expected but absent

Assets
- missing referenced images
- missing fonts
- missing icons

Project
- references to old paths
- references to files that no longer exist
- duplicate files
- empty folders

If possible, run/build/test the project.

Produce a final report:

PASS
WARNINGS
ERRORS
FILES CHANGED
FILES DELETED
FILES STILL NEEDING REVIEW

Do not fix anything automatically during this audit.
```

---

# The complete workflow

I'd use **8 OpenCode stages**:

```text
                YOUR CURRENT MESS
                       │
                       ▼
              1. INVENTORY / AUDIT
                       │
                       ▼
             2. ARCHITECTURE PLAN
                       │
                       ▼
              3. ASSET MIGRATION
                       │
                       ▼
                TEST WEBSITE
                       │
                       ▼
                 4. CSS MIGRATION
                       │
                       ▼
                TEST WEBSITE
                       │
                       ▼
                  5. JS MIGRATION
                       │
                       ▼
                TEST WEBSITE
                       │
                       ▼
                 6. HTML MIGRATION
                       │
                       ▼
                TEST WEBSITE
                       │
                       ▼
               7. DEAD FILE AUDIT
                       │
                       ▼
                 CLEANUP
                       │
                       ▼
             8. FINAL INTEGRITY TEST
```

## One thing I'd change from your current approach

Right now you're creating files like:

```text
BooksRead.html
BooksRead.css
BooksRead.js

SSC_CGL.html
SSC_CGL.css
SSC_CGL.js
```

That's **actually fine as a temporary structure**. The bigger problem is likely that you have many files accumulated in one folder with inconsistent naming and unclear relationships.

Don't let OpenCode immediately turn everything into an elaborate framework. If this is a relatively simple HTML/CSS/JS personal website, **keep it vanilla HTML/CSS/JS unless the existing project genuinely needs a framework**.

The goal should be:

> **organized, predictable, easy to edit — not unnecessarily sophisticated.**

And especially for your SSC tracker, keep its three files together if that makes the page self-contained:

```text
pages/
└── ssc-cgl/
    ├── SSC_CGL.html
    ├── SSC_CGL.css
    └── SSC_CGL.js
```

while shared things live centrally:

```text
assets/
├── images/
├── icons/
└── fonts/
```

That is much easier to maintain than scattering every page's HTML/CSS/JS into three giant global folders.
