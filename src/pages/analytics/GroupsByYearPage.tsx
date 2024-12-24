import React, { useState } from "react"
import ChartComponent from "../../components/ChartComponent"
import FilterPanel from "../../components/FilterPanel/index"
import { BASE_URL } from "../../services/api"
import { Stack, ChoiceGroup, IChoiceGroupOption } from "@fluentui/react"
import PageLayout from "../../components/pageLayout/PageLayout"

const GroupYearRelationshipPage = () => {
  const [chartData, setChartData] = useState<any>(null)
  const [mode, setMode] = useState<'year' | 'group'>('year')

  const options: IChoiceGroupOption[] = [
    { key: 'year', text: 'Search by Year' },
    { key: 'group', text: 'Search by Group' }
  ]

  const handleModeChange = (_?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      setMode(option.key as 'year' | 'group')
      setChartData(null)
    }
  }

  const handleDataFetched = (data: any) => {
    const processedData = mode === 'year'
      ? data.sort((a: any, b: any) => b.count - a.count).slice(0, 10)
      : data.sort((a: any, b: any) => a._id - b._id)

    setChartData({
      labels: processedData.map((item: any) => item._id),
      datasets: [{
        label: mode === 'year' ? 'Events per Group' : 'Events per Year',
        data: processedData.map((item: any) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    })
  }

  return (
    <PageLayout>
      <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
        <Stack.Item align="center">
          <ChoiceGroup 
            options={options} 
            selectedKey={mode} 
            onChange={handleModeChange}
            label="Select Search Mode"
          />
        </Stack.Item>
        
        <FilterPanel
          endpoint={`${BASE_URL}relationships/groups-by-year`}
          filters={[
            ...(mode === 'year' ? [{
              label: 'Year',
              field: 'year',
              type: 'text' as const,
            }] : [{
              label: 'Group Name',
              field: 'gname',
              type: 'autocomplete' as const ,
            }])
          ]}
          onDataFetched={handleDataFetched}
        />
        {chartData && <ChartComponent type="bar" data={chartData} />}
      </Stack>
    </PageLayout>
  )
}

export default GroupYearRelationshipPage;