import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/views/Login.vue";

describe("Login.vue", () => {
  it("renders login button when user is not authenticated", () => {
    jest.spyOn("AuthService", "getUser").;
    const wrapper = shallowMount(HelloWorld);

    expect(wrapper.find("button").text()).toMatch("Login");
  });
});
