import { mount, flushPromises } from '@vue/test-utils'; 
import { describe, it, expect, vi } from 'vitest'; 
import Jokes from '../../components/Jokes.vue';

vi.mock('../../services/jokeService', () => ({
  default: {
    getRandomJoke: vi.fn(() => Promise.resolve({
      id: 1,
      setup: 'Why did the programmer go broke?',
      punchline: 'Because he used up all his cache.',
    })), 
    getRandomJokes: vi.fn(),
    getJokeTypes: vi.fn(),
  },
}));

describe('Jokes.vue', () => {
  it('fetches a random joke when button is clicked', async () => {
    const wrapper = mount(Jokes);

    const button = wrapper.find('button');
    await button.trigger('click');
    
    await flushPromises();

    expect(wrapper.vm.joke).not.toBeNull();
    expect(wrapper.vm.joke).toEqual({
      id: 1,
      setup: 'Why did the programmer go broke?',
      punchline: 'Because he used up all his cache.',
    });

    expect(wrapper.text()).toContain('Why did the programmer go broke?');
    expect(wrapper.text()).toContain('Because he used up all his cache.');
  });
});