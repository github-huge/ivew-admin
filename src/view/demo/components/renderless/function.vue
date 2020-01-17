<template functional>
  <div style="margin-bottom: 20px;">
    {{ props.data }}
    <Input
      size="small" style="width: 200px; margin-right: 10px;"
      :placeholder="props.data.placeholder"
      :value="props.data.placeholder"
      :clearable="true"
      v-bind="$attrs" v-on="$listeners"/>
    <slot></slot>
  </div>
</template>
