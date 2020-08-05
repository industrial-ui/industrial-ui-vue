import {PartialConfig} from '@/lib/types';

const config: PartialConfig = {
  components: {
    button: {
      class: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline-none',
    },

    dropdown: {
      transition: 'slide',
      transitionOptions: {delay: 0, duration: 300},
      isProperties: {
        multiselect: 'rounded border-solid border border-gray-300 py-2 px-4',
        search: 'rounded border-solid border border-gray-300',
      },
      class: 'inline-block relative',
      dropdownClass: 'absolute rounded bg-white shadow-xl z-10',
      closeDropdownClass: 'hidden',
      openDropdownClass: 'block',
    },

    modal: {
      moveToBody: false,
      class: 'w-10/12 lg:w-6/12 relative bg-white shadow-lg rounded-md p-8',
      openClass: '',
      closeClass: '',

      overlayClass: 'fixed inset-0 h-screen w-full flex flex-col items-center justify-center bg-black bg-opacity-75 z-10',
      openOverlayClass: '',
      closeOverlayClass: 'hidden',
    },
  },
};

export default config;
