<template>
    <app-header/>
    <div class="flex flex-row">
        <sidebar @category="updateBookmarkList"/>
        <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList"/>
        <div v-else>Bookmark bulunamadı.</div>
    </div>

</template>
<script>
import Sidebar from "@/components/Home/Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            bookmarkList: []
        };
    },
    created() {
        this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_response => {
            this.bookmarkList = bookmark_response.data || [];
        })
    },
    methods: {
        updateBookmarkList(categoryId){
            const url = categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`
            this.$appAxios.get(url).then(bookmark_response => {
                this.bookmarkList = bookmark_response.data || [];
            })
        }
    }
}
</script>
