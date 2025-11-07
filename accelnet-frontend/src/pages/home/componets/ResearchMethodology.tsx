import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ResearchMethodology() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Research Methodology</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our mixed-methods approach combines quantitative data collection with qualitative ethnographic observations
        </p>
        
        <Tabs defaultValue="quantitative" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quantitative">Quantitative</TabsTrigger>
            <TabsTrigger value="qualitative">Qualitative</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quantitative" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Quantitative Data Collection</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2">Online Surveys</div>
                  <p className="text-gray-600">2,543 completed responses via digital questionnaire distributed through social media and cafe partnerships</p>
                </div>
                <div>
                  <div className="mb-2">On-site Observations</div>
                  <p className="text-gray-600">Systematic counting of customer traffic at 50 locations across 4-week periods</p>
                </div>
                <div>
                  <div className="mb-2">Transaction Analysis</div>
                  <p className="text-gray-600">Aggregate sales data from 32 participating cafes (anonymized), totaling 127,000+ transactions</p>
                </div>
                <div>
                  <div className="mb-2">Geospatial Mapping</div>
                  <p className="text-gray-600">GPS coordinates and density analysis of 253 cafes in central Moscow districts</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="qualitative" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Qualitative Research Methods</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2">Semi-structured Interviews</div>
                  <p className="text-gray-600">45 in-depth interviews with cafe owners, baristas, and regular customers (30-60 minutes each)</p>
                </div>
                <div>
                  <div className="mb-2">Ethnographic Observation</div>
                  <p className="text-gray-600">200+ hours of participant observation documenting social interactions and spatial usage patterns</p>
                </div>
                <div>
                  <div className="mb-2">Focus Groups</div>
                  <p className="text-gray-600">8 focus group sessions with 6-10 participants each, exploring cafe culture and preferences</p>
                </div>
                <div>
                  <div className="mb-2">Visual Documentation</div>
                  <p className="text-gray-600">Photographic analysis of interior design, menu boards, and customer behavior patterns</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Data Analysis Framework</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2">Statistical Analysis</div>
                  <p className="text-gray-600">SPSS software for descriptive statistics, correlation analysis, and regression modeling</p>
                </div>
                <div>
                  <div className="mb-2">Thematic Coding</div>
                  <p className="text-gray-600">NVivo-assisted qualitative coding of interview transcripts and field notes</p>
                </div>
                <div>
                  <div className="mb-2">GIS Mapping</div>
                  <p className="text-gray-600">Spatial analysis using QGIS to identify clustering patterns and accessibility metrics</p>
                </div>
                <div>
                  <div className="mb-2">Triangulation</div>
                  <p className="text-gray-600">Cross-validation of findings across multiple data sources to ensure reliability</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
