"use client"; // Required for useState

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Facebook, Github, Dribbble, Circle, Eye, EyeOff } from "lucide-react";

// Simple Google SVG icon
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2">
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.08-2.58 2.03-4.66 2.03-3.86 0-6.99-3.16-6.99-7.05s3.13-7.05 6.99-7.05c1.96 0 3.41.79 4.3 1.7l2.48-2.38C18.37 2.66 15.88 1.5 12.48 1.5c-5.96 0-10.8 4.84-10.8 10.8s4.84 10.8 10.8 10.8c3.18 0 5.54-1.12 7.36-2.98 1.9-1.9 2.54-4.72 2.54-7.82v-.9H12.48Z" fill="currentColor"/>
  </svg>
);

export default function RegisterPage() { 
  const [showPassword, setShowPassword] = useState(false);
 const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [apellido, setApellido] = useState('');
  const [apellidoError, setApellidoError] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaNacimientoError, setFechaNacimientoError] = useState(false);
  const [genero, setGenero] = useState('');
  const [generoError, setGeneroError] = useState(false);
  const [email, setEmail] = useState(''); 
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordStrengthError, setPasswordStrengthError] = useState('');

  // Password strength validation (example criteria: at least 8 characters, includes uppercase, lowercase, number, and special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]\{\}|;:\'"<>,.\/?\\`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]\{\}|;:\'"<>,.\/?\\`~]{8,}$/; // Ensure minimum 8 characters



  const togglePasswordVisibility = () => { 
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 p-4 md:p-8">
      <div className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-4xl lg:max-w-5xl grid md:grid-cols-2 overflow-hidden">
        {/* Columna Izquierda */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 bg-primary/10 text-center space-y-8">
          <h1 className="text-4xl font-bold text-primary text-shadow-neon-primary">
            ¡Únete a nosotros!
          </h1>
          {/* Placeholder para la imagen */}
          <div className="w-full max-w-xs h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
            Espacio para la imagen
          </div>
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground">
              Crea una cuenta y empieza tu viaje.
            </p>
            <p className="text-md text-muted-foreground">
              ¡Estamos emocionados de tenerte a bordo!
            </p>
          </div>
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

        {/* Columna Derecha */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary text-shadow-neon-primary">
              Registrarse
            </h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission

            // Basic field empty validation
            const isNombreEmpty = nombre.trim() === '';
            const isApellidoEmpty = apellido.trim() === '';
            const isFechaNacimientoEmpty = fechaNacimiento.trim() === '';
            const isGeneroEmpty = genero.trim() === '';
            const isEmailEmpty = email.trim() === '';
            const isPasswordEmpty = password.trim() === '';

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(email);

            // Password strength validation (example criteria: at least 8 characters, includes uppercase, lowercase, number, and special character)
            const isPasswordStrong = passwordRegex.test(password);
            let passwordStrengthMessage = '';
            passwordStrengthMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un carácter especial.';
            setNombreError(isNombreEmpty);
            setApellidoError(isApellidoEmpty);
            setFechaNacimientoError(isFechaNacimientoEmpty);
            setGeneroError(isGeneroEmpty);
            setEmailError(isEmailEmpty || !isEmailValid);
            setPasswordError(isPasswordEmpty || !isPasswordStrong);
            setPasswordStrengthError(passwordStrengthMessage);

            if (!isNombreEmpty && !isApellidoEmpty && !isFechaNacimientoEmpty && !isGeneroEmpty && !isEmailEmpty && !isPasswordEmpty && isEmailValid && isPasswordStrong) {
              // Here you would typically handle form submission, e.g., send data to an API
              window.location.href = "/complete-profile"; // Redirect after successful "submission"
            }
          }}>
 {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input 
                id="nombre" 
                type="text" 
                placeholder="Ingresa tu nombre" 
                className={`
 ${nombreError ? 'border-[#5053B9]' : ''}
 autofill:!bg-background/70
 autofill:!text-foreground
 autofill:!border-border
 autofill:!shadow-none
 `}
                value={nombre} 
                onChange={(e) => {setNombre(e.target.value); setNombreError(false);}}
                onBlur={() => setNombreError(nombre.trim() === '')}
 autoComplete="off" />
            </div>

            {/* Apellido */}
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input 
                id="apellido" 
                type="text" 
                placeholder="Ingresa tu apellido" 
                className={`
 ${apellidoError ? 'border-[#5053B9]' : ''}
 autofill:!bg-background/70
 autofill:!text-foreground
 autofill:!border-border
 autofill:!shadow-none
 `}
                value={apellido} 
                onChange={(e) => {setApellido(e.target.value); setApellidoError(false);}} 
                onBlur={() => setApellidoError(apellido.trim() === '')}
 autoComplete="off" />
            </div>

            {/* Fecha de nacimiento y Género en la misma fila */}
            <div className="grid grid-cols-2 gap-4">
              {/* Fecha de nacimiento */}
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label> {/* Moved label outside */}
                 <Input 
                  id="fechaNacimiento" 
                  type="date" 
                  placeholder="dd/mm/aaaa"
                  className={`
 ${fechaNacimientoError ? 'border-[#5053B9]' : ''}
 autofill:!bg-background/70
 autofill:!text-foreground
 autofill:!border-border
 autofill:!shadow-none
 `}
                  value={fechaNacimiento} 
                  onChange={(e) => {setFechaNacimiento(e.target.value); setFechaNacimientoError(false);}} 
                  onBlur={() => setFechaNacimientoError(fechaNacimiento.trim() === '')}
 autoComplete="off" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genero">Género</Label>
                <Select value={genero} onValueChange={(value) => {setGenero(value); setGeneroError(false);}}>
                  <SelectTrigger 
                    id="genero"
 className={`${generoError ? 'border-[#5053B9]' : ''}`}
                    onBlur={() => setGeneroError(genero.trim() === '')}

                  >

                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select> 
              </div>
            </div>
            
            {/* Correo electrónico */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
             <Input 
                id="email" 

                type="text" // Changed to text to allow partial input for validation
                placeholder="Ingresa tu correo electrónico"
                className={`
 ${emailError ? 'border-[#5053B9]' : ''}
 autofill:!bg-background/70
 autofill:!text-foreground
 autofill:!border-border
 autofill:!shadow-none
 `}
                value={email} 
                onChange={(e) => {setEmail(e.target.value); setEmailError(false);}}
                onBlur={() => setEmailError(email.trim() === '')}
 autoComplete="off" />
             {emailError && (
 <p className="text-xs mt-1" style={{ color: '#5053B9' }}>Por favor, ingrese un correo válido</p>
             )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
 id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña" 
 value={password}
 className={`
 pr-10 w-full 
 ${passwordError ? 'border-[#5053B9]' : ''}
 `} // Removed autofill styles as autocomplete="new-password" is used
 onChange={(e) => {setPassword(e.target.value); setPasswordError(false);}}
 onBlur={() => setPasswordError(password.trim() === '' || !passwordRegex.test(password))}
 autoComplete="new-password" // Hint to the browser not to use autofill
 />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary" // Simplified class name
 aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} // Added aria-label for accessibility
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
 </button>
              </div>
              {passwordError && passwordStrengthError && (
 <p className="text-xs mt-1" style={{ color: '#5053B9' }}>{passwordStrengthError}</p>
 )}
            </div>

 {/* Add vertical space */}
 <div className="h-4" /> 
 

 <Button type="submit" className="w-full text-lg py-6">Registrarse</Button>


          </form>

           <p className="text-center text-sm text-muted-foreground mt-4">
             Con la creación de la cuenta indicas que estás de acuerdo con los{' '}
             <Link href="#" className="text-primary hover:underline">términos y condiciones</Link>
           </p>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                o
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full text-md py-5 border-primary/30 hover:border-primary text-primary hover:bg-primary/10 hover:text-primary text-shadow-neon-primary shadow-neon-primary"
          >
            <GoogleIcon />
            Registrarse con Google
          </Button>

          <p className="text-sm text-muted-foreground text-center mt-4">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline text-shadow-neon-primary" prefetch={false}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}