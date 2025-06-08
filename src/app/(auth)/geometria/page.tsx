"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dog } from 'lucide-react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Define a type or interface for the Timer props
interface TimerProps {
  timeLeft: number;
  phase: 'work' | 'short-break' | 'long-break';
  isRunning: boolean;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  handleStartPause: () => void;
  handleReset: () => void;
  setWorkDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  handlePhaseChange: (newPhase: 'work' | 'short-break' | 'long-break') => void;
}

// Componente Timer
const Timer: React.FC<TimerProps> = ({
  timeLeft,
  phase,
  isRunning,
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  handleStartPause,
  handleReset,
  setWorkDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  handlePhaseChange
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h4 className="text-lg font-semibold mb-2 capitalize">{phase.replace('-', ' ')}</h4>
      <div className="text-4xl font-bold text-center mb-4">{formatTime(timeLeft)}</div>

      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={handleStartPause} className="px-4 py-2 bg-primary text-primary-foreground rounded">
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
          Reiniciar
        </button>
      </div>

      <div className="mb-4">
        <h5 className="font-semibold mb-1">Configuración (minutos):</h5>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="workDurationInput" className="text-sm">Trabajo:</label>
            <input
              id="workDurationInput"
              type="number"
              min="1"
              value={workDuration}
              onChange={(e) => setWorkDuration(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border rounded text-foreground bg-background"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="shortBreakDurationInput" className="text-sm">Descanso Corto:</label>
            <input
              id="shortBreakDurationInput"
              type="number"
              min="1"
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border rounded text-foreground bg-background"
            />
          </div>
          {/*
          <div className="flex items-center space-x-2">
            <label htmlFor="longBreakDurationInput" className="text-sm">Descanso Largo:</label>
            <input
              id="longBreakDurationInput"
              type="number"
              min="1"
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border rounded text-foreground bg-background"
            />
          </div>
          */}
        </div>
      </div>
      {/*
      <div className="flex justify-center space-x-4">
        <button onClick={() => handlePhaseChange('work')} className="px-4 py-2 bg-blue-500 text-white rounded">Trabajo</button>
        <button onClick={() => handlePhaseChange('short-break')} className="px-4 py-2 bg-green-500 text-white rounded">Descanso Corto</button>
        <button onClick={() => handlePhaseChange('long-break')} className="px-4 py-2 bg-red-500 text-white rounded">Descanso Largo</button>
      </div>
      */}
    </div>
  );
};

const GeometriaPage = () => {
  const allAreasData = [
    { area: '(AyFp) Áreas y perímetros de figuras planas', percentage: 60 },
    { area: '(Tp) Teorema de Pitágoras', percentage: 80 },
    { area: '(St) Semejanza de triángulos', percentage: 75 },
    { area: '(Gab) Geometría analítica básica', percentage: 20 },
    { area: '(T) Trigonometría', percentage: 30 },
    { area: '(VyAs) Volúmenes y áreas de sólidos', percentage: 30 },
  ];
  const recommendations = [
    { text: 'Recomendación 1', url: 'https://www.youtube.com/watch?v=video1' },
    { text: 'Recomendación 2', url: 'https://www.youtube.com/watch?v=video2' },
    { text: 'Recomendación 3', url: 'https://www.youtube.com/watch?v=video3' },
    { text: 'Recomendación 4', url: 'https://www.youtube.com/watch?v=video4' },
    { text: 'Recomendación 5', url: 'https://www.youtube.com/watch?v=video5' },
    { text: 'Recomendación 6', url: 'https://www.youtube.com/watch?v=video6' },
    { text: 'Recomendación 7', url: 'https://www.youtube.com/watch?v=video7' },
    { text: 'Recomendación 8', url: 'https://www.youtube.com/watch?v=video8' },
  ];

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Refactored Timer Effect to avoid infinite loop
  useEffect(() => {
    let id: NodeJS.Timeout;

    if (isRunning) {
      id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            const nextPhase = phase === 'work' ? 'short-break' : phase === 'short-break' ? 'work' : 'work'; // Simplified phase switch
            setPhase(nextPhase);
            setIsRunning(false);
            return nextPhase === 'work' ? workDuration * 60 : shortBreakDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, phase, workDuration, shortBreakDuration]); // Removed timeLeft and intervalId from dependencies

  // Reset timeLeft when durations or phase change and not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(phase === 'work' ? workDuration * 60 : phase === 'short-break' ? shortBreakDuration * 60 : longBreakDuration * 60);
    }
  }, [workDuration, shortBreakDuration, longBreakDuration, phase, isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(workDuration * 60);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handlePhaseChange = (newPhase: 'work' | 'short-break' | 'long-break') => {
    setPhase(newPhase);
    setIsRunning(false);
    setTimeLeft(newPhase === 'work' ? workDuration * 60 : newPhase === 'short-break' ? shortBreakDuration * 60 : longBreakDuration * 60);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const strengths = allAreasData.filter(item => item.percentage >= 70);
  const areasToImprove = allAreasData.filter(item => item.percentage < 70);
  const areaAbbreviations: { [key: string]: string } = {
    '(AyFp) Áreas y perímetros de figuras planas': 'AyFp',
    '(Tp) Teorema de Pitágoras': 'Tp',
    '(St) Semejanza de triángulos': 'St',
    '(Gab) Geometría analítica básica': 'Gab',
    '(T) Trigonometría': 'T',
    '(VyAs) Volúmenes y áreas de sólidos': 'VyAs'
  };

  const allAreas = Array.from(new Set([
    ...allAreasData.map(item => item.area)
  ])).map(area => areaAbbreviations[area] || area);

  const findPercentageByAbbreviation = (items: { area: string; percentage: number }[], abbreviation: string) => {
    const originalArea = Object.keys(areaAbbreviations).find(key => areaAbbreviations[key] === abbreviation);
    if (!originalArea) return 0;
    const item = items.find(item => item.area === originalArea);
    return item ? item.percentage : 0;
  };

  const combinedData = allAreas.map(area => {
    return findPercentageByAbbreviation(allAreasData, area);
  });

  const data = {
    labels: allAreas,
    datasets: [
      {
        label: 'Rendimiento General',
        data: combinedData,
        backgroundColor: 'rgba(14, 113, 251, 0.5)',
        borderColor: 'rgba(14, 113, 251, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
          color: 'rgba(255, 255, 255, 0.2)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 16
          } as any,
          color: 'hsl(var(--foreground))'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          lineWidth: 3
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          backdropColor: 'transparent',
          stepSize: 20
        }
      } as any
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'hsl(var(--foreground))'
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="flex-grow p-10 pt-6 container mx-auto">
        <div className="flex gap-8 mb-8">
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col mb-6 w-fit">
              <h1 className="text-5xl font-bold text-primary text-shadow-neon-primary text-left">Geometria</h1>
              <div className="flex items-center w-full mt-1">
                <div className="flex-grow border-t border-muted-foreground"></div>
                <p className="text-sm text-muted-foreground mx-4">Matemáticas</p>
                <div className="flex-grow border-t border-muted-foreground"></div>
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-secondary/20">
              <p className="mb-0">
                La geometría es una rama de las matemáticas que estudia las propiedades y relaciones de figuras y espacios, analizando formas, tamaños y posiciones de elementos como puntos, líneas, planos y volúmenes. Abarca desde la geometría euclidiana, que explora espacios planos, hasta la no euclidiana, analítica, diferencial y topología, utilizando axiomas, teoremas y coordenadas. Es esencial en arquitectura, física, informática y arte, modelando desde estructuras y trayectorias hasta gráficos 3D y perspectivas.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex-shrink-0">
              <Dog className="w-24 h-24 lg:w-32 lg:h-32 text-primary opacity-75 text-shadow-neon-primary" strokeWidth={1.5} />
            </div>
            <div className="w-32 h-56 border border-border rounded-lg flex items-center justify-center bg-secondary">
              <div className="flex items-center justify-center" style={{ fontSize: '4rem' }}>
                🦴
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Te va bien en:</h3>
              <ul>
                {strengths.map((item, index) => (
                  <li key={index}>
                    {item.area}: {item.percentage}%
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mt-4 mb-2">Debes Mejorar:</h3>
              <ul>
                {areasToImprove.map((item, index) => (
                  <li key={index}>
                    {item.area}: {item.percentage}%
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-96 h-96">
                <Radar data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="flex items-center w-full mt-8 mb-4">
            <div className="flex-grow border-t-2 border-muted-foreground"></div>
            <p className="text-base text-muted-foreground mx-4 font-bold">//</p>
            <div className="flex-grow border-t-2 border-muted-foreground"></div>
          </div>
          <h3 className="text-lg font-semibold mt-8 mb-2">Recomendaciones</h3>
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent className="-ml-3">
              {recommendations.map((rec, index) => (
                <CarouselItem key={index} className="basis-1/3 md:basis-1/5 lg:basis-1/3 p-5 md:p-2">
                  <a href={rec.url} target="_blank" className="border p-6 rounded block w-full text-center">{rec.text}</a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h3 className="text-lg font-semibold mt-8 mb-2">Ponte a Prueba!</h3>
          <div className="border p-4 rounded">Content for "Ponte a Prueba!"</div>
        </div>
      </div>
      <div className="w-1/4 border-l border-border p-4 hidden md:block bg-primary/10">
        <div className="flex items-center space-x-2">
          <Checkbox id="showCalendar" checked={showCalendar} onCheckedChange={() => setShowCalendar(!showCalendar)} />
          <label
            htmlFor="showCalendar"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Calendario
          </label>
        </div>
        {showCalendar && <Calendar className="mt-4" />}
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="showTimer" checked={showTimer} onCheckedChange={() => setShowTimer(!showTimer)} />
          <label
            htmlFor="showTimer"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >Temporizador</label>
        </div>
        {showTimer && (
          <Timer
            timeLeft={timeLeft}
            phase={phase}
            isRunning={isRunning}
            workDuration={workDuration}
            shortBreakDuration={shortBreakDuration}
            longBreakDuration={longBreakDuration}
            handleStartPause={handleStartPause}
            handleReset={handleReset}
            setWorkDuration={setWorkDuration}
            setShortBreakDuration={setShortBreakDuration}
            setLongBreakDuration={setLongBreakDuration}
            handlePhaseChange={handlePhaseChange}
          />
        )}
      </div>
    </div>
  );
};

export default GeometriaPage;