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
