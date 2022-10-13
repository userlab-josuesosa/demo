import { useState } from 'react'
import { LaunchType } from '../types/Launch'
import { TabType } from '../types/Tab'
import Empty from './Empty'
import LaunchesGraph from './LaunchesGraph'
import LaunchesTable from './LaunchesTable'

const Launches: React.FC<{
  launches?: LaunchType[]
}> = ({ launches }) => {
  const [tab, setTab] = useState<TabType>('Graph')

  const tabStyle = (type: TabType) => (type === tab ? 'tab-selected' : 'tab-deselected')

  return (
    <div className='launches'>
      {launches?.length ? (
        <div>
          <div className='tab-header'>
            <button className={tabStyle('Graph')} onClick={() => setTab('Graph')}>
              Graph
            </button>
            <button className={tabStyle('Table')} onClick={() => setTab('Table')}>
              Table
            </button>
          </div>
          <div className='tab-body'>
            {tab === 'Graph' ? (
              <LaunchesGraph launches={launches} />
            ) : (
              <LaunchesTable launches={launches} />
            )}
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}
export default Launches
