// import { ActionContext, ActionTree } from "vuex";
// import { Mutations, MutationTypes } from "./mutations";
// import { State } from "./index";
// import { RootState } from "@/store";
// import { User } from "oidc-client";

// export enum ActionTypes {
//   setUser = "SET_USER"
// }

// type AugmentedActionContext = {
//   commit<K extends keyof Mutations>(
//     key: K,
//     payload: Parameters<Mutations[K]>[1]
//   ): ReturnType<Mutations[K]>;
// } & Omit<ActionContext<State, RootState>, "commit">;

// export interface Actions {
//   [ActionTypes.setUser](
//     { commit }: AugmentedActionContext,
//     payload: User
//   ): void;
// }

// export const actions: ActionTree<State, RootState> & Actions = {
//   [ActionTypes.setUser]({ commit }, payload: User) {
//     commit(MutationTypes.SETUSER, payload);
//   }
// };
