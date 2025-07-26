import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path: '/home'
    },
    
    {
        id: 1,
        name: 'History',
        path: '/history'
    },
    {
        id: 1,
        name: 'Pricing',
        path: '/pricing'
    },
    {
        id: 1,
        name: 'Profile',
        path: '/profile'
    },

]
function AppHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
        <Image src={'/logo.svg'} alt='logo' width={59} height={38}/>
        <div className='hidden md:flex gap-12 items-center'>
          {menuOptions.map((option, idx)=>(
            <div key={idx}>
              <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
            </div>
          ))}
        </div>
        <UserButton/>
    </div>
  )
}

export default AppHeader