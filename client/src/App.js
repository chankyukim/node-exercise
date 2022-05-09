import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Lounge from './components/Lounge';
import Admin from './components/Admin';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import Editor from './components/Editor';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import Register from './components/Register';
// import Login from './components/Login';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from './components/Layout';
// import Lounge from './components/Lounge';
// import Admin from './components/Admin';
// import Missing from './components/Missing';
// import RequireAuth from './components/RequireAuth';
// import Home from './components/Home';
// import Editor from './components/Editor';
// import Unauthorized from './components/Unauthorized';
// import LinkPage from './components/LinkPage';

// const ROLES = {
//   User: 2001,
//   Editor: 1984,
//   Admin: 5150,
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           {/* public routes */}
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="linkpage" element={<LinkPage />} />
//           <Route path="unauthorized" element={<Unauthorized />} />

//           {/* we want to protect these routes */}
//           <Route element={<RequireAuth />}>
//             <Route path="/" element={<Home />} />
//             <Route path="editor" element={<Editor />} />
//             <Route path="admin" element={<Admin />} />
//             <Route path="lounge" element={<Lounge />} />
//           </Route>

//           {/* catch all */}
//           <Route path="*" element={<Missing />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
