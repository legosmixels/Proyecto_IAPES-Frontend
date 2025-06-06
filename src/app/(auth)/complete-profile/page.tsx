'use client';

import { useState, useEffect } from 'react';
import { type Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { GithubIcon, Eye, EyeOff, Facebook, Circle, Dribbble, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Simple Google SVG icon
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2">
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.08-2.58 2.03-4.66 2.03-3.86 0-6.99-3.16-6.99-7.05s3.13-7.05 6.99-7.05c1.96 0 3.41.79 4.3 1.7l2.48-2.38C18.37 2.66 15.88 1.5 12.48 1.5c-5.96 0-10.8 4.84-10.8 10.8s4.84 10.8 10.8 10.8c3.18 0 5.54-1.12 7.36-2.98 1.9-1.9 2.54-4.72 2.54-7.82v-.9H12.48Z" fill="currentColor"/>
  </svg>
);


export default function CompleteProfilePage() {
  const { toast } = useToast();
  const router = useRouter();

  // State for new fields
  const [tiempoDisponible, setTiempoDisponible] = useState('');
  const [carreraAspirada, setCarreraAspirada] = useState('');
  const [estudiandoPrueba, setEstudiandoPrueba] = useState('');
  const [necesitaAyudaMateria, setNecesitaAyudaMateria] = useState('');
  const [trabajoInstitucion, setTrabajoInstitucion] = useState('');
  const [pais, setPais] = useState('');
  const [region, setRegion] = useState('');
  const [fechaPrueba, setFechaPrueba] = useState('');
  const [materiaAyuda, setMateriaAyuda] = useState('');

  // Assuming supabase client is initialized elsewhere and accessible

  // Remove useEffect for checking user and redirecting to root on this page
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (user) {
  //       router.replace('/');
  //     }
  //   };
  //   checkUser();
  // }, [router, supabase]);


  const handleCompleteProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Here you would handle submitting the profile completion data,
    // possibly updating the user's profile in your backend/database.
    // For now, we'll just show a success toast and redirect.

    toast({
      title: 'Perfil completado',
      description: 'Tu perfil ha sido actualizado exitosamente.',
    });
    router.push('/'); // Redirect to home or dashboard after completion
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 p-4 md:p-8">
      <div className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-4xl lg:max-w-5xl grid md:grid-cols-2 overflow-hidden">
      <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12 bg-card text-card-foreground rounded-r-xl">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
              <span className="text-primary text-shadow-neon-primary">Completa tu perfil</span>
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Por favor, proporciona la siguiente información para personalizar tu experiencia.
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={handleCompleteProfile} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tiempoDisponible">Tiempo Disponible</Label>
                    <Select onValueChange={setTiempoDisponible}>
                      <SelectTrigger id="tiempoDisponible">
                        <SelectValue placeholder="Opciones..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Opción 1</SelectItem>
                        <SelectItem value="option2">Opción 2</SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="carreraAspirada">Carrera aspirada</Label>
                    <Select onValueChange={setCarreraAspirada}>
                      <SelectTrigger id="carreraAspirada">
                        <SelectValue placeholder="Selecciona una carrera.." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carrera1">Carrera 1</SelectItem>
                        <SelectItem value="carrera2">Carrera 2</SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="estudiandoPrueba">¿Estás estudiando para una prueba?</Label>
                        <RadioGroup onValueChange={setEstudiandoPrueba} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="si" id="prueba-si" />
                                <Label htmlFor="prueba-si">Sí</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="prueba-no" />
                                <Label htmlFor="prueba-no">No</Label>
                            </div>
                        </RadioGroup>
                        {estudiandoPrueba === 'si' && (
                          <div className="space-y-2 mt-4">
                            <Label htmlFor="fechaPrueba">Fecha de la prueba</Label>
                            <Input id="fechaPrueba" type="date" placeholder="dd/mm/aaaa" value={fechaPrueba} onChange={(e) => setFechaPrueba(e.target.value)} />
                          </div>
                        )}
                    </div>
 <div className="space-y-2">
                        <Label>¿Necesitas ayuda con una materia?</Label>
                        <RadioGroup onValueChange={setNecesitaAyudaMateria} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="si" id="materia-si" />
                                <Label htmlFor="materia-si">Sí</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="materia-no" />
                                <Label htmlFor="materia-no">No</Label>
                            </div>
                        </RadioGroup>
                        {necesitaAyudaMateria === 'si' && (
 <div className="space-y-2 mt-4">
 <Label htmlFor="materiaAyuda">Materia</Label>
 <Select onValueChange={setMateriaAyuda}>
 <SelectTrigger id="materiaAyuda">
 <SelectValue placeholder="Selecciona una materia..." />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="math">Matemáticas</SelectItem>
 <SelectItem value="science">Ciencias</SelectItem>
 {/* Add more options as needed */}
 </SelectContent>
 </Select>
 </div>
 )}
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label htmlFor="trabajoInstitucion">Trabajo o Institución</Label>
                    <Select onValueChange={setTrabajoInstitucion}>
                        <SelectTrigger id="trabajoInstitucion">
                            <SelectValue placeholder="Selecciona una opción..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="trabajo">Trabajo</SelectItem>
                            <SelectItem value="institucion">Institución</SelectItem>
                            {/* Add more options as needed */}
                        </SelectContent>
                    </Select>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="pais">País</Label>
                        <Select onValueChange={setPais}>
                            <SelectTrigger id="pais">
                                <SelectValue placeholder="Países..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pais1">País 1</SelectItem>
                                <SelectItem value="pais2">País 2</SelectItem>
                                {/* Add more options as needed */}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="region">Región</Label>
                         <Select onValueChange={setRegion}>
                            <SelectTrigger id="region">
                                <SelectValue placeholder="Regiones..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="region1">Región 1</SelectItem>
                                <SelectItem value="region2">Región 2</SelectItem>
                                {/* Add more options as needed */}
                            </SelectContent>
                        </Select>
                    </div>
                 </div>


                <div className="grid grid-cols-2 gap-4 mt-10">
                  <Button type="submit" className="flex w-full justify-center">
 <Link href="/subjects" className="w-full text-center">
 Crear Cuenta
 </Link>
                  </Button>
 <Button type="button" variant="outline" className="flex w-full justify-center">
 <Link href="/subjects" className="w-full text-center">
                    Dejará para después
 </Link>
                  </Button>
                </div>
              </form>
            </div>


          </div>
        </div>
        {/* Placeholder for image */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 bg-primary/10 text-center space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8 h-full">
            <h1 className="text-4xl font-bold text-primary text-shadow-neon-primary">
              ¡Es hora de completar tu perfil!
            </h1>
             <div className="space-y-3">
                <p className="text-lg text-muted-foreground">
                  ¡Me alegra mucho tenerte a bordo!
                </p>
                <p className="text-md text-muted-foreground">
                    Continúa para personalizar tu experiencia.
                </p>
             </div>
            {/* You can add an Image component here */}
            {/* <Image
              src="/your-image.png"
              alt="Complete Profile"
              width={500}
              height={300}
            /> */}
             <div className="flex space-x-4">
                <Link href="#" aria-label="Facebook" className="text-foreground hover:text-foreground/80 text-shadow-neon-primary transition-colors">
                  <Facebook className="h-7 w-7" />
                </Link>
                <Link href="#" aria-label="GitHub" className="text-foreground hover:text-foreground/80 text-shadow-neon-primary transition-colors">
                  <Github className="h-7 w-7" />
                </Link>
                <Link href="#" aria-label="Social Link 1" className="text-foreground hover:text-foreground/80 text-shadow-neon-primary transition-colors">
                  <Circle className="h-7 w-7" />
                </Link>
                <Link href="#" aria-label="Dribbble" className="text-foreground hover:text-foreground/80 text-shadow-neon-primary transition-colors">
                  <Dribbble className="h-7 w-7" />
                </Link>
                <Link href="#" aria-label="Social Link 2" className="text-foreground hover:text-foreground/80 text-shadow-neon-primary transition-colors">
                  <Circle className="h-7 w-7" />
                </Link>
              </div>
          </div>
        </div>
        
      </div>
    </div>
    
  );
}