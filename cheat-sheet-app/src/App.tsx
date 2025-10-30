import React, { useState } from 'react';

import './styles.css';



interface CheatItem {
    title: string;
    syntax: string;
    example: string;
}

interface SubjectData {
    name: string;
    items: CheatItem[];
}


const allSubjects: Record<string, SubjectData> = {
    "Python": {
        name: "Python",
        items: [
            {
                title: "Variables & Data Types",
                syntax: "variable_name = value\n# Types: int, float, str, bool, list, tuple, dict, set",
                example: "name = \"Alice\"  # string\nage = 25  # integer\nheight = 5.9  # float\nis_active = True  # boolean\nscores = [90, 85, 88]  # list\npoint = (10, 20)  # tuple\nuser = {'name': 'Bob', 'age': 30}  # dict"
            },
            {
                title: "Functions & Lambda",
                syntax: "def function_name(parameters):\n    return value\n\nlambda params: expression",
                example: "def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\nsquare = lambda x: x ** 2\nprint(square(5))  # 25"
            },
            {
                title: "List Comprehensions",
                syntax: "[expression for item in iterable if condition]",
                example: "squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]"
            },
        ]
    },
    "Go": {
        name: "Go",
        items: [
            {
                title: "Variables & Constants",
                syntax: "var name type = value\nname := value\nconst NAME = value",
                example: "var name string = \"Alice\"\nage := 25\nvar isActive bool = true\nconst Pi = 3.14159"
            },
            {
                title: "Functions & Multiple Returns",
                syntax: "func name(param type) (returnType, error) {\n    return value, nil\n}",
                example: "func divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero\")\n    }\n    return a / b, nil\n}"
            },
            {
                title: "Structs & Methods",
                syntax: "type Name struct {\n    Field type\n}\n\nfunc (n Name) Method() {}",
                example: "type Person struct {\n    Name string\n    Age  int\n}\n\nfunc (p Person) Greet() string {\n    return fmt.Sprintf(\"Hi, I'm %s\", p.Name)\n}"
            },
            {
                title: "Slices (make)",
                syntax: "var s []type\ns := make([]type, len, cap)\ns := []type{v1, v2, ...}",
                example: "s := make([]string, 3) // [\"\" \"\" \"\"]\ns[0] = \"a\"\ns := []string{\"a\", \"b\", \"c\"}"
            },
            {
                title: "Maps",
                syntax: "m := make(map[keyType]valueType)\nm[key] = value\ndelete(m, key)",
                example: "ages := make(map[string]int)\nages[\"alice\"] = 30\nages[\"bob\"] = 25\ndelete(ages, \"alice\")"
            },
            {
                title: "Loops (for & for-range)",
                syntax: "for init; cond; post {}\nfor cond {}\nfor i, val := range collection {}",
                example: "for i := 0; i < 5; i++ {\n    // 0 to 4\n}\n\ns := []string{\"a\", \"b\"}\nfor i, v := range s {\n    fmt.Println(i, v)\n}"
            },
            {
                title: "Error Handling",
                syntax: "val, err := func()\nif err != nil {\n    // handle error\n}\nfmt.Errorf(\"msg: %w\", err)",
                example: "f, err := os.Open(\"file.txt\")\nif err != nil {\n    log.Fatal(err)\n}\n\nfunc divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, fmt.Errorf(\"can't divide by zero\")\n    }\n    return a / b, nil\n}"
            },
            {
                title: "Interfaces",
                syntax: "type Name interface {\n    MethodName(params) returnType\n}",
                example: "type Shape interface {\n    Area() float64\n}\n\ntype Rect struct { w, h float64 }\nfunc (r Rect) Area() float64 { return r.w * r.h }\n\nfunc PrintArea(s Shape) {\n    fmt.Println(s.Area())\n}"
            },
            {
                title: "Goroutines",
                syntax: "go funcName(params)",
                example: "func say(s string) {\n    for i := 0; i < 3; i++ {\n        fmt.Println(s)\n        time.Sleep(100 * time.Millisecond)\n    }\n}\n\ngo say(\"world\")\nsay(\"hello\")"
            },
            {
                title: "Channels",
                syntax: "ch := make(chan type)\nch <- value // send\nval := <-ch // receive\nclose(ch)",
                example: "ch := make(chan int)\n\ngo func() {\n    ch <- 42 // Send\n}()\n\nval := <-ch // Receive\nfmt.Println(val) // 42\nclose(ch)"
            },
        ]
    },
    "TypeScript": {
        name: "TypeScript",
        items: [
            {
                title: "Variables & Types",
                syntax: "let name: type = value;\nconst name: type = value;",
                example: "let name: string = \"Alice\";\nconst age: number = 25;\nlet values: number[] = [1, 2, 3];"
            },
            {
                title: "Interfaces & Types",
                syntax: "interface Name {\n    property: type;\n}\n\ntype Name = { property: type; }",
                example: "interface Person {\n    name: string;\n    age: number;\n    email?: string;  // optional\n}"
            }
        ]
    },
    "HTML": {
        name: "HTML",
        items: [
            {
                title: "Basic Structure",
                syntax: "<!DOCTYPE html>\n<html>\n<head><title>Title</title></head>\n<body>Content</body>\n</html>",
                example: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>"
            },
            {
                title: "Links & Images",
                syntax: "<a href=\"url\">text</a>\n<img src=\"url\" alt=\"description\">",
                example: "<a href=\"https://example.com\">Visit</a>\n<img src=\"logo.png\" alt=\"Logo\">"
            }
        ]
    },
    "CSS": {
        name: "CSS",
        items: [
            {
                title: "Selectors",
                syntax: "element { }\n.class { }\n#id { }",
                example: "p { color: blue; }\n.title { font-size: 24px; }\n#header { background: #333; }"
            },
            {
                title: "Flexbox",
                syntax: "display: flex;\njustify-content: value;\nalign-items: value;",
                example: "display: flex;\njustify-content: center;\nalign-items: center;\ngap: 10px;"
            }
        ]
    },
    "Markdown": {
        name: "Markdown",
        items: [
            {
                title: "Headings",
                syntax: "# H1\n## H2\n### H3",
                example: "# Main Title\n## Subtitle\n### Section"
            },
            {
                title: "Links & Images",
                syntax: "[text](url)\n![alt](image-url)",
                example: "[Google](https://google.com)\n![Logo](logo.png)"
            }
        ]
    },
    "Typst": {
        name: "Typst",
        items: [
            {
                title: "Headings",
                syntax: "= Heading 1\n== Heading 2\n=== Heading 3",
                example: "= Introduction\n== Background\n=== Methods"
            },
            {
                title: "Text Formatting",
                syntax: "*bold*\n_italic_\n`code`",
                example: "This is *bold* text.\nThis is _italic_ text."
            }
        ]
    },
    "Terminal": {
        name: "Terminal",
        items: [
            {
                title: "Navigation",
                syntax: "cd <directory>\npwd\nls [options]",
                example: "cd /home/user\npwd\nls -lah"
            },
            {
                title: "File Operations",
                syntax: "cp <src> <dest>\nmv <src> <dest>\nrm <file>",
                example: "cp file.txt backup.txt\nmv old.txt new.txt\nrm unwanted.txt"
            }
        ]
    },
    "Git": {
        name: "Git",
        items: [
            {
                title: "Initialize",
                syntax: "git init\ngit clone <url>",
                example: "git init\ngit clone https://github.com/user/repo.git"
            },
            {
                title: "Staging",
                syntax: "git add <file>\ngit add .\ngit reset <file>",
                example: "git add index.html\ngit add .\ngit reset README.md"
            }
        ]
    },
    "Set Theory": {
        name: "Set Theory",
        items: [
            {
                title: "Set Notation",
                syntax: "A = {elements}\n∈ (element of)\n∉ (not element of)",
                example: "A = {1, 2, 3, 4, 5}\n3 ∈ A\n6 ∉ A\n∅ (empty set)"
            },
            {
                title: "Set Operations",
                syntax: "A ∪ B (union)\nA ∩ B (intersection)\nA \\ B (difference)",
                example: "A = {1, 2, 3}\nB = {2, 3, 4}\nA ∪ B = {1, 2, 3, 4}\nA ∩ B = {2, 3}\nA \\ B = {1}"
            }
        ]
    },
};


