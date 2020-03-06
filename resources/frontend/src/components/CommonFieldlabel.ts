/**
 * Created by cahyo wibowo on 12/17/18
 */

import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class CommonFieldlabel extends Vue {

	@Prop({default: '', type: String})
	public size!: string;

	@Prop({default: false, type: Boolean})
	public isHorizontal!: boolean;

	public render(createElement: Function) {
		const {size, isHorizontal} = this;
		let className = (size ? ('is-' + size) : '');
		const mainLabel = createElement('label', {class: 'label'}, this.$slots.default);

		if (isHorizontal) {
			className += ' field-label';
		} else {
			className += ' label';
		}

		if (isHorizontal) {
			return createElement('div', {class: className}, [mainLabel])
		}

		return createElement('label', {class: className}, this.$slots.default);
	}
}
