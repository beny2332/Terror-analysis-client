// import React, { useEffect, useState } from "react"
// import Map from "../../components/map/Map"
// import { Stack, TextField, PrimaryButton } from "@fluentui/react"
// import { io } from "socket.io-client"
// import PageLayout from "../../components/pageLayout/PageLayout"

// const socket = io("http://localhost:3030")

// interface MapPoint {
//   lat: number
//   lng: number
//   label?: string
// }

// export interface MapProps {
//   data: MapPoint[]
//   onMapClick: (point: MapPoint) => void
// }

// const CreateEventPage = () => {
//   const [mapPoints, setMapPoints] = useState<MapPoint[]>([])
//   const [eventData, setEventData] = useState({
//     iyear: new Date().getFullYear(),
//     imonth: new Date().getMonth() + 1,
//     iday: new Date().getDate(),
//     country_txt: "",
//     region_txt: "",
//     city: "",
//     latitude: 0,
//     longitude: 0,
//     attacktype1_txt: "",
//     targtype1_txt: "",
//     target1: "",
//     gname: "",
//     weaptype1_txt: "",
//     nkill: 0,
//     nwound: 0,
//     nperps: 0,
//     summary: "",
//   })

//   useEffect(() => {
//     socket.on("eventCreated", (newEvent) => {
//       console.log("Event created:", newEvent)
//       // Add success handling here (e.g., clear form, show success message)
//     })

//     socket.on("eventError", (error) => {
//       console.error("Error creating event:", error)
//       // Add error handling here
//     })

//     return () => {
//       socket.off("eventCreated")
//       socket.off("eventError")
//     }
//   }, [])

//   const handleSubmit = () => {
//     socket.emit("createEvent", eventData)
//   }

//   const handleMapClick = (point: MapPoint) => {
//     setMapPoints([point])
//     setEventData((prev) => ({
//       ...prev,
//       latitude: point.lat,
//       longitude: point.lng,
//     }))
//   }

//   return (
//     <PageLayout>
//       <Stack tokens={{ childrenGap: 20 }}>
//         <div
//           style={{
//             height: "400px",
//             width: "700px",
//             margin: "0 auto",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             overflow: "hidden",
//           }}
//         >
//           <Map data={mapPoints} onMapClick={handleMapClick} />
//         </div>
//         <Stack tokens={{ childrenGap: 10 }}>
//           <Stack horizontal tokens={{ childrenGap: 10 }}>
//             <TextField
//               label="Year"
//               type="number"
//               value={eventData.iyear.toString()}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, iyear: Number(value) }))
//               }
//             />
//             <TextField
//               label="Month"
//               type="number"
//               value={eventData.imonth.toString()}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, imonth: Number(value) }))
//               }
//             />
//             <TextField
//               label="Day"
//               type="number"
//               value={eventData.iday.toString()}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, iday: Number(value) }))
//               }
//             />
//           </Stack>

//           <Stack horizontal tokens={{ childrenGap: 10 }}>
//             <TextField
//               label="Country"
//               value={eventData.country_txt}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, country_txt: value || "" }))
//               }
//             />
//             <TextField
//               label="Region"
//               value={eventData.region_txt}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, region_txt: value || "" }))
//               }
//             />
//             <TextField
//               label="City"
//               value={eventData.city}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, city: value || "" }))
//               }
//             />
//           </Stack>

//           <Stack horizontal tokens={{ childrenGap: 10 }}>
//             <TextField
//               label="Attack Type"
//               value={eventData.attacktype1_txt}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({
//                   ...prev,
//                   attacktype1_txt: value || "",
//                 }))
//               }
//             />
//             <TextField
//               label="Target Type"
//               value={eventData.targtype1_txt}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({
//                   ...prev,
//                   targtype1_txt: value || "",
//                 }))
//               }
//             />
//             <TextField
//               label="Target"
//               value={eventData.target1}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, target1: value || "" }))
//               }
//             />
//           </Stack>

//           <Stack horizontal tokens={{ childrenGap: 10 }}>
//             <TextField
//               label="Group Name"
//               value={eventData.gname}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, gname: value || "" }))
//               }
//             />
//             <TextField
//               label="Weapon Type"
//               value={eventData.weaptype1_txt}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({
//                   ...prev,
//                   weaptype1_txt: value || "",
//                 }))
//               }
//             />
//           </Stack>

//           <Stack horizontal tokens={{ childrenGap: 10 }}>
//             <TextField
//               label="Number Killed"
//               type="number"
//               value={eventData.nkill.toString()}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, nkill: Number(value) }))
//               }
//             />
//             <TextField
//               label="Number Wounded"
//               type="number"
//               value={eventData.nwound.toString()}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, nwound: Number(value) }))
//               }
//             />
//             <TextField
//               label="Number of Perpetrators"
//               type="number"
//               value={eventData.nperps.toString()}
//               onChange={(_, value) =>
//                 setEventData((prev) => ({ ...prev, nperps: Number(value) }))
//               }
//             />
//           </Stack>

//           <TextField
//             label="Summary"
//             multiline
//             rows={4}
//             value={eventData.summary}
//             onChange={(_, value) =>
//               setEventData((prev) => ({ ...prev, summary: value || "" }))
//             }
//           />

//           <PrimaryButton text="Submit Event" onClick={handleSubmit} />
//         </Stack>{" "}
//       </Stack>
//     </PageLayout>
//   )
// }

// export default CreateEventPage
