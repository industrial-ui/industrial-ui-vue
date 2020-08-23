import {PartialConfig} from '@/lib/types';

const config: PartialConfig = {
  components: {
    button: {
      class: 'font-bold py-2 px-4 rounded outline-none',
      isProperties: {
        danger: 'bg-red-700 hover:bg-red-900 text-white',
        primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      },
    },

    dropdown: {
      transition: null,
      isProperties: {
        multiselect: 'rounded border-solid border border-gray-300 py-2 px-4',
        search: 'rounded border-solid border border-gray-300',
      },
      class: 'inline-block relative',
      dropdownClass: 'absolute rounded bg-white shadow-xl z-10',
    },

    modal: {
      transition: 'fade',
      class: 'w-10/12 lg:w-6/12 relative bg-white shadow-lg rounded-md p-8',
      overlayClass: 'fixed inset-0 h-screen w-full flex flex-col items-center justify-center bg-black bg-opacity-75 z-10',
      openBodyClass: 'overflow-hidden',
    },

    checkbox: {
      class: 'cbx flex items-center mr-4 mb-4 cursor-pointer',
      inputClass: 'hidden',
      spanClass: 'flex items-center',
      checkedClass: 'checked',
      disabledClass: 'cursor-not-allowed',
    },

    radio: {
      class: 'radio flex items-center mr-4 mb-4 cursor-pointer',
      inputClass: 'hidden',
      spanClass: 'flex items-center',
    },

    tabs: {
      navClass: 'flex border-b',
      tabClass: 'mr-1 inline-block border-l border-t border-r rounded-t py-2 px-4 cursor-pointer',
      activeTabClass: 'bg-blue-200',
      inactiveTabClass: 'bg-white',
      disabledTabClass: 'cursor-not-allowed',
    },
  },
};

export default config;
