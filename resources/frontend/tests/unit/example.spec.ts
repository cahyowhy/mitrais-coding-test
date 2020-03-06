import {expect} from 'chai'
import Vue from 'vue';
import {mount, shallowMount} from '@vue/test-utils'
import CommonButton from "@/components/CommonButton.vue";
import CommonField from "@/components/CommonField.vue";
import CommonInput from "@/components/CommonInput.vue";

describe('CommonField.vue', () => {
    it('renders props and slots when passed', () => {
        const labelProps = 'Example Label for field';
        const messageProps = 'Example Message for field';

        const commmonButtonWrap = Vue.component('common-button-wrap', {
            render(h) {
                return h(CommonButton, null, "Cek");
            }
        });

        const commonFieldDefault = mount(CommonField, {
            propsData: {label: labelProps, message: messageProps},
            slots: {
                default: commmonButtonWrap
            }
        });

        expect(commonFieldDefault.contains(commmonButtonWrap));
    });
});

describe('CommonInput.vue', () => {
    const commonInput = mount(CommonInput, {
        attrs: {
            placeholder: 'Fill the value',
        },
        propsData: {
            value: ''
        }
    });

    it('should change value', async () => {
        const inputEl = commonInput.find('input');
        inputEl.element.setAttribute('value', 'cek');
        inputEl.trigger('input');

        await commonInput.vm.$nextTick();
        expect(commonInput.vm.$data.newValue).to.equals('cek');
    });
});

describe('CommonButton.vue', () => {
    const tooltipText = 'Cek cahyo';
    const buttonDefault = mount(CommonButton, {
        propsData: {tooltipText},
        slots: {
            default: "Login"
        }
    });

    it('renders props and slots when passed', () => {
        expect(buttonDefault.attributes('data-tooltip')).to.includes(tooltipText);
        expect(buttonDefault.text()).to.includes('Login');
    });

    it('has input tag when has value props', () => {
        const buttonAsInput = shallowMount(CommonButton, {
            propsData: {value: 'Login'}
        });

        expect(buttonAsInput.element.firstChild.nodeName).to.equals('INPUT');
    });

    it('emit on click event on click', async () => {
        buttonDefault.trigger('click');

        await buttonDefault.vm.$nextTick();
        expect(buttonDefault.emitted().click[0][0]).to.instanceof(MouseEvent);
    });
});
