import { NextResponse } from 'next/server';
import { passwordValido, tokenEsperado, COOKIE } from '../../../../lib/adminAuth';

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!passwordValido(password)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, tokenEsperado(), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
