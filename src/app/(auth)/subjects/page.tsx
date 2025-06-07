'use client';
import React, { useState } from 'react';

// Define interfaces for props and data
interface CardProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface ProgressProps {
  value: number;
  className?: string;
}

interface SubTopic {
  title: string;
  subtitle: string; // Explanatory text
  content: string;
}

interface Subject {
  title: string;
  description: string;
  subTopics: SubTopic[];
}

// BackgroundCard component for subtopic cards
const BackgroundCard: React.FC<{
  subTopic: SubTopic;
  subIndex: number;
  isActive: boolean;
  index: number;
  onClick: () => void;
}> = ({ subTopic, subIndex, isActive, index, onClick }) => {
  const zIndex = isActive ? 30 : 10 - subIndex;
  const baseTranslateX = index % 2 === 0 ? subIndex * 15 : -subIndex * 15;
  const expandTranslateX = index % 2 === 0 ? 500 : -500;

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full border border-primary/30 bg-white rounded-lg transition-all duration-300 cursor-pointer ${isActive ? 'shadow-2xl bg-gray-50' : 'hover:shadow-lg hover:bg-gray-100'}`}
      style={{
        zIndex,
        transform: isActive
          ? `translateX(${expandTranslateX}px) scale(1)`
          : `translate(${baseTranslateX}px, ${subIndex * 10}px)`,
        opacity: isActive ? 1 : 0.9 - subIndex * 0.1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="pt-8 pb-8 pl-8 pr-16 flex flex-col gap-1.5 w-[490px] h-full max-h-[270px]">
        <h3 className="text-xl font-semibold dark:text-black">
          {subTopic.title}
        </h3>
        <p className={`text-base font-medium ${isActive ? 'text-gray-800' : 'text-gray-500'} line-clamp-2`}>
          {subTopic.subtitle}
        </p>
        <p className="text-sm text-black line-clamp-4">
          {subTopic.content}
        </p>
        <button
          className="mt-auto w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card's onClick from triggering
            console.log(`Button clicked for ${subTopic.title}`);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

// Card component
const Card: React.FC<CardProps> = ({ className, children, style, onClick }) => (
  <div
    className={`bg-white shadow-md rounded-lg border border-gray-200 ${className}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </div>
);

// CardHeader component
const CardHeader: React.FC<CardProps> = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

// CardTitle component
const CardTitle: React.FC<CardProps> = ({ children }) => (
  <h2 className="text-xl font-semibold dark:text-black">{children}</h2>
);

// CardContent component
const CardContent: React.FC<CardProps> = ({ children }) => (
  <div className="px-6 py-4 flex flex-col gap-4 overflow-y-auto dark:text-black">{children}</div>
);

// Progress component
const Progress: React.FC<ProgressProps> = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
    <div
      className="bg-blue-600 h-2.5 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

