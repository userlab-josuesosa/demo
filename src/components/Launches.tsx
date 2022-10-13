import { LaunchType } from '../types/Launch'
import Empty from './Empty'

const Launches: React.FC<{
  launches?: LaunchType[]
}> = ({ launches }) => {
  return (
    <div>
      {launches?.length ? (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Rocket Name</th>
              <th>Date</th>
              <th>Success</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch, key) => (
              <tr key={key}>
                <td>{launch.id}</td>
                <td>{launch.rocket.rocket_name}</td>
                <td>{launch.launch_date_utc}</td>
                <td>{launch.launch_success ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Empty />
      )}
    </div>
  )
}
export default Launches
