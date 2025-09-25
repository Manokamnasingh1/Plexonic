# React + Vite

🛠️ Mini Webpage Builder - Frontend

This is the frontend of the Mini Webpage Builder, built using React + Vite.
It allows users to drag & drop blocks, edit styles, preview pages in real-time, and collaborate with multiple users.

🎯 Problem Statement

Build a basic webpage builder where users can:

Drag & drop blocks (Text, Image, Button, Container, Form, Divider, Card, List).

Save the page structure in MongoDB.

Preview the saved page in real-time.

Enable collaborative editing using Socket.IO.

📸 Screenshots (To Be Added)

Login Form  <img width="1366" height="768" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/1881ea37-f082-4060-85ff-3b2c3ab4bee0" />


Signup Form   <img width="1366" height="768" alt="Screenshot (87)" src="https://github.com/user-attachments/assets/f1406eb9-06fa-4621-903f-3bd222042d1f" />


Editor Page   <img width="1366" height="768" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/728980d9-d08d-456e-abd2-03ec189495bf" />


Preview Page


🔹 Requirements (Frontend Scope)
Sidebar with Draggable Blocks

Text → custom text, heading/paragraph/list, formatting (bold, italic, alignment).

Image → URL/upload, size, alignment, alt text.

Button → label, link, configurable styles (color, size, border-radius).

Container/Section → holds other blocks, customizable background, padding, margin.

Form → input fields, textarea, submit button.

Divider → horizontal/vertical line, adjustable thickness & style.

Card → prebuilt layout (image + text + button).

List → ordered/unordered, custom bullets/icons.

Canvas Area

Drag & drop positioning.

Nested blocks inside containers.

Reorder existing blocks.

Block Settings Panel

Edit block styles (font, colors, alignment, spacing).

Preview Panel

Live preview of the current page.

Save button → persist layout in backend.

Option to Save as Draft or Publish.

Undo/Redo

Maintain action history (add, delete, move).

Preview Mode

Route /preview/:pageId → fetch schema & render blocks dynamically.

Real-time Editing

Socket.IO support → multiple users can edit the same page simultaneously.

Authentication

JWT-based Login & Signup system.

🚀 Deliverables (Frontend)

Login Page → user authentication form.

Signup Page → new user registration form.

Editor Page → drag-and-drop builder with preview panel.

Preview Page → renders saved layout by pageId.


🛠️ Tech Stack

React (Vite) – frontend framework.

React Router DOM – routing.

Context API – state management.

Socket.IO Client – real-time editing.

CSS – styling.

⚙️ Installation & Setup

Clone the repository:

git clone <your-repo-link>
cd frontend


Install dependencies:

npm install


Run the development server:

npm run dev


Open in browser:

http://localhost:5173/


