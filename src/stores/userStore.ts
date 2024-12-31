import {create} from "zustand";
import {User} from "@/types/user";
import {devtools} from "zustand/middleware";

interface UserStore extends Omit<User, "createdAt" | "__v"> {
  setUser: (user: Omit<User, "createdAt" | "__v">) => void;
}

export const useUserStore = create<UserStore>()(devtools((set) => ({
  _id: "",
  name: "",
  email: "",
  role: "",
  setUser: (user) => set({ ...user }),
}),{name:"user"}));
