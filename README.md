# VisaBook Website

A dockerized, high-performance website for immigration services featuring a dynamic, JSON-driven blog system.

## 🚀 Getting Started

### Prerequisites

* Docker and Docker Desktop installed.
* (macOS Users) Ensure Docker has **Full Disk Access** and the project is located outside of protected folders (like Desktop) to avoid permission errors.

### Installation & Launch

1. **Move the project** to a development directory (e.g., `~/projects/visabook_website`).
2. **Build and Start** the container:
```bash
docker-compose up -d --build

```


3. **Access the site** at: [http://localhost:4000](https://www.google.com/search?q=http://localhost:4000)

---

## 📂 Project Structure

* `index.html`: Main landing page.
* `blogs/index.html`: Dynamic listing page that reads from `blogs.json`.
* `blogs/blogs.json`: The data source for all blog posts.
* `blogs/images/`: Storage for all article featured images.
* `blogs/articles/`: Individual HTML article files (rendered via slug).
* `nginx.conf`: Custom configuration for port 4000 and Clean URLs.
* `docker-compose.yml`: Handles volume mounting for live content updates.

---

## ✍️ Content Updates

This project uses **Docker Bind Mounts**. You can update the blog content without stopping the container:

1. Update `blogs/blogs.json` with new entry details.
2. Add the article image to `blogs/images/`.
3. Create the article HTML in `blogs/articles/` naming it `your-slug-name.html`.
4. **Hard Refresh** your browser (`Cmd+Shift+R` or `Ctrl+F5`) to see changes.

---

## 🛠 Maintenance Commands

**Stop and Remove Volumes:**

```bash
docker-compose down -v

```

**Full Clean Rebuild:**
If you change the `Dockerfile` or `nginx.conf`, run:

```bash
docker-compose down -v
docker-compose up -d --build --force-recreate

```

**Verify Sync Status:**
To verify Docker sees your local file changes:

```bash
docker exec visabook-web cat /usr/share/nginx/html/blogs/blogs.json

```

---

## 🌐 Nginx Configuration

The server is configured to serve `.html` files without the extension in the URL for better SEO and cleaner navigation.

Example:

* **URL:** `https://visabook.ai/blogs/articles/express-entry-guide`
* **Serves:** `/blogs/articles/express-entry-guide.html`