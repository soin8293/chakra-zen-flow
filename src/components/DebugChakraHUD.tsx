import React, { useEffect, useState } from 'react';
import { useChakraLayout } from '@/hooks/useChakraLayout';
import { CHAKRA_ANCHORS, ChakraId } from '@/features/zenflow/ChakraAnchors';

interface HudDataItem {
  id: ChakraId;
  rawAnchorX: number | string;
  rawAnchorY: number | string;
  computedXPercent: number;
  computedYPercent: number;
  domCenterX?: number;
  domCenterY?: number;
  isOffScreen: boolean;
}

export const DebugChakraHUD: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { positions } = useChakraLayout();
  const [hudData, setHudData] = useState<HudDataItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsVisible(params.has('debug') && params.get('debug') === 'chakras');
  }, [window.location.search]);

  useEffect(() => {
    if (!isVisible || positions.length === 0) {
      setHudData([]);
      return;
    }

    const rawAnchors = CHAKRA_ANCHORS; // Direct import

    const data = Object.keys(rawAnchors).map((key) => {
      const id = key as ChakraId;
      const rawAnchor = rawAnchors[id];
      const computedPos = positions.find(p => p.id === id);

      let domCenterX: number | undefined;
      let domCenterY: number | undefined;
      const element = document.querySelector(`[data-chakra-id="${id}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        domCenterX = rect.left + rect.width / 2;
        domCenterY = rect.top + rect.height / 2;
      }
      
      const computedX = computedPos?.xPercent ?? -1;
      const computedY = computedPos?.yPercent ?? -1;
      const isOffScreen = computedX < 0 || computedX > 100 || computedY < 0 || computedY > 100;

      return {
        id,
        rawAnchorX: rawAnchor?.x ?? 'N/A',
        rawAnchorY: rawAnchor?.y ?? 'N/A',
        computedXPercent: computedX,
        computedYPercent: computedY,
        domCenterX,
        domCenterY,
        isOffScreen,
      };
    });
    setHudData(data);
  }, [isVisible, positions]);

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999,
      fontSize: '10px',
      maxHeight: '300px',
      overflowY: 'auto',
    }}>
      <h4>Chakra Debug HUD</h4>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Raw X,Y</th>
            <th style={thStyle}>Comp % X,Y</th>
            <th style={thStyle}>DOM Center X,Y</th>
          </tr>
        </thead>
        <tbody>
          {hudData.map(item => (
            <tr key={item.id} style={{ backgroundColor: item.isOffScreen ? 'rgba(255,0,0,0.3)' : undefined }}>
              <td style={tdStyle}>{item.id}</td>
              <td style={tdStyle}>{`${item.rawAnchorX}, ${item.rawAnchorY}`}</td>
              <td style={tdStyle}>{`${item.computedXPercent.toFixed(1)}%, ${item.computedYPercent.toFixed(1)}%`}</td>
              <td style={tdStyle}>{item.domCenterX !== undefined ? `${item.domCenterX.toFixed(0)}, ${item.domCenterY.toFixed(0)}` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  border: '1px solid #555',
  padding: '2px 4px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #555',
  padding: '2px 4px',
  textAlign: 'left',
};
