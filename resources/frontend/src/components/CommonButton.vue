<!--suppress ALL -->
<script lang="ts">
  import {Component, Prop} from "vue-property-decorator";
  import FormPropMixins from '../mixin/FormProp';

  @Component
  export default class CommonButton extends FormPropMixins {

    @Prop({default: '', type: String})
    public tooltipText!: string;

    @Prop({default: false, type: Boolean})
    public isLoading!: boolean;

    @Prop({default: false, type: Boolean})
    public isOutlined!: boolean;

    @Prop({default: false, type: Boolean})
    public isTooltipActive!: boolean;

    @Prop({default: false, type: Boolean})
    public focused!: boolean;

    @Prop({default: '', type: String})
    public value!: string;

    public get tooltipClassNameFinal() {
      const {tooltipText, value, position, isTooltipActive, focused} = this;
      const positionClassName = position ? ('is-tooltip-' + position) : '';
      const tooltipClassNames = [
        'tooltip', positionClassName, {'is-focused': focused},
        {'is-tooltip-multiline': tooltipText.length > 60},
        {'is-tooltip-active': isTooltipActive}
      ];

      return tooltipText && !value.length ? tooltipClassNames : '';
    }

    public get className() {
      const {type, size, isLoading, shape, tooltipClassNameFinal, isOutlined} = this;
      const typeClassName = type ? ('is-' + type) : '';
      const sizeClassName = size ? ('is-' + size) : '';
      const shapeClassName = shape ? ('is-' + shape) : '';

      return [
        'button g-button', typeClassName, sizeClassName, shapeClassName,
        tooltipClassNameFinal, isLoading ? 'is-loading' : '', isOutlined ? 'is-outlined' : ''
      ];
    }

    public render(createElement: Function) {
      const {className, value, tooltipClassNameFinal, tooltipText} = this;
      const el = value ? 'div' : 'a';
      const classNames = value ? `submit-input-wrp ${tooltipClassNameFinal}` : className;
      const attr = {
        class: classNames,
        attrs: {'data-tooltip': tooltipText},
        on: {click: ($event) => this.$emit('click', $event)}
      };

      const childs = value ? [
        createElement('input', {class: className, attrs: {value, type: 'submit'}})
      ] : this.$slots.default;

      return createElement(el, attr, childs);
    }
  }
</script>
