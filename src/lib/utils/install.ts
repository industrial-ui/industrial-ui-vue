import prepareConfig from '@/lib/utils/prepare-config';
import {VueConstructor} from 'vue';

import Button from '@/lib/components/Button';
import Checkbox from '@/lib/components/Checkbox';
import CheckboxGroup from '@/lib/components/CheckboxGroup';
import Radio from '@/lib/components/Radio';
import RadioGroup from '@/lib/components/RadioGroup';
import Dropdown from '@/lib/components/Dropdown';
import DropdownSelect from '@/lib/components/DropdownSelect';
import Modal from '@/lib/components/Modal';
import Tabs from '@/lib/components/Tabs';
import TabPanel from '@/lib/components/Tabs/panel';
import Toggle from '@/lib/components/Toggle';
import Transition from '@/lib/components/Transition';
import TransitionGroup from '@/lib/components/TransitionGroup';
import Dropzone from '@/lib/components/Dropzone';

import {Config} from '@/lib/types/config';
import defaultConfig from '@/lib/config';

const components = {
  Button,
  Dropdown,
  DropdownSelect,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Modal,
  Tabs,
  TabPanel,
  Toggle,
  Transition,
  TransitionGroup,
  Dropzone,
};

/**
 * IUI plugin to apply configuration on all components
 */
const install = (Vue: VueConstructor, options: Partial<Config>) => {
  Object.values(components).forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$iui = prepareConfig(defaultConfig, options);
};

export default install;
