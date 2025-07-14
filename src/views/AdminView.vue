<template>
    <div>
        <div class="flex h-screen w-full overflow-hidden">
            <div class="h-full hidden md:block">
                <div class="h-full flex flex-col bg-[#091524] text-gray-200 w-[220px] overflow-hidden relative">
                    <div class="flex items-center justify-center pt-4 pb-4 border-b px-3">
                        <img class="h-16" src="../assets/logo.svg"/>
                    </div>
                    <div class="flex-1 overflow-y-auto">
                        <MenuBox></MenuBox>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex flex-col h-screen overflow-x-auto">
                <AdminTopBox></AdminTopBox>
                <div class="p-3 flex-1 overflow-y-auto">
                    <router-view />
                </div>

            </div>
        </div>
       
        

    </div>
</template>

<script>
import MenuBox from "../components/menu-bar.vue"
import AdminTopBox from "../components/admin-top-box.vue"
export default{
    components:{
        MenuBox,
        AdminTopBox
    }
}
</script>