const navigationGroups = [
    {
        title: "Programming",
        subjects: ["Python", "Go", "TypeScript"]
    },
    {
        title: "Markup & Styling",
        subjects: ["HTML", "CSS", "Markdown", "Typst"]
    },
    {
        title: "Tooling & Concepts",
        subjects: ["Terminal", "Git", "Set Theory"]
    }
];


const ThemeToggle: React.FC<{ theme: string; onToggle: () => void }> = ({ theme, onToggle }) => (
    <label className="theme-switch" title="Toggle theme">
        <input
            type="checkbox"
            checked={theme === 'gruvbox'}
            onChange={onToggle}
        />
        <span className="slider round"></span>
    </label>
);


const AppHeader: React.FC<{ theme: string; onToggleTheme: () => void }> = ({ theme, onToggleTheme }) => (
    <header className="header">
        <div className="header-content">
            <div className="header-logo">
                <pre>
{`
   ____        _      _      _____       __                          
  / __ \\      (_)    | |    |  __ \\     / _|                         
 | |  | |_   _ _  ___| | __ | |__) |___| |_ _ __ ___ _ __   ___ ___  
 | |  | | | | | |/ __| |/ / |  _  // _ \\  _| '__/ _ \\ '_ \\ / __/ _ \\ 
 | |__| | |_| | | (__|   <  | | \\ \\  __/ | | | |  __/ | | | (_|  __/ 
  \\___\\_\\\\__,_|_|\\___|_|\\_\\ |_|  \\_\\___|_| |_|  \\___|_| |_|\\___\\___| 
                                                                     
                                                                                                    
`}
                </pre>
            </div>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
    </header>
);


