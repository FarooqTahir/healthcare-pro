# HealthCare Pro - Modern Healthcare Management System

A comprehensive healthcare web application built with Next.js 14, TypeScript, and Tailwind CSS. This application provides role-based access for patients, doctors, and administrators to manage healthcare operations efficiently.

## 🚀 Features

### 🏥 **Core Functionality**
- **Role-based Authentication**: Secure login for Patients, Doctors, and Admins
- **Appointment Scheduling**: Interactive calendar-based appointment management
- **Medical Records**: Comprehensive patient history and record management
- **Dashboard Analytics**: Role-specific dashboards with key metrics
- **Responsive Design**: Mobile-first design with dark mode support

### 👥 **User Roles**

#### **Patients**
- Book and manage appointments
- View medical history and records
- Access test results and prescriptions
- Update personal information

#### **Doctors**
- Manage patient appointments
- Create and update medical records
- Set availability and working hours
- View patient history and analytics

#### **Administrators**
- User management and system oversight
- System-wide analytics and reporting
- Configuration and settings management

## 🛠️ **Tech Stack**

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with JWT
- **UI Components**: Radix UI primitives with shadcn/ui
- **Calendar**: React Big Calendar
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with CSS variables for theming

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd healthcare-pro
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update the environment variables in `.env.local`:
   \`\`\`env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 **Demo Credentials**

Use these credentials to test different user roles:

- **Patient**: `patient@example.com` / `password`
- **Doctor**: `doctor@example.com` / `password`
- **Admin**: `admin@example.com` / `password`

## 📁 **Project Structure**

\`\`\`
healthcare-pro/
├── app/                    # Next.js 14 App Router
│   ├── (dashboard)/       # Dashboard layout group
│   ├── auth/              # Authentication pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard-specific components
│   ├── appointments/     # Appointment components
│   └── navigation/       # Navigation components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts          # NextAuth configuration
│   ├── data.ts          # Mock data and helper functions
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
\`\`\`

## 🎨 **Design System**

The application uses a consistent design system with:
- **Color Palette**: Blue primary with semantic colors for status
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 4px base unit with consistent spacing scale
- **Components**: Accessible components built on Radix UI primitives

## 🔧 **Configuration**

### Environment Variables
\`\`\`env
# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: OAuth providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
\`\`\`

### Customization
- **Themes**: Modify `app/globals.css` for color scheme changes
- **Components**: Extend or modify components in `components/ui/`
- **Data**: Update mock data in `lib/data.ts` or integrate with a real database

## 🚀 **Deployment**

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🔮 **Future Enhancements**

- [ ] Real-time notifications
- [ ] Video consultation integration
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with external health systems
- [ ] Multi-language support

---

**Built with ❤️ using Next.js and modern web technologies**
