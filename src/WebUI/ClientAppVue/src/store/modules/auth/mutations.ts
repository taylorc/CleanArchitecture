// import { User } from "oidc-client";
// import { MutationTree } from "vuex";
// import { State } from "./index";
// // (B) - Mutações
// // [B.1] inserir a definição da mutação X no enum
// // ==> { X = "SET_ X" }
// export enum MutationTypes {
//   SETUSER = "SET_USER"
// }

// export type Mutations<S = State> = {
//   [MutationTypes.SETUSER](state: S, payload: User): void;
// };

// export const mutations: MutationTree<State> & Mutations = {
//   [MutationTypes.SETUSER](state, payload: User) {
//     state.user = payload;
//   }
// };
