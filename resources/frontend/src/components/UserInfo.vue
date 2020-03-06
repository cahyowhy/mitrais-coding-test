<!--suppress ALL -->
<template>
    <div :class="`is-${type}`"
         class="user-info message">
        <div class="media message-body">
            <div class="media-left image is-96x96">
                <img alt="User" src="/img/user.png">
            </div>
            <ul class="media-content menu-list">
                <li :key="item.label" v-for="item in userInfo">
                    <p class="title is-6">{{$t('label.'+item.label)}}</p>
                    <p class="subtitle is-6">{{item.value}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import User from "../entity/User";
    import {previewDate} from "@/filter";

    @Component
    export default class UserInfo extends Vue {

        @Prop({type: User, default: new User()})
        public user!: User;

        @Prop({type: String, default: ""})
        public type;

        public get userInfo() {
            const {name, email, mobile_number, gender, birthdate: dob} = this.user;

            return [
                {label: 'name', value: name},
                {label: 'email', value: email},
                {label: 'mobile_number', value: mobile_number},
                {label: 'gender', value: gender === 'L' ? this.$t('label.man') : this.$t('label.woman')},
                {label: 'dob', value: previewDate(dob)},
            ];
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/_variables_function.scss";

    .user-info {
        @include b_sh_def(true);

        .message-body {
            .menu-list {
                li + li {
                    margin-top: .5rem;
                }
            }
        }
    }
</style>
