<template>

    <div class="max-w-sm mx-auto mt-20 p-6 border rounded-xl bg-white shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Create your account</h2>
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
            class="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            type="submit"
            :disabled="loading"
            >
            {{loading? "Signing up" : "Sign up"}}
            </button>
            <p v-if="errorMsg" class="mt-3 text-sm text-red-600 text-center">{{errorMsg}}</p>
        </form>
        <p class="text-center mt-4">
            Already have an account? 
            <router-link to="/login" class="text-blue-500">
                Log in
            </router-link>
        </p>
    </div>

</template>

<script setup>
import {ref} from 'vue'
import axios from "axios"
import {useRouter} from 'vue-router'

const email = ref("")
const password = ref("")
const loading = ref(false)
const errorMsg = ref("")

const router = useRouter()

const handlesubmit = async () => {
    if (loading.value) return 

    loading.value = true
    errorMsg.value = ""
    try {

            const res = await axios.post("http://localhost:8000/api/register/", {
            email: email.value,
            password: password.value
        })

        console.log("Signed up successfully: ", res.data)
         router.push('/login')
    }


    catch (err) {
        console.error("failed to sign up", err);
        errorMsg.value = err.response?.data.detail || "Failed to create a new account"
    } finally {
        loading.value = false
    }
}

</script>