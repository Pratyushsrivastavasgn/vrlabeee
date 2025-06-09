import React from 'react';
import '../index.css'; // Import your CSS styles
import { BulbState } from '../types/simulation';

interface CircuitDiagramProps {
  bulbs: BulbState[];
  isRunning: boolean;
  onBulbToggle: (bulbId: string) => void;
}

const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ bulbs, isRunning, onBulbToggle }) => {
  const anyBulbOn = bulbs.some(bulb => bulb.isOn);

  return (
    <div className="w-full h-96 bg-slate-50 rounded-lg border-2 border-slate-200 overflow-auto">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{ minWidth: '800px', minHeight: '400px' }}
      >
        {/* Main Panel */}
        <rect x="50" y="50" width="80" height="120" fill="#2563eb" stroke="#1e40af" strokeWidth="2" rx="4" />
        <text x="90" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MAIN</text>
        <text x="90" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PANEL</text>

        {/* Main power lines from panel */}
        <line x1="130" y1="80" x2="200" y2="80" className={`circuit-wire wire-hot ${anyBulbOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="130" y1="110" x2="200" y2="110" className="circuit-wire wire-neutral" />
        <line x1="130" y1="140" x2="200" y2="140" className="circuit-wire wire-ground" />

        {/* Junction box */}
        <rect x="180 " y="70" width="60" height="80" fill="#64748b" stroke="#475569" strokeWidth="2" rx="4" />
        <text x="210" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">JUNCTION</text>

        {/* Branch circuits */}
        {/* Living Room Circuit */}
        <line x1="230" y1="80" x2="350" y2="80" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'living-room')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="230" y1="110" x2="350" y2="110" className="circuit-wire wire-neutral" />
        
        {/* Living Room Switch */}
        <rect 
          x="340" 
          y="75" 
          width="20" 
          height="10" 
          className={bulbs.find(b => b.id === 'living-room')?.isOn ? 'switch-on cursor-pointer' : 'switch-off cursor-pointer'}
          onClick={() => onBulbToggle('living-room')}
        />
        
        {/* Living Room Bulb */}
        <circle 
          cx="380" 
          cy="80" 
          r="15" 
          className={bulbs.find(b => b.id === 'living-room')?.isOn ? 'bulb-on cursor-pointer' : 'bulb-off cursor-pointer'}
          onClick={() => onBulbToggle('living-room')}
        />
        <text x="410" y="85" fontSize="12" fill="#374151">Living Room</text>

        {/* Kitchen Circuit */}
        <line x1="230" y1="80" x2="280" y2="80" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'kitchen')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="280" y1="80" x2="280" y2="130" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'kitchen')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="280" y1="130" x2="350" y2="130" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'kitchen')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="230" y1="110" x2="280" y2="110" className="circuit-wire wire-neutral" />
        <line x1="280" y1="110" x2="280" y2="160" className="circuit-wire wire-neutral" />
        <line x1="280" y1="160" x2="350" y2="160" className="circuit-wire wire-neutral" />
        
        {/* Kitchen Switch */}
        <rect 
          x="340" 
          y="125" 
          width="20" 
          height="10" 
          className={bulbs.find(b => b.id === 'kitchen')?.isOn ? 'switch-on cursor-pointer' : 'switch-off cursor-pointer'}
          onClick={() => onBulbToggle('kitchen')}
        />
        
        {/* Kitchen Bulb */}
        <circle 
          cx="380" 
          cy="130" 
          r="15" 
          className={bulbs.find(b => b.id === 'kitchen')?.isOn ? 'bulb-on cursor-pointer' : 'bulb-off cursor-pointer'}
          onClick={() => onBulbToggle('kitchen')}
        />
        <text x="410" y="135" fontSize="12" fill="#374151">Kitchen</text>

        {/* Bedroom 1 Circuit */}
        <line x1="230" y1="80" x2="500" y2="80" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bedroom1')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="500" y1="80" x2="500" y2="180" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bedroom1')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="500" y1="180" x2="550" y2="180" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bedroom1')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="230" y1="110" x2="500" y2="110" className="circuit-wire wire-neutral" />
        <line x1="500" y1="110" x2="500" y2="210" className="circuit-wire wire-neutral" />
        <line x1="500" y1="210" x2="550" y2="210" className="circuit-wire wire-neutral" />
        
        {/* Bedroom 1 Switch */}
        <rect 
          x="540" 
          y="175" 
          width="20" 
          height="10" 
          className={bulbs.find(b => b.id === 'bedroom1')?.isOn ? 'switch-on cursor-pointer' : 'switch-off cursor-pointer'}
          onClick={() => onBulbToggle('bedroom1')}
        />
        
        {/* Bedroom 1 Bulb */}
        <circle 
          cx="580" 
          cy="180" 
          r="15" 
          className={bulbs.find(b => b.id === 'bedroom1')?.isOn ? 'bulb-on cursor-pointer' : 'bulb-off cursor-pointer'}
          onClick={() => onBulbToggle('bedroom1')}
        />
        <text x="610" y="185" fontSize="12" fill="#374151">Bedroom 1</text>

        {/* Bedroom 2 Circuit */}
        <line x1="550" y1="180" x2="620" y2="180" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bedroom2')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="620" y1="180" x2="620" y2="230" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bedroom2')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="620" y1="230" x2="670" y2="230" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bedroom2')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="550" y1="210" x2="620" y2="210" className="circuit-wire wire-neutral" />
        <line x1="620" y1="210" x2="620" y2="260" className="circuit-wire wire-neutral" />
        <line x1="620" y1="260" x2="670" y2="260" className="circuit-wire wire-neutral" />
        
        {/* Bedroom 2 Switch */}
        <rect 
          x="660" 
          y="225" 
          width="20" 
          height="10" 
          className={bulbs.find(b => b.id === 'bedroom2')?.isOn ? 'switch-on cursor-pointer' : 'switch-off cursor-pointer'}
          onClick={() => onBulbToggle('bedroom2')}
        />
        
        {/* Bedroom 2 Bulb */}
        <circle 
          cx="700" 
          cy="230" 
          r="15" 
          className={bulbs.find(b => b.id === 'bedroom2')?.isOn ? 'bulb-on cursor-pointer' : 'bulb-off cursor-pointer'}
          onClick={() => onBulbToggle('bedroom2')}
        />
        <text x="610" y="250" fontSize="12" fill="#374151">Bedroom 2</text>

        {/* Bathroom Circuit */}
        <line x1="350" y1="130" x2="420" y2="130" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bathroom')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="420" y1="130" x2="420" y2="280" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bathroom')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="420" y1="280" x2="470" y2="280" className={`circuit-wire wire-hot ${bulbs.find(b => b.id === 'bathroom')?.isOn && isRunning ? 'current-flow' : ''}`} />
        <line x1="350" y1="160" x2="420" y2="160" className="circuit-wire wire-neutral" />
        <line x1="420" y1="160" x2="420" y2="310" className="circuit-wire wire-neutral" />
        <line x1="420" y1="310" x2="470" y2="310" className="circuit-wire wire-neutral" />
        
        {/* Bathroom Switch */}
        <rect 
          x="460" 
          y="275" 
          width="20" 
          height="10" 
          className={bulbs.find(b => b.id === 'bathroom')?.isOn ? 'switch-on cursor-pointer' : 'switch-off cursor-pointer'}
          onClick={() => onBulbToggle('bathroom')}
        />
        
        {/* Bathroom Bulb */}
        <circle 
          cx="500" 
          cy="280" 
          r="15" 
          className={bulbs.find(b => b.id === 'bathroom')?.isOn ? 'bulb-on cursor-pointer' : 'bulb-off cursor-pointer'}
          onClick={() => onBulbToggle('bathroom')}
        />
        <text x="530" y="285" fontSize="12" fill="#374151">Bathroom</text>

        {/* Legend */}
        <text x="50" y="350" fontSize="14" fontWeight="bold" fill="#374151">Legend:</text>
        <line x1="120" y1="345" x2="150" y2="345" className="circuit-wire wire-hot" />
        <text x="160" y="349" fontSize="12" fill="#374151">Hot (120V)</text>
        <line x1="120" y1="360" x2="150" y2="360" className="circuit-wire wire-neutral" />
        <text x="160" y="364" fontSize="12" fill="#374151">Neutral</text>
        <line x1="120" y1="375" x2="150" y2="375" className="circuit-wire wire-ground" />
        <text x="160" y="379" fontSize="12" fill="#374151">Ground</text>
        
        <rect x="280" y="340" width="15" height="8" className="switch-on" />
        <text x="305" y="348" fontSize="12" fill="#374151">Switch On</text>
        <rect x="280" y="355" width="15" height="8" className="switch-off" />
        <text x="305" y="363" fontSize="12" fill="#374151">Switch Off</text>
        
        <circle cx="450" cy="344" r="8" className="bulb-on" />
        <text x="470" y="348" fontSize="12" fill="#374151">Bulb On</text>
        <circle cx="450" cy="364" r="8" className="bulb-off" />
        <text x="470" y="368" fontSize="12" fill="#374151">Bulb Off</text>
      </svg>
    </div>
  );
};

export default CircuitDiagram;