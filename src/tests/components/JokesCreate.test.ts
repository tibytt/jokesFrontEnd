import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateJoke from '../../components/CreateJoke.vue';
import jokeService from '../../services/jokeService';  


vi.mock('../../services/jokeService', () => ({
  default: {
    getJokeTypes: vi.fn(() => Promise.resolve(['General', 'Knock-Knock', 'Programming', 'Dad'])),
    addJoke: vi.fn().mockResolvedValue({
      id: 1,
      type: 'Pun',
      setup: 'Why don’t skeletons fight each other?',
      punchline: 'They don’t have the guts.',
    }),
  },
}));

describe('CreateJoke.vue', () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('submits a new joke successfully', async () => {
    const wrapper = mount(CreateJoke);

    await wrapper.find('select').setValue('Pun'); 
    await wrapper.find('#setup').setValue('Why don’t skeletons fight each other?'); 
    await wrapper.find('#punchline').setValue('They don’t have the guts.'); 

    await wrapper.find('form').trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.vm.success).toBe(true);
    expect(wrapper.vm.formSubmitted).toBe(true);

    expect(wrapper.vm.newJoke.type).toBe('');
    expect(wrapper.vm.newJoke.setup).toBe('');
    expect(wrapper.vm.newJoke.punchline).toBe('');
  });


});