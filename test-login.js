const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testLogin() {
  const username = 'danroibu';
  const password = 'admin123';
  
  console.log('Testing login for:', username);
  console.log('Password:', password);
  console.log('');
  
  // Get user from database
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .eq('is_active', true)
    .single();
  
  if (error || !user) {
    console.log('Error: User not found or inactive');
    console.log('Error details:', error);
    return;
  }
  
  console.log('User found:');
  console.log('- Username:', user.username);
  console.log('- Email:', user.email);
  console.log('- Active:', user.is_active);
  console.log('- Password hash:', user.password_hash);
  console.log('');
  
  // Test password
  const isValid = await bcrypt.compare(password, user.password_hash);
  
  console.log('Password test result:', isValid ? 'SUCCESS' : 'FAILED');
  
  if (!isValid) {
    console.log('');
    console.log('Let me generate the correct hash for admin123:');
    const correctHash = await bcrypt.hash('admin123', 10);
    console.log('');
    console.log('Run this SQL to fix:');
    console.log('UPDATE admin_users');
    console.log('SET password_hash = \'' + correctHash + '\'');
    console.log('WHERE username = \'danroibu\';');
  }
}

testLogin();
