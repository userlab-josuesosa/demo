interface RocketType {
  rocket_name: string
}

export interface LaunchType {
  id: string
  details: string
  launch_date_utc: string
  launch_success: true
  launch_year: string
  mission_name: string
  rocket: RocketType
  upcoming: boolean
}

export interface LaunchDataType {
  launches: LaunchType[]
}

export interface LaunchVarsTypes {
  siteId: string
}
