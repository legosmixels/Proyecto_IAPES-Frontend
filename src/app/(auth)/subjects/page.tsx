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
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ subTopic, subIndex, isActive, index, onClick }) => {
  const zIndex = isActive ? 30 : 10 - subIndex; // Z-index for stacking and active card
 const expandTranslateX = index % 2 === 0 ? 500 : -500; // Expansion direction

  return (
    isActive ? ( // Correctly starts the conditional rendering
      // Content of the expanded card (only visible when active)
      <div
        className={`absolute top-0 rounded-lg transition-all duration-300 cursor-pointer shadow-2xl bg-gray-50 dark:bg-[#2A3B5C] w-full h-full`}
        style={{
          zIndex,
          transform: `translateX(${expandTranslateX}px) scale(1)`, // Expand away from the main card
       }}
       onClick={(e) => {
         e.stopPropagation();
         onClick();
       }}
     >
       <div className="pt-8 pb-8 pl-8 pr-16 flex flex-col gap-1.5 w-[490px] h-full max-h-[270px]">
         {/* Content when active */}
         <h3 className="text-xl font-semibold dark:text-white">{subTopic.title}</h3>
         <p className="text-base font-medium text-gray-800 line-clamp-2 dark:text-gray-300">{subTopic.subtitle}</p>
         <p className="text-sm text-black line-clamp-4 overflow-hidden dark:text-gray-400">{subTopic.content}</p>
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
   ) : ( // Correctly separates the conditional branches
     // Tab view when not active
      <div
        className={`absolute top-0 rounded-lg transition-all duration-300 cursor-pointer dark:bg-[#1A2A4A] hover:shadow-lg dark:hover:bg-[#2A3B5C] flex items-center justify-center w-[40px] h-[60px]`}
        style={{
          width: '40px', // Narrow width for tabs (can be adjusted)
          height: '60px', // Height for tabs
          zIndex: 10 - subIndex, // Use zIndex for stacking
          transform: index % 2 === 0
 ? `translate(458px, ${subIndex * 55}px)` // For left modules (even index): move to the right of the card (max-w-md + margin)
 : `translate(-50px, ${subIndex * 55}px)`, // For right modules (odd index): keep to the left of the card
        }}
        onClick={(e) => { 
          e.stopPropagation();
          onClick();
        }}
      >
          <span className="text-xl font-bold dark:text-white">
            {subTopic.title.charAt(0)}
          </span>
        </div>
    )
  );
};

