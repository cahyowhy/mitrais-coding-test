<!--suppress ALL -->
<template>
    <label class="radio g-radio" :class="className">
        <input :value="nativeValue" :name="name" :tabindex="disabled ? false : 0"
               type="radio" :disabled="disabled" v-model="computedValue">
        <span class="checked"></span>
        <span v-if="$scopedSlots.default || $slots.default" class="control"><slot/></span>
    </label>
</template>

<script lang="ts">
	import {Component, Vue, Prop, Watch} from 'vue-property-decorator';

	@Component
	export default class GRadiobutton extends Vue {

		@Prop()
		public disabled!: boolean;

		@Prop()
		public name!: string;

		@Prop({default: '', type: String})
		public type!: string;

		@Prop()
		public value;

		@Prop()
		public nativeValue;

		@Watch('value')
		public onValueChange(value) {
			this.newValue = value;
		}

		public newValue = this.value;

		public get alterClassName() {
            const $parent = this.$parent;

			if ($parent.$props.isFieldComponent && $parent.$props.type.length) {
				return 'is-' + $parent.$props.type;
			}

			return '';
		}

		public get className() {
			const {type, alterClassName} = this;

			return [type ? ('is-' + type) : '', alterClassName];
		}

		public get computedValue() {
			return this.newValue;
		}

		public set computedValue(value) {
			this.newValue = value;
			this.$emit('input', value);
			this.$emit('on-selected');
		}
	}
</script>
