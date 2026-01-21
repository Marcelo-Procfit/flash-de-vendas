const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(function() {
    const loadData = async function() {
      try {
        await new Promise(function(resolve) { setTimeout(resolve, 1000); });
        
        // Dados mockados realistas
        const mockData = {
          vendas: [
            { label: 'Venda Bruta', value: 'R$ 485.320', change: '+7.3%', changeValue: '+R$ 33.140', isPositive: true },
            { label: 'Venda Líquida', value: 'R$ 462.850', change: '+5.8%', changeValue: '+R$ 25.320', isPositive: true },
            { label: 'Margem', value: '24,5%', change: '-0.8%', changeValue: '-0.8pp', isPositive: false },
            { label: 'Ticket Médio', value: 'R$ 89,40', change: '+3.2%', changeValue: '+R$ 2.76', isPositive: true },
            { label: 'Itens/Venda', value: '2,8', change: '+12.0%', changeValue: '+0.3', isPositive: true },
            { label: 'Transações', value: '5.180', change: '+4.1%', changeValue: '+204', isPositive: true }
          ],
          marketing: [
            { label: 'CAC', value: 'R$ 24,60', change: '-5.2%', changeValue: '-R$ 1.35', isPositive: true },
            { label: 'ROAS', value: '4,2x', change: '+8.7%', changeValue: '+0.34x', isPositive: true },
            { label: 'CTR', value: '2,8%', change: '+15.6%', changeValue: '+0.38pp', isPositive: true },
            { label: 'CPC', value: 'R$ 0,89', change: '-3.1%', changeValue: '-R$ 0.03', isPositive: true },
            { label: 'Conversão', value: '3,2%', change: '+9.4%', changeValue: '+0.27pp', isPositive: true },
            { label: 'LTV', value: 'R$ 285,40', change: '+12.3%', changeValue: '+R$ 31.20', isPositive: true }
          ],
          operacional: [
            { label: 'Estoque Giro', value: '8,4x', change: '+2.1%', changeValue: '+0.17x', isPositive: true },
            { label: 'Ruptura', value: '2,1%', change: '-18.2%', changeValue: '-0.47pp', isPositive: true },
            { label: 'Prazo Entrega', value: '3,2 dias', change: '-8.6%', changeValue: '-0.3d', isPositive: true },
            { label: 'Devolução', value: '1,8%', change: '-12.2%', changeValue: '-0.25pp', isPositive: true },
            { label: 'Satisfação', value: '4,7★', change: '+3.3%', changeValue: '+0.15★', isPositive: true },
            { label: 'NPS', value: '72', change: '+5.9%', changeValue: '+4pts', isPositive: true }
          ],
          financeiro: [
            { label: 'Receita Total', value: 'R$ 485.320', change: '+7.3%', changeValue: '+R$ 33.140', isPositive: true },
            { label: 'Custos', value: 'R$ 316.458', change: '+4.2%', changeValue: '+R$ 12.780', isPositive: false },
            { label: 'EBITDA', value: 'R$ 98.420', change: '+18.5%', changeValue: '+R$ 15.340', isPositive: true },
            { label: 'Margem EBITDA', value: '20,3%', change: '+2.1pp', changeValue: '+2.1pp', isPositive: true },
            { label: 'Fluxo Caixa', value: 'R$ 156.780', change: '+24.6%', changeValue: '+R$ 31.020', isPositive: true },
            { label: 'ROI', value: '15,8%', change: '+3.2pp', changeValue: '+3.2pp', isPositive: true }
          ],
          hourlyData: [
            { time: '08:00', actual: 15000, baseline: 18000 },
            { time: '09:00', actual: 25000, baseline: 22000 },
            { time: '10:00', actual: 35000, baseline: 32000 },
            { time: '11:00', actual: 28000, baseline: 35000 },
            { time: '12:00', actual: 42000, baseline: 38000 },
            { time: '13:00', actual: 38000, baseline: 40000 },
            { time: '14:00', actual: 22000, baseline: 35000 },
            { time: '15:00', actual: 35000, baseline: 32000 },
            { time: '16:00', actual: 48000, baseline: 45000 },
            { time: '17:00', actual: 52000, baseline: 48000 },
            { time: '18:00', actual: 38000, baseline: 42000 }
          ],
          donutData: [
            { label: 'Perfumaria', value: 125000, percentage: 'R$ 125K', category: 'interior' },
            { label: 'Medicamentos', value: 98000, percentage: 'R$ 98K', category: 'interior' },
            { label: 'Higiene', value: 87000, percentage: 'R$ 87K', category: 'interior' },
            { label: 'Beleza', value: 65000, percentage: 'R$ 65K', category: 'interior' },
            { label: 'Nutrição', value: 45000, percentage: 'R$ 45K', category: 'interior' },
            { label: 'Grupo A', value: 215000, percentage: 'R$ 215K', category: 'exterior' },
            { label: 'Grupo B', value: 178000, percentage: 'R$ 178K', category: 'exterior' },
            { label: 'Grupo C', value: 142000, percentage: 'R$ 142K', category: 'exterior' }
          ],
          monthlyData: [
            { month: '01/01', actual: 1200000, baseline: 1100000 },
            { month: '02/01', actual: 1450000, baseline: 1250000 },
            { month: '03/01', actual: 1850000, baseline: 1600000 },
            { month: '04/01', actual: 2100000, baseline: 1900000 },
            { month: '05/01', actual: 2450000, baseline: 2200000 },
            { month: '06/01', actual: 2850000, baseline: 2600000 },
            { month: '07/01', actual: 3250000, baseline: 3000000 },
            { month: '08/01', actual: 3650000, baseline: 3400000 },
            { month: '09/01', actual: 4200000, baseline: 3900000 },
            { month: '10/01', actual: 4850000, baseline: 4500000 },
            { month: '11/01', actual: 5420000, baseline: 5100000 },
            { month: '12/01', actual: 6100000, baseline: 5800000 }
          ]
        };
        
        setData(mockData);
      } catch (e) {
        setError('Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const LoadingSkeleton = () => (
    <div className="p-6 space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
          <div className="flex gap-4">
            {[1,2,3,4].map(function(i) {
              return <div key={i} className="h-10 bg-gray-200 rounded flex-1"></div>;
            })}
          </div>
        </div>
        
        {[1,2,3,4].map(function(section) {
          return (
            <div key={section} className="mb-8">
              <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
              <div className="grid grid-cols-6 gap-4">
                {[1,2,3,4,5,6].map(function(i) {
                  return (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const ErrorState = ({ message, onRetry }) => (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-red-200 m-6">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">Erro ao carregar</h3>
      <p className="text-gray-500 mt-1">{message}</p>
      <button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );

  const KpiCard = ({ label, value, change, changeValue, isPositive, icon }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-gray-400">{icon || '$'}</span>
      </div>
      
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      
      <div className="h-8 my-2">
        <svg className="w-full h-full" viewBox="0 0 100 30">
          <polyline 
            fill="none" 
            stroke={isPositive ? "#22c55e" : "#ef4444"} 
            strokeWidth="2" 
            points="0,25 20,20 40,22 60,15 80,18 100,10" 
          />
        </svg>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">vs. período anterior</span>
        <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </span>
      </div>
      
      <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {changeValue}
      </div>
    </div>
  );

  if (isLoading) return <LoadingSkeleton />;
  
  if (error) return (
    <ErrorState 
      message={error} 
      onRetry={function() { window.location.reload(); }} 
    />
  );

  if (!data) return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm m-6">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">Nenhum dado encontrado</h3>
      <p className="text-gray-500 mt-1">Os dados aparecerão aqui quando disponíveis.</p>
    </div>
  );

  const donutColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981', '#f97316', '#6366f1'];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flash de Vendas</h1>
            <p className="text-gray-500 mt-1">Monitoramento em tempo real de vendas e performance</p>
          </div>
          <div className="text-sm text-gray-500">
            Última atualização: 20/01/2026, 20:10:46
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4 mb-6 flex-wrap bg-white p-4 rounded-lg shadow-sm">
        <span className="text-sm text-gray-600 flex items-center gap-2">⚙️ Filtros:</span>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Grupo A</option>
          <option>Grupo B</option>
          <option>Grupo C</option>
        </select>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Matriz</option>
          <option>Filial 1</option>
          <option>Filial 2</option>
        </select>
        <span className="text-sm text-gray-600">Base Line:</span>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Dia Anterior</option>
          <option>Semana Anterior</option>
          <option>Mês Anterior</option>
        </select>
      </div>

      {/* KPIs de Vendas */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">VENDAS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.vendas.map(function(item, index) {
            return (
              <KpiCard
                key={index}
                label={item.label}
                value={item.value}
                change={item.change}
                changeValue={item.changeValue}
                isPositive={item.isPositive}
              />
            );
          })}
        </div>
      </div>

      {/* KPIs de Marketing */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">MARKETING</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.marketing.map(function(item, index) {
            return (
              <KpiCard
                key={index}
                label={item.label}
                value={item.value}
                change={item.change}
                changeValue={item.changeValue}
                isPositive={item.isPositive}
                icon="📈"
              />
            );
          })}
        </div>
      </div>

      {/* KPIs Operacionais */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">OPERACIONAL</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.operacional.map(function(item, index) {
            return (
              <KpiCard
                key={index}
                label={item.label}
                value={item.value}
                change={item.change}
                changeValue={item.changeValue}
                isPositive={item.isPositive}
                icon="⚙️"
              />
            );
          })}
        </div>
      </div>

      {/* KPIs Financeiros */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">FINANCEIRO</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.financeiro.map(function(item, index) {
            return (
              <KpiCard
                key={index}
                label={item.label}
                value={item.value}
                change={item.change}
                changeValue={item.changeValue}
                isPositive={item.isPositive}
                icon="💰"
              />
            );
          })}
        </div>
      </div>

      {/* Seção de Evolução */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">EVOLUÇÃO</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico de Área - Vendas por Hora */}
          <div className="lg:col-span-2">
            <AreaChart 
              title="Vendas por Hora (Hoje vs Base Line)"
              data={data.hourlyData}
              height={300}
            />
          </div>
          
          {/* Gráfico Donut - Vendas por Seção/Grupo */}
          <div>
            <DonutChart 
              title="Vendas por Seção/Grupo"
              data={data.donutData}
              colors={donutColors}
            />
          </div>
        </div>
      </div>

      {/* Seção de Evolução do Mês */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">EVOLUÇÃO DO MÊS</h2>
        
        <LineChart 
          title="Evolução do Mês (Acumulado)"
          data={data.monthlyData}
          height={400}
        />
      </div>
    </div>
  );
};