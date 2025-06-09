import React from 'react';
import { Zap } from 'lucide-react';

interface CircuitBoardProps {
  circuitState: {
    acSupply: boolean;
    starter: boolean;
    choke: boolean;
    led: boolean;
    tube: boolean;
    switch: boolean;
  };
  currentFlow: string[];
  selectedCircuit: 'led' | 'fluorescent';
  darkMode: boolean;
}

const CircuitBoard: React.FC<CircuitBoardProps> = ({
  circuitState,
  currentFlow,
  selectedCircuit,
  darkMode
}) => {
  const isFlowing = (componentId: string) => currentFlow.includes(componentId);
  
  const wireClass = (active: boolean) => 
    `stroke-2 transition-all duration-300 ${
      active 
        ? 'stroke-yellow-400 drop-shadow-lg animate-pulse' 
        : darkMode 
          ? 'stroke-gray-600' 
          : 'stroke-gray-400'
    }`;

  const componentClass = (componentId: string) =>
    `transition-all duration-300 ${
      isFlowing(componentId)
        ? 'drop-shadow-2xl'
        : ''
    }`;

  const hasStarter = circuitState.starter;
  const starterInFlow = currentFlow.includes('starter');

  return (
    <div className={`relative rounded-xl border-2 p-6 ${
      darkMode 
        ? 'bg-gray-800 border-gray-600' 
        : 'bg-white border-gray-200'
    } shadow-xl`}>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          {selectedCircuit === 'led' ? 'Simple LED Circuit' : 'Fluorescent Tube Circuit'}
          {selectedCircuit === 'fluorescent' && (
            <span className="ml-2 text-sm text-gray-500">
              (Starter: {hasStarter ? 'Enabled' : 'Optional'})
            </span>
          )}
        </h3>

        <svg viewBox="0 0 600 400" className="w-full h-64 md:h-80">
          {/* AC Supply */}
          <g className={componentClass('ac-supply')}>
            <circle 
              cx="50" 
              cy="100" 
              r="25" 
              fill={isFlowing('ac-supply') ? '#fbbf24' : darkMode ? '#374151' : '#f3f4f6'}
              stroke={isFlowing('ac-supply') ? '#f59e0b' : '#6b7280'}
              strokeWidth="2"
            />
            <text x="50" y="105" textAnchor="middle" className="text-xs font-bold">
              AC
            </text>
            <text x="50" y="140" textAnchor="middle" className="text-xs">
              230V
            </text>
          </g>

          {/* Switch */}
          <g className={componentClass('switch')}>
            <rect 
              x="120" 
              y="85" 
              width="30" 
              height="30" 
              rx="5"
              fill={isFlowing('switch') ? '#10b981' : darkMode ? '#374151' : '#f3f4f6'}
              stroke={isFlowing('switch') ? '#059669' : '#6b7280'}
              strokeWidth="2"
            />
            <text x="135" y="105" textAnchor="middle" className="text-xs font-bold">
              SW
            </text>
          </g>

          {selectedCircuit === 'led' ? (
            /* LED Circuit */
            <g className={componentClass('led')}>
              <polygon 
                points="300,85 330,100 300,115"
                fill={isFlowing('led') ? '#ef4444' : darkMode ? '#374151' : '#f3f4f6'}
                stroke={isFlowing('led') ? '#dc2626' : '#6b7280'}
                strokeWidth="2"
              />
              <line x1="330" y1="100" x2="350" y2="100" stroke="#6b7280" strokeWidth="2"/>
              <text x="340" y="135" textAnchor="middle" className="text-xs">
                LED
              </text>
              {isFlowing('led') && (
                <circle cx="315" cy="100" r="3" fill="#ef4444" className="animate-ping" />
              )}
            </g>
          ) : (
            /* Fluorescent Circuit Components */
            <>
              {/* Choke/Ballast */}
              <g className={componentClass('choke')}>
                <rect 
                  x="200" 
                  y="85" 
                  width="60" 
                  height="30" 
                  rx="5"
                  fill={isFlowing('choke') ? '#8b5cf6' : darkMode ? '#374151' : '#f3f4f6'}
                  stroke={isFlowing('choke') ? '#7c3aed' : '#6b7280'}
                  strokeWidth="2"
                />
                <path 
                  d="M210,95 Q220,90 230,95 Q240,100 250,95"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="1.5"
                />
                <text x="230" y="135" textAnchor="middle" className="text-xs">
                  Choke
                </text>
              </g>

              {/* Starter (Optional) */}
              {hasStarter && (
                <g className={componentClass('starter')}>
                  <ellipse 
                    cx="350" 
                    cy="100" 
                    rx="20" 
                    ry="15"
                    fill={starterInFlow ? '#06b6d4' : darkMode ? '#374151' : '#f3f4f6'}
                    stroke={starterInFlow ? '#0891b2' : '#6b7280'}
                    strokeWidth="2"
                  />
                  <text x="350" y="105" textAnchor="middle" className="text-xs font-bold">
                    S
                  </text>
                  <text x="350" y="135" textAnchor="middle" className="text-xs">
                    Starter
                  </text>
                </g>
              )}

              {/* Fluorescent Tube */}
              <g className={componentClass('tube')}>
                <rect 
                  x={hasStarter ? "420" : "350"} 
                  y="85" 
                  width="120" 
                  height="30" 
                  rx="15"
                  fill={isFlowing('tube') ? '#ffffff' : darkMode ? '#374151' : '#f3f4f6'}
                  stroke={isFlowing('tube') ? '#fbbf24' : '#6b7280'}
                  strokeWidth="2"
                />
                <text x={hasStarter ? "480" : "410"} y="105" textAnchor="middle" className="text-xs font-bold">
                  Fluorescent Tube
                </text>
                {isFlowing('tube') && (
                  <>
                    <rect x={hasStarter ? "425" : "355"} y="90" width="110" height="20" rx="10" fill="#fbbf24" opacity="0.6" className="animate-pulse" />
                    <circle cx={hasStarter ? "450" : "380"} cy="100" r="2" fill="#ffffff" className="animate-ping" />
                    <circle cx={hasStarter ? "480" : "410"} cy="100" r="2" fill="#ffffff" className="animate-ping" style={{animationDelay: '0.2s'}} />
                    <circle cx={hasStarter ? "510" : "440"} cy="100" r="2" fill="#ffffff" className="animate-ping" style={{animationDelay: '0.4s'}} />
                  </>
                )}
              </g>
            </>
          )}

          {/* Wiring */}
          {/* AC Supply to Switch */}
          <line 
            x1="75" 
            y1="100" 
            x2="120" 
            y2="100" 
            className={wireClass(isFlowing('ac-supply') && isFlowing('switch'))}
          />

          {selectedCircuit === 'led' ? (
            /* LED Circuit Wiring */
            <>
              <line 
                x1="150" 
                y1="100" 
                x2="300" 
                y2="100" 
                className={wireClass(isFlowing('switch') && isFlowing('led'))}
              />
              <line 
                x1="350" 
                y1="100" 
                x2="550" 
                y2="100" 
                className={wireClass(isFlowing('led'))}
              />
              <line 
                x1="550" 
                y1="100" 
                x2="550" 
                y2="200" 
                className={wireClass(isFlowing('led'))}
              />
              <line 
                x1="550" 
                y1="200" 
                x2="50" 
                y2="200" 
                className={wireClass(isFlowing('led'))}
              />
              <line 
                x1="50" 
                y1="200" 
                x2="50" 
                y2="125" 
                className={wireClass(isFlowing('led'))}
              />
            </>
          ) : (
            /* Fluorescent Circuit Wiring */
            <>
              <line 
                x1="150" 
                y1="100" 
                x2="200" 
                y2="100" 
                className={wireClass(isFlowing('switch') && isFlowing('choke'))}
              />
              
              {hasStarter ? (
                <>
                  {/* With Starter */}
                  <line 
                    x1="260" 
                    y1="100" 
                    x2="330" 
                    y2="100" 
                    className={wireClass(isFlowing('choke') && (starterInFlow || isFlowing('tube')))}
                  />
                  <line 
                    x1="370" 
                    y1="100" 
                    x2="420" 
                    y2="100" 
                    className={wireClass((starterInFlow || isFlowing('choke')) && isFlowing('tube'))}
                  />
                  <line 
                    x1="540" 
                    y1="100" 
                    x2="550" 
                    y2="100" 
                    className={wireClass(isFlowing('tube'))}
                  />
                  
                  {/* Starter bypass connection */}
                  <line 
                    x1="350" 
                    y1="85" 
                    x2="350" 
                    y2="70" 
                    className={wireClass(starterInFlow || isFlowing('tube'))}
                  />
                  <line 
                    x1="300" 
                    y1="70" 
                    x2="400" 
                    y2="70" 
                    className={wireClass(starterInFlow || isFlowing('tube'))}
                  />
                  <line 
                    x1="480" 
                    y1="70" 
                    x2="480" 
                    y2="85" 
                    className={wireClass(starterInFlow || isFlowing('tube'))}
                  />
                </>
              ) : (
                <>
                  {/* Without Starter - Direct connection */}
                  <line 
                    x1="260" 
                    y1="100" 
                    x2="350" 
                    y2="100" 
                    className={wireClass(isFlowing('choke') && isFlowing('tube'))}
                  />
                  <line 
                    x1="470" 
                    y1="100" 
                    x2="550" 
                    y2="100" 
                    className={wireClass(isFlowing('tube'))}
                  />
                </>
              )}
              
              {/* Return path */}
              <line 
                x1="550" 
                y1="100" 
                x2="550" 
                y2="200" 
                className={wireClass(isFlowing('tube'))}
              />
              <line 
                x1="550" 
                y1="200" 
                x2="50" 
                y2="200" 
                className={wireClass(isFlowing('tube'))}
              />
              <line 
                x1="50" 
                y1="200" 
                x2="50" 
                y2="125" 
                className={wireClass(isFlowing('tube'))}
              />
            </>
          )}

          {/* Current flow animation */}
          {currentFlow.length > 0 && (
            <>
              <circle r="3" fill="#fbbf24" className="animate-pulse">
                <animateMotion dur="2s" repeatCount="indefinite">
                  <path d="M 75,100 L 150,100" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#fbbf24" className="animate-pulse">
                <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
                  <path d="M 550,200 L 50,200" />
                </animateMotion>
              </circle>
            </>
          )}
        </svg>

        {/* Circuit Status */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentFlow.length > 0
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}>
              {currentFlow.length > 0 ? 'Circuit Active' : 'Circuit Inactive'}
            </div>
            
            {currentFlow.length > 0 && (
              <div className="flex items-center space-x-2 text-yellow-600">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Current Flowing</span>
              </div>
            )}
          </div>
          
          {selectedCircuit === 'fluorescent' && (
            <div className="text-sm text-gray-500">
              Starter: {hasStarter ? 'Active' : 'Bypassed'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircuitBoard;