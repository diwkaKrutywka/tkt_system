<template>
    <div>
        <a-dropdown>
            <!-- <div class="cursor-pointer text-blue-500">{{ userInfo.username }}</div> -->
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <div @click="onUpdatePassword()">
                            {{ $t('l_Password') }}
                        </div>
                    </a-menu-item>
                    <a-menu-item>
                        <div @click="onSignOUt()" class="cursor-pointer text-red-500">
                            {{ $t('l_Sign_out') }}
                        </div>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/index.js';
export default {
    setup() {
        const userStore = useUserStore();
        const { userInfo } = storeToRefs(userStore);
        const onSignOUt = () => {
            userStore.signOut();
        };
        const onUpdatePassword = ( ) => {
            // Use Vue Router's composition API if available, otherwise fallback
            if (typeof window !== 'undefined' && window.$router) {
                // window.$router.push({ name: 'UpdatePassword' });
            }
        };
        return {
            userInfo,
            onSignOUt,
            onUpdatePassword
        };
    }
}
</script>

<style lang="scss" scoped></style>
