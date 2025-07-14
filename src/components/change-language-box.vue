<template>
    <div>
        <a-dropdown>
            <span class="icon m-0 p-0 material-symbols-outlined text-blue-500" @click.prevent>
                translate
            </span>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a :style="{ color: langTag == 'kk' ? '#40a9ff' : '#000' }" href="#"
                            @click="setLanguage('kk')">Қазақша</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a :style="{ color: langTag == 'ru' ? '#40a9ff' : '#000' }" href="#"
                            @click="setLanguage('ru')">Русский</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a :style="{ color: langTag == 'en' ? '#40a9ff' : '#000' }" href="#"
                            @click="setLanguage('en')">English</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>

    </div>
</template>

<script>
export default {
    computed: {
        langTag() {
            return this.$i18n.locale
        },
    },
    methods: {
        setLanguage(e) {
            this.$i18n.locale = e
            localStorage.setItem("currentLang", e);
            window.location.reload()
        },
    },
}
</script>
