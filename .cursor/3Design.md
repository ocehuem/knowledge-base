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
│ ├── images/
│ ├── icons/
│ └── fonts/
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
