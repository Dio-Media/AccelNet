export function DataVisualization() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-center">Data Visualization</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          The following data shows how the Networks of Networks are connected
        </p>

        <div className="container mx-auto px-6">
          <div className="mb-8">
            <iframe
            title='Networks of Networks'
            src="https://timesconvergence.shinyapps.io/shiny/"
            width="100%"
            height="600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

