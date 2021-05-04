import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/views/Home.vue";

describe("Home.vue", () => {
  it("renders home page when loaded", () => {
    const wrapper = shallowMount(HelloWorld);

    expect(wrapper.find("h1").html()).toMatch("Hello, world!");
  });
});
