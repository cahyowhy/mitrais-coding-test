<!--suppress ALL -->
<template>
    <div class="login-page">
        <user-info :user="user" type="info" v-if="user.id"/>
        <div class="message is-danger"
             v-if="hasSubmit && user.errorMessagesLogin.length > 0">
            <div class="message-body">
                <ul class="menu-list">
                    <li :key="idx"
                        v-for="(message, idx) in user.errorMessagesLogin">
                        {{message}}
                    </li>
                </ul>
            </div>
        </div>

        <div class="box">
            <div class="image form-logo">
                <img src="/img/logo.jpg"/>
            </div>
            <form @submit.prevent="doLogin">
                <common-field :label="$t('label.email')"
                              :message="user.emailFeedback().message"
                              :type="user.emailFeedback().type">
                    <common-input v-model="user.email"/>
                </common-field>
                <common-field :label="$t('label.mobile_number')"
                              :message="user.mobileNumberFeedback().message"
                              :type="user.mobileNumberFeedback().type">
                    <common-input v-model="user.mobile_number" v-unicode="{from: 48, to: 57}"/>
                </common-field>
                <common-field>
                    <div class="control">
                        <common-button :isLoading="isLoading" :type="user.hasValidLogin() ? 'success' : 'danger'"
                                       :value="isLoading ? '' : $t('label.login')"/>
                    </div>
                </common-field>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Inject} from "typescript-ioc";

    import UserService from "../service/UserService";

    import User from "../entity/User";
    import Notification from "@/Notification";

    @Component
    export default class LoginPage extends Vue {

        @Inject
        public userService: UserService;

        public user: User = new User();

        public isLoading = false;

        public hasSubmit = false;

        public async doLogin() {
            this.hasSubmit = true;

            if (this.user.hasValidLogin() && !this.isLoading) {
                const {email, mobile_number} = this.user;

                this.isLoading = true;
                const response = await this.userService.login({email, mobile_number});
                this.isLoading = false;

                if (response.isSuccess) {
                    this.user = response.getDeserializeResponse(new User());
                }
            } else if (!this.user.hasValidLogin()) {
                Notification.showNotification({
                    text: this.$t('text.check_field_above'),
                    type: 'error'
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "../style/variables_function";

    .login-page {
        min-height: calc(100vh - 184px);
        align-items: center;
        margin: 32px 0;
        @include fl_col(center, center);

        .message {
            @include b_sh_def(true);
        }

        .box, .message {
            max-width: 350px;
            width: 100%;
        }

        .field .submit-input-wrp, .field .button {
            width: 100%;
        }

        .form-logo {
            margin-bottom: 1rem;
            @include fl_col(null, center);

            img {
                width: auto;
                height: 74px;
            }
        }
    }
</style>
