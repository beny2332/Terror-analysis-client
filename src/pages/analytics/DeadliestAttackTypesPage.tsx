import { useState } from "react"
import ChartComponent from "../../components/ChartComponent"
import FilterPanel from "../../components/FilterPanel/index"
import { BASE_URL } from "../../services/api"
import PageLayout from "../../components/pageLayout/PageLayout"

const DeadliestAttackTypesPage = () => {
  const [chartData, setChartData] = useState<any>(null)

  const handleDataFetched = (data: any, selectedFilters: any) => {
    // Now we have access to both the data and selected filters
    setChartData({
      labels: data.map((item: any) => item._id),
      datasets: [{
        label: 'Total Casualties',
        data: data.map((item: any) => item.totalCasualties),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    })
    
    // You can log the selected filters to verify
    console.log('Selected attack types:', selectedFilters.attacktype1_txt)
  }

  return (
    <PageLayout>
      <FilterPanel
        endpoint={`${BASE_URL}api/analysis/deadliest-attack-types`}
        filters={[
          { 
            label: 'Attack Types', 
            field: 'attackTypes', 
            type: 'dropdown', 
            multiSelect: true 
          },
        ]}
        onDataFetched={handleDataFetched}
      />
      {chartData && <ChartComponent type="bar" data={chartData} />}
    </PageLayout>
  )
}

export default DeadliestAttackTypesPage
