const LoadingSkeleton = () => {
  return (
    <tr className='animate-pulse'>
      <td className='px-2 py-2'>
        <div className='h-4 w-10 bg-gray-300 rounded'></div>
      </td>
      <td className='px-2 py-2'>
        <div className='h-4 w-20 bg-gray-300 rounded'></div>
      </td>
      <td className='px-2 py-2'>
        <div className='h-4 w-24 bg-gray-300 rounded'></div>
      </td>
      <td className='px-2 py-2'>
        <div className='h-4 w-32 bg-gray-300 rounded'></div>
      </td>
      <td className='px-2 py-2'>
        <div className='h-4 w-16 bg-gray-300 rounded'></div>
      </td>
    </tr>
  )
}

export default LoadingSkeleton
