import { LaunchType, LaunchGraphObj } from '../types/Launch'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { useEffect, useState } from 'react'
import { GraphPointType } from '../types/Graph'
import { COLORS } from './colors'
import LaunchesTableLabels from './LaunchesTableLabels'

const CustomTooltip = ({
  active,
  payload,
  label,
  launches,
}: {
  active?: any
  payload?: any
  label?: any
  launches: LaunchType[]
}) => {
  if (!payload || !payload.length) return <div />

  const [name, status] = payload[0].name.split(' - ')
  const launch_success = status === 'success'

  const launchesList = launches
    .filter(l => l.rocket.rocket_name === name && l.launch_success === launch_success)
    .sort((a, b) => new Date(a.launch_date_utc).getTime() - new Date(b.launch_date_utc).getTime())

  let chunks = []
  while (launchesList.length > 0) chunks.push(launchesList.splice(0, 10))

  return (
    <div className='graph-tooltip'>
      <h3>{name}</h3>
      <p>{launch_success ? 'Successful' : 'Failed'} launches</p>
      <div className='dates-list'>
        {chunks.map(chunk => (
          <div>
            {chunk.map(l => (
              <li>{l.launch_date_utc}</li>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const LaunchesGraph: React.FC<{ launches: LaunchType[] }> = ({ launches }) => {
  const [launchesGraph, setLaunchesGraph] = useState<GraphPointType[]>([])

  useEffect(() => {
    if (launches?.length) buildData(launches)
  }, [launches])

  const buildData = (values: LaunchType[]) => {
    const success = values.reduce((obj: LaunchGraphObj, launch) => {
      const name = `${launch.rocket.rocket_name} - ${launch.launch_success ? 'success' : 'fail'}`
      if (obj[name]) obj[name] += 1
      else obj[name] = 1
      return obj
    }, {})

    setLaunchesGraph(Object.entries(success).map(([name, value]) => ({ name, value })))
  }

  return (
    <div className='graph'>
      <LaunchesTableLabels launchesGraph={launchesGraph} />

      <PieChart width={300} height={300}>
        <Pie
          data={launchesGraph}
          dataKey='value'
          outerRadius={90}
          fill='#82ca9d'
          label
          animationDuration={300}
          animationBegin={0}
        >
          {launchesGraph.map((_entry, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip launches={launches} />} />
      </PieChart>
    </div>
  )
}
export default LaunchesGraph
