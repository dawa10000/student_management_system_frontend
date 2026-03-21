import { UserIcon, LogOutIcon, LayoutDashboardIcon, HomeIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetUserQuery } from '../features/user/userApi.js'
import { base } from '../app/mainApi.js'
import { useDispatch } from 'react-redux'
import { removeUser } from '../features/user/userSlice.js'
import { useNavigate } from 'react-router'

const listItems = [
  {
    icon: HomeIcon,
    property: 'Home'

  },
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: LayoutDashboardIcon,
    property: 'Dashboard'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
]

const DropDownMenu = ({ user }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, data } = useGetUserQuery(user?.token);
  if (isLoading) return <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
  </Button>;
  if (error) return <p className='text-red-500'>{error.data?.message}</p>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='w-14 h-14 overflow-hidden rounded-full'>
          <img className="object-cover w-full h-full" src={`${base}/${data.image}`} alt='Hallie Richards' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {listItems.map((item, index) => {
            return <DropdownMenuItem
              onClick={() => {
                switch (item.property) {

                  case 'Home':
                    nav('/')
                    break;
                  case 'Sign Out':
                    dispatch(removeUser());
                    nav("/login")
                    break;

                  case 'Profile':
                    nav('/profile');
                    break;

                  case 'Dashboard':
                    nav('/dashboard');
                    break;

                }
              }}
              key={index}>
              <item.icon />
              <span className='text-popover-foreground'>{item.property}</span>
            </DropdownMenuItem>
          }
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownMenu
