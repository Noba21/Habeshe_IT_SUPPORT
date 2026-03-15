// import { Link } from 'react-router-dom';

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
//       <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
//         <span className="text-xl font-bold">Habesha Steel IT Support</span>
//         <Link
//           to="/login"
//           className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
//         >
//           Login
//         </Link>
//       </nav>

//       <main className="max-w-4xl mx-auto px-6 py-20 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6">
//           Habesha Steel IT Support Management System
//         </h1>
//         <p className="text-slate-300 text-lg mb-8">
//           Welcome to Habesha Steel Mills P.L.C
//           Thank you for visiting our website and taking time to learn about Habesha steel mills PLC, founded in 2007 as a steel manufacturing plant. It has since then shown continuous growth. We produce our product locally starting from the raw material to the finished product.
//           Steel manufacturing is a fundamental industry in a developing country economy whose infrastructure development and growth in the manufacturing sector is likely to increase in the coming years.
//         </p>
//         <div className="flex gap-4 justify-center flex-wrap">
//           <Link
//             to="/login"
//             className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
//           >
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="px-6 py-3 rounded-lg border border-amber-500 text-amber-500 hover:bg-amber-500/10 font-medium"
//           >
//             Register (Department)
//           </Link>
//         </div>
//       </main>

//       <footer className="border-t border-slate-700 mt-20 py-8">
//         <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
//           Habesha Steel IT Support Management System &copy; {new Date().getFullYear()}
//         </div>
//       </footer>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <span className="text-xl font-bold">Habesha Steel IT Support</span>
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
        >
          Login
        </Link>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Habesha Steel IT Support Management System
        </h1>

        <p className="text-slate-300 text-lg mb-14 max-w-3xl mx-auto">
          Welcome to Habesha Steel Mills P.L.C. Our IT Support Management
          System helps departments report technical issues, track support
          requests, and maintain smooth digital operations across the factory.
        </p>

        {/* CARDS SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* FACTORY CARD */}
          <div className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-xl p-8 hover:scale-105 transition duration-300 shadow-lg">
            <div className="text-amber-500 text-4xl mb-4">🏭</div>
            <h2 className="text-2xl font-semibold mb-3">
              Habesha Steel Mills
            </h2>
            <p className="text-slate-300">
              Founded in 2007, Habesha Steel Mills PLC is a growing steel
              manufacturing company producing high-quality steel products
              locally from raw materials to finished goods. The factory plays
              a key role in infrastructure development and industrial growth
              in Ethiopia.
            </p>
          </div>

          {/* IT SUPPORT CARD */}
          <div className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-xl p-8 hover:scale-105 transition duration-300 shadow-lg">
            <div className="text-amber-500 text-4xl mb-4">💻</div>
            <h2 className="text-2xl font-semibold mb-3">
              IT Support Services
            </h2>
            <p className="text-slate-300">
              Our IT Support team ensures reliable digital infrastructure
              across departments. The system allows staff to report issues,
              track ticket progress, and receive fast technical support for
              networks, computers, software systems, and industrial IT
              services.
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded-lg border border-amber-500 text-amber-500 hover:bg-amber-500/10 font-medium"
          >
            Register (Department)
          </Link>
        </div>
      </main>

      {/* IT SUPPORT VISUAL SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500 transition">
            <div className="text-3xl mb-3">🛠</div>
            <h3 className="font-semibold mb-2">Issue Tracking</h3>
            <p className="text-sm text-slate-400">
              Submit and track IT support tickets easily from any department.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500 transition">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold mb-2">Network Monitoring</h3>
            <p className="text-sm text-slate-400">
              Ensure stable connectivity for factory systems and operations.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500 transition">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Fast Support</h3>
            <p className="text-sm text-slate-400">
              Our IT team resolves technical issues quickly to keep production
              running smoothly.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-700 mt-10 py-12 bg-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

    {/* HEAD OFFICE CARD */}
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-2 text-amber-500">HEAD OFFICE</h3>
      <p className="text-slate-300 text-sm leading-relaxed">
        2nd Floor, New Bright Tower Building<br/>
        Next to Edna Mall, Bole Medhanialem<br/>
        Addis Ababa, Ethiopia<br/>
        Tel: +251 11 6635187/8<br/>
        Fax: +251 11 663 5189<br/>
        E-mail: <a href="mailto:info@habeshasteel.com" className="text-amber-400 hover:underline">info@habeshasteel.com</a>
      </p>
    </div>

    {/* FACTORY CARD */}
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-2 text-amber-500">FACTORY</h3>
      <p className="text-slate-300 text-sm leading-relaxed">
        Dukem, Ethiopia<br/>
        Tel: +251 11 4320 626<br/>
        Fax: +251 11 4320 625<br/>
        E-mail: <a href="mailto:salesmanager@habeshasteel.com" className="text-amber-400 hover:underline">salesmanager@habeshasteel.com</a>
      </p>
    </div>

  </div>

  <div className="mt-8 text-center text-slate-500 text-sm">
    &copy; {new Date().getFullYear()} Habesha Steel IT Support Management System
  </div>
</footer>
    </div>
  );
}
