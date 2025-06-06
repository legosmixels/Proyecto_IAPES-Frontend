
"use client"; // Required for useState

import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Facebook, Github, Dribbble, Circle, Eye, EyeOff } from "lucide-react"; 

// Simple Google SVG icon
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2">
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.08-2.58 2.03-4.66 2.03-3.86 0-6.99-3.16-6.99-7.05s3.13-7.05 6.99-7.05c1.96 0 3.41.79 4.3 1.7l2.48-2.38C18.37 2.66 15.88 1.5 12.48 1.5c-5.96 0-10.8 4.84-10.8 10.8s4.84 10.8 10.8 10.8c3.18 0 5.54-1.12 7.36-2.98 1.9-1.9 2.54-4.72 2.54-7.82v-.9H12.48Z" fill="currentColor"/>
  </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 p-4 md:p-8">
      <div className="bg-card text-card-foreground rounded-xl shadow-2xl w-full max-w-4xl lg:max-w-5xl grid md:grid-cols-2 overflow-hidden">
        {/* Columna Izquierda */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 bg-primary/10 text-center space-y-8">
          <h1 className="text-4xl font-bold text-primary text-shadow-neon-primary">
            ¡Bienvenido de nuevo!
          </h1>
          <div className="space-y-3">
            <p className="text-lg text-muted-foreground">
              ¡Me alegra mucho tenerte de vuelta!
            </p>
            <p className="text-md text-muted-foreground">
              ¿Listo para continuar con tu aventura?
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
              Iniciar Sesión
            </h2>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre</Label>
              <Input id="username" type="text" placeholder="Ingresa tu nombre de usuario o email" required className="bg-background/70"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Ingresa tu contraseña" 
                  required 
                  className="bg-background/70 pr-10" // Added pr-10 for eye icon spacing
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary text-shadow-neon-primary"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="text-sm space-y-2">
              <div className="flex items-center space-x-2">
 <Checkbox
                  id="remember-me"
                  className="
                    border-primary data-[state=checked]:border-primary
                    data-[state=checked]:bg-primary
                    data-[state=checked]:text-primary-foreground
                    focus-visible:ring-primary
                    shadow-neon-primary
                  "
                />
                <Label htmlFor="remember-me" className="font-normal text-muted-foreground">Recuérdame</Label>
              </div>
              <div className="text-sm text-muted-foreground text-left mt-4">
 ¿Olvidaste tu contraseña?{' '}
                <Link href="#" className="text-primary hover:underline text-shadow-neon-primary" prefetch={false}>
                   Restablecer
                </Link>
              </div>
            </div>

 {/* Add a line break or margin here to separate the link and button */}
 <div className="mt-4"></div>

            <Link href="/subjects">
 <Button type="submit" className="w-full text-lg py-6">Iniciar sesión</Button></Link>
          </form>

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
            Iniciar Sesión con Google
          </Button>
          
          <p className="text-sm text-muted-foreground text-center mt-4">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="text-primary hover:underline text-shadow-neon-primary" prefetch={false}>
              Crea una
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
