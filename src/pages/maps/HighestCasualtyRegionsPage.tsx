import { useState } from "react"
import Map from "../../components/map/Map"
import FilterPanel from "../../components/FilterPanel/index"
import { BASE_URL } from "../../services/api"
import { Stack } from "@fluentui/react"
import { getLatitude, getLongitude } from "../../utils/getLatLon"
import PageLayout from "../../components/pageLayout/PageLayout"

const HighestCasualtyRegionsPage = () => {
  const [data, setData] = useState<
    { lat: number; lng: number; label?: string }[]
  >([])

  const handleDataFetched = (
    data: any,
    filters: { [key: string]: string | string[] }
  ) => {
    const regions = data.map((region: any) => ({
      lat: getLatitude(region._id),
      lng: getLongitude(region._id),
      label: `${region._id}: ${region.avgCasualties.toFixed(
        2
      )} average casualties`,
    }))
    setData(regions)
  }

  return (
    <PageLayout>
      <Stack tokens={{ childrenGap: 10 }} styles={{ root: { padding: 10 } }}>
        <FilterPanel
          endpoint={`${BASE_URL}analysis/highest-casualty-regions`}
          filters={[
            {
              label: "Region",
              field: "region",
              type: "dropdown",
              multiSelect: false,
              includeAll: true
            },
          ]}
          onDataFetched={handleDataFetched}
        />
         <div style={{ height: '400px', width: '800px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
        <Map data={data} />
        </div>
      </Stack>
    </PageLayout>
  )
}

export default HighestCasualtyRegionsPage;