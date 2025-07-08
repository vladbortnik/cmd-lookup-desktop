# cmd.lookup

A simple web app to search Unix/Linux commands.

![TL;DR App](https://img.shields.io/badge/React-19.1.0-blue) 
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF) 
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🔍 Advanced Search**: Fuzzy search across command names and descriptions
- **🌙 Modern UI**: Dark terminal-inspired theme with blue accents
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Fast Performance**: Built with Vite for optimal development and build speed
- **🔧 80+ Commands**: Comprehensive database of Unix/Linux commands
- **📖 Rich Examples**: Practical usage examples for each command
- **🏷️ Categorized**: Commands organized by platform and category
- **💡 Interactive**: Expandable command examples and descriptions

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tldr-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint on the codebase |

## 🏗️ Project Structure

```
cmd.lookup/
├── public/                 # Static assets
│   └── favicon.svg
├── src/
│   ├── data/
│   │   ├── commands.js     # Command database (80+ commands)
│   │   └── commands.test.js
│   ├── App.jsx             # Main application component
│   ├── App.test.jsx        # App component tests
│   ├── main.jsx            # React entry point
│   ├── index.css           # Tailwind CSS imports
│   └── setupTests.js       # Test configuration
├── index.html              # Entry point
└── README.md               # Project documentation
```

## 🔧 Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: React Icons (Feather Icons)
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint
- **Development**: Node.js + npm

## 📊 Command Database

The application includes a comprehensive database of Unix/Linux commands with:

- **Name**: Command name (e.g., `ls`, `grep`, `find`)
- **Stands For**: What the command abbreviation means
- **Description**: Brief explanation of the command's purpose
- **Examples**: Practical usage examples with explanations
- **Platform**: Supported platforms (linux, mac, windows)
- **Category**: Command category for organization

### Example Command Structure

```javascript
{
  name: "ls",
  standsFor: "List Directory Contents",
  description: "List information about files and directories",
  examples: [
    {
      description: "List files in current directory",
      command: "ls"
    },
    {
      description: "List all files including hidden ones",
      command: "ls -la"
    }
  ],
  platform: ["linux", "mac"],
  category: "file-management"
}
```

## 🔍 Search Features

The application provides powerful search capabilities:

- **Name Search**: Find commands by their exact or partial names
- **Description Search**: Search through command descriptions
- **Fuzzy Matching**: Intelligent matching even with typos
- **Real-time Results**: Instant search results as you type
- **Alphabetical Sorting**: Results sorted alphabetically for easy browsing

## 🎨 Design System

- **Color Scheme**: Dark theme with slate backgrounds and blue accents
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable, accessible components
- **Responsive**: Mobile-first responsive design

## 🧪 Testing

The project includes comprehensive testing:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Node Documentation](https://nodejs.org)

## 🙏 Acknowledgments

- TL;DR project for inspiration and command data structure
- React community for excellent tooling and documentation
- Tailwind CSS team for the utility-first CSS framework