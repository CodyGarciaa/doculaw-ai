# DocuLaw AI Frontend

A React TypeScript application for the DocuLaw AI platform - making legal documents accessible through AI-powered translation and analysis.

## Features

- **Document Upload**: Drag-and-drop interface for uploading legal documents (PDF, DOC, DOCX, TXT)
- **AI Document Translation**: Convert complex legal language into easy-to-understand plain English
- **Side-by-Side Viewer**: Compare original and simplified versions of documents
- **Legal AI Chat**: Interactive chat interface for asking questions about legal concepts
- **Semantic Search**: Intelligent search through legal documents and concepts
- **Dashboard**: Overview of document processing and chat activities
- **Responsive Design**: Mobile-friendly interface with modern UI components

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **React Dropzone** - File upload functionality
- **Axios** - HTTP client for API communication
- **Headless UI** - Unstyled, accessible UI components

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables file:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables in `.env.local`:
   ```
   REACT_APP_API_BASE_URL=http://localhost:3001/api
   ```

### Development

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── Layout/        # Application layout
│   │   └── Home.tsx       # Landing page
│   │   └── Upload.tsx     # Document upload page
│   │   └── Documents.tsx  # Document management
│   │   └── DocumentViewer.tsx # Document viewing with comparison
│   │   └── Chat.tsx       # AI chat interface
│   │   └── Search.tsx     # Legal document search
│   │   └── Dashboard.tsx  # User dashboard
│   ├── services/          # API services
│   │   └── api.ts         # API client configuration
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Application types
│   ├── utils/             # Utility functions
│   │   └── helpers.ts     # Helper functions
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Key Components

### Pages

- **Home**: Landing page with feature overview and mission statement
- **Upload**: File upload interface with drag-and-drop functionality
- **Documents**: Document management with filtering and status tracking
- **DocumentViewer**: Side-by-side comparison of original and simplified text
- **Chat**: AI-powered legal assistant with contextual responses
- **Search**: Semantic search through legal documents and concepts
- **Dashboard**: Analytics and recent activity overview

### Core Features

#### Document Processing
- Support for PDF, DOC, DOCX, and TXT files
- File validation and size limits
- Real-time processing status updates
- Complexity analysis and scoring

#### AI Chat Interface
- Context-aware responses based on uploaded documents
- Legal concept explanations in plain language
- Document references and citations
- Conversation history and sessions

#### Search Functionality
- Semantic search through legal corpus
- Advanced filtering by document type, date, complexity
- Relevance scoring and result ranking
- Popular search suggestions

## API Integration

The frontend communicates with the backend through RESTful APIs:

- **Document Management**: Upload, retrieve, and delete documents
- **AI Processing**: Document simplification and analysis
- **Chat Interface**: Real-time conversation with AI assistant
- **Search**: Semantic search and document discovery

### API Endpoints

- `POST /api/documents/upload` - Upload document
- `GET /api/documents` - List user documents
- `GET /api/documents/:id` - Get specific document
- `POST /api/documents/simplify` - Simplify document
- `POST /api/chat/sessions` - Create chat session
- `POST /api/chat/sessions/:id/messages` - Send message
- `POST /api/search/documents` - Search documents

## Styling and Design

The application uses Tailwind CSS for styling with a custom design system:

### Color Palette
- **Legal Blue**: Primary brand color for legal elements
- **Accent Purple**: Secondary color for highlights
- **Gray Scale**: Neutral colors for text and backgrounds

### Design Principles
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design approach
- **Modern**: Clean, professional interface
- **Intuitive**: User-friendly navigation and interactions

## State Management

The application uses React's built-in state management:

- **Component State**: Local state with useState hook
- **Side Effects**: API calls and lifecycle with useEffect
- **Context**: Shared state for authentication and user preferences (planned)

## Performance Considerations

- **Code Splitting**: Lazy loading of route components
- **Memoization**: React.memo and useMemo for expensive operations
- **Image Optimization**: Responsive images and lazy loading
- **Bundle Optimization**: Tree shaking and minification

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new components
3. Include proper type definitions
4. Write responsive, accessible components
5. Test across different screen sizes

## Environment Variables

- `REACT_APP_API_BASE_URL`: Backend API base URL
- `REACT_APP_ENVIRONMENT`: Environment (development/staging/production)

## Deployment

The application can be deployed to various platforms:

- **Vercel**: Automatic deployments from Git
- **Netlify**: Static site hosting with form handling
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

## Known Issues

- TypeScript dependencies may need installation for proper development
- Some features require backend API to be running
- File upload size limits depend on backend configuration

## License

This project is part of the DocuLaw AI platform. See the main project README for license information.

## Support

For questions or issues:
1. Check the main project documentation
2. Review the API documentation
3. Submit issues to the project repository 