const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Конфигурация файлов для скриншотов с подписями
const filesToScreenshot = [
  {
    path: 'package.json',
    description: 'Основной файл конфигурации проекта с зависимостями и скриптами'
  },
  {
    path: 'vite.config.ts',
    description: 'Конфигурация сборщика Vite с настройкой путей и плагинов'
  },
  {
    path: 'tsconfig.json',
    description: 'Конфигурация TypeScript для строгой типизации'
  },
  {
    path: 'tailwind.config.ts',
    description: 'Настройки Tailwind CSS и компонентов shadcn/ui'
  },
  {
    path: 'src/main.tsx',
    description: 'Точка входа в React приложение'
  },
  {
    path: 'src/App.tsx',
    description: 'Главный компонент приложения с маршрутизацией'
  },
  {
    path: 'src/index.css',
    description: 'Глобальные стили приложения с Tailwind CSS'
  },
  {
    path: 'src/pages/Index.tsx',
    description: 'Главная страница приложения с приветствием'
  },
  {
    path: 'src/pages/About.tsx',
    description: 'Страница с информацией о музыкальной группе'
  },
  {
    path: 'src/pages/Music.tsx',
    description: 'Страница с альбомами и аудиоплеером'
  },
  {
    path: 'src/pages/Tour.tsx',
    description: 'Страница туров и расписания концертов'
  },
  {
    path: 'src/pages/TicketPurchase.tsx',
    description: 'Форма покупки билетов с выбором места'
  },
  {
    path: 'src/pages/TicketSuccess.tsx',
    description: 'Страница подтверждения успешной покупки'
  },
  {
    path: 'src/pages/Contact.tsx',
    description: 'Контактная страница с формой обратной связи'
  },
  {
    path: 'src/pages/NotFound.tsx',
    description: 'Страница 404 с навигацией обратно'
  },
  {
    path: 'README.md',
    description: 'Документация проекта с инструкциями по установке'
  },
  {
    path: 'ДОКУМЕНТАЦИЯ_КУРСОВОЙ.md',
    description: 'Подробная документация курсовой работы'
  },
  {
    path: 'ПРЕЗЕНТАЦИЯ_КУРСОВОЙ.md',
    description: 'Краткое описание для презентации проекта'
  }
];

// Функция для получения первых 100 строк файла
function getFirst100Lines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    return lines.slice(0, 100).join('\n');
  } catch (error) {
    console.error(`Ошибка чтения файла ${filePath}:`, error.message);
    return '';
  }
}

// Функция для создания временного файла с кодом и подписью
function createTempFile(filePath, description, content) {
  const fileName = path.basename(filePath);
  const tempFileName = `temp_${fileName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
  const tempFilePath = path.join('screenshots', tempFileName);
  
  const header = `// ${description}\n`;
  const separator = '='.repeat(80) + '\n';
  const fileHeader = `Файл: ${filePath}\n`;
  const contentHeader = 'Первые 100 строк кода:\n' + '='.repeat(80) + '\n\n';
  
  const fullContent = header + separator + fileHeader + contentHeader + content;
  
  fs.writeFileSync(tempFilePath, fullContent, 'utf8');
  return tempFilePath;
}

// Функция для создания скриншота с помощью terminal-notifier или другого инструмента
function createScreenshot(tempFilePath, outputPath) {
  try {
    // Используем open для открытия файла в редакторе и затем делаем скриншот
    // Для macOS можно использовать screencapture
    const fileName = path.basename(tempFilePath, '.txt');
    const screenshotPath = path.join('screenshots', `${fileName}.png`);
    
    // Открываем файл в текстовом редакторе (например, VS Code)
    execSync(`code ${tempFilePath}`, { stdio: 'ignore' });
    
    // Ждем немного для загрузки редактора
    setTimeout(() => {
      try {
        // Делаем скриншот активного окна (macOS)
        execSync(`screencapture -W "${screenshotPath}"`, { stdio: 'ignore' });
        console.log(`✅ Скриншот создан: ${screenshotPath}`);
      } catch (error) {
        console.log(`⚠️  Не удалось создать скриншот автоматически. Откройте файл ${tempFilePath} в редакторе и сделайте скриншот вручную.`);
      }
    }, 2000);
    
  } catch (error) {
    console.error(`Ошибка создания скриншота для ${tempFilePath}:`, error.message);
  }
}

// Основная функция
function generateScreenshots() {
  console.log('🚀 Начинаем создание скриншотов кода...\n');
  
  // Создаем папку screenshots если её нет
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  
  filesToScreenshot.forEach((file, index) => {
    console.log(`📁 Обрабатываем файл ${index + 1}/${filesToScreenshot.length}: ${file.path}`);
    
    if (fs.existsSync(file.path)) {
      const content = getFirst100Lines(file.path);
      if (content) {
        const tempFilePath = createTempFile(file.path, file.description, content);
        console.log(`📝 Создан временный файл: ${tempFilePath}`);
        
        // Создаем скриншот
        createScreenshot(tempFilePath, file.path);
        
        // Удаляем временный файл через некоторое время
        setTimeout(() => {
          try {
            fs.unlinkSync(tempFilePath);
            console.log(`🗑️  Удален временный файл: ${tempFilePath}`);
          } catch (error) {
            // Игнорируем ошибки удаления
          }
        }, 10000);
      }
    } else {
      console.log(`❌ Файл не найден: ${file.path}`);
    }
    
    console.log('');
  });
  
  console.log('🎉 Процесс создания скриншотов завершен!');
  console.log('📁 Все скриншоты сохранены в папке screenshots/');
  console.log('\n📋 Инструкции:');
  console.log('1. Откройте созданные временные файлы в текстовом редакторе');
  console.log('2. Сделайте скриншот окна редактора');
  console.log('3. Сохраните скриншоты в папку screenshots/');
  console.log('4. Используйте подписи из документации для презентации');
}

// Запускаем скрипт
generateScreenshots(); 