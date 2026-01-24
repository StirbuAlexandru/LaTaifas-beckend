import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username și parola sunt obligatorii' },
        { status: 400 }
      );
    }

    // Find user by username
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, message: 'Username sau parolă incorectă' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Username sau parolă incorectă' },
        { status: 401 }
      );
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Create session data (excluding password hash)
    const sessionData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
    };

    // Return success with user data
    const response = NextResponse.json({
      success: true,
      message: 'Autentificare reușită',
      user: sessionData,
    });

    // Set session cookie (HttpOnly for security)
    response.cookies.set('admin_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Eroare la autentificare' },
      { status: 500 }
    );
  }
}
