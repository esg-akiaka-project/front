export default interface User {
  isLogin: boolean;

  userinfo: {
    userId: string | null;
    botId: string | null;
    password: string | null;
  } | null;

  login: (userinfo: {
    userId: string;
    botId: string;
    password: string;
  }) => void;
}
