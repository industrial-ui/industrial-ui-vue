# Industrial-ui Vue adaptation

## Installation

```bash
npm i industrial-ui-vue
```

## Usage

Firstly, install the IUI plugin with your [configuration](https://industrial-ui.com/docs/configuration). 
For this, go to the main vue file and do:
```js
import Vue from 'vue';
import config from './config';
import { iui } from 'industrial-ui-vue';

Vue.use(iui, config);
```

Now, you are ready to use components inside the app:
 
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
import { Dropdown, Button } from 'industrial-ui-vue';
export default {
  components: { Dropdown, Button },
};
</script>
```
