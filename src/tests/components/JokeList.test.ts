import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JokeList from '../../components/JokeList.vue';
import jokeService from '../../services/jokeService';

vi.mock('../../services/jokeService', () => ({
  default: {
    getJokeTypes: vi.fn(() => Promise.resolve(['General', 'Knock-Knock', 'Programming', 'Dad'])),
    getAllJokes: vi.fn(() => Promise.resolve([
      { id: 1, type: 'General', setup: 'Why don’t skeletons fight each other?', punchline: 'They don’t have the guts.' },
      { id: 2, type: 'Programming', setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs.' },
    ])),
    deleteJoke: vi.fn(() => Promise.resolve()),
  },
}));

describe('JokesList.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(JokeList);
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });


  it('displays a list of jokes after fetching', async () => {
    await wrapper.vm.fetchJokes();
    await flushPromises();

    const jokeRows = wrapper.findAll('tr');
    expect(jokeRows.length).toBeGreaterThan(0);

  });

  it('hides the loading spinner after jokes are fetched', async () => {
    await wrapper.vm.fetchJokes();
    await flushPromises();
    expect(wrapper.find('.loading-spinner').exists()).toBe(false);
  });
});