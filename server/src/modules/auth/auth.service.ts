import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
  ) {}

  /**
   * Realiza login de usuário
   */
  async login(loginDto: LoginDto) {
    try {
      // Buscar usuário no Supabase
      const { data: user, error } = await this.supabaseService.client
        .from('users')
        .select('id, email, password, role, is_active')
        .eq('email', loginDto.email)
        .single();

      if (error || !user) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      if (!user.is_active) {
        throw new UnauthorizedException('Usuário inativo. Entre em contato com o suporte.');
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      // Gerar token JWT
      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Falha no login. Tente novamente.');
    }
  }

  /**
   * Registra um novo usuário
   */
  async register(registerDto: RegisterDto) {
    try {
      // Verificar se email já existe
      const { data: existingUser } = await this.supabaseService.client
        .from('users')
        .select('id')
        .eq('email', registerDto.email)
        .single();

      if (existingUser) {
        throw new ConflictException('Email já está em uso');
      }

      // Hash da senha
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(registerDto.password, salt);

      // Criar usuário no Supabase
      const { data: newUser, error } = await this.supabaseService.client
        .from('users')
        .insert({
          email: registerDto.email,
          password: hashedPassword,
          name: registerDto.name,
          role: registerDto.role || 'client', // default: client
          is_active: true
        })
        .select('id, email, name, role')
        .single();

      if (error || !newUser) {
        throw new BadRequestException('Falha ao criar usuário');
      }

      // Para clientes, criar perfil
      if (newUser.role === 'client') {
        await this.supabaseService.client
          .from('clients')
          .insert({
            user_id: newUser.id,
            name: registerDto.name,
            phone: registerDto.phone,
          });
      } 
      // Para barbeiros, criar perfil
      else if (newUser.role === 'barber') {
        await this.supabaseService.client
          .from('barbers')
          .insert({
            user_id: newUser.id,
            name: registerDto.name,
            phone: registerDto.phone,
          });
      }

      // Gerar token JWT
      const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
      const token = this.jwtService.sign(payload);

      return {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Falha no registro. Tente novamente.');
    }
  }

  /**
   * Valida o token JWT do usuário
   */
  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  /**
   * Obtém o perfil do usuário logado
   */
  async getProfile(userId: string, role: string) {
    try {
      if (role === 'client') {
        const { data, error } = await this.supabaseService.client
          .from('clients')
          .select(`
            id, name, phone, email, last_visit, 
            total_visits, 
            users (id, email)
          `)
          .eq('user_id', userId)
          .single();

        if (error || !data) {
          throw new BadRequestException('Falha ao obter perfil');
        }

        return data;
      } 
      else if (role === 'barber') {
        const { data, error } = await this.supabaseService.client
          .from('barbers')
          .select(`
            id, name, phone, address, description,
            users (id, email)
          `)
          .eq('user_id', userId)
          .single();

        if (error || !data) {
          throw new BadRequestException('Falha ao obter perfil');
        }

        return data;
      }

      throw new BadRequestException('Perfil não encontrado');
    } catch (error) {
      throw new BadRequestException('Falha ao obter perfil');
    }
  }
} 