export const launchesQuery = `
query Launches($siteId: String!) {
  launches(find: {site_id: $siteId} ) {
    id
    details
    launch_date_utc
    launch_success
    launch_year
    mission_name
    rocket {
      rocket_name
    }
    upcoming
  }
}
`
