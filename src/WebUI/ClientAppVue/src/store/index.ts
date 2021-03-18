// import { InjectionKey } from "vue";
// import {
//   createStore,
//   Store as VuexStore,
//   useStore as baseUseStore
// } from "vuex";
// import authModule, {
//   State as UserState,
//   Store as UserStore
// } from "./modules/authmodule";

// // https://gist.github.com/lucaska3/ad3e2a2a62533aa590784a0eff2bef17

// export interface RootState {
//   users: UserState;
//   /* other: OtherState; */
// }

// export type RootStore = UserStore<Pick<RootState, "users">>;
// // & OtherStore<Pick<RootState, "other">> &

// // define injection key
// export const key: InjectionKey<VuexStore<RootState>> = Symbol();

// export const store = createStore<RootState>({
//   modules: {
//     authModule
//     // other
//   }
// });

// export default function useStore(): RootStore {
//   return baseUseStore(key);
// }

import { createStore, createLogger } from "vuex";

import {
  AuthModule,
  Store as AuthStore,
  State as AuthState
} from "@/store/modules/auth";

// import {
//   DomainModule,
//   Store as DomainStore,
//   State as DomainState
// } from "@/modules/domain/store";

export type State = {
  auth: AuthState;
  // domain: DomainState;
};

export type Store = AuthStore<Pick<State, "auth">>;
// &
//   DomainStore<Pick<State, "domain">>;

export const store = createStore({
  plugins: process.env.NODE_ENV === "production" ? [] : [createLogger()],
  modules: { AuthModule }
});

export default function useStore(): Store {
  return store as Store;
}
