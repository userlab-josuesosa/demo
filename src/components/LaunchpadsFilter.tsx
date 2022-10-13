import { LaunchpadType } from '../types/Launchpad'

const LaunchpadsFilter: React.FC<{
  launchpads: LaunchpadType[]
  value?: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  search: () => void
  disabled: boolean
}> = ({ launchpads, value, onChange, search, disabled }) => {
  return (
    <div className='search'>
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}>
        <option disabled value=''>
          Select a Launchpad...
        </option>
        {launchpads.map((launchpad, key) => (
          <option key={key} value={launchpad.id}>
            {launchpad.name}
          </option>
        ))}
      </select>

      <button onClick={() => search()}>Search</button>
    </div>
  )
}
export default LaunchpadsFilter
