<!--suppress ALL -->
<template>
    <div :class="controlClassName" class="control g-input-wrp">
        <input :class="className" :maxlength="maxlength" :type="newInputType"
               :value="newValue" @blur="onBlur"
               @focus="onFocus" @input="onInput" ref="input" v-bind="$attrs" v-if="inputType !== 'textarea'">
        <textarea :class="className" :maxlength="maxlength" :value="newValue" @blur="onBlur" @focus="onFocus"
                  @input="onInput" ref="textarea" v-bind="$attrs" v-else></textarea>
        <span :class="`icon is-left ${size ? ('is-'+size) : ''}`" v-if="$slots.iconLeft">
            <slot name="iconLeft"></slot>
        </span>
        <span :class="`icon is-right ${size ? ('is-'+size) : ''}`"
              v-if="$slots.iconRight || $scopedSlots['iconRight']">
            <slot :revealPassword="revealPassword" :toggleRevealPassword="toggleRevealPassword"
                  name="iconRight"></slot>
        </span>
        <span v-if="maxlength && isFocused && (inputType === 'textarea' || inputType === 'text') ">
            <p class="help count-help">{{countValue}}/{{maxlength}}</p>
        </span>
        <span class="checkbox-show-pwd" v-if="inputType === 'password' && !hideReveal">
            <input type="checkbox" v-model="revealPassword"> <span class="help">Show password</span>
        </span>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component,  Prop, Watch} from 'vue-property-decorator';
    import FormPropMixins from '../mixin/FormProp';

    @Component
    export default class GInput extends FormPropMixins {

        @Prop()
        public value;

        @Prop({default: 'text'})
        public inputType!: string;

        @Prop({default: '', type: String})
        public label!: string;

        @Prop({default: '', type: String})
        public message!: string;

        @Prop({default: false, type: Boolean})
        public hideReveal!: boolean;

        @Prop({default: false, type: Boolean})
        public isStatic!: boolean;

        public newValue = this.value;

        public revealPassword = false;

        public countValue = 0;

        public get newInputType() {
            const isPassword = this.inputType === 'password' && this.revealPassword;

            return isPassword ? 'text' : this.inputType;
        }

        public get alterClassName() {
            const $parent = this.$parent;

            if ($parent['isFieldComponent']) {
                const {type, size} = $parent.$props;
                return [type, size].reduce((accu, item) => accu + (item ? ` is-${item}` : ''), '');
            }

            return '';
        }

        public get className() {
            const {type, size, shape, isFocused, isStatic, alterClassName, inputType} = this;
            const finalClassName = [type, size, shape].reduce((accu, item) => accu + (item ? `is-${item} ` : ''), '');

            return [
                'g-input', (inputType !== 'textarea' ? 'input' : 'textarea'),
                finalClassName, {'is-focused': isFocused, 'is-static': isStatic},
                alterClassName
            ]
        }

        public get controlClassName() {
            const {isLoading, size, isExpanded, $scopedSlots, $slots, inputType} = this;
            const {iconLeft, iconRight} = $slots;
            const {iconRight: hasIconRight} = $scopedSlots;
            // if checkbox show password showed. set control class to overflow auto
            const overflowAuto = inputType === 'password';

            return [{
                'ov-auto': overflowAuto,
                'is-loading': isLoading,
                'has-icons-left': iconLeft,
                'is-expanded': isExpanded,
                'has-icons-right': iconRight || hasIconRight
            }, (size ? ('is-' + size) : '')];
        }

        @Watch('value')
        public onValueChange(value) {
            this.newValue = value;
        }

        @Watch('newValue')
        public onNewValueChange(value) {
            this.$emit('input', value);
        }

        public onInput(event) {
            this.newValue = event.target.value;
            this.countValue = event.target.value.length;
            this.$emit('input', event.target.value);
        }

        public toggleRevealPassword() {
            this.revealPassword = !this.revealPassword;
        }
    }
</script>

<style lang="scss">
    .checkbox-show-pwd {
        display: inline-flex;
        align-items: center;
        float: right;
        margin-top: .25rem;

        input[type="checkbox"] {
            margin-right: .3rem;
        }

        .help {
            display: inherit;
            margin-top: 0;
        }
    }

    .ov-auto {
        overflow: auto;
    }
</style>
