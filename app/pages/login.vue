<template>
  <div class="auth-page container">
    <div class="auth-card reveal">
      <div class="auth-header">
        <h1 class="font-serif">{{ isLogin ? 'Sign In' : 'Create Account' }}</h1>
        <p>{{ isLogin ? 'Welcome back to Jafactor.' : 'Join us for a premium experience.' }}</p>
      </div>

      <form @submit.prevent="handleAuth" class="auth-form">
        <div v-if="!isLogin" class="input-group">
          <label>Full Name</label>
          <input v-model="form.fullName" type="text" placeholder="John Doe" required>
        </div>
        
        <div class="input-group">
          <label>Email Address</label>
          <input v-model="form.email" type="email" placeholder="email@example.com" required>
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required>
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account') }}
        </button>
      </form>

      <div class="auth-footer">
        <p v-if="isLogin">
          Don't have an account? 
          <button @click="isLogin = false" class="toggle-btn">Sign up</button>
        </p>
        <p v-else>
          Already have an account? 
          <button @click="isLogin = true" class="toggle-btn">Sign in</button>
        </p>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { signUp, signIn } = useSupabase()
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
  fullName: ''
})

const handleAuth = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (isLogin.value) {
      await signIn(form.email, form.password)
      navigateTo('/account')
    } else {
      await signUp(form.email, form.password, form.fullName)
      alert('Success! Please check your email for confirmation.')
      isLogin.value = true
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  padding-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.auth-card {
  width: 100%;
  max-width: 450px;
  background-color: var(--color-bg-soft);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.auth-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.auth-header p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.input-group label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-border);
  background: white;
  outline: none;
  font-size: 1rem;
}

.input-group input:focus {
  border-color: var(--color-text);
}

.auth-footer {
  margin-top: var(--spacing-md);
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.toggle-btn {
  color: var(--color-text);
  font-weight: 700;
  text-decoration: underline;
}

.error-message {
  margin-top: var(--spacing-md);
  padding: 1rem;
  background-color: #fee2e2;
  color: #b91c1c;
  font-size: 0.85rem;
  text-align: center;
}

.w-full {
  width: 100%;
}
</style>
