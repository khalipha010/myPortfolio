# Khalipha Jibreel - Portfolio Website

A modern, responsive portfolio website showcasing my skills and projects as a full-stack developer specializing in React and Flutter.

![Portfolio Preview](./public/MeKha.jpg)

## 🌟 Features

- **Modern UI/UX**: Glassmorphism effects, smooth animations, and gradient designs
- **Responsive Design**: Fully responsive across all devices
- **Interactive Elements**: Splash effects, floating animations, and smooth scrolling
- **Project Showcase**: Display of my latest web and mobile applications
- **Contact Integration**: Direct email and WhatsApp contact options
- **Admin Dashboard**: Firebase-powered admin panel for managing employment requests
- **Performance Optimized**: Component memoization, lazy loading, and optimized animations

## 🛠️ Technologies Used

### Frontend
- **React 19** - Latest React with modern hooks and features
- **Vite** - Lightning-fast build tool
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **React Router DOM** - Client-side routing
- **Lottie React** - Animated illustrations

### Backend & Services
- **Firebase** - Authentication and Firestore database
- **Vercel** - Deployment and hosting

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager
- Firebase account (for admin features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khalipha010/myPortfolio.git
   cd myPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Project Structure

```
myPortfolio/
├── public/              # Static assets
│   ├── MeKha.jpg       # Profile image
│   └── assets/         # Project images
├── src/
│   ├── components/     # React components
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── StickySidebar.jsx
│   ├── Pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Employ.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── assets/         # Images and animations
│   ├── firebase.js     # Firebase configuration
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔥 Key Features Explained

### Glassmorphism Design
Modern glass-like UI elements with backdrop blur effects for a contemporary look.

### Interactive Splash Effects
Click or move your mouse/finger across sections to create colorful splash animations.

### Smooth Scrolling
Seamless navigation between sections with smooth scroll behavior.

### Performance Optimizations
- Component memoization with `React.memo`
- Lazy loading for images and animations
- Debounced event handlers
- Optimized re-renders

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will automatically redeploy on every push to the main branch.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Khalipha Jibreel**

- Website: [khaliphajibreel.vercel.app](https://khaliphajibreel.vercel.app)
- GitHub: [@khalipha010](https://github.com/khalipha010)
- LinkedIn: [Khalipha Jibreel](https://www.linkedin.com/in/khalipha-jibreel-a945a01a1/)
- Twitter: [@KhaliphaJibreel](https://twitter.com/KhaliphaJibreel)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📝 Changelog

### Version 2.0.0 (2025)
- ✨ Modernized UI with glassmorphism effects
- 🔒 Secured Firebase credentials with environment variables
- 🎨 Enhanced color scheme with emerald/teal gradients
- ⚡ Improved performance with better optimizations
- 📱 Better mobile responsiveness
- 🎭 Added floating background animations
- 📚 Comprehensive documentation

### Version 1.0.0 (2024)
- 🎉 Initial release
- ⚛️ React-based portfolio
- 🔥 Firebase integration
- 📊 Admin dashboard
- 💼 Employment request system

---

Made with ❤️ by Khalipha Jibreel
