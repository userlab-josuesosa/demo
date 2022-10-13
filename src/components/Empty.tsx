import empty from '../assets/empty-box.png'

const Empty: React.FC<{}> = () => {
  return (
    <div className='empty'>
      <img className='empty-image' src={empty} alt='empty-box' />
      <h3 className='empty-label'>Nothing to show</h3>
    </div>
  )
}
export default Empty
