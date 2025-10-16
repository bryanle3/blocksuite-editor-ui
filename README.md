# 🧠 Extra Sauce Editor (BlockSuite + Next.js + shadcn/ui)

A collaborative markdown-style editor built with **Next.js 15**, **BlockSuite**, and **shadcn/ui**.  
This version is based on the official `react-basic-next` BlockSuite example, customized with Extra Sauce styling and a cleaner UI.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<yourusername>/extra-sauce-editor.git
cd extra-sauce-editor
```

### 2️⃣ Install dependencies
We use **pnpm** for consistent installs.
```bash
pnpm install
```
(You can also use `npm install` if you prefer.)

### 3️⃣ Run the development server
```bash
pnpm dev
```
Then open **http://localhost:3000** in your browser.

---

## 🧩 Features

| Feature | Description |
|----------|-------------|
| 📝 BlockSuite Editor | Core WYSIWYG editor component (based on `@blocksuite/presets`) |
| 🎨 shadcn/ui + Tailwind | Provides styled buttons, cards, and layout |
| 💾 Export / Import | Export your work as `.json` snapshots or re-import existing docs |
| 🆕 New Document | Quickly start with a fresh BlockSuite document |
| 🗂 Sidebar | Lists available documents in memory |
| ✍️ (Optional) Markdown Import | Experimental converter for `.md` files |
| 🔄 (Optional) Autosave | Can be enabled later using localStorage or Supabase |

---

## ⚙️ Folder Structure

```
src/
├── app/
│   ├── components/
│   │   ├── EditorContainer.tsx   # mounts the BlockSuite editor
│   │   ├── Sidebar.tsx           # document list panel
│   │   ├── TopBar.tsx            # toolbar (new, export, import)
│   │   └── EditorProvider.tsx    # React context for editor & collection
│   ├── editor/
│   │   ├── editor.ts             # initialization logic (BlockSuite setup)
│   │   ├── context.ts            # editor context helpers
│   │   ├── markdown.ts           # markdown → BlockSuite importer (optional)
│   │   └── snapshot.ts           # save/load helpers (optional)
│   └── page.tsx / layout.tsx     # Next.js pages
├── public/
├── styles/
│   └── index.css                 # global Tailwind + Extra Sauce theme
└── package.json
```

---

## 💡 Development Notes

- The current build does **not** persist between refreshes yet (persistence can be added later via Supabase or localStorage).
- If you want to test markdown import, create a file `test.md` and click **Import Markdown**.
- Tailwind configuration is already set up; you can customize colors in `tailwind.config.js`.

---

## 🧑‍💻 Contributing

1. Create a new branch for your feature:
   ```bash
   git checkout -b feat/<your-feature-name>
   ```
2. Run and test locally.
3. Push to your branch and open a PR on GitHub.

---

## 🧰 Commands

| Command | Action |
|----------|--------|
| `pnpm dev` | Run the app in development mode |
| `pnpm build` | Build the production bundle |
| `pnpm start` | Start the built app |
| `pnpm lint` | Run ESLint checks |

---

## 🧩 Known Issues & Next Steps

| Area | Status | Notes |
|------|---------|-------|
| Autosave | ⏳ Planned | Will be implemented with localStorage or Supabase |
| Markdown Import | ✅ MVP | Works for headings/lists/paragraphs only |
| Collaborative Editing | 🚫 Not yet | Future goal after MVP completion |
| Theme Customization | ✅ Done | Uses Extra Sauce color palette |

---

## 🧠 Credits

- [BlockSuite](https://blocksuite.io/) for the editor framework  
- [Next.js](https://nextjs.org/) for the web app foundation  
- [shadcn/ui](https://ui.shadcn.com/) for the UI components  
- [TailwindCSS](https://tailwindcss.com/) for utility styling

---

## 📄 License

This project is for academic and prototype use under the **Extra Sauce Agency** team.
