<!--suppress ALL -->
<template>
    <v-date-picker :formats="formats" :value="selected"
                   @input="onInput" class="control" v-bind="$attrs">
        <template slot-scope='{ inputValue, updateValue }'>
            <common-input :disabled="disabledDatePicker"
                          :placeholder="placeholder" :shape="shape"
                          :size="size" :type="type" :value="inputValue"
                          @change.native='updateValue($event.target.value)'>
            </common-input>
        </template>
    </v-date-picker>
</template>
<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import FormPropMixins from '../mixin/FormProp';
    import Constant from "@/config/Constant";

    @Component
    export default class InputDatepicker extends FormPropMixins {

        @Prop({default: null})
        public value;

        @Prop({default: '', type: String})
        public placeholder!: string;

        @Prop({default: false, type: Boolean})
        public disabledDatePicker!: boolean;

        public selected = this.value;

        public formats = {input: Constant.DATEPICKER_FORMAT_DATE};

        @Watch('value')
        public onValueChange(value) {
            this.selected = value;
        }

        @Watch('selected')
        public onSelectedChange(value, oldValue) {
            this.$emit('input', value || oldValue);
            this.$emit('change-date');
        }

        public onInput(param) {
            if (param) {
                this.selected = param;
            }
        }
    }
</script>