// Card component
const Card: React.FC<CardProps> = ({ className, children, style, onClick }) => (
  <div
    className={`bg-white shadow-md rounded-lg border border-gray-200 dark:bg-[#1A2A4A] dark:border-gray-700 ${className}`}
    style={style}
    onClick={onClick}
  >
    {children}
  </div>
);
// CardHeader component
const CardHeader: React.FC<CardProps> = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200 dark:border-blue-600">{children}</div>
);
// CardTitle component
const CardTitle: React.FC<CardProps> = ({ children }) => (
  <h2 className="text-xl font-semibold dark:text-white">{children}</h2>
);
// CardContent component
const CardContent: React.FC<CardProps> = ({ children }) => (
  <div 
    className="px-6 py-4 flex flex-col gap-4 overflow-y-auto dark:text-gray-300"
  >
    {children}
  </div>
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
    description: 'Evalúa las competencias para enfrentarse a situaciones que requieran el uso de herramientas matemáticas de alguna de estas cuatro categorías:<br />- Álgebra<br />- Geometría<br />- Cálculo<br />- Estadística.',
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
    description: 'Evalúa la capacidad para comprender y usar nociones, conceptos y teorías de las ciencias naturales en la solución de problemas, valorando críticamente el conocimiento y sus consecuencias en la sociedad y en el ambiente. Las preguntas de esta prueba evalúan cuatro componentes:<br />- Quimico<br />- Biologico<br />- Fisico<br />- Ciencia, Tecnología y Sociedad',
    subTopics: [
      { 
        title: 'Química', 
        subtitle: 'Composición de la materia', 
        content: 'Explora la composición, estructura y propiedades de la materia, así como las reacciones químicas. Aprenderás sobre elementos, compuestos, enlaces químicos y cómo estas interacciones afectan el mundo que nos rodea.' 
      },
      { 
        title: 'Física', 
        subtitle: 'Movimiento y energía', 
        content: 'Aborda los conceptos fundamentales del movimiento, la energía y las fuerzas en el universo. Estudiarás temas como la mecánica, la termodinámica y el electromagnetismo, aplicándolos a fenómenos cotidianos y tecnológicos.' 
      },
      { 
        title: 'Biologia', 
        subtitle: 'Cuerpos celestes', 
        content: 'Se enfoca en la exploración de los cuerpos celestes como estrellas, planetas y galaxias. Estudiarás el movimiento de los astros, la formación del universo y los fenómenos cósmicos, como los agujeros negros y las supernovas.' 
      },
      { 
        title: 'Ciencia, Tecnología y Sociedad', 
        subtitle: 'Cuerpos celestes', 
        content: 'Se enfoca en la exploración de los cuerpos celestes como estrellas, planetas y galaxias. Estudiarás el movimiento de los astros, la formación del universo y los fenómenos cósmicos, como los agujeros negros y las supernovas.' 
      },
    ],
  },
  {
    title: 'Lectura Crítica',
    description: 'evalúa la capacidad para comprender, interpretar y evaluar textos que pueden encontrarse en la vida cotidiana y en ámbitos académicos no especializados. Las preguntas de esta prueba evalúan tres competencias:<br />- Identificar y entender los contenidos locales<br />- Comprender cómo se articulan las partes para dar un sentido global<br />- Reflexionar a partir de un texto y evaluar su contenido',
    subTopics: [
      { 
        title: 'Locales', 
        subtitle: 'Comprensión lectora', 
        content: 'Desarrolla técnicas para comprender textos complejos, identificar ideas principales y secundarias, y analizar la estructura del discurso. Practicarás con diferentes géneros literarios y textos informativos para mejorar tu comprensión.' 
      },
      { 
        title: 'Globales', 
        subtitle: 'Significados de textos', 
        content: 'Te enseña a extraer significados implícitos y explícitos de los textos, analizando el contexto, el tono y las intenciones del autor. Aprenderás a conectar ideas y a formular hipótesis basadas en la información presentada.' 
      },
      { 
        title: 'Reflexion y Evaluación', 
        subtitle: 'Validez de argumentos', 
        content: 'Te permite juzgar la validez y consistencia de los argumentos presentados en un texto. Aprenderás a identificar falacias, evaluar evidencias y determinar la solidez de las conclusiones en debates y ensayos.' 
      },
    ],
  },
  {
    title: 'Sociales y Ciudadanas',
    description: 'Evalua las herramientas del pensamiento para comprender interconexiones entre eventos históricos y fenómenos sociales, identificar cambios y permanencias en el desarrollo histórico, formular posibles conclusiones a partir de evidencias, examinar consecuencias, analizar las ventajas y desventajas de la aplicación de teorías sociales, mediante 3 componentes: <br />- Pensamiento social <br />- Interpretación y análisis de perspectivas <br />- Pensamiento reflexivo y sistémico',
    subTopics: [
      { 
        title: 'Social', 
        subtitle: 'lol', 
        content: 'Analiza los eventos y culturas del pasado para entender el desarrollo de las sociedades humanas. Estudiarás períodos clave como la antigüedad, la edad media y la modernidad, explorando su impacto en el mundo actual.' 
      },
      { 
        title: 'Interpretación y análisis de perspectivas', 
        subtitle: 'lol', 
        content: 'Explora los paisajes físicos y las poblaciones humanas, analizando cómo interactúan entre sí. Aprenderás sobre climas, ecosistemas, migraciones y urbanización, con un enfoque en los desafíos globales actuales.' 
      },
      { 
        title: 'Pensamiento reflexivo y sistémico', 
        subtitle: 'Recursos y mercados', 
        content: 'Estudia la gestión de recursos y el funcionamiento de los mercados en las sociedades. Aborda temas como la oferta y la demanda, la producción, el consumo y las políticas económicas que influyen en el desarrollo global.' 
      },
    ],
  },
  {
    title: 'Inglés',
    description: 'Evalua las habilidades comunicativas en materia de lectura y del uso de la lengua. Para ello, cada una de las siete partes que componen la prueba de Inglés evalúa una habilidad específica de la lengua inglesa divida en los siguientes 3 componentes: <br />- Gramática<br />- Vocabulario<br />- Lexico-gramatical (Comprension de Textos)',
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
        title: 'Lexico-Gramatico', 
        subtitle: 'Habilidades orales', 
        content: 'Desarrolla tus habilidades orales en inglés para comunicarte con fluidez y confianza. Practicarás la pronunciación, la entonación y el diálogo en situaciones cotidianas, como saludos, viajes y debates.' 
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
    <div className="container mx-auto px-4 py-6"> {/* Usamos un único div raíz con clases de contenedor */}
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Explora nuestros Cursos</h1>
      <div className="flex flex-col items-center gap-24 md:gap-12"> {/* Increased gap for visual separation */}
        <div className="w-full px-4"> {/* Added div for horizontal padding */}
          {subjects.map((subject, index) => { // Ensured this div is flex col to enable self-start/self-end for children
            const subjectKey = `${subject.title}-${index}`;
            const activeSubTopic = activeSubTopics[subjectKey];

            return (
              <div
                key={subjectKey} // Key must be on the outer element of the map
                className={`relative w-full max-w-md aspect-square ${![0, 2, 4].includes(index) ? 'ml-auto' : ''} overflow-visible mb-12 md:mb-0`} // Apply ml-auto if index is not in the left-aligned group
              >
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
                <Card
                  className="absolute top-0 left-0 w-full h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
                  style={{ zIndex: 25 }}
                >
                  <CardHeader>
                    <CardTitle>{subject.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p dangerouslySetInnerHTML={{ __html: subject.description }}></p>
                    <div className="flex justify-between items-center mt-auto">
                      <button
                        className="w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`Saber más clicked for ${subject.title}`);
                        }}
                      >
                        Saber más
                      </button>
                      <button
                        className="w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" // Eliminamos 'ml-auto' si estaba aquí
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`Evaluar clicked for ${subject.title}`);
                        }}
                      >
                        Evaluar
                      </button>
                    </div>
                    <Progress value={Math.random() * 100} className="w-full" />
                  </CardContent>
                </Card>
              </div>
            );
          })} {/* Cierre del mapeo de subjects */}
        </div>
      </div>
    </div> // Cierre del div raíz
  );
};

export default SubjectsPage;
