<template>
    <div class="p-10 min-h-screen flex flex-col gap-8">
        <div class="flex justify-center items-center gap-4">
            <h1 class="text-9xl font-bold text-red-700 mb-10">{{word.key}}</h1>
           <i class="fas fa-volume-up text-blue-500 cursor-pointer text-4xl" @click="playAudio(word.audio)"></i>
        </div>
        <div class="bg-blue-200 rounded-2xl text-4xl w-2/3 mx-auto">
            <ul class="flex flex-col gap-10 p-6 list-disc pl-20">
                <li v-for="(dict_sentence, index) in word.sentences" :key="index">
                    <div class="flex justify-between">
                        {{dict_sentence.sentence}}
                        <i class="fas fa-volume-up text-blue-500 cursor-pointer" @click="playAudio(dict_sentence.audio)"></i>

                    </div>
                </li>
            </ul>
          
        </div>
        <div class="w-2/3 mx-auto flex px-5">
            <span v-if="text" class="text-3xl">Notes: </span>
            <input type="text" placeholder="Take notes here" class="flex-1 boder focus:border-none focus:outline-none text-3xl px-5" v-model="text" @blur="add_notes"> 

        </div>
        <button @click="goBack" class="bg-green-600 w-2/3 mx-auto text-5xl font-semibold p-2 rounded-lg hover:bg-green-700 text-gray-200">
            Back
        </button>
    </div>
</template>


<script setup>
import {ref,  onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const word = ref({})
const route = useRoute()
const router = useRouter()
const key = route.params.key
const text = ref('')

let audio = ref(null)


onMounted (async () => {
    try {
        const respone = await axios.get(`${import.meta.env.VITE_API_URL}/words`)
        const words = respone.data
        word.value = words.find(item => item.key === key)
        console.log(word.value)
        console.log('fetch data on worddetailpage sucessfully')
    } catch (err) {
        console.error ('there is an error in worddetailPage :', err)
    }

})

const add_notes = async () => {
    if (text.value != word.value.notes)
    try {
        await axios.put(`${import.meta.env.VITE_API_URL}/add_notes`,  {
            "word": word.value.key, 
            "text": text.value
        })
    } catch(err) {
        console.log("threre is an error with add notes ", err)
    }
}


const goBack = () => {
    router.push('/NewWords')
}


const playAudio = (audioPath) => {

    audio = new Audio(`${import.meta.env.VITE_API_URL}/${audioPath}`)
    console.log(`${import.meta.env.VITE_API_URL}/${audioPath}`)
    try {
        audio.play()
    } catch(e) {
        console.error('Audio play failed:', e)
    }
}


</script>