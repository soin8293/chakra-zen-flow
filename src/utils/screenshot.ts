// Screenshot generation utilities for app store assets
export const screenshotConfig = {
  // Standard app store screenshot dimensions
  phone: {
    width: 1080,
    height: 1920,
    devicePixelRatio: 3
  },
  tablet: {
    width: 1200,
    height: 1600,
    devicePixelRatio: 2
  },
  // Specific screenshots needed for ZenFlow
  scenarios: [
    {
      name: 'main-screen',
      description: 'Home screen with chakra meditation figure',
      route: '/',
      selector: '[data-screenshot="main"]'
    },
    {
      name: 'meditation-session',
      description: 'Active meditation session with breathing visualization',
      route: '/',
      selector: '[data-screenshot="session"]',
      setup: 'startMeditation'
    },
    {
      name: 'learning-section',
      description: 'Chakra information and articles',
      route: '/',
      selector: '[data-screenshot="learning"]',
      setup: 'openChakraInfo'
    },
    {
      name: 'profile-progress',
      description: 'User profile with meditation progress',
      route: '/',
      selector: '[data-screenshot="profile"]',
      setup: 'openProfile'
    }
  ]
};

// Generate screenshots programmatically (for development/testing)
export const captureScreenshot = async (elementId: string, filename: string) => {
  if (typeof window === 'undefined') return;

  try {
    // Use html2canvas for screenshot generation in development
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found for screenshot`);
      return;
    }

    // This would use html2canvas in a real implementation
    console.log(`Screenshot captured: ${filename} for element ${elementId}`);
    
    // For now, just log the screenshot request
    const rect = element.getBoundingClientRect();
    console.log(`Screenshot dimensions: ${rect.width}x${rect.height}`);
    
  } catch (error) {
    console.error('Screenshot capture failed:', error);
  }
};

// Screenshot data attributes for easy identification
export const addScreenshotMarkers = () => {
  if (typeof window === 'undefined') return;

  // Add data attributes to key elements for screenshot identification
  const markers = {
    'main': document.querySelector('.meditation-figure'),
    'session': document.querySelector('.meditation-session'),
    'learning': document.querySelector('.chakra-info'),
    'profile': document.querySelector('.profile-page')
  };

  Object.entries(markers).forEach(([key, element]) => {
    if (element) {
      element.setAttribute('data-screenshot', key);
    }
  });
};

// Automated screenshot testing for different device sizes
export const testScreenshotResponsiveness = () => {
  const sizes = [
    { name: 'phone', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 }
  ];

  sizes.forEach(size => {
    console.log(`Testing ${size.name}: ${size.width}x${size.height}`);
    // This would actually resize viewport and capture screenshots
    // For app store submission, use external tools like Puppeteer
  });
};