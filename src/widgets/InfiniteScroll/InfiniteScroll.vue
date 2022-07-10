<template>
    <div>
        <div v-for="(item, i) in items" :key="i" v-intersect="onIntersect" :data-last="i === items.length - 1">
            <slot :item="item"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component({})
    export default class InfiniteScroll extends Vue {
        @Prop()
        items;
        @Prop({ default: null })
        lastPage;
        @Prop({ default: 1 })
        page;

        mounted() {
            this.$emit('loadMoreItems', this.page);
        }

        onIntersect(entries, observer) {
            // If the last item intersects and theres more pages to load, emit 'loadMoreItems'
            if (entries[0].isIntersecting && entries[0].target.dataset.last && this.page < this.lastPage) {
                this.$emit('loadMoreItems', this.page + 1);
            }
        }
    }
</script>