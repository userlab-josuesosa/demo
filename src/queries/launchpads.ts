export const launchpadsQuery = `
query Launchpads {
  launchpads {
    id
    name
    details
    location {
      name
      region
    }
    attempted_launches
    successful_launches
    status
    wikipedia
  }
}
`
