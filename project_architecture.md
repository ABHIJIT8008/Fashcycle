# Fashcycle Architecture & Tech Stack Overview

This document provides a comprehensive overview of the Fashcycle frontend and admin portal architecture. It explains the technologies used, the data flow, and how the public site is dynamically controlled by the Admin Panel.

---

## 1. Project Overview
Fashcycle is a React-based web application that serves as the primary landing page and user acquisition portal for the Fashcycle fashion rental marketplace. It features a modern, responsive public-facing site and a secure, built-in Admin Panel used as a lightweight Headless CMS to control the site's content in real-time.

---

## 2. Technology Stack

### Frontend Core
*   **React 19:** Core UI library.
*   **Vite:** Extremely fast build tool and development server.
*   **React Router DOM (v7):** Handles client-side routing (e.g., `/`, `/admin/login`, `/admin`).

### Styling & UI
*   **Tailwind CSS (v4):** Utility-first CSS framework for rapidly building custom, responsive designs.
*   **Lucide React:** Clean, lightweight SVG icon library.

### Backend Infrastructure (BaaS)
*   **Firebase Firestore:** Real-time NoSQL database. Stores all the dynamic content for the site (images, text, testimonials, store leads).
*   **Firebase Authentication:** Secures the Admin Panel using Email/Password authentication.
*   **ImgBB API:** Third-party, free image hosting service. Used to upload images directly from the Admin Panel and serve permanent image URLs, bypassing Firebase Storage quota requirements.

---

## 3. Architecture & Data Flow

The project is structured around two main contexts (`AuthContext` and `ContentContext`) that act as the bridge between the UI and the Backend.

### Authentication Flow (`AuthContext.jsx`)
1.  Admin navigates to `/admin/login`.
2.  `AdminLogin.jsx` collects email and password.
3.  `AuthContext.login()` calls Firebase's `signInWithEmailAndPassword`.
4.  If successful, Firebase manages the session. The `AdminRoute` wrapper allows access to `/admin`.
5.  *Security:* Firestore rules ensure that only authenticated users can execute "write" operations.

### Content & Data Flow (`ContentContext.jsx`)
This context acts as the single source of truth for the site's content.
1.  **Read (Public Site):** On initial load, `ContentContext` connects to the Firestore document `siteData/content` using an `onSnapshot` listener. This means the public site (`App.jsx`) instantly re-renders whenever the database changes.
2.  **Write (Admin Panel):** When an admin edits a section in `AdminPanel.jsx` (e.g., changing the Hero Image) and clicks "Save":
    *   The change is passed to `ContentContext.updateSection()`.
    *   The context updates Firestore via `setDoc(..., { merge: true })`.
    *   The `onSnapshot` listener catches the change, and the UI updates globally.

### Image Upload Flow
1.  Admin selects an image file in the `ImageInput` component inside `AdminPanel.jsx`.
2.  The file is converted to a `FormData` object and POSTed to the **ImgBB API** using the provided `IMGBB_API_KEY`.
3.  ImgBB hosts the file and returns a permanent public URL (e.g., `https://i.ibb.co/...`).
4.  This URL is saved to Firestore instead of a heavy Base64 string, keeping the database extremely light and fast.

---

## 4. Key Directories & Files

*   **`src/App.jsx`**: The main public landing page. Highly responsive, relies entirely on `useContent()` for its text and images. Contains the "List Your Store" form which pushes leads back to the database.
*   **`src/firebase.js`**: The initialization file for Firebase. Connects the React app to the specific Google Cloud/Firebase project.
*   **`src/components/admin/AdminPanel.jsx`**: The secure dashboard. Contains separate "Editors" for each section of the site (Hero, Testimonials, Categories, etc.).
*   **`src/contexts/`**: Contains the global state management logic bridging React and Firebase.

---

## 5. Security Summary
*   **Database:** Public users can only *READ* the content. Only users logged in via Firebase Auth can *WRITE* to the database.
*   **Store Leads:** When a public user submits a "List Your Store" form, the frontend appends it to the `storeApplications` array in Firestore. *(Note: As the app scales, consider moving user submissions to a separate Firestore collection with `write-only` public rules to prevent concurrent overwrite issues).*
