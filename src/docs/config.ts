import {PartialConfig} from '@/lib/types/config';

const config: PartialConfig = {
  globalClass: '',

  transitions: {
    flyFade: {
      name: 'flyFade',
      effectReference: 'fly',
      animation: {
        x: 5,
        y: 5,
        duration: 200,
      },
    },
    flyRight: {
      name: 'flyRight',
      effectReference: 'fly',
      animation: {
        type: 'only-in',
        easing: 'easeIn',
        x: 200,
        y: 0,
        duration: 300,
      },
    },
  },

  components: {
    button: {
      class: 'font-bold py-2 px-4 rounded outline-none',
      isProperties: {
        danger: 'bg-red-700 hover:bg-red-900 text-white',
        primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      },
    },

    dropdown: {
      transition: 'flyFade',
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

    toggle: {
      class: 'toggle flex w-full py-2 items-center cursor-pointer',
      checkedClass: 'checked',
      disabledClass: 'cursor-not-allowed',
      inputClass: 'hidden',
      baseClass: 'toggle-base',
      leftLabelClass: 'mr-2',
      rightLabelClass: 'ml-2',
    },

    dropzone: {
      class: 'w-full flex relative align-center justify-center p-8 rounded border-dashed border-2 border-gray-600 cursor-pointer hover:bg-teal-100',
      disabledClass: 'cursor-not-allowed',
    },

    notification: {
      class: 'iui-notifications fixed right-0 top-0 mt-6 mr-8 w-64 h-auto',
      notificationClass: 'w-full mt-2 py-4 px-8 rounded shadow-md',
      isProperties: {
        success: 'bg-green-700 text-white',
        danger: 'bg-red-700 text-white',
      },

      transition: 'flyRight',
    },
  },
};

export default config;
