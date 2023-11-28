import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserForm from "./components/user-form/userForm";
import UserTable from "./components/user-table/userTable";
import Layout from "./layout/layout";

function App() {
  const routeArray = [
    {
      path: "/",
      Comp: UserForm,
    },
    {
      path: "/userTable",
      Comp: UserTable,
    },
  ];
  return (
    <div>
      <Layout>
        <Routes>
          {routeArray.map((route, index) => {
            const { path, Comp } = route;
            return <Route key={index} path={path} element={<Comp />} />;
          })}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
