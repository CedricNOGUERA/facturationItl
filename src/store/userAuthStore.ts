

import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const userAuthStore = create(
  persist(
    (set) => ({
      // initial state
      isLogged: false,
      id: null,
      firstname: null,
      lastname: null,
      avatar: null,
      company_id: null,


      // methods for manipulating state
      authLogin: (
        isLogged: boolean,
        id: string,
        firstname: string,
        lastname: string,
        avatar: string,
        company_id: string,
        
      ) =>
        set((state: any) => ({
          isLogged: isLogged,
          id: id,
          firstname: firstname,
          lastname: lastname,
        avatar: avatar,
          company_id: company_id,

        })),
      authLogout: () =>
        set((state: any) => ({
          isLogged: false,
          id: null,
          firstname: null,
          lastname: null,
          avatar: null,
          company_id: null,
        })),
    }),
    {
      name: "userLog", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage sessionStorage' is used
    }
  )
);

export default userAuthStore;