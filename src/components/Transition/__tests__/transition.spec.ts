import { mount, createLocalVue } from '@vue/test-utils';
import config from '@/demo-config';
import {iui} from '@/main';
import Transition from '../index.vue';

const localVue = createLocalVue();
localVue.use(iui, config);

describe('Transition', () => {
  it('creates properly', () => {
    const wrapper = mount(Transition, {
      localVue,
    });
    expect(wrapper).toBeTruthy();
  });
});
