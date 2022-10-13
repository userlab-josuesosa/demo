interface LocationType {
  name: string
  region: string
}

export interface LaunchpadType {
  id: string
  name: string
  details: string
  location: LocationType
  status: string
  wikipedia: string
}

export interface LaunchpadDataType {
  launchpads: LaunchpadType[]
}
