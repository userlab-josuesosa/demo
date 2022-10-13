import { LaunchType } from '../types/Launch'

const LaunchesTable: React.FC<{ launches: LaunchType[] }> = ({ launches }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Rocket Name</th>
          <th>Details</th>
          <th>Date</th>
          <th>Mission Name</th>
          <th>Success</th>
        </tr>
      </thead>
      <tbody>
        {launches.map((launch, key) => (
          <tr key={key}>
            <td>{launch.id}</td>
            <td>{launch.rocket.rocket_name}</td>
            <td>{launch.details}</td>
            <td>{launch.launch_date_utc}</td>
            <td>{launch.mission_name}</td>
            <td>{launch.launch_success ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default LaunchesTable
