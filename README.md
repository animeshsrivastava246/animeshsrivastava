# Animesh Srivastava | Portfolio

Modern, interactive, and highly animated personal portfolio built with cutting-edge web technologies. It is designed to be fully responsive, accessible, and performant—featuring a futuristic glassmorphic UI, physics-based animations, and real-time statistics.

![Portfolio Preview](./public/og-image.png)

## ✨ Features

- **Next.js 15 & React 19:** Utilizing the App Router for optimal performance, fast compilation (Turbopack), and SSR/SSG.
- **Futuristic UI:** Liquid glassmorphism, dynamic gradients, and modern layout structures tailored with **Tailwind CSS v4**.
- **High-End Animations:** Engaging interactions powered by **Framer Motion** and **Lottie**, including scroll-driven animations, spring physics, and animated text tracking (Variable Proximity).
- **TypeScript:** 100% type-safe architecture ensuring fewer runtime bugs and improved developer experience.
- **Dynamic Projects Showcase:** Dedicated custom detail pages for projects with advanced presentation layouts.
- **Live Stats Integration:** Real-time fetching of DSA progress (LeetCode) built natively into the frontend.
- **Functional Contact Form:** Fully working contact system processing emails through server actions (`Resend`).

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Lottie React](https://lottiereact.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Toasts:** [Sonner](https://sonner.emilkowal.ski/)
- **Package Manager:** [Bun](https://bun.sh/)

## 🚀 Getting Started

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your local machine to build and run this project rapidly.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/animesh251001/portfolio.git
   cd portfolio
   ```

2. Install dependencies via Bun:
   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project and ensure you have the required variables (e.g., your Resend API key for the contact form).
   ```env
   RESEND_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build for Production

To create an optimized production build:
```bash
bun run build
```
To start the production server:
```bash
bun run start
```

## 📂 Project Structure

- `src/app`: Next.js 15 App Router pages and global layouts.
- `src/components`: Reusable UI components.
  - `/animations`: Framer Motion and custom animation wrappers.
  - `/common`: Shared elements like Navbar, BackgroundGlow, ThemeToggle.
  - `/projects`: Individual project showcase components (`DisneyUI`, `NameTheGame`, etc.).
  - `/sections`: Main landing page sections (`About`, `Experience`, `Skills`, `Contact`).
- `src/lib`: Helper functions, data structures (`skills.tsx`), and server actions (`actions.ts`).
- `src/assets`: Images, graphics, and JSON Lottie animations.

## 🤝 Contact

Feel free to reach out if you're looking to collaborate, have a question, or just want to connect!

- **Email:** animeshsrivastava246246@gmail.com
- **LinkedIn:** [Animesh Srivastava](https://www.linkedin.com/in/animesh246/)
- **GitHub:** [@animeshsrivastava246](https://github.com/animeshsrivastava246)

---

Built with ☕ and ❤️ by Animesh Srivastava.
