<template>
    <div class="text_page">
        <p class="text_part" :style="style_obj"
        v-for="item in text_array">
            {{item}}
        </p>
    </div>    
</template>

export default {
    name: 'TextPages',
    props: ['text_array', 'style_obj'],
}