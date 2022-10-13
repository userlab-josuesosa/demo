export const launchesQuery = `
query Launches($siteId: String!) {
  launches(find: {site_id: $siteId} ) {
    id
    details
    launch_date_utc
    launch_success
    mission_name
    rocket {
      rocket_name
    }
  }
}
`
