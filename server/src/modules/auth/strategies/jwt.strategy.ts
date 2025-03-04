import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private supabaseService: SupabaseService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
      // Verificar se o usuário existe no Supabase
      const { data, error } = await this.supabaseService.client
        .from('users')
        .select('id, email, role, is_active')
        .eq('id', payload.sub)
        .single();

      if (error || !data || !data.is_active) {
        throw new UnauthorizedException('Usuário não encontrado ou inativo');
      }

      // Retornar informações do usuário
      return {
        id: data.id,
        email: data.email,
        role: data.role
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
} 