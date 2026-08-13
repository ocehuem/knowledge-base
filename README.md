# Knowledge Base

A personal knowledge base built with **Jekyll** and hosted using **GitHub Pages**.

The site organizes learning material into courses and lessons. Course information is maintained in `_data/courses.yml`, while individual course pages are stored under `_courses`.

**Live Site:** https://ocehuem.github.io/knowledge-base/

## Prerequisites

Install the following before setting up the project:

* Git
* Ruby
* RubyGems
* Jekyll

Verify the installations:

```bash
git --version
ruby --version
gem --version
jekyll --version
```

> On Windows, Jekyll is not officially supported, so Ruby/Jekyll setup may require additional Windows-specific configuration.

## Setup

### 1. Clone the repository

using HTTPS:

```bash
git clone https://github.com/ocehuem/knowledge-base.git
```

### 2. Navigate to the repository

```bash
cd knowledge-base
```

### 3. Install Jekyll

If Jekyll is not already installed:

```bash
gem install jekyll bundler
```

Verify:

```bash
jekyll --version
```

## Run Locally

Start the Jekyll development server:

```bash
jekyll serve --baseurl=""
```

The site will be available at:

```text
http://localhost:4000
```

Jekyll's `serve` command starts a local development server and rebuilds the site when files are changed. Using `--baseurl=""` overrides the GitHub Pages base URL so that links work correctly when running locally.

You can also use:

```bash
jekyll serve
```

but because the repository's `_config.yml` contains:

```yaml
baseurl: "/knowledge-base"
```

using `--baseurl=""` is recommended for local development.

## Build the Site

To generate the static site without starting the server:

```bash
jekyll build
```

The generated site will be placed in:

```text
_site/
```

## Project Structure

```text
knowledge-base/
│
├── _courses/
│   ├── Revision/
│   ├── Sony/
│   ├── improvement/
│   └── suggestions/
│
├── _data/
│   └── courses.yml
│
├── _includes/
│
├── _layouts/
│
├── assets/
│
├── _config.yml
├── index.md
└── README.md
```

### `_config.yml`

Contains the Jekyll site configuration.

The current configuration:

* Sets the site title to `Knowledge Base`
* Sets the GitHub Pages base URL to `/knowledge-base`
* Enables the `courses` collection
* Enables output for course pages
* Applies the `default` layout to pages and courses

### `_data/courses.yml`

Contains the course and lesson metadata.

Example:

```yaml
Sony:
  name: Sony
  lessons:
    - title: "Day1- Arrays"
      url: /courses/Sony/Day1.html
```

The home page reads this YAML data using Liquid and dynamically generates the course cards and lesson links.

### `_courses/`

Contains the actual course content.

Current course categories include:

* Sony
* Revision
* Improvement Plans
* Misc + References

### `_layouts/`

Contains the Jekyll layouts used to render pages and courses.

### `_includes/`

Contains reusable Liquid/HTML components.

### `assets/`

Contains the site's static assets such as CSS, JavaScript, images, and other resources.

## Adding a New Course/Lesson

### 1. Add the course content

Create the appropriate Markdown/HTML file under `_courses`.

For example:

```text
_courses/
└── Sony/
    └── Day4.html
```

### 2. Add the lesson to `courses.yml`

Update `_data/courses.yml`:

```yaml
Sony:
  name: Sony
  lessons:
    - title: "Day1- Arrays"
      url: /courses/Sony/Day1.html
    - title: "Day4 — New Topic"
      url: /courses/Sony/Day4.html
```

The home page will automatically pick up the new lesson because it iterates through `site.data.courses`.

## Development Workflow

After making changes:

```bash
git status
```

Run the site locally:

```bash
jekyll serve --baseurl=""
```

Open:

```text
http://localhost:4000
```

After verifying the changes:

```bash
git add .
git commit -m "Update knowledge base"
git push
```

GitHub Pages can then build and publish the updated site from the configured publishing source.

## Troubleshooting

### `jekyll` is not recognized

Install Jekyll:

```bash
gem install jekyll
```

Then verify:

```bash
jekyll --version
```

### Ruby is not recognized

Install Ruby and reopen the terminal so that Ruby is available in `PATH`.

### Changes are not visible locally

Stop the server with:

```text
Ctrl + C
```

Then restart:

```bash
jekyll serve --baseurl=""
```

### Links work on GitHub Pages but not locally

Use:

```bash
jekyll serve --baseurl=""
```

instead of relying on the `/knowledge-base` production base URL.

## Useful Commands

| Purpose             | Command                      |
| ------------------- | ---------------------------- |
| Check Git           | `git --version`              |
| Check Ruby          | `ruby --version`             |
| Check Jekyll        | `jekyll --version`           |
| Install Jekyll      | `gem install jekyll bundler` |
| Start local server  | `jekyll serve --baseurl=""`  |
| Build site          | `jekyll build`               |
| Check Git status    | `git status`                 |
| Pull latest changes | `git pull`                   |
| Push changes        | `git push`                   |

## References

* Repository: https://github.com/ocehuem/knowledge-base
* Jekyll documentation: https://jekyllrb.com/docs/
* GitHub Pages with Jekyll: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
