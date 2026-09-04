# Abuja Property Forum — Property Platform Demo

## Included
- Responsive public property marketplace
- Hero search with location, property type, bedrooms and budget filters
- Sale / Rent / Short Let filtering
- Featured property cards
- Property details modal
- Agent call and WhatsApp enquiry buttons
- Favourites saved in browser localStorage
- List Your Property form
- About and Contact sections
- Admin dashboard
- Admin add / edit / delete property
- Admin search and status filters
- Property submission management
- Demo settings and reset controls

## Run locally
Open `index.html` in a browser.

For best results, use a local server:
- VS Code Live Server, or
- `python -m http.server 8080`

Then visit `http://localhost:8080`.

## GitHub Pages
Upload the contents of this folder to a GitHub repository.
Enable Settings → Pages → Deploy from branch → main → root.

The admin dashboard is at `/admin.html`.

## Important
This is a client demo/prototype. The dashboard stores data in the browser using localStorage. For production, connect it to a secure backend/database and add authentication, image uploads, user roles, validation and server-side enquiry handling.
