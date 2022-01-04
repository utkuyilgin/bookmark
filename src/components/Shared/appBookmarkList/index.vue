<template>
    <div>
        <div class="p-2 grid grid-cols-8 gap-4">
            <bookmark-list-item @buttonClick="buttonClick($event)" v-for="item in items" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<script>
import BookmarkListItem from "./BookmarkListItem";
export default {
    components: {
        BookmarkListItem
    },
    props: {
        items: Array
    }
}
</script>

<style scoped>

</style>
