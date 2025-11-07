import { Card } from '../../../componets/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const districtData = [
  { district: 'Tverskoy', cafes: 68 },
  { district: 'Arbat', cafes: 54 },
  { district: 'Tagansky', cafes: 42 },
  { district: 'Presnensky', cafes: 38 },
  { district: 'Zamoskvorechye', cafes: 31 },
  { district: 'Meshchansky', cafes: 20 },
];

const growthData = [
  { year: '2020', cafes: 142 },
  { year: '2021', cafes: 156 },
  { year: '2022', cafes: 171 },
  { year: '2023', cafes: 184 },
  { year: '2024', cafes: 223 },
  { year: '2025', cafes: 253 },
];

const visitPurposeData = [
  { name: 'Work/Study', value: 38 },
  { name: 'Social Meeting', value: 28 },
  { name: 'Quick Coffee', value: 18 },
  { name: 'Casual Dining', value: 16 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export function DataVisualization() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Data Visualization</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Visual representations of our research data provide insights into patterns and trends
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="mb-6">Cafe Distribution by District</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cafes" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          
          <Card className="p-6">
            <h3 className="mb-6">Growth Trend (2020-2025)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cafes" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
        
        <Card className="p-6 max-w-2xl mx-auto">
          <h3 className="mb-6 text-center">Primary Visit Purpose (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visitPurposeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) =>
                  `${entry.name} ${(entry.percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {visitPurposeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  );
}

