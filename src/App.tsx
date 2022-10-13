import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql } from '@apollo/client'

import { LaunchpadDataType, LaunchpadType } from './types/Launchpad'
import { LaunchDataType, LaunchVarsTypes } from './types/Launch'

import LaunchpadsFilter from './components/LaunchpadsFilter'
import Spinner from './components/Spinner'
import Launches from './components/Launches'
import { launchesQuery } from './queries/launches'
import { launchpadsQuery } from './queries/launchpads'

const App: React.FC<{}> = () => {
  const [launchpads, setLaunchpads] = useState<LaunchpadType[]>([])
  const [launchpadId, setLaunchpadId] = useState<string>('')
  const [firstSearch, setFirstSearch] = useState(false)

  const {
    loading: loadingLaunchpads,
    error: errorLaunchpads,
    data: dataLaunchpads,
  } = useQuery<LaunchpadDataType>(gql(launchpadsQuery))
  const [getLaunches, { loading: loadingLaunches, error: errorLaunches, data: dataLaunches }] =
    useLazyQuery<LaunchDataType, LaunchVarsTypes>(gql(launchesQuery))

  useEffect(() => {
    if (dataLaunchpads?.launchpads) {
      const sorted = [...dataLaunchpads.launchpads].sort((a, b) => a.name.localeCompare(b.name))

      setLaunchpads(sorted)
    }
  }, [loadingLaunchpads, dataLaunchpads])

  useEffect(() => {
    if (errorLaunches || errorLaunchpads) alert(errorLaunches || errorLaunchpads)
  }, [errorLaunchpads, errorLaunches])

  const search = () => {
    if (!firstSearch) setFirstSearch(true)
    getLaunches({ variables: { siteId: launchpadId } })
  }

  return (
    <div>
      <header className='header'>
        <h1>Space X Launch Data</h1>
      </header>

      <main className='main'>
        {loadingLaunchpads ? (
          <Spinner />
        ) : (
          <LaunchpadsFilter
            launchpads={launchpads}
            value={launchpadId}
            onChange={setLaunchpadId}
            search={search}
            disabled={loadingLaunches}
          />
        )}
        {firstSearch &&
          (loadingLaunches ? (
            <Spinner />
          ) : (
            <Launches
              launches={dataLaunches?.launches.map(l => ({
                ...l,
                launch_success: !!l.launch_success,
                launch_date_utc: l.launch_date_utc.split('.')[0],
              }))}
            />
          ))}
      </main>
    </div>
  )
}

export default App
