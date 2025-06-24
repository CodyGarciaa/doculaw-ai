import React from 'react';
import { Link } from 'react-router-dom';
import { GlassButton } from '../components/ui';
import { 
  PlayIcon, 
  DocumentArrowUpIcon, 
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const GlassButtonDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Liquid Glass Buttons
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Apple-inspired liquid glass effect buttons for DocuLaw AI
          </p>
          <Link to="/" className="text-white/60 hover:text-white transition-colors">
            ← Back to Landing
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Primary Buttons */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Primary Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Small</h3>
                <GlassButton variant="primary" size="sm">
                  Get Started
                </GlassButton>
              </div>
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Medium</h3>
                <GlassButton variant="primary" size="md">
                  <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                  Upload Document
                </GlassButton>
              </div>
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Large</h3>
                <GlassButton variant="primary" size="lg">
                  Start Free Assessment
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </GlassButton>
              </div>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Secondary Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Small</h3>
                <GlassButton variant="secondary" size="sm">
                  Learn More
                </GlassButton>
              </div>
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Medium</h3>
                <GlassButton variant="secondary" size="md">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2" />
                  Chat Support
                </GlassButton>
              </div>
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Large</h3>
                <GlassButton variant="secondary" size="lg">
                  View Documentation
                </GlassButton>
              </div>
            </div>
          </div>

          {/* Ghost Buttons */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Ghost Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Small</h3>
                <GlassButton variant="ghost" size="sm">
                  Cancel
                </GlassButton>
              </div>
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Medium</h3>
                <GlassButton variant="ghost" size="md">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Watch Demo
                </GlassButton>
              </div>
              <div className="text-center">
                <h3 className="text-white/80 mb-4">Large</h3>
                <GlassButton variant="ghost" size="lg">
                  Try Demo First
                </GlassButton>
              </div>
            </div>
          </div>

          {/* Interactive Examples */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Interactive Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                <h3 className="text-white font-semibold mb-4">Click Handler</h3>
                <GlassButton 
                  variant="primary" 
                  size="md"
                  onClick={() => alert('Button clicked!')}
                >
                  Click Me!
                </GlassButton>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                <h3 className="text-white font-semibold mb-4">With Link</h3>
                <GlassButton to="/onboarding" variant="secondary" size="md">
                  Go to Onboarding
                </GlassButton>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                <h3 className="text-white font-semibold mb-4">Disabled State</h3>
                <GlassButton variant="primary" size="md" disabled>
                  Disabled Button
                </GlassButton>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Usage Examples</h2>
            <div className="space-y-4 text-white/80 font-mono text-sm">
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-green-300">// Basic usage</div>
                <div>&lt;GlassButton variant="primary" size="md"&gt;</div>
                <div className="ml-4">Get Started</div>
                <div>&lt;/GlassButton&gt;</div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-green-300">// With icon and link</div>
                <div>&lt;GlassButton to="/dashboard" variant="secondary" size="lg"&gt;</div>
                <div className="ml-4">&lt;ArrowRightIcon className="h-5 w-5 mr-2" /&gt;</div>
                <div className="ml-4">Dashboard</div>
                <div>&lt;/GlassButton&gt;</div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-green-300">// With click handler</div>
                <div>&lt;GlassButton</div>
                <div className="ml-4">variant="ghost"</div>
                <div className="ml-4">size="sm"</div>
                <div className="ml-4">onClick={'{'} () =&gt; handleClick() {'}'}</div>
                <div>&gt;</div>
                <div className="ml-4">Click Me</div>
                <div>&lt;/GlassButton&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassButtonDemo; 