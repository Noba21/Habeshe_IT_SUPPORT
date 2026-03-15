// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { getUploadUrl } from '../utils/photoUrl';

// export default function DepartmentLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
// // 
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const nav = [
//     { to: '/department', end: true, label: 'Dashboard' },
//     { to: '/department/request', label: 'New Request' },
//     { to: '/department/history', label: 'History' },
//     { to: '/department/profile', label: 'Profile' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-emerald-800 text-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-14">
//             <div className="flex items-center gap-6">
//               <span className="font-semibold">IT Support - Department</span>
//               {nav.map(({ to, end, label }) => (
//                 <NavLink
//                   key={to}
//                   to={to}
//                   end={end}
//                   className={({ isActive }) =>
//                     isActive ? 'text-amber-400' : 'hover:text-gray-200'
//                   }
//                 >
//                   {label}
//                 </NavLink>
//               ))}
//             </div>
//             <div className="flex items-center gap-4">
//               {user?.photo ? (
//                 <img src={getUploadUrl(user.photo)} alt="" className="w-8 h-8 rounded-full object-cover border border-emerald-600" />
//               ) : (
//                 <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-medium">
//                   {user?.full_name?.slice(0, 2)?.toUpperCase() || 'U'}
//                 </span>
//               )}
//               <span className="text-sm">{user?.full_name}</span>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <main className="max-w-7xl mx-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUploadUrl } from '../utils/photoUrl';
import { useState } from 'react';

export default function DepartmentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const nav = [
    { to: '/department', end: true, label: 'Dashboard' },
    { to: '/department/request', label: 'New Request' },
    { to: '/department/history', label: 'History' },
    { to: '/department/profile', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-emerald-800 text-white shadow">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between items-center h-14">

            {/* Title */}
            <span className="font-semibold">IT Support - Department</span>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {nav.map(({ to, end, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive ? 'text-amber-400' : 'hover:text-gray-200'
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* User + Hamburger */}
            <div className="flex items-center gap-3">

              {/* User Photo */}
              {user?.photo ? (
                <img
                  src={getUploadUrl(user.photo)}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-emerald-600"
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-medium">
                  {user?.full_name?.slice(0, 2)?.toUpperCase() || 'U'}
                </span>
              )}

              <span className="hidden md:block text-sm">
                {user?.full_name}
              </span>

              <button
                onClick={handleLogout}
                className="hidden md:block px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600"
              >
                Logout
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-2xl"
              >
                ☰
              </button>

            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden flex flex-col gap-3 pb-4">
              {nav.map(({ to, end, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-amber-400' : 'hover:text-gray-200'
                  }
                >
                  {label}
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="mt-2 px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 w-fit"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}