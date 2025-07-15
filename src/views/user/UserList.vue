<template>
    <div>


        <a-page-header style="" :title="$t('l_Users')" sub-title="">
            <template #extra>
                <a-button @click="onAdd()" type="primary" size="">
                    {{ $t("l_Add") }}
                </a-button>

            </template>

        </a-page-header>
        <CardsList />
    </div>
</template>
<script>
import CardsList from '../../components/CardsList.vue';

export default {
    data() {

    },
    components: {
        CardsList,
    },


}
</script>