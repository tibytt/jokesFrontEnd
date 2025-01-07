import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JokeDetail from '../../components/JokeDetail.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { Plugin } from 'vue';


vi.mock('../../services/jokeService', () => ({
  getJokeById: vi.fn(() => Promise.resolve({
    id: 1,
    setup: 'Why did the chicken cross the road?',
    punchline: 'To get to the other side.',
  })),
}));

const mockRoute = {
  params: {
    id: '1',
  },
};

describe('JokeDetail.vue', () => {
  let router: Plugin | [Plugin, ...any[]];

  beforeEach(() => {
    vi.resetAllMocks();

    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
  });

  it('displays loading spinner while fetching the joke', async () => {
    const wrapper = mount(JokeDetail, {
      global: {
        mocks: {
          $route: mockRoute,
        },
        plugins: [router],
      },
    });

    expect(wrapper.find('.loading-spinner').exists()).toBe(true);
  });

  it('fetches and displays the joke details', async () => {
    const wrapper = mount(JokeDetail, {
      global: {
        mocks: {
          $route: mockRoute,
        },
        plugins: [router],
      },
    });

    await flushPromises();

    expect(wrapper.find('.loading-spinner').exists()).toBe(false);

    expect(wrapper.find('.joke-number').exists()).toBe(true);
    expect(wrapper.find('.card-back h4').exists()).toBe(true);
  });

  it('displays a back button to navigate to the joke list', async () => {
    const wrapper = mount(JokeDetail, {
      global: {
        mocks: {
          $route: mockRoute,
        },
        plugins: [router],
      },
    });

    await flushPromises();

    const backButton = wrapper.find('.back-btn');
    expect(backButton.exists()).toBe(true);
  });
});