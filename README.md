# React Chat Application

Responsive chat application built with React, TypeScript, and Tailwind CSS. Features infinite scroll, perfect scroll position maintenance, and WhatsApp-style UX.

## ✨ Features

- ✅ **Infinite Scroll**: Scroll up → load older messages
- ✅ **Auto-scroll**: Smart bottom-scrolling (only when near bottom)
- ✅ **Optimistic Updates**: Instant message sending UX
- ✅ **Responsive**: Mobile-first, centered 640px max-width
- ✅ **Accessibility**: ARIA labels, keyboard navigation (Enter→send, Shift+Enter→newline)
- ✅ **Polish UX**: Scroll-to-bottom, loading states, error handling
- ✅ **TypeScript**: Fully typed, zero runtime errors

## 🚀 Quick Start

```bash
# Clone & install
git clone git@github.com:dikhtenkott/chat-app.git
cd chat-app
npm install
add .env file and set VITE_API_BASE_URL VITE_API_TOKEN

# Run dev server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

| Component | Tech                               |
| --------- | ---------------------------------- |
| Framework | React 18 + TypeScript              |
| Styling   | Tailwind CSS                       |
| State     | Custom `useMessages` hook          |
| API       | REST (`getMessages`/`postMessage`) |
| Utils     | `AUTHOR` constant                  |