const Modal: React.FC<{ item: CheatItem; onClose: () => void }> = ({ item, onClose }) => (
    <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">{item.title}</h2>
                <button className="close-button" onClick={onClose} title="Close">
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <div className="code-section">
                    <div className="code-label">Syntax</div>
                    <pre className="modal-code-block"><code>{item.syntax}</code></pre>
                </div>
                <div className="code-section">
                    <div className="code-label">Example</div>
                    <pre className="modal-code-block"><code>{item.example}</code></pre>
                </div>
            </div>
        </div>
    </div>
);


const CheatSheetDisplay: React.FC<{ subject: SubjectData; onCardClick: (item: CheatItem) => void }> = ({ subject, onCardClick }) => (
    <main className="main-content">
        <h2 className="subject-title">{subject.name}</h2>
        <div className="main-content-grid">
            {subject.items.map((item, idx) => (
                <button key={idx} className="concept-card" onClick={() => onCardClick(item)}>
                    <h3 className="card-title">{item.title}</h3>
                    <pre className="card-syntax-preview">
                        <code>{item.syntax}</code>
                    </pre>
                </button>
            ))}
        </div>
    </main>
);


const CheatSheetApp: React.FC = () => {
    const [theme, setTheme] = useState<'monokai' | 'gruvbox'>('monokai');
    const [activeGroupTitle, setActiveGroupTitle] = useState(navigationGroups[0].title);
    const [activeSubjectName, setActiveSubjectName] = useState(navigationGroups[0].subjects[0]);
    const [modalContent, setModalContent] = useState<CheatItem | null>(null);

    const openModal = (item: CheatItem) => {
        setModalContent(item);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    const toggleTheme = () => {
        setTheme(theme === 'monokai' ? 'gruvbox' : 'monokai');
    };

    const handleGroupSelect = (groupTitle: string) => {
        setActiveGroupTitle(groupTitle);
        const newGroup = navigationGroups.find(g => g.title === groupTitle);
        if (newGroup && newGroup.subjects.length > 0) {
            setActiveSubjectName(newGroup.subjects[0]);
        }
    };

    const currentGroup = navigationGroups.find(g => g.title === activeGroupTitle) || navigationGroups[0];
    const currentSubjectData = allSubjects[activeSubjectName];

    return (
        <div className={`app ${theme}`}>
            <AppHeader theme={theme} onToggleTheme={toggleTheme} />

            <nav className="primary-nav">
                {navigationGroups.map(group => (
                    <button
                        key={group.title}
                        className={`nav-tab ${group.title === activeGroupTitle ? 'active' : ''}`}
                        onClick={() => handleGroupSelect(group.title)}
                    >
                        {group.title}
                    </button>
                ))}
            </nav>

            <nav className="secondary-nav">
                {currentGroup.subjects.map(subjectName => (
                    <button
                        key={subjectName}
                        className={`nav-tab-secondary ${subjectName === activeSubjectName ? 'active' : ''}`}
                        onClick={() => setActiveSubjectName(subjectName)}
                    >
                        {subjectName}
                    </button>
                ))}
            </nav>

            <CheatSheetDisplay subject={currentSubjectData} onCardClick={openModal} />

            {modalContent && <Modal item={modalContent} onClose={closeModal} />}
        </div>
    );
};

export default CheatSheetApp;