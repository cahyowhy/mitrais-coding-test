import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class FormPropMixins extends Vue {

    @Prop({type: String, default: ''})
    public size!: string;

    @Prop({type: String, default: ''})
    public type!: string;

    @Prop({type: String, default: ''})
    public position!: string;

    @Prop({type: String, default: ''})
    public shape!: string;

    @Prop({default: false, type: Boolean})
    public isExpanded!: boolean;

    @Prop()
    public maxlength!: number;

    @Prop({default: false, type: Boolean})
    public isLoading!: boolean;

    public autocomplete!: string;

    public isFocused = false;

    public onBlur($event) {
        this.isFocused = false;
        this.$emit('blur', $event);
    }

    public onFocus($event) {
        this.isFocused = true;
        this.$emit('focus', $event);
    }
}
