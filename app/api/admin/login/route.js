import { NextResponse } from 'next/server';
import { passwordValido, crearTokenSesion, COOKIE, SESION_SEG } from '../../../../lib/adminAuth';
import { guardarEvento, contarEventosRecientes } from '../../../../lib/supabase';
import { ipDe, limitePorIp } from '../../../../lib/antiabuso';

// Freno a la adivinación de la contraseña, en dos capas:
//   1. Por IP (en memoria): 5 intentos cada 15 minutos.
//   2. Global (Supabase): cada intento fallido se registra como evento
//      'login_fallido' (sin IP ni datos de la persona). Con 20 fallos en 15
//      minutos, el acceso se cierra para todos hasta que pase la ventana. Cubre
//      los ataques repartidos entre muchas IP, que la capa 1 no ve.
const VENTANA_MIN = 15;
const MAX_POR_IP = 5;
const MAX_FALLOS_GLOBAL = 20;

const demasiados = () =>
  NextResponse.json(
    { ok: false, error: 'demasiados-intentos' },
    { status: 429, headers: { 'Retry-After': String(VENTANA_MIN * 60) } }
  );

export async function POST(request) {
  try {
    if (!limitePorIp('login:' + ipDe(request), MAX_POR_IP, VENTANA_MIN * 60 * 1000)) {
      return demasiados();
    }
    const fallos = await contarEventosRecientes('login_fallido', VENTANA_MIN);
    if (fallos != null && fallos >= MAX_FALLOS_GLOBAL) return demasiados();

    const { password } = await request.json();
    if (!passwordValido(password)) {
      await guardarEvento('login_fallido', {});
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, crearTokenSesion(), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESION_SEG,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
