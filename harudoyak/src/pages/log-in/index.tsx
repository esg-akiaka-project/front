import React from "react";
import useLoginStore from "../../store/useLoginStore";

const LoginHome: React.FC = () => {
  const isLogin = useLoginStore((state) => state.isLogin);
  const logIn = useLoginStore((state) => state.logIn);
  const logOut = useLoginStore((state) => state.logOut);
  const cnt = useLoginStore((state) => state.cnt);
  function test(num: number) {
    if (isLogin) {
      logOut();
      console.log("Logged out");
    } else {
      logIn(num);
      console.log("Logged in");
    }
  }
  return (
    <div>
      <p>{cnt}</p>
      LoginHome
      <div>Login Status: {isLogin ? "Logged In" : "Logged Out"}</div>
      <button onClick={() => test(2)}>{isLogin ? "Logout" : "Login"}</button>
    </div>
  );
};

export default LoginHome;