// Subjects data with longer descriptions
const subjects: Subject[] = [
  {
    title: 'Matemática',
    description: 'Estudia los números, el espacio, la cantidad, la estructura y el cambio.',
    subTopics: [
      { 
        title: 'Álgebra', 
        subtitle: 'Estudio de ecuaciones', 
        content: 'Explora ecuaciones y funciones matemáticas, abordando temas como las expresiones algebraicas, las incógnitas y las soluciones de sistemas lineales. Aprenderás a manipular ecuaciones para resolver problemas prácticos y teóricos.' 
      },
      { 
        title: 'Geometría', 
        subtitle: 'Formas y espacios', 
        content: 'Estudia las propiedades de las formas y los espacios en dos y tres dimensiones. Incluye temas como ángulos, polígonos, círculos y sólidos geométricos, con un enfoque en demostraciones y aplicaciones prácticas.' 
      },
      { 
        title: 'Cálculo', 
        subtitle: 'Análisis de cambios', 
        content: 'Se centra en el análisis de funciones y sus cambios a través de conceptos como derivadas e integrales. Explora cómo las tasas de cambio y las acumulaciones se aplican en áreas como la física, la ingeniería y la economía.' 
      },
      { 
        title: 'Estadística', 
        subtitle: 'Datos y análisis', 
        content: 'Se ocupa de la recolección, organización y análisis de datos para extraer información significativa. Aprenderás a usar medidas como la media, la mediana y la desviación estándar, así como a interpretar gráficos y probabilidades.' 
      },
    ],
  },
  {
    title: 'Ciencias',
    description: 'Exploración del mundo natural a través de observación y experimentación.',
    subTopics: [
      { 
        title: 'Física', 
        subtitle: 'Movimiento y energía', 
        content: 'Aborda los conceptos fundamentales del movimiento, la energía y las fuerzas en el universo. Estudiarás temas como la mecánica, la termodinámica y el electromagnetismo, aplicándolos a fenómenos cotidianos y tecnológicos.' 
      },
      { 
        title: 'Química', 
        subtitle: 'Composición de la materia', 
        content: 'Explora la composición, estructura y propiedades de la materia, así como las reacciones químicas. Aprenderás sobre elementos, compuestos, enlaces químicos y cómo estas interacciones afectan el mundo que nos rodea.' 
      },
      { 
        title: 'Astronomía', 
        subtitle: 'Cuerpos celestes', 
        content: 'Se enfoca en la exploración de los cuerpos celestes como estrellas, planetas y galaxias. Estudiarás el movimiento de los astros, la formación del universo y los fenómenos cósmicos, como los agujeros negros y las supernovas.' 
      },
    ],
  },
  {
    title: 'Lectura Crítica',
    description: 'Habilidad para analizar, evaluar e interpretar textos.',
    subTopics: [
      { 
        title: 'Análisis', 
        subtitle: 'Comprensión lectora', 
        content: 'Desarrolla técnicas para comprender textos complejos, identificar ideas principales y secundarias, y analizar la estructura del discurso. Practicarás con diferentes géneros literarios y textos informativos para mejorar tu comprensión.' 
      },
      { 
        title: 'Interpretación', 
        subtitle: 'Significados de textos', 
        content: 'Te enseña a extraer significados implícitos y explícitos de los textos, analizando el contexto, el tono y las intenciones del autor. Aprenderás a conectar ideas y a formular hipótesis basadas en la información presentada.' 
      },
      { 
        title: 'Evaluación', 
        subtitle: 'Validez de argumentos', 
        content: 'Te permite juzgar la validez y consistencia de los argumentos presentados en un texto. Aprenderás a identificar falacias, evaluar evidencias y determinar la solidez de las conclusiones en debates y ensayos.' 
      },
    ],
  },
  {
    title: 'Sociales',
    description: 'Estudio de las sociedades humanas y sus relaciones.',
    subTopics: [
      { 
        title: 'Historia', 
        subtitle: 'Culturas pasadas', 
        content: 'Analiza los eventos y culturas del pasado para entender el desarrollo de las sociedades humanas. Estudiarás períodos clave como la antigüedad, la edad media y la modernidad, explorando su impacto en el mundo actual.' 
      },
      { 
        title: 'Geografía', 
        subtitle: 'Paisajes y poblaciones', 
        content: 'Explora los paisajes físicos y las poblaciones humanas, analizando cómo interactúan entre sí. Aprenderás sobre climas, ecosistemas, migraciones y urbanización, con un enfoque en los desafíos globales actuales.' 
      },
      { 
        title: 'Economía', 
        subtitle: 'Recursos y mercados', 
        content: 'Estudia la gestión de recursos y el funcionamiento de los mercados en las sociedades. Aborda temas como la oferta y la demanda, la producción, el consumo y las políticas económicas que influyen en el desarrollo global.' 
      },
    ],
  },
  {
    title: 'Inglés',
    description: 'Dominio del idioma inglés en sus diferentes habilidades.',
    subTopics: [
      { 
        title: 'Gramática', 
        subtitle: 'Reglas del idioma', 
        content: 'Se enfoca en las reglas y estructuras del idioma inglés para construir oraciones correctas. Estudiarás tiempos verbales, preposiciones, conjunciones y más, practicando su uso en contextos reales y escritos.' 
      },
      { 
        title: 'Vocabulario', 
        subtitle: 'Palabras y significados', 
        content: 'Amplía tu repertorio de palabras y significados en inglés para mejorar tu comunicación. Aprenderás términos comunes y especializados, así como expresiones idiomáticas, a través de ejercicios prácticos y lecturas.' 
      },
      { 
        title: 'Conversación', 
        subtitle: 'Habilidades orales', 
        content: 'Desarrolla tus habilidades orales en inglés para comunicarte con fluidez y confianza. Practicarás la pronunciación, la entonación y el diálogo en situaciones cotidianas, como saludos, viajes y debates.' 
      },
    ],
  },
  {
    title: 'Ciencias',
    description: 'Exploración del mundo natural a través de observación y experimentación.',
    subTopics: [
      { 
        title: 'Biología', 
        subtitle: 'Seres vivos', 
        content: 'Estudia los seres vivos, sus características, funciones y procesos biológicos. Explorarás temas como la célula, la genética, la evolución y los ecosistemas, con un enfoque en cómo los organismos interactúan y se adaptan.' 
      },
      { 
        title: 'Ecología', 
        subtitle: 'Interacciones ambientales', 
        content: 'Analiza las interacciones entre organismos y su entorno natural, desde ecosistemas locales hasta globales. Aprenderás sobre cadenas alimenticias, ciclos biogeoquímicos y la conservación de la biodiversidad frente a los desafíos ambientales.' 
      },
      { 
        title: 'Geología', 
        subtitle: 'Estructura de la Tierra', 
        content: 'Explora la estructura, composición y procesos que han dado forma a la Tierra a lo largo del tiempo. Estudiarás temas como las placas tectónicas, los minerales, los fósiles y los fenómenos geológicos como terremotos y volcanes.' 
      },
    ],
  },
];

// SubjectsPage component
const SubjectsPage: React.FC = () => {
  const [activeSubTopics, setActiveSubTopics] = useState<{ [key: string]: string | null }>({});

  const handleSubTopicClick = (subjectKey: string, subTopicTitle: string) => {
    setActiveSubTopics((prev) => ({
      ...prev,
      [subjectKey]: prev[subjectKey] === subTopicTitle ? null : subTopicTitle,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Explora nuestros Cursos</h1>
      <div className="flex flex-col items-center gap-12">
        {subjects.map((subject, index) => {
          const subjectKey = `${subject.title}-${index}`; // Unique key for each subject
          const activeSubTopic = activeSubTopics[subjectKey];

          return (
            <div
              key={subjectKey}
              className={`relative w-full max-w-md aspect-square ${
                index % 2 === 0 ? 'self-start' : 'self-end'
              } overflow-visible`}
            >
              {/* Subtopic Cards */}
              {subject.subTopics.map((subTopic, subIndex) => (
                <BackgroundCard
                  key={subTopic.title}
                  subTopic={subTopic}
                  subIndex={subIndex}
                  isActive={activeSubTopic === subTopic.title}
                  index={index}
                  onClick={() => handleSubTopicClick(subjectKey, subTopic.title)}
                />
              ))}
              {/* Main Card */}
              <Card
                className="absolute top-0 left-0 w-full h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
                style={{ zIndex: 25, transform: 'translateX(0)' }}
              >
                <CardHeader>
                  <CardTitle>{subject.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{subject.description}</p>
                  <Progress value={Math.random() * 100} className="w-full" />
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectsPage;