import {
  ButtonConfig,
  DropdownConfig,
  ModalConfig,
  CheckboxConfig,
  CheckboxGroupConfig,
  RadioGroupConfig,
  RadioConfig,
  TabsConfig,
  ToggleConfig,
  DropzoneConfig
} from '@/lib/types/components';
import {NotificationGroupConfig} from '@/lib/types/notification';

import {DeepPartial} from '@/lib/types/special';
import {Transition} from '@/lib/types/transitions';

export interface ConfigComponents {
  button: ButtonConfig,
  dropdown: DropdownConfig,
  modal: ModalConfig,
  checkbox: CheckboxConfig,
  radio: RadioConfig,
  radioGroup: RadioGroupConfig,
  checkboxGroup: CheckboxGroupConfig,
  tabs: TabsConfig,
  toggle: ToggleConfig,
  dropzone: DropzoneConfig,
  notification: NotificationGroupConfig,
  [key: string]: any,
}

export interface Config {
  stylesheets: [string] | [],
  globalClass: string,
  transitions: {
    [name: string]: Transition,
  },
  components: ConfigComponents,
}

export type PartialConfig = DeepPartial<Config>;
