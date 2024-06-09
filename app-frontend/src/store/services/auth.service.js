import authInstance from "../axios/authInstance";

const signIn = async (data) => await authInstance.post("/login", data);

const signUp = async (data) => await authInstance.post("/register", data);

const updatePreference = async (data) =>
  await authInstance.patch("/update-preference", data);

const getProfile = async () => await authInstance.get(`/user`);

const AuthService = {
  signIn,
  signUp,
  updatePreference,
  getProfile,
};
export default AuthService;
