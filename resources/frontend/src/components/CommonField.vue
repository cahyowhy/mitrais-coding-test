<!--suppress ALL -->
<template>
    <div :class="className" :data-tooltip="messageAsTooltip ? message : ''"
         class="field">
        <common-fieldlabel :isHorizontal="isHorizontal" :size="size" v-if="label">{{label}}</common-fieldlabel>
        <common-fieldbody :isNarrow="isNarrow" :message="message" :messageAsTooltip="messageAsTooltip"
                          :position="position" :size="size" :type="type" v-if="isHorizontal">
            <slot></slot>
        </common-fieldbody>
        <slot v-else></slot>
        <p :class="type ? ('is-'+type) : ''" class="help"
           v-if="message && !isHorizontal && !messageAsTooltip">{{message}}</p>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import FormPropMixins from '../mixin/FormProp';
    import CommonFieldlabel from './CommonFieldlabel';
    import CommonFieldbody from './CommonFieldbody';
    import {mixins} from "vue-class-component";

    @Component({components: {CommonFieldlabel, CommonFieldbody}})
    export default class CommonField extends mixins(FormPropMixins) {

        @Prop({default: '', type: String})
        public label!: string;

        @Prop({default: '', type: String})
        public message!: string;

        @Prop({default: false, type: Boolean})
        public hasAddons!: boolean;

        @Prop({default: false, type: Boolean})
        public isHorizontal!: boolean;

        @Prop({default: false, type: Boolean})
        public messageAsTooltip!: boolean;

        @Prop({default: false, type: Boolean})
        public isGrouped!: boolean;

        @Prop({default: false, type: Boolean})
        public isNarrow!: boolean;

        @Prop({default: false, type: Boolean})
        public isGroupedMultiline!: boolean;

        public isFieldComponent = true;

        public get className() {
            const {isGrouped, isGroupedMultiline, position, hasAddons, isHorizontal, message, messageAsTooltip} = this;
            const applyPosition = position && (hasAddons || isGrouped);

            const positionClassName = applyPosition ?
                (hasAddons ? ('has-addons-' + position) : isGrouped ? ('is-grouped-' + position) : '') : '';
            const validMessageAsTooltip = messageAsTooltip && Boolean(message);

            const className = {
                'is-grouped': isGrouped, 'is-horizontal': isHorizontal,
                'has-addons': hasAddons, 'is-grouped-multiline': isGrouped && isGroupedMultiline,
                'tooltip': validMessageAsTooltip, 'is-tooltip-active': validMessageAsTooltip,
            };

            if (validMessageAsTooltip && this.type) {
                className['is-tooltip-' + this.type] = true;
            }

            if (validMessageAsTooltip && this.label) {
                className['move-tooltip'] = true;
            }

            className[positionClassName] = applyPosition;

            return className;
        }
    }
</script>
