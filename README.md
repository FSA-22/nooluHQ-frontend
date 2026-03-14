# nooluHQ frontend

nooluHQ frontend is a technical assessment paced by up-cut for fullstack job posting, — built with **Next.js**, **TypeScript**, **Tailwind**, and powered by a Node.js backend.

## 🚀 Features

- Onboarding
- Dashboard with several chart analytics

---

## 🛠 Tech Stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS with custom design tokens
- React Server Components

### Backend

- Node.js + Express
- MongoDB
- Brevo (email provider)

---

## ✅ Getting Started

Install:

```
npm install
```

Run:

```
npm run dev
```

---

## 🔧 Environment Variables

Create `.env` and fill:

```
NEXT_PUBLIC_API_BASE_URL=https:
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📦 Folder Structure

```
public/
  images/
  fonts/
  sounds/

src/
  app/
  components/
  lib/
  types/
```

---

## ✅ Scripts

```
npm run dev      # start development server
npm run build    # production build
npm run lint     # lint code
```

---

## ✅ Deployment

- Vercel

---

## 📄 Documentation

- The onboarding process is made to persist using server engine, by this users can return to the exact step of their onboarding processes, this is in cases of bad network, somehow the browser is closed or a new browser is open on the same user email, the data is persisted always.
