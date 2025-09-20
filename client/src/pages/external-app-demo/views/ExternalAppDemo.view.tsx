import { useState, useCallback, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/lib/ui-library/TagSelector';
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem } from '@/lib/ui-library/types/language';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Building2, Coffee, Palette, Code2 } from 'lucide-react';

// Simular una aplicación externa - Demo de un sistema de gestión de proyectos
function ExternalAppContent() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    skills: [] as TagItem[],
    categories: [] as TagItem[]
  });

  // Simular función async para cargar skills desde una API
  const getSkillsFromAPI = useCallback(async (): Promise<TagItem[]> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 'react',
        label: {
          en: 'React',
          es: 'React',
          fr: 'React',
          default: 'React'
        },
        metadata: {
          colors: {
            light: {
              selected: { background: '#61dafb', text: '#000', border: '#61dafb' }
            }
          }
        }
      },
      {
        id: 'typescript',
        label: {
          en: 'TypeScript',
          es: 'TypeScript', 
          fr: 'TypeScript',
          default: 'TypeScript'
        },
        metadata: {
          colors: {
            light: {
              selected: { background: '#3178c6', text: '#fff', border: '#3178c6' }
            }
          }
        }
      },
      {
        id: 'nodejs',
        label: {
          en: 'Node.js',
          es: 'Node.js',
          fr: 'Node.js', 
          default: 'Node.js'
        },
        metadata: {
          colors: {
            light: {
              selected: { background: '#339933', text: '#fff', border: '#339933' }
            }
          }
        }
      },
      {
        id: 'python',
        label: {
          en: 'Python',
          es: 'Python',
          fr: 'Python',
          default: 'Python'
        },
        metadata: {
          colors: {
            light: {
              selected: { background: '#3776ab', text: '#fff', border: '#3776ab' }
            }
          }
        }
      },
      {
        id: 'design',
        label: {
          en: 'UI/UX Design',
          es: 'Diseño UI/UX',
          fr: 'Design UI/UX',
          default: 'UI/UX Design'
        },
        metadata: {
          colors: {
            light: {
              selected: { background: '#ff6b6b', text: '#fff', border: '#ff6b6b' }
            }
          }
        }
      }
    ];
  }, []);

  // Simular función async para cargar categorías de proyecto
  const getProjectCategoriesFromAPI = useCallback(async (): Promise<TagItem[]> => {
    // Simular delay de red diferente
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'web',
        label: {
          en: 'Web Development',
          es: 'Desarrollo Web',
          fr: 'Développement Web',
          default: 'Web Development'
        }
      },
      {
        id: 'mobile',
        label: {
          en: 'Mobile App',
          es: 'Aplicación Móvil',
          fr: 'Application Mobile',
          default: 'Mobile App'
        }
      },
      {
        id: 'api',
        label: {
          en: 'API Development',
          es: 'Desarrollo de API',
          fr: 'Développement API',
          default: 'API Development'
        }
      },
      {
        id: 'data',
        label: {
          en: 'Data Analysis',
          es: 'Análisis de Datos',
          fr: 'Analyse de Données',
          default: 'Data Analysis'
        }
      }
    ];
  }, []);

  // Actualizar datos del proyecto cuando cambian las selecciones
  useEffect(() => {
    setProjectData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => selectedSkills.includes(skill.id)),
      categories: prev.categories.filter(cat => selectedCategories.includes(cat.id))
    }));
  }, [selectedSkills, selectedCategories]);

  // Función para cambiar idioma de la aplicación
  const changeAppLanguage = (langCode: string) => {
    setLanguage(langCode);
    // En una app real, aquí también cambiarías el idioma de tu sistema i18n
    localStorage.setItem('app-language', langCode);
  };

  // Obtener texto según idioma actual
  const getText = (key: string): string => {
    const texts: Record<string, Record<string, string>> = {
      en: {
        title: 'Project Management System',
        subtitle: 'External Application Demo',
        description: 'This simulates a real external application consuming the TagSelector library with proper LanguageProvider setup.',
        currentLang: 'Current Language',
        projectConfig: 'Project Configuration',
        skillsLabel: 'Required Skills',
        skillsDesc: 'Select the skills required for this project',
        categoriesLabel: 'Project Categories', 
        categoriesDesc: 'Choose the categories that best describe your project',
        selectedItems: 'Selected Items',
        noSkills: 'No skills selected',
        noCategories: 'No categories selected',
        implementationNote: 'Implementation Note',
        noteDesc: 'This page demonstrates how to integrate TagSelector in an external application with LanguageProvider setup.',
        saveProject: 'Save Project'
      },
      es: {
        title: 'Sistema de Gestión de Proyectos',
        subtitle: 'Demo de Aplicación Externa',
        description: 'Esto simula una aplicación externa real que consume la librería TagSelector con la configuración correcta de LanguageProvider.',
        currentLang: 'Idioma Actual',
        projectConfig: 'Configuración del Proyecto',
        skillsLabel: 'Habilidades Requeridas',
        skillsDesc: 'Selecciona las habilidades requeridas para este proyecto',
        categoriesLabel: 'Categorías del Proyecto',
        categoriesDesc: 'Elige las categorías que mejor describen tu proyecto',
        selectedItems: 'Elementos Seleccionados',
        noSkills: 'No hay habilidades seleccionadas',
        noCategories: 'No hay categorías seleccionadas',
        implementationNote: 'Nota de Implementación',
        noteDesc: 'Esta página demuestra cómo integrar TagSelector en una aplicación externa con configuración de LanguageProvider.',
        saveProject: 'Guardar Proyecto'
      },
      fr: {
        title: 'Système de Gestion de Projets',
        subtitle: 'Démo d\'Application Externe',
        description: 'Ceci simule une vraie application externe qui consomme la bibliothèque TagSelector avec la configuration correcte de LanguageProvider.',
        currentLang: 'Langue Actuelle',
        projectConfig: 'Configuration du Projet',
        skillsLabel: 'Compétences Requises',
        skillsDesc: 'Sélectionnez les compétences requises pour ce projet',
        categoriesLabel: 'Catégories du Projet',
        categoriesDesc: 'Choisissez les catégories qui décrivent le mieux votre projet',
        selectedItems: 'Éléments Sélectionnés',
        noSkills: 'Aucune compétence sélectionnée',
        noCategories: 'Aucune catégorie sélectionnée',
        implementationNote: 'Note d\'Implémentation',
        noteDesc: 'Cette page démontre comment intégrer TagSelector dans une application externe avec la configuration LanguageProvider.',
        saveProject: 'Sauvegarder le Projet'
      }
    };
    
    const langTexts = texts[currentLanguage] || texts.en;
    return langTexts[key] || texts.en[key] || key;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getText('title')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getText('subtitle')}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300">
          {getText('description')}
        </p>
        
        {/* Language Switcher */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-4 w-4" />
              {getText('currentLang')}: <Badge variant="secondary">{currentLanguage.toUpperCase()}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button 
                variant={currentLanguage === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeAppLanguage('en')}
                data-testid="button-language-en"
              >
                🇺🇸 English
              </Button>
              <Button 
                variant={currentLanguage === 'es' ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeAppLanguage('es')}
                data-testid="button-language-es"
              >
                🇪🇸 Español
              </Button>
              <Button 
                variant={currentLanguage === 'fr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeAppLanguage('fr')}
                data-testid="button-language-fr"
              >
                🇫🇷 Français
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Project Configuration Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {getText('projectConfig')}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Skills Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {getText('skillsLabel')}
              </CardTitle>
              <CardDescription>
                {getText('skillsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TagSelector
                getTagsFunction={getSkillsFromAPI}
                selectedTags={selectedSkills}
                onSelectionChange={(tags: TagItem[]) => {
                  setSelectedSkills(tags.map((t: TagItem) => t.id));
                  setProjectData(prev => ({ ...prev, skills: tags }));
                }}
                allowMultiple={true}
                allowAll={true}
                size="tam-2"
                data-testid="tag-selector-skills"
              />
            </CardContent>
          </Card>

          {/* Categories Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                {getText('categoriesLabel')}
              </CardTitle>
              <CardDescription>
                {getText('categoriesDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TagSelector
                getTagsFunction={getProjectCategoriesFromAPI}
                selectedTags={selectedCategories}
                onSelectionChange={(tags: TagItem[]) => {
                  setSelectedCategories(tags.map((t: TagItem) => t.id));
                  setProjectData(prev => ({ ...prev, categories: tags }));
                }}
                allowMultiple={true}
                requireSelection={true}
                size="tam-3"
                data-testid="tag-selector-categories"
              />
            </CardContent>
          </Card>
        </div>

        {/* Selected Items Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{getText('selectedItems')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{getText('skillsLabel')}:</h4>
              {projectData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {projectData.skills.map(skill => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.label[currentLanguage] || skill.label.default}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getText('noSkills')}
                </p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{getText('categoriesLabel')}:</h4>
              {projectData.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {projectData.categories.map(category => (
                    <Badge key={category.id} variant="outline">
                      {category.label[currentLanguage] || category.label.default}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getText('noCategories')}
                </p>
              )}
            </div>

            <Button className="w-full mt-4" data-testid="button-save-project">
              {getText('saveProject')}
            </Button>
          </CardContent>
        </Card>

        {/* Implementation Note */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              {getText('implementationNote')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {getText('noteDesc')}
            </p>
            <div className="mt-3 p-3 bg-blue-100 dark:bg-blue-900 rounded-md">
              <code className="text-xs text-blue-900 dark:text-blue-100">
                {`// This app is wrapped with LanguageProvider
import { LanguageProvider, useLanguage, TagSelector } from '@/lib/ui-library/TagSelector';

function App() {
  return (
    <LanguageProvider defaultLanguage="en">
      <ExternalAppContent />
    </LanguageProvider>
  );
}`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Componente principal que simula una aplicación externa
export default function ExternalAppDemo() {
  return (
    <LanguageProvider defaultLanguage="en">
      <ExternalAppContent />
    </LanguageProvider>
  );
}