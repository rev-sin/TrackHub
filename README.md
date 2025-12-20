# TrackHub

**TrackHub** is a lightweight, **auth-less Kanban board** application designed for instant collaboration. Create a board, share the code, and start tracking tasks immediately without the friction of sign-ups or login credentials.

## 🚀 Live Demo

Check out the live application here: **[track-hub-ten.vercel.app](https://track-hub-ten.vercel.app)**

## ✨ Features

- **Auth-less Access**: No accounts, emails, or passwords required.
- **Instant Boards**: Create a new workspace in seconds.
- **Seamless Collaboration**: Join existing boards using a simple unique code.
- **Kanban Workflow**: Drag-and-drop interface to manage tasks across statuses (Todo, In Progress, Done).
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

This project is built using a modern, high-performance stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)

## 📂 Project Structure

```bash
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js App Router pages and layouts
│   ├── components/  # Reusable UI components
│   └── lib/         # Utility functions and shared logic
├── biome.json       # Biome configuration
├── components.json  # Shadcn UI configuration
└── package.json     # Project dependencies
```

## ⚡ Getting Started

Follow these steps to run TrackHub locally.

### Prerequisites

- **Bun**: Make sure you have [Bun installed](https://bun.sh/docs/installation).

### Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/rev-sin/TrackHub.git](https://github.com/rev-sin/TrackHub.git)
   cd TrackHub
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and configure your database connection (e.g., Convex, Supabase, or PostgreSQL).

   ```env
   # Example
   DATABASE_URL="your_connection_string"
   # or
   CONVEX_DEPLOYMENT="your_convex_deployment"
   NEXT_PUBLIC_CONVEX_URL="your_public_url"
   ```

4. **Run the Development Server**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [rev-sin](https://github.com/rev-sin).
