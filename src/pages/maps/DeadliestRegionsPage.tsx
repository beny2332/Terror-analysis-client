import React, { useState } from "react"
import Map from "../../components/map/Map"
import FilterPanel from "../../components/FilterPanel/index"
import { BASE_URL } from "../../services/api"
import { Stack } from "@fluentui/react"
import { getLatitude, getLongitude } from "../../utils/getLatLon"
import PageLayout from "../../components/pageLayout/PageLayout"

const DeadliestRegionsPage = () => {
  const [data, setData] = useState<{ lat: number; lng: number; label?: string }[]>([])

  const handleDataFetched = (data: any) => {
    const regions = data.map((region: any) => ({
      lat: getLatitude(region._id),
      lng: getLongitude(region._id),
      label: `${region._id}: ${region.totalCasualties} casualties`,
    }))
    setData(regions)
  }

  return (
    <PageLayout>
      <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
        <FilterPanel
          endpoint={`${BASE_URL}relationships/deadliest-regions`}
          filters={[{ label: "Group Name", field: "gname", type: "autocomplete" }]}
          onDataFetched={handleDataFetched}
        />
        <div style={{ height: '620px', width: '800px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Map data={data} />
        </div>
      </Stack>
    </PageLayout>
  )
}

export default DeadliestRegionsPage
