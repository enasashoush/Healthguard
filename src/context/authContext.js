// import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('tkn');
    if (storedToken !== null) {
      setToken(storedToken);

      // // Extract user information from the token
      // const decodedToken = decodeToken(storedToken);
      // setUserInfo(decodedToken);
    }
  }, []);


    // const decodeToken = (token) => {
    //   // Decode the token using your preferred method (e.g., jwt.decode)
    //   const decoded = jwtDecode.decode(token);
    
    //   // Extract the necessary user information
    //   const { displayName, email, phoneNumber, password, rePassword, areas } = decoded;
    
    //   // Return the user information object
    //   const userInfo = {
    //     displayName,
    //     email,
    //     phoneNumber,
    //     password,
    //     rePassword,
    //     areas,
    //   };
    // this extra just delete it 
    //   // const userInfo = {
        //   //   name: decoded.name,
        //   //   email: decoded.email,
        //   //   // Add other relevant user information
        //   // };
    //   return userInfo;
    // };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
