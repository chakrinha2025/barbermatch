import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Building2, Clock, MapPin, Upload, Users, DollarSign, Calendar, Scissors, Package, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { getWidthClass } from '@/lib/animations';

const planoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  endereco: z.string().min(10, "Endereço deve ter pelo menos 10 caracteres"),
  cep: z.string().min(8, "CEP inválido"),
  cidade: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
  estado: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  telefone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  horarioAbertura: z.string(),
  horarioFechamento: z.string(),
  diasFuncionamento: z.array(z.string()).min(1, "Selecione pelo menos um dia"),
  descricao: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres"),
  tempoMedioPorServico: z.string(),
  aceitaPagamentoOnline: z.boolean().default(true),
  planoSelecionado: z.string(),
  logo: z.any().optional(),
  imagensBarbearia: z.array(z.any()).optional(),
});

const diasSemana = [
  { valor: "seg", rotulo: "Segunda" },
  { valor: "ter", rotulo: "Terça" },
  { valor: "qua", rotulo: "Quarta" },
  { valor: "qui", rotulo: "Quinta" },
  { valor: "sex", rotulo: "Sexta" },
  { valor: "sab", rotulo: "Sábado" },
  { valor: "dom", rotulo: "Domingo" },
];

const planos = [
  {
    id: "basico",
    nome: "Básico",
    preco: "R$ 99,90/mês",
    recursos: [
      "Perfil básico",
      "Agendamento online",
      "Até 3 barbeiros",
      "Suporte por email"
    ]
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: "R$ 199,90/mês",
    recursos: [
      "Tudo do Básico",
      "Destaque nas buscas",
      "Até 10 barbeiros",
      "Dashboard de análise",
      "Suporte prioritário"
    ]
  },
  {
    id: "premium",
    nome: "Premium",
    preco: "R$ 299,90/mês",
    recursos: [
      "Tudo do Profissional",
      "Número ilimitado de barbeiros",
      "Integração com marketing",
      "Dashboard avançado",
      "Suporte 24/7",
      "Recursos de IA exclusivos"
    ]
  }
];

// Função auxiliar para calcular a largura da barra de progresso
const getProgressBarClass = (step: number): string => {
  const percentage = (step - 1) * 50;
  return `w-[${percentage}%]`;
};

