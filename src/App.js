
import ChangePassword from './Components/changepassword/ChangePassword'; // Import the ChangePassword component
import ResetPassword from './Components/restpassword/ResetPassword';
import Login from './Components/login/Login';
const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          
          {/* <Route path="/AdminCreationForm" element={<AdminCreationForm/>} />
          <Route path="/angePassword" element={<AdminCreationForm/>} /> */}
          {/* Route for the Login page */}
        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the Reset Password page */}
        <Route path="/forgot-password" element={<ResetPassword />} />

        {/* // App.js or wherever your routes are defined */}
<Route path="/change-password" element={<ChangePassword />} />


        </Routes>
       
        
      </div>
    </Router>
  );
};



export default App;





