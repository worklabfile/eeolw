const fs = require('fs');
const path = require('path');

// Конфигурация файлов для скриншотов с подписями
const filesToScreenshot = [
  {
    path: 'package.json',
    description: 'Основной файл конфигурации проекта с зависимостями и скриптами',
    language: 'json'
  },
  {
    path: 'vite.config.ts',
    description: 'Конфигурация сборщика Vite с настройкой путей и плагинов',
    language: 'typescript'
  },
  {
    path: 'tsconfig.json',
    description: 'Конфигурация TypeScript для строгой типизации',
    language: 'json'
  },
  {
    path: 'tailwind.config.ts',
    description: 'Настройки Tailwind CSS и компонентов shadcn/ui',
    language: 'typescript'
  },
  {
    path: 'src/main.tsx',
    description: 'Точка входа в React приложение',
    language: 'typescript'
  },
  {
    path: 'src/App.tsx',
    description: 'Главный компонент приложения с маршрутизацией',
    language: 'typescript'
  },
  {
    path: 'src/index.css',
    description: 'Глобальные стили приложения с Tailwind CSS',
    language: 'css'
  },
  {
    path: 'src/pages/Index.tsx',
    description: 'Главная страница приложения с приветствием',
    language: 'typescript'
  },
  {
    path: 'src/pages/About.tsx',
    description: 'Страница с информацией о музыкальной группе',
    language: 'typescript'
  },
  {
    path: 'src/pages/Music.tsx',
    description: 'Страница с альбомами и аудиоплеером',
    language: 'typescript'
  },
  {
    path: 'src/pages/Tour.tsx',
    description: 'Страница туров и расписания концертов',
    language: 'typescript'
  },
  {
    path: 'src/pages/TicketPurchase.tsx',
    description: 'Форма покупки билетов с выбором места',
    language: 'typescript'
  },
  {
    path: 'src/pages/TicketSuccess.tsx',
    description: 'Страница подтверждения успешной покупки',
    language: 'typescript'
  },
  {
    path: 'src/pages/Contact.tsx',
    description: 'Контактная страница с формой обратной связи',
    language: 'typescript'
  },
  {
    path: 'src/pages/NotFound.tsx',
    description: 'Страница 404 с навигацией обратно',
    language: 'typescript'
  },
  {
    path: 'README.md',
    description: 'Документация проекта с инструкциями по установке',
    language: 'markdown'
  },
  {
    path: 'ДОКУМЕНТАЦИЯ_КУРСОВОЙ.md',
    description: 'Подробная документация курсовой работы',
    language: 'markdown'
  },
  {
    path: 'ПРЕЗЕНТАЦИЯ_КУРСОВОЙ.md',
    description: 'Краткое описание для презентации проекта',
    language: 'markdown'
  }
];

// HTML шаблон для отображения кода
const htmlTemplate = (title, description, code, language) => `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #252526;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            background: #2d2d30;
            padding: 15px 20px;
            border-bottom: 1px solid #3e3e42;
        }
        
        .title {
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 5px;
        }
        
        .description {
            font-size: 14px;
            color: #cccccc;
            line-height: 1.4;
        }
        
        .code-container {
            padding: 20px;
            overflow-x: auto;
        }
        
        .code {
            font-size: 13px;
            line-height: 1.5;
            white-space: pre;
            color: #d4d4d4;
        }
        
        .keyword { color: #569cd6; }
        .string { color: #ce9178; }
        .comment { color: #6a9955; }
        .function { color: #dcdcaa; }
        .number { color: #b5cea8; }
        .operator { color: #d4d4d4; }
        
        .file-info {
            background: #007acc;
            color: white;
            padding: 8px 15px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .language-badge {
            background: #007acc;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            display: inline-block;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="title">
                ${title}
                <span class="language-badge">${language.toUpperCase()}</span>
            </div>
            <div class="description">${description}</div>
        </div>
        <div class="file-info">Первые 100 строк кода</div>
        <div class="code-container">
            <pre class="code">${escapeHtml(code)}</pre>
        </div>
    </div>
</body>
</html>
`;

