import { useState } from "react"
import ChartComponent from "../../components/ChartComponent"
import FilterPanel from "../../components/FilterPanel/index"
import { BASE_URL } from "../../services/api"
import PageLayout from "../../components/pageLayout/PageLayout"

const IncidentTrendsPage = () => {
  const [chartData, setChartData] = useState<any>(null)

  const handleDataFetched = (data: any) => {
    setChartData({
      labels: data.map((item: any) => `${item._id.month}-${item._id.year}`),
      datasets: [{
        label: 'Incident Count',
        data: data.map((item: any) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    })
  }

  return (
    <PageLayout>
      <FilterPanel
        endpoint={`${BASE_URL}analysis/incident-trends`}
        filters={[
          { label: 'Year', field: 'year', type: 'text' },
          { label: 'Range (e.g., 2015-2017)', field: 'range', type: 'text' },
          { label: 'Last 5 Years', field: 'last5Years', type: 'checkbox' },
          { label: 'Last 10 Years', field: 'last10Years', type: 'checkbox' },
        ]}
        onDataFetched={handleDataFetched}
      />
      {chartData && <ChartComponent type="line" data={chartData} />}
    </PageLayout>
  )
}

export default IncidentTrendsPage;