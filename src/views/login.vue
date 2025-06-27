<template>
    <div class="max-w-sm mx-auto mt-20 p-6 border rounded-xl bg-white shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Welcom back</h2>
        <form @submit.prevent = "handlesubmit">
            <input
            v-model="email"
             type="text"
             class="w-full mb-4 p-2 border rounded"
             placeholder="Email"
            >
            <input
            v-model="password"
             type="text"
             class="w-full mb-4 p-2 border rounded"
             placeholder="Password"
            >
            <button
            type="submit"
            class="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            :disabled="loading"
            >
            {{loading? "Logging in ..." : "Log in"}}
            </button>
            <p v-if="errorMsg" class="mt-3 text-sm text-red-600 text-center">{{errorMsg}}</p>
        </form>
        <p class="text-center p-4">
            Don't have an account? 
            <router-link to="/signup" class="text-blue-500 ">Sign up</router-link>
        </p>
    </div>
</template>

<script setup>
import {ref} from "vue"
import axios from "axios"
import {useRouter} from "vue-router"


const email = ref("")
const password= ref("")
const loading = ref(false)
const errorMsg = ref("")

const router = useRouter()
const handlesubmit = async () => {
    if (loading.value) return

    loading.value = true
    errorMsg.value = ""
    try {
        const res = await axios.post("http://localhost:8000/login/", {
            email : email.value,
            password: password.value
        }, {
      withCredentials: true
    })
        alert("Login in successfully: ")
        console.log("login in with :", res.data), 
        router.push("/home") 
    } catch (err) {
        console.error("failed to login in", err);
        errorMsg.value = err.response?.data.message || "Failed to login"
    } finally {
        loading.value = false
    }
}

</script>
