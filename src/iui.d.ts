import Vue, { PluginFunction, VueConstructor } from 'vue';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const iui: { install: InstallFunction };
export default iui;

export const Button: VueConstructor<Vue>;
