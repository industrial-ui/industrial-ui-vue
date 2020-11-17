export type Option = {
  slug: string,
  [key: string]: any,
};

export interface IsProperties {
  [isProp: string]: string,
}

export interface ComponentConfig {
  class: string,
  isProperties: IsProperties,
  transition?: 'fade'|'blur'|'scale'|'slide'|'fly'|string|null,
}

export type ButtonConfig = ComponentConfig

export interface DropdownConfig extends ComponentConfig {
  openClass: string,
  closeClass: string,
  disabledClass: string,

  triggerClass: string,
  openTriggerClass: string,
  closeTriggerClass: string,

  dropdownClass: string,
  openDropdownClass: string,
  closeDropdownClass: string,
}

export interface ModalConfig extends ComponentConfig {
  moveToBody: boolean,
  blockBodyScroll: boolean,

  openClass: string,
  closeClass: string,

  overlayClass: string,
  openOverlayClass: string,
  closeOverlayClass: string,

  bodyClass: string,
  openBodyClass: string,
  closeBodyClass: string,
}

export interface CheckboxConfig extends ComponentConfig {
  checkedClass: string,
  uncheckedClass: string,
  disabledClass: string,
  requiredClass: string,
  inputClass: string,
  spanClass: string,
}

export interface ToggleConfig extends ComponentConfig {
  checkedClass: string,
  uncheckedClass: string,
  disabledClass: string,

  inputClass: string,
  baseClass: string,
  labelClass: string,
  leftLabelClass: string,
  rightLabelClass: string,
}

export interface RadioConfig extends ComponentConfig {
  checkedClass: string,
  uncheckedClass: string,
  disabledClass: string,
  requiredClass: string,
  inputClass: string,
  spanClass: string,
}

export type RadioGroupConfig = ComponentConfig;
export type CheckboxGroupConfig = ComponentConfig;

export interface TabsConfig extends ComponentConfig {
  navClass: string,
  panelsWrapperClass: string,

  tabClass: string,
  activeTabClass: string,
  inactiveTabClass: string,
  disabledTabClass: string,
  removableTabClass: string,

  panelClass: string,
  activePanelClass: string,
  inactivePanelClass: string,
}

export type FileInputAttrs = {
  id: string,
  name: string,
  accept: string,
  capture: string,
  autofocus: string,
}

export type DropzoneError = {
  type: 'FormatsError'|'MaxAmountError'|'MaxSizeError',
  value: number | string, // value of the exceeded property like file size, or extension, or ration.
  allowed: number | string | string[] | Record<string, unknown>, // value of the passed property that checks the error
  name?: string, // name of the file
};

export interface DropzoneConfig extends ComponentConfig {
  dragOverClass: string,
  hasFilesClass: string,
  hasNoFilesClass: string,
  disabledClass: string,
  requiredClass: string,

  maxAmount: number | null,
  maxSize: number | null,
  maxRatio: number | null,
  minRatio: number | null,
  formats: string[] | null,

  inputAttrs: Partial<FileInputAttrs> | null,
}

export interface ContextMenu extends ComponentConfig {
  openClass: string,
  closeClass: string,
  closeOnResize: boolean,
  closeOnScroll: boolean,
  closeOnClickAway: boolean,

  fixedPosition: {x: number|string, y: number|string},
}
