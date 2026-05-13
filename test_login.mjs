import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@jafactor.com',
    password: 'AdminPassword123!'
  });

  if (error) {
    console.error('Login Failed:', error.message);
  } else {
    console.log('Login Successful!', data.user.email);
  }
}

testLogin();