// Функция для экранирования HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

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

// Функция для создания HTML файла с кодом
function createHtmlFile(filePath, description, content, language) {
    const fileName = path.basename(filePath);
    const htmlFileName = `${fileName.replace(/[^a-zA-Z0-9]/g, '_')}_code.html`;
    const htmlFilePath = path.join('screenshots', htmlFileName);
    
    const title = `Код файла: ${fileName}`;
    const htmlContent = htmlTemplate(title, description, content, language);
    
    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    return htmlFilePath;
}

// Основная функция
function generateCodeScreenshots() {
    console.log('🚀 Начинаем создание HTML файлов с кодом для скриншотов...\n');
    
    // Создаем папку screenshots если её нет
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }
    
    const createdFiles = [];
    
    filesToScreenshot.forEach((file, index) => {
        console.log(`📁 Обрабатываем файл ${index + 1}/${filesToScreenshot.length}: ${file.path}`);
        
        if (fs.existsSync(file.path)) {
            const content = getFirst100Lines(file.path);
            if (content) {
                const htmlFilePath = createHtmlFile(file.path, file.description, content, file.language);
                createdFiles.push({
                    path: htmlFilePath,
                    description: file.description,
                    originalFile: file.path
                });
                console.log(`✅ Создан HTML файл: ${htmlFilePath}`);
            }
        } else {
            console.log(`❌ Файл не найден: ${file.path}`);
        }
        
        console.log('');
    });
    
    // Создаем индексный файл
    createIndexFile(createdFiles);
    
    console.log('🎉 Процесс создания HTML файлов завершен!');
    console.log('📁 Все файлы сохранены в папке screenshots/');
    console.log('\n📋 Инструкции для создания скриншотов:');
    console.log('1. Откройте созданные HTML файлы в браузере');
    console.log('2. Сделайте скриншот страницы (Cmd+Shift+4 на macOS)');
    console.log('3. Сохраните скриншоты в папку screenshots/');
    console.log('4. Используйте подписи из документации для презентации');
    console.log('\n📖 Откройте index.html в папке screenshots для навигации по всем файлам');
}

// Функция для создания индексного файла
function createIndexFile(files) {
    const indexHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Скриншоты кода - Курсовая работа</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .file-list {
            list-style: none;
        }
        
        .file-item {
            margin-bottom: 15px;
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            background: #fafafa;
        }
        
        .file-item:hover {
            background: #f0f0f0;
            border-color: #007acc;
        }
        
        .file-link {
            color: #007acc;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
        }
        
        .file-link:hover {
            text-decoration: underline;
        }
        
        .file-description {
            color: #666;
            margin-top: 5px;
            font-size: 14px;
        }
        
        .instructions {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .instructions h3 {
            color: #1976d2;
            margin-bottom: 10px;
        }
        
        .instructions ul {
            margin-left: 20px;
        }
        
        .instructions li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📸 Скриншоты кода для курсовой работы</h1>
        
        <div class="instructions">
            <h3>📋 Инструкции по созданию скриншотов:</h3>
            <ul>
                <li>Нажмите на ссылку файла для открытия в браузере</li>
                <li>Сделайте скриншот страницы (Cmd+Shift+4 на macOS)</li>
                <li>Сохраните скриншот в папку screenshots/</li>
                <li>Используйте подписи из документации для презентации</li>
            </ul>
        </div>
        
        <h2>📁 Файлы для скриншотов:</h2>
        <ul class="file-list">
            ${files.map(file => `
                <li class="file-item">
                    <a href="${path.basename(file.path)}" class="file-link" target="_blank">
                        📄 ${path.basename(file.originalFile)}
                    </a>
                    <div class="file-description">${file.description}</div>
                </li>
            `).join('')}
        </ul>
    </div>
</body>
</html>
    `;
    
    const indexPath = path.join('screenshots', 'index.html');
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log(`📖 Создан индексный файл: ${indexPath}`);
}

// Запускаем скрипт
generateCodeScreenshots(); 