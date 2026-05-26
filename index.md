---
title: Home
---

# Welcome
Select a course from the sidebar.

<style>
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.course-card {
  border: 2px solid #333;
  padding: 12px;
  border-radius: 8px;
}

.course-card h2 {
  margin-top: 0;
}
</style>

<div class="course-grid">

  {% for key in site.data.courses %}
    {% assign course = key[1] %}

    <div class="course-card">
      <h2>{{ course.name }}</h2>

      <ul>
        {% for lesson in course.lessons %}
          <li>
            <a href="{{ lesson.url | relative_url }}">
              {{ lesson.title }}
            </a>
          </li>
        {% endfor %}
      </ul>
    </div>

  {% endfor %}

</div>