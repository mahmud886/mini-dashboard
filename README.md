# Mini Dashboard

A modern, responsive dashboard application built with Next.js 15, TypeScript, and Tailwind CSS. Features authentication, data visualization, and smooth animations.

## 🚀 Features

- **Authentication**: Google OAuth integration with NextAuth.js
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Data Visualization**: Interactive charts and animated components
- **Smooth Animations**: Framer Motion for delightful user interactions
- **Type Safety**: Full TypeScript support
- **Modern UI**: Clean, dark-themed interface with custom components

## 📋 Pages

- **Home** (`/`): Dashboard overview with animated charts and metrics
- **Users** (`/users`): User management with searchable table and modal details
- **Posts** (`/posts`): Blog posts listing with pagination
- **Profile** (`/profile`): User profile management with Google account integration
- **Sign In** (`/auth/signin`): Google OAuth authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js v5
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Custom useFetch hook with retry logic

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mini-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### NextAuth Configuration

The app uses NextAuth.js v5 with Google provider. Configuration is handled automatically with the environment variables above.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── posts/             # Posts management
│   ├── users/             # Users management
│   ├── profile/           # User profile
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
```

## 🎨 UI Components

### Available Components

- **Card**: Flexible container with optional animations
- **Button**: Multiple variants and sizes
- **Badge**: Status indicators
- **Modal**: Overlay dialogs
- **Skeleton**: Loading placeholders
- **SidebarLayout**: Main navigation layout

### Animation System

- **Framer Motion**: Smooth page transitions and component animations
- **Staggered Animations**: List items animate in sequence
- **Hover Effects**: Interactive feedback on user actions
- **Loading States**: Skeleton components during data fetching

## 🔄 Data Fetching

### useFetch Hook

Custom hook for API calls with built-in features:

```typescript
const { data, loading, error, refetch } = useFetch<User[]>('/api/users', {
  skip: !isAuthenticated, // Skip request when not authenticated
});
```

**Features:**

- Automatic loading states
- Error handling
- Request cancellation
- Skip functionality
- Manual refetch capability

## 🎯 Key Features

### Authentication Flow

1. User clicks "Continue with Google"
2. Redirected to Google OAuth
3. After successful authentication, redirected to home page
4. Session persisted across page refreshes

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible grid layouts
- Touch-friendly interactions

### Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for animations
- Efficient re-renders with React hooks
- Optimized bundle size

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🐛 Troubleshooting

### Common Issues

**Authentication not working:**

- Verify Google OAuth credentials
- Check NEXTAUTH_URL matches your domain
- Ensure redirect URIs are correctly configured

**Animations not showing:**

- Check if JavaScript is enabled
- Verify Framer Motion is properly installed
- Check browser console for errors

**Styling issues:**

- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS
- Verify responsive breakpoints

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Md Iqbal Mahmud**

- Email: iqbal886mahmud@gmail.com

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
