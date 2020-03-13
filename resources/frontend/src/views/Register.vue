<!--suppress ALL -->
<template>
    <div class="register-page">
        <div class="left-page">
            <div class="message is-danger"
                 v-if="hasSubmit && user.errorMessagesRegister.length > 0">
                <div class="message-body">
                    <ul class="menu-list">
                        <li :key="idx"
                            v-for="(message, idx) in user.errorMessagesRegister">
                            {{message}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="image">
                <img src="/img/signup-image.webp">
            </div>
        </div>
        <div :class="isLoading ? 'form-loading' : ''" class="box">
            <p class="title is-5">Registrasi</p>
            <p class="subtitle is-6">Registrasi terlebih dahulu</p>
            <form @submit.prevent="doSave">
                <common-field :label="$t('label.mobile_number')" :message="user.mobileNumberFeedback().message"
                              :type="getInputType(user.mobileNumberFeedback().type)"
                              message-as-tooltip>
                    <common-input :disabled="isLoading" v-model="user.mobile_number" v-unicode="{from: 48, to: 57}"/>
                </common-field>
                <common-field :label="$t('label.firstname')" :message="user.firstnameFeedback().message"
                              :type="getInputType(user.firstnameFeedback().type)"
                              message-as-tooltip>
                    <common-input v-model="user.firstname"/>
                </common-field>
                <common-field :label="$t('label.lastname')" :message="user.lastnameFeedback().message"
                              :type="getInputType(user.lastnameFeedback().type)"
                              message-as-tooltip>
                    <common-input :disabled="isLoading" v-model="user.lastname"/>
                </common-field>
                <common-field :label="$t('label.dob')">
                    <common-datepicker :disabledDatePicker="isLoading"
                                       :type="getInputType(user.lastnameFeedback().type)"
                                       v-model="user.birthdate"/>
                </common-field>
                <common-field :label="$t('label.gender')">
                    <div class="level">
                        <div class="level-item" style="justify-content: flex-start;">
                            <common-radiobutton :disabled="isLoading" name="jenis-kelamin"
                                                native-value="L" v-model="user.gender">
                                {{$t('label.man')}}
                            </common-radiobutton>
                        </div>
                        <div class="level-item" style="justify-content: flex-start;">
                            <common-radiobutton :disabled="isLoading" name="jenis-kelamin"
                                                native-value="P" v-model="user.gender">
                                {{$t('label.woman')}}
                            </common-radiobutton>
                        </div>
                    </div>
                </common-field>
                <common-field :label="$t('label.email')" :message="user.emailFeedback().message"
                              :type="getInputType(user.emailFeedback().type)" message-as-tooltip>
                    <common-input :disabled="isLoading" v-model="user.email"/>
                </common-field>
                <common-field is-grouped position="right">
                    <div class="control" v-if="isSuccess">
                        <router-link class="button is-dark" to="/">
                            {{$t('label.login')}}
                        </router-link>
                    </div>
                    <div class="control">
                        <common-button :isLoading="isLoading" :type="user.hasValid() ? 'success' : 'danger'"
                                       :value="isLoading ? '' : $t('label.save')" tooltipText="CEK"/>
                    </div>
                </common-field>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Notification from "../Notification";
    import {Inject} from "typescript-ioc";

    import UserService from "../service/UserService";
    import Response from "../service/Response";

    import User from "../entity/User";
    import {timeout} from "@/util";

    @Component
    export default class RegisterPage extends Vue {

        @Inject
        public userService: UserService;

        public user: User = new User();

        public isLoading = false;

        public isSuccess = false;

        public hasSubmit = false;

        public getInputType(type = "") {
            return this.isLoading ? 'static' : type;
        }

        public async doSave() {
            this.hasSubmit = true;

            if (this.user.hasValid() && !this.isLoading) {
                this.isLoading = true;
                await timeout(500);
                const response: Response = await this.userService.save(this.user);

                this.isLoading = false;
                this.isSuccess = response.isSuccess;
            } else if (!this.user.hasValid()) {
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

    .register-page {
        margin: 32px 0;
        min-height: calc(100vh - 184px);
        @include fl_row(center, center);

        .form-loading {
            p, label {
                color: $grey-light;
            }
        }

        .left-page {
            width: 450px;
            margin-right: 1.5rem;
            @include fl_col(center, null);

            .image img {
                max-width: 300px;
            }

            .message {
                @include b_sh_def(true);
            }
        }

        .box {
            flex: 1;
        }
    }
</style>
