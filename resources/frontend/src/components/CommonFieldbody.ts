/**
 * Created by cahyo wibowo on 12/17/18
 */

import {Component, Prop} from "vue-property-decorator";
import CommonField from './CommonField.vue'
import FormPropMixins from '../mixin/FormProp';

@Component
export default class CommonFieldbody extends FormPropMixins {

	@Prop({default: '', type: String})
	public message!: string;

	@Prop({default: false, type: Boolean})
	public isNarrow!: boolean;

	public render(createElement: Function) {
		const {message, type, isNarrow, size, position, shape} = this;
		const $slotDefault =  (this.$slots && this.$slots.default) || [];

		return createElement('div', {class: 'field-body'}, $slotDefault.map((item) => {
			if (!item.tag) {
				return item
			}

			const attr = {props: {}};
			if (isNarrow) attr['class'] = 'is-narrow';

			// jika direct child > 1 dan merupakan komponen dgn tag dibawah,
			// apply props dibawah, dari dirinya ke komponen CommonField yg akan dibuat
			// dengan syarat $slots.default.length === 1
			if (typeof item.componentOptions === 'object') {
				const {tag, propsData} = item.componentOptions;

				if ((tag === 'g-input' || tag === 'g-select') && $slotDefault.length > 1) {
					attr.props['label'] = propsData['label'];
					attr.props['message'] = propsData['message'];
					attr.props['type'] = propsData['type'];
					attr.props['size'] = propsData['size'];
				} else {
					attr.props = {message, type, isNarrow, size, position, shape};
				}
			}

			return createElement(CommonField, attr, [item]);
		}));
	}
}
