import React, { useEffect, useRef } from 'react';

export type AdSlotType =
  | 'header-responsive'      // 728x90 desktop / 320x50 mobile
  | 'sidebar-300x250'        // 300x250
  | 'in-content-300x250'     // 300x250
  | 'below-content-responsive' // 728x90 desktop / 320x50 mobile
  | 'sidebar-160x600'        // 160x600
  | 'native';                // Native Adsterra Banner

interface AdBannerProps {
  slot: AdSlotType;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  // Desktop 728x90 vs Mobile 320x50 keys
  const desktopHeaderKey = '5d67adbd04e9917f1f896d5480b5842e';
  const mobileHeaderKey = 'adea4b7627df347bc715590fcc63c322';
  const mediumRectangleKey = '299b2bf6a13c972eae3e8ff1c1afe6a9'; // 300x250
  const skyscraperKey = 'bc4aaef062beae3667a5376f962246b5'; // 160x600

  if (slot === 'native') {
    return <NativeAdContainer className={className} />;
  }

  if (slot === 'sidebar-300x250' || slot === 'in-content-300x250') {
    return (
      <div className={`ad-slot flex flex-col items-center my-4 print:hidden ${className}`}>
        <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 mb-1">Advertisement</span>
        <AdsterraIframe keyId={mediumRectangleKey} width={300} height={250} />
      </div>
    );
  }

  if (slot === 'sidebar-160x600') {
    return (
      <div className={`ad-slot flex flex-col items-center my-4 print:hidden ${className}`}>
        <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 mb-1">Advertisement</span>
        <AdsterraIframe keyId={skyscraperKey} width={160} height={600} />
      </div>
    );
  }

  // Responsive slots (header-responsive or below-content-responsive)
  return (
    <div className={`ad-slot flex flex-col items-center my-4 print:hidden ${className}`}>
      <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 mb-1">Advertisement</span>
      
      {/* Desktop (>= 768px): 728x90 */}
      <div className="hidden md:flex justify-center w-full">
        <AdsterraIframe keyId={desktopHeaderKey} width={728} height={90} />
      </div>

      {/* Mobile (< 768px): 320x50 */}
      <div className="flex md:hidden justify-center w-full">
        <AdsterraIframe keyId={mobileHeaderKey} width={320} height={50} />
      </div>
    </div>
  );
};

interface AdsterraIframeProps {
  keyId: string;
  width: number;
  height: number;
}

const AdsterraIframe: React.FC<AdsterraIframeProps> = ({ keyId, width, height }) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${width}px;
          height: ${height}px;
          overflow: hidden;
        }
      </style>
    </head>
    <body>
      <script type="text/javascript">
        atOptions = {
          'key' : '${keyId}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://www.highrevenueformat.com/${keyId}/invoke.js"></script>
    </body>
    </html>
  `;

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="bg-neutral-100/70 border border-neutral-200/60 rounded flex items-center justify-center overflow-hidden transition-all shadow-sm"
    >
      <iframe
        title={`Adsterra Ad ${width}x${height}`}
        srcDoc={htmlContent}
        width={width}
        height={height}
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        className="block"
      />
    </div>
  );
};

const NativeAdContainer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already appended to prevent duplicate triggers
    const scriptId = 'adsterra-native-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl29678874.profitableratecpmnetwork.com/4bb86296ccea7564b5d603542d442ac0/invoke.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`ad-slot my-8 p-4 bg-white/70 border border-amber-200/50 rounded-xl print:hidden ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">Sponsored Stories</span>
        <span className="text-[11px] text-amber-800/60 font-medium">Sweet Pea Recommendations</span>
      </div>
      <div id="container-4bb86296ccea7564b5d603542d442ac0" ref={containerRef} className="min-h-[120px] flex items-center justify-center text-xs text-neutral-400">
        Loading recommendations...
      </div>
    </div>
  );
};

export const MobileSocialBar: React.FC = () => {
  useEffect(() => {
    // Only load on mobile screens
    if (window.innerWidth > 768) return;

    const scriptId = 'adsterra-social-bar';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://pl29819009.profitableratecpmnetwork.com/89/19/86/891986d7de6f1e2e70e64818e1463215.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};
