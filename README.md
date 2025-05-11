# ChatApp - Modern Real-Time Chat Application

![ChatApp Screenshot](/public/images/chatapp-preview.png)

ChatApp is a modern, responsive chat application built with Next.js and React. It features a clean, intuitive interface with real-time messaging capabilities, dark mode support, and a responsive design that works across all devices.

## Features

- 💬 Real-time messaging
- 🌓 Light and dark mode
- 📱 Fully responsive design
- 👤 User presence indicators
- 📎 File attachments
- 😊 Emoji picker
- 📞 Voice and video call simulation
- 🔔 Toast notifications
- ⌨️ Keyboard accessibility

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Inter, Poppins)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/chatapp.git
   cd chatapp
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
chatapp/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── chat/             # Chat-specific components
│   ├── ui/               # UI components from shadcn/ui
│   └── theme-provider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and data
├── public/               # Static assets
└── types/                # TypeScript type definitions
\`\`\`

## Usage

- **Switch Themes**: Click the sun/moon icon in the top-right corner to toggle between light and dark mode.
- **Send Messages**: Type in the input field at the bottom and press Enter or click the send button.
- **Add Emojis**: Click the emoji icon to open the emoji picker.
- **Attach Files**: Click the paperclip icon to attach files.
- **Make Calls**: Click the phone or video icons to simulate voice or video calls.

## Customization

### Themes

You can customize the theme colors in `app/globals.css`:

\`\`\`css
@layer base {
  :root {
    --primary: 252 59% 48%;
    /* other color variables */
  }
}
\`\`\`

### Adding New Features

The modular architecture makes it easy to add new features:

1. Create a new component in the `components/chat` directory
2. Import and use it in the appropriate parent component
3. Add any necessary hooks, types, or utilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern chat applications
- Icons provided by Lucide Icons
- UI components from shadcn/ui

---

Built with ❤️ using Next.js and React
