import UserInfo from "@/types/UserInfo";
import instance from ".";
import { storeToken } from "./storage";

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  storeToken(data.token);
  return data;
};

const register = async (userInfo: UserInfo, image: string) => {
  const formData = new FormData();
  Object.entries(userInfo).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("image", {
    name: "image.jpg",
    type: "image/jpeg",
    uri: image,
  } as any);

  const { data } = await instance.post("/auth/register", formData);
  storeToken(data.token);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };
