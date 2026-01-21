const AreaChart = ({ title, data, height = 300 }) => {
  const maxValue = Math.max(...data.map(function(d) { return Math.max(d.actual, d.baseline); }));
  
  const createPath = function(points, isBaseline = false) {
    const pathData = points.map(function(point, index) {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - (point / maxValue) * 80;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
    
    return pathData + ` L 100 100 L 0 100 Z`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative" style={{ height: height }}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="actualGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="baselineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Baseline area */}
          <path 
            d={createPath(data.map(function(d) { return d.baseline; }), true)}
            fill="url(#baselineGradient)"
            stroke="#9ca3af"
            strokeWidth="2"
          />
          
          {/* Actual area */}
          <path 
            d={createPath(data.map(function(d) { return d.actual; }))}
            fill="url(#actualGradient)"
            stroke="#3b82f6"
            strokeWidth="2"
          />
        </svg>
        
        {/* Time labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {data.map(function(item, index) {
            if (index % 2 === 0) {
              return <span key={index}>{item.time}</span>;
            }
            return null;
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-600">Base Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Atual</span>
        </div>
      </div>
    </div>
  );
};

const DonutChart = ({ title, data, colors }) => {
  const total = data.reduce(function(sum, item) { return sum + item.value; }, 0);
  let cumulativePercentage = 0;
  
  const createArc = function(centerX, centerY, radius, startAngle, endAngle) {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", centerX, centerY, 
      "L", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };
  
  const polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="flex items-center gap-8">
        {/* Chart */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map(function(item, index) {
              const percentage = (item.value / total) * 100;
              const startAngle = cumulativePercentage * 3.6;
              const endAngle = (cumulativePercentage + percentage) * 3.6;
              
              cumulativePercentage += percentage;
              
              const radius = 35;
              const innerRadius = 20;
              
              const outerArc = createArc(50, 50, radius, startAngle, endAngle);
              const innerArc = createArc(50, 50, innerRadius, startAngle, endAngle);
              
              return (
                <g key={index}>
                  <path
                    d={outerArc}
                    fill={colors[index]}
                    className="hover:opacity-80 transition-opacity"
                  />
                  <path
                    d={innerArc}
                    fill="white"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex-1 space-y-3">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-blue-600 uppercase mb-2">SEÇÕES (INTERIOR)</h4>
            {data.filter(function(item) { return item.category === 'interior'; }).map(function(item, index) {
              return (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}</span>
                </div>
              );
            })}
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">GRUPOS (EXTERIOR)</h4>
            {data.filter(function(item) { return item.category === 'exterior'; }).map(function(item, index) {
              const colorIndex = data.filter(function(d) { return d.category === 'interior'; }).length + index;
              return (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[colorIndex] }}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ title, subtitle, data, height = 300 }) => {
  const maxValue = Math.max(...data.map(function(d) { return Math.max(d.actual, d.baseline); }));
  
  const createLine = function(points) {
    return points.map(function(point, index) {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - (point / maxValue) * 80;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  };

  const createArea = function(points) {
    const line = createLine(points);
    return line + ` L 100 100 L 0 100 Z`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      
      {/* Y-axis labels */}
      <div className="flex">
        <div className="w-12 flex flex-col justify-between text-xs text-gray-500 mr-4" style={{ height: height }}>
          <span>8.0M</span>
          <span>6.0M</span>
          <span>4.0M</span>
          <span>2.0M</span>
          <span>0.0M</span>
        </div>
        
        <div className="flex-1 relative" style={{ height: height }}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="monthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10d9c4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10d9c4" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="baselineMonthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[20, 40, 60, 80].map(function(y) {
              return <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="1" />;
            })}
            
            {/* Baseline area */}
            <path 
              d={createArea(data.map(function(d) { return d.baseline; }))}
              fill="url(#baselineMonthGradient)"
              stroke="none"
            />
            
            {/* Baseline line */}
            <path 
              d={createLine(data.map(function(d) { return d.baseline; }))}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Actual area */}
            <path 
              d={createArea(data.map(function(d) { return d.actual; }))}
              fill="url(#monthGradient)"
              stroke="none"
            />
            
            {/* Actual line */}
            <path 
              d={createLine(data.map(function(d) { return d.actual; }))}
              fill="none"
              stroke="#10d9c4"
              strokeWidth="3"
            />
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
            {data.map(function(item, index) {
              return <span key={index}>{item.month}</span>;
            })}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 border-2 border-dashed border-gray-400"></div>
          <span className="text-sm text-gray-600">Base Line (Período)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-teal-500"></div>
          <span className="text-sm text-gray-600">Acumulado Mês</span>
        </div>
      </div>
    </div>
  );
};