export default function BarberShopOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isTrial, setIsTrial] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);

  const form = useForm<z.infer<typeof planoSchema>>({
    resolver: zodResolver(planoSchema),
    defaultValues: {
      nome: "",
      endereco: "",
      cep: "",
      cidade: "",
      estado: "",
      telefone: "",
      email: "",
      horarioAbertura: "09:00",
      horarioFechamento: "19:00",
      diasFuncionamento: ["seg", "ter", "qua", "qui", "sex"],
      descricao: "",
      tempoMedioPorServico: "30",
      aceitaPagamentoOnline: true,
      planoSelecionado: "profissional",
    },
  });

  // Verificar se está no período de teste
  useEffect(() => {
    const barbershopData = localStorage.getItem('barbershop_data');
    if (barbershopData) {
      try {
        const data = JSON.parse(barbershopData);
        if (data.plan === 'teste_gratuito' && data.trialEndsAt) {
          setIsTrial(true);
          setTrialEndsAt(data.trialEndsAt);
        }
      } catch (error) {
        console.error('Erro ao carregar dados da barbearia:', error);
      }
    }
  }, []);
  
  const formatTrialEndDate = () => {
    if (!trialEndsAt) return '';
    const date = new Date(trialEndsAt);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagesPreview(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: z.infer<typeof planoSchema>) => {
    console.log("Dados da barbearia:", data);
    
    // Simulação de gravação dos dados no backend
    localStorage.setItem('barbershop_setup_complete', 'true');
    
    toast.success("Barbearia cadastrada com sucesso!");
    
    // Redirecionar para o dashboard de donos de barbearias
    navigate("/barbershop");
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Configuração da sua Barbearia</h1>
          <p className="text-muted-foreground mt-2">
            Vamos configurar sua barbearia para atrair mais clientes! Complete as informações abaixo.
          </p>
        </div>

        {isTrial && (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-primary">Período de Teste Gratuito</h3>
                <p className="text-sm mt-1">
                  Você está utilizando o período de teste gratuito que expira em <strong>{formatTrialEndDate()}</strong>. 
                  Aproveite para explorar todos os recursos da plataforma!
                </p>
                <div className="mt-3">
                  <Link 
                    to="/pricing" 
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    Ver planos disponíveis
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative mb-10">
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className={`z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {step}
              </motion.div>
            ))}
          </div>
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
            <div 
              className={`h-full bg-primary transition-all duration-300 ${getWidthClass(currentStep)}`}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Informações Básicas</span>
            <span>Detalhes de Funcionamento</span>
            <span>Plano e Finalização</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Informações Básicas
                    </CardTitle>
                    <CardDescription>
                      Forneça as informações básicas da sua barbearia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden mb-4 border-2 border-dashed border-muted-foreground hover:border-primary cursor-pointer relative">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleLogoChange}
                          aria-label="Upload do logo da barbearia"
                          title="Selecione uma imagem para o logo da sua barbearia"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Faça upload do logo da sua barbearia</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Barbearia</FormLabel>
                            <FormControl>
                              <Input placeholder="Barbearia Estilo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="contato@barbearia.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endereco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua dos Barbeiros, 123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input placeholder="00000-000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="São Paulo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input placeholder="SP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva sua barbearia, estilo, ambiente e diferencial..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Horários e Funcionamento
                    </CardTitle>
                    <CardDescription>
                      Configure os horários e dias de funcionamento da sua barbearia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <FormField
                          control={form.control}
                          name="horarioAbertura"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horário de Abertura</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name="horarioFechamento"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horário de Fechamento</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="diasFuncionamento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dias de Funcionamento</FormLabel>
                          <div className="grid grid-cols-7 gap-2">
                            {diasSemana.map((dia) => (
                              <FormItem
                                key={dia.valor}
                                className="flex flex-col items-center space-y-2"
                              >
                                <FormControl>
                                  <div className="flex flex-col items-center space-y-1">
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                                        field.value.includes(dia.valor)
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                                      }`}
                                      onClick={() => {
                                        const newValue = field.value.includes(dia.valor)
                                          ? field.value.filter((d) => d !== dia.valor)
                                          : [...field.value, dia.valor];
                                        field.onChange(newValue);
                                      }}
                                    >
                                      {dia.rotulo.charAt(0)}
                                    </div>
                                    <span className="text-xs">{dia.rotulo.slice(0, 3)}</span>
                                  </div>
                                </FormControl>
                              </FormItem>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tempoMedioPorServico"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempo Médio por Serviço (minutos)</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tempo médio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="15">15 minutos</SelectItem>
                              <SelectItem value="30">30 minutos</SelectItem>
                              <SelectItem value="45">45 minutos</SelectItem>
                              <SelectItem value="60">60 minutos</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aceitaPagamentoOnline"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Aceitar Pagamento Online
                            </FormLabel>
                            <FormDescription>
                              Permitir que os clientes paguem online ao agendar
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <Label>Galeria de Imagens da Barbearia</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {imagesPreview.map((img, i) => (
                          <div key={i} className="relative rounded-md overflow-hidden h-32">
                            <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                              onClick={() => setImagesPreview(prev => prev.filter((_, index) => index !== i))}
                              aria-label="Remover imagem"
                              title="Remover imagem"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                        <div className="h-32 border-2 border-dashed border-muted-foreground rounded-md flex items-center justify-center cursor-pointer hover:border-primary relative">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            multiple 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={handleImagesChange}
                            aria-label="Upload de imagens da barbearia"
                            title="Selecione imagens da sua barbearia"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Escolha seu Plano
                    </CardTitle>
                    <CardDescription>
                      Selecione o plano que melhor atende às necessidades da sua barbearia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="planoSelecionado"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              {planos.map((plano) => (
                                <div key={plano.id} className="relative">
                                  <RadioGroupItem
                                    value={plano.id}
                                    id={plano.id}
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor={plano.id}
                                    className={`
                                      flex flex-col h-full p-4 border-2 rounded-xl cursor-pointer
                                      transition-all
                                      peer-data-[state=checked]:border-primary
                                      hover:border-primary/50
                                    `}
                                  >
                                    <div className="font-semibold text-xl mb-1">{plano.nome}</div>
                                    <div className="text-2xl font-bold mb-4">{plano.preco}</div>
                                    <Separator className="mb-4" />
                                    <ul className="space-y-2 text-sm flex-grow">
                                      {plano.recursos.map((recurso, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-green-500"
                                          >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                          </svg>
                                          {recurso}
                                        </li>
                                      ))}
                                    </ul>
                                    {plano.id === "profissional" && (
                                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                                          Mais Popular
                                        </span>
                                      </div>
                                    )}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Resumo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Plano Selecionado</span>
                        <span className="font-medium">
                          {planos.find(p => p.id === form.watch("planoSelecionado"))?.nome}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preço</span>
                        <span className="font-medium">
                          {planos.find(p => p.id === form.watch("planoSelecionado"))?.preco}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>
                          {planos.find(p => p.id === form.watch("planoSelecionado"))?.preco}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button type="button" className="ml-auto" onClick={nextStep}>
                  Próximo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Finalizar Cadastro
                </Button>
              )}
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
} 