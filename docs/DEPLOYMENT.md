# Deployment Manual

### 1. GitHub Pages (Static Hosting)
```bash
npm install
npm run build
```
Push the `dist/` folder or let `.github/workflows/deploy.yml` deploy automatically on push to `main`.

### 2. cPanel / Shared Hosting
Upload the contents of the `dist/` directory directly into `public_html/` or a subdomain folder. Because the application utilizes hash routing, no complex `.htaccess` rewrites are required.
