import { GraphPointType } from '../types/Graph'
import { COLORS } from './colors'

const LaunchesTableLabels: React.FC<{ launchesGraph: GraphPointType[] }> = ({ launchesGraph }) => {
  return (
    <div className='graph-labels-container'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Rocket Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {launchesGraph.map((lg, i) => {
            const [name, status] = lg.name.split(' - ')
            return (
              <tr key={i}>
                <td>
                  <div
                    className='graph-color-square'
                    style={{ backgroundColor: `${COLORS[i % COLORS.length]}` }}
                  />
                </td>
                <td>{name}</td>
                <td>{status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default LaunchesTableLabels
