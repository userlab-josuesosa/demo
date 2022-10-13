interface RocketType {
  rocket_name: string
}

export interface LaunchType {
  id: string
  details: string
  launch_date_utc: string
  launch_success: true
  mission_name: string
  rocket: RocketType
}

export interface LaunchDataType {
  launches: LaunchType[]
}

export interface LaunchVarsTypes {
  siteId: string
}

export interface LaunchGraphObj {
  [key: string]: number
}
