import { FC } from 'react'
import MagneticFramer from './Magnet'

import {Book, Mail  , BookOpen} from 'lucide-react'





const Navbar: FC= () => {
    return (
		<div className="flex justify-between items-center w-full text-xl  z-30  sticky top-0  p-3">
			<div className="flex items-center">logo @2024</div>
			<div className="flex items-center gap-4">
				<MagneticFramer>
					<Mail className="w-8 h-8 stroke-1" />
				</MagneticFramer>
				<MagneticFramer>
					<BookOpen className="w-8 h-8 stroke-1" />
				</MagneticFramer>
				<MagneticFramer>
					<div className='flex gap-2 cursor-pointer '>
						<Book className="w-8 h-8 stroke-1" />
						Order Now
					</div>
				</MagneticFramer>
			</div>
		</div>
	);
}

export default Navbar