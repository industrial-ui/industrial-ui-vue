# Industrial-ui Vue adaptation

## Usage

### 1. UNPKG

You can install Industrial-ui straight into plain HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Import your styles -->
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
<div id="app">
  <iui-button>Hello, world!</iui-button>
</div>
</body>
<!-- Import Vue -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<!-- 
  Create Industrial-ui configuration.
  It is important to have exactly IuiConfig variable name!
-->
<script>
  const IuiConfig = {
    globalClass: '',
    components: { ... },
    },
  };
</script>

<!-- Import industrial-ui-vue and register as a Vue plugin -->
<script src="https://unpkg.com/industrial-ui-vue"></script>

<!-- Initialize Vue app -->
<script>
  new Vue({
    el: '#app',
  })
</script>
</html>
```

### NPM

Firstly, install the library itself
```bash
npm i industrial-ui-vue
```

**3. With local imports (recommended)**

You need to register the Industrial-ui plugin that would expose the
$iui instance into Vue virtual machine. Create config file and install
the plugin into the Vue entry:

```js
import Vue from 'vue';
import config from './config';
import {iui} from 'industrial-ui-vue';

Vue.use(iui, config);
```

In any template file, you can now directly import needed components 
and use them as you like:

```html
<template>
  <Dropdown>
    <template #trigger>
      <Button>Click on me</Button>
    </template>
    Hello, world!
  </Dropdown>
</template>

<script>
  import { IuiDropdown as Dropdown, IuiButton as Button } from 'industrial-ui-vue';
  export default {
    components: { Dropdown, Button },
  };
</script>
``` 

**3. As a global plugin**

In this case, Industrial-ui would be registered globally, 
and all components will be imported at once.

Install the IUI plugin with your [configuration](https://industrial-ui.com/docs/configuration). 
Go to the main vue file and do:
```js
import Vue from 'vue';
import config from './config';
import iui from 'industrial-ui-vue';

Vue.use(iui, config);
```

Now, you are ready to use components inside the app:
 
```html
<template>
  <iui-dropdown>
    <template #trigger>
      <iui-button>Click on me</iui-button>
    </template>
    Hello, world!
  </iui-dropdown>
</template>
```
