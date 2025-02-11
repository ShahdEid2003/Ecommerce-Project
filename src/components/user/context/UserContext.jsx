import { createContext, useEffect,useState } from "react";
import axios from "axios";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading,setIsLoading]=useState(true)

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
    finally{
        setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user ,loading , setUser}}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
