import { shallowMount, createLocalVue } from '@vue/test-utils';
import config from '@/../../../../../docs/config';
import {iui} from '@/components';
import Dropdown from '../index.vue';

const localVue = createLocalVue();
localVue.use(iui, config);

describe('Dropdown', () => {
  it('creates properly', () => {
    const wrapper = shallowMount(Dropdown, {
      localVue,
    });
    expect(wrapper).toBeTruthy();
  });
});
