export interface IsProperties {
    [isProp: string]: string;
}

export interface TransitionOptions {
    delay: number;
    duration: number;
    easing: void;
    opacity: number;
    amount: number;
    x: number;
    y: number;
    start: number;
    speed: number;
}

export interface ComponentConfig {
    isProperties?: IsProperties;
    transition?: string|null;
    transitionOptions?: Partial<TransitionOptions>;
    class?: string;
}

export type ButtonConfig = ComponentConfig

export interface DropdownConfig extends ComponentConfig {
    openClass: string;
    closeClass: string;

    triggerClass: string;
    openTriggerClass: string;
    closeTriggerClass: string;

    dropdownClass: string;
    openDropdownClass: string;
    closeDropdownClass: string;
}

export interface ModalConfig extends ComponentConfig {
    moveToBody: boolean;
    blockBodyScroll: boolean;

    openClass: string;
    closeClass: string;

    overlayClass: string;
    openOverlayClass: string;
    closeOverlayClass: string;

    bodyClass: string;
    openBodyClass: string;
    closeBodyClass: string;
}

export interface ConfigComponents {
    button: Partial<ButtonConfig>;
    dropdown: Partial<DropdownConfig>;
    modal: Partial<ModalConfig>;
    [key: string]: any;
}

export interface Config {
    stylesheets: [string] | [];
    globalClass: string;
    customTransitions: {
        [name: string]: void;
    } | null;
    components: ConfigComponents;
}
