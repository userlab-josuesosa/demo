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

  const {
    loading: loadingLaunchpads,
    error: errorLaunchpads,
    data: dataLaunchpads,
  } = useQuery<LaunchpadDataType>(gql(launchpadsQuery))
  const [getLaunches, { loading: loadingLaunches, error: errorLaunches, data: dataLaunches }] =
    useLazyQuery<LaunchDataType, LaunchVarsTypes>(gql(launchesQuery))

  useEffect(() => {
    console.log('Loading...')
    if (dataLaunchpads?.launchpads) {
      const sorted = [...dataLaunchpads.launchpads].sort((a, b) => a.name.localeCompare(b.name))

      setLaunchpads(sorted)
    }
  }, [loadingLaunchpads, dataLaunchpads])

  useEffect(() => {
    console.log({ errorLaunches, errorLaunchpads })
  }, [errorLaunchpads, errorLaunches])

  const search = () => {
    getLaunches({ variables: { siteId: launchpadId } })
  }

  return (
    <div>
      <h1>Space X Launch Data</h1>
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
      {loadingLaunches ? <Spinner /> : <Launches launches={dataLaunches?.launches} />}
    </div>
  )
}

export default App
