import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, Terminal, FileText, BookOpen, Palette } from 'lucide-react';
import './styles.css';

interface CheatItem {
    title: string;
    syntax: string;
    example: string;
}

interface Language {
    name: string;
    items: CheatItem[];
}

interface Category {
    name: string;
    icon: React.ReactNode;
    languages: Language[];
}

const cheatSheetData: Category[] = [
    {
        name: "Programming Languages",
        icon: <Code className="w-5 h-5" />,
        languages: [
            {
                name: "Python",
                items: [
                    {
                        title: "Variables & Data Types",
                        syntax: "variable_name = value\n# Types: int, float, str, bool, list, tuple, dict, set",
                        example: "name = \"Alice\"  # string\nage = 25  # integer\nheight = 5.9  # float\nis_active = True  # boolean\nscores = [90, 85, 88]  # list\npoint = (10, 20)  # tuple\nuser = {'name': 'Bob', 'age': 30}  # dict"
                    },
                    {
                        title: "String Operations",
                        syntax: "string.method()\nf\"formatted {var}\"\nstring[start:end]",
                        example: "text = \"Hello World\"\nprint(text.upper())  # HELLO WORLD\nprint(text.lower())  # hello world\nname = \"Alice\"\nprint(f\"Hello, {name}!\")  # Hello, Alice!\nprint(text[0:5])  # Hello\nprint(text.split())  # ['Hello', 'World']"
                    },
                    {
                        title: "Functions & Lambda",
                        syntax: "def function_name(parameters):\n    return value\n\nlambda params: expression",
                        example: "def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\nprint(greet(\"Bob\"))  # Hello, Bob!\nprint(greet(\"Alice\", \"Hi\"))  # Hi, Alice!\n\nsquare = lambda x: x ** 2\nprint(square(5))  # 25"
                    },
                    {
                        title: "List Comprehensions",
                        syntax: "[expression for item in iterable if condition]",
                        example: "squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\nmatrix = [[i*j for j in range(3)] for i in range(3)]\nwords = ['hello', 'world']\nupper = [w.upper() for w in words]"
                    },
                    {
                        title: "Dictionary Operations",
                        syntax: "dict = {key: value}\ndict.get(key, default)\ndict.items(), .keys(), .values()",
                        example: "user = {'name': 'Alice', 'age': 25}\nprint(user['name'])  # Alice\nprint(user.get('email', 'N/A'))  # N/A\nuser['city'] = 'NYC'\nfor key, val in user.items():\n    print(f\"{key}: {val}\")"
                    },
                    {
                        title: "Classes & Objects",
                        syntax: "class ClassName:\n    def __init__(self, params):\n        self.attribute = params\n    def method(self):\n        pass",
                        example: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f\"Hi, I'm {self.name}\"\n\np = Person(\"Alice\", 25)\nprint(p.greet())"
                    },
                    {
                        title: "Loops & Iteration",
                        syntax: "for item in iterable:\n    # code\n\nwhile condition:\n    # code\n\nfor i, item in enumerate(list):",
                        example: "for i in range(5):\n    print(i)\n\nfor char in \"hello\":\n    print(char)\n\nfor i, val in enumerate(['a', 'b', 'c']):\n    print(f\"{i}: {val}\")\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1"
                    },
                    {
                        title: "Exception Handling",
                        syntax: "try:\n    # code\nexcept ExceptionType as e:\n    # handle\nfinally:\n    # cleanup",
                        example: "try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f\"Error: {e}\")\nexcept Exception as e:\n    print(f\"Unexpected: {e}\")\nfinally:\n    print(\"Cleanup code\")"
                    },
                    {
                        title: "File Operations",
                        syntax: "with open('file', 'mode') as f:\n    content = f.read()\n# modes: 'r', 'w', 'a', 'r+'",
                        example: "# Reading\nwith open('data.txt', 'r') as f:\n    content = f.read()\n    lines = f.readlines()\n\n# Writing\nwith open('output.txt', 'w') as f:\n    f.write(\"Hello\\n\")\n    f.writelines(['line1\\n', 'line2\\n'])"
                    },
                    {
                        title: "Imports & Modules",
                        syntax: "import module\nfrom module import function\nimport module as alias",
                        example: "import math\nfrom datetime import datetime\nimport numpy as np\n\nprint(math.pi)\nprint(datetime.now())\nprint(math.sqrt(16))\nfrom collections import Counter"
                    }
                ]
            },
            {
                name: "Go",
                items: [
                    {
                        title: "Variables & Constants",
                        syntax: "var name type = value\nname := value  // short declaration\nconst NAME = value",
                        example: "var name string = \"Alice\"\nage := 25\nvar isActive bool = true\nconst Pi = 3.14159\nvar x, y int = 10, 20\nvar (\n    host = \"localhost\"\n    port = 8080\n)"
                    },
                    {
                        title: "Functions & Multiple Returns",
                        syntax: "func name(param type) (returnType, error) {\n    return value, nil\n}",
                        example: "func divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero\")\n    }\n    return a / b, nil\n}\n\nresult, err := divide(10, 2)\nif err != nil {\n    log.Fatal(err)\n}"
                    },
                    {
                        title: "Structs & Methods",
                        syntax: "type Name struct {\n    Field type\n}\n\nfunc (n Name) Method() {}",
                        example: "type Person struct {\n    Name string\n    Age  int\n}\n\nfunc (p Person) Greet() string {\n    return fmt.Sprintf(\"Hi, I'm %s\", p.Name)\n}\n\np := Person{Name: \"Alice\", Age: 25}\nfmt.Println(p.Greet())"
                    },
                    {
                        title: "Slices & Arrays",
                        syntax: "array := [size]type{values}\nslice := []type{values}\nslice = append(slice, item)",
                        example: "arr := [3]int{1, 2, 3}\nslice := []string{\"a\", \"b\", \"c\"}\nslice = append(slice, \"d\")\nslice2 := make([]int, 5, 10)  // len 5, cap 10\nsubSlice := slice[1:3]  // [\"b\", \"c\"]"
                    },
                    {
                        title: "Maps",
                        syntax: "map[keyType]valueType\nmake(map[keyType]valueType)",
                        example: "ages := map[string]int{\n    \"Alice\": 25,\n    \"Bob\":   30,\n}\n\nages[\"Charlie\"] = 35\nage, exists := ages[\"Alice\"]\nif exists {\n    fmt.Println(age)\n}\ndelete(ages, \"Bob\")"
                    },
                    {
                        title: "Loops (for only)",
                        syntax: "for init; condition; post {}\nfor condition {}\nfor {}  // infinite\nfor i, v := range collection {}",
                        example: "for i := 0; i < 5; i++ {\n    fmt.Println(i)\n}\n\nfor key, value := range myMap {\n    fmt.Println(key, value)\n}\n\nfor _, item := range slice {\n    fmt.Println(item)\n}"
                    },
                    {
                        title: "Goroutines & Channels",
                        syntax: "go function()\nch := make(chan type)\nch <- value  // send\nval := <-ch  // receive",
                        example: "ch := make(chan string)\n\ngo func() {\n    ch <- \"Hello from goroutine\"\n}()\n\nmsg := <-ch\nfmt.Println(msg)\n\n// Buffered channel\nch2 := make(chan int, 2)\nch2 <- 1\nch2 <- 2"
                    },
                    {
                        title: "Interfaces",
                        syntax: "type InterfaceName interface {\n    Method() returnType\n}",
                        example: "type Speaker interface {\n    Speak() string\n}\n\ntype Dog struct{}\n\nfunc (d Dog) Speak() string {\n    return \"Woof!\"\n}\n\nvar s Speaker = Dog{}\nfmt.Println(s.Speak())"
                    },
                    {
                        title: "Error Handling",
                        syntax: "if err != nil {\n    return err\n}\nerrors.New(\"message\")",
                        example: "func readFile(path string) error {\n    data, err := os.ReadFile(path)\n    if err != nil {\n        return fmt.Errorf(\"failed to read: %w\", err)\n    }\n    fmt.Println(string(data))\n    return nil\n}"
                    },
                    {
                        title: "Defer, Panic, Recover",
                        syntax: "defer statement\npanic(value)\nrecover()",
                        example: "func example() {\n    defer fmt.Println(\"cleanup\")\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"Recovered:\", r)\n        }\n    }()\n    panic(\"something went wrong\")\n}"
                    }
                ]
            },
            {
                name: "TypeScript",
                items: [
                    {
                        title: "Variables & Types",
                        syntax: "let name: type = value;\nconst name: type = value;\nvar name: type = value;",
                        example: "let name: string = \"Alice\";\nconst age: number = 25;\nlet isActive: boolean = true;\nlet values: number[] = [1, 2, 3];\nlet tuple: [string, number] = [\"Alice\", 25];\nlet anything: any = \"flexible\";"
                    },
                    {
                        title: "Functions & Arrow Functions",
                        syntax: "function name(param: type): returnType {}\nconst name = (param: type): returnType => {}",
                        example: "function greet(name: string): string {\n    return `Hello, ${name}!`;\n}\n\nconst add = (a: number, b: number): number => a + b;\n\nconst greetOptional = (name: string, greeting = \"Hello\"): string => {\n    return `${greeting}, ${name}!`;\n};"
                    },
                    {
                        title: "Interfaces & Types",
                        syntax: "interface Name {\n    property: type;\n}\n\ntype Name = { property: type; }",
                        example: "interface Person {\n    name: string;\n    age: number;\n    email?: string;  // optional\n}\n\ntype User = {\n    id: number;\n    username: string;\n};\n\nconst person: Person = { name: \"Alice\", age: 25 };"
                    },
                    {
                        title: "Classes",
                        syntax: "class Name {\n    constructor(params) {}\n    method(): type {}\n}",
                        example: "class Person {\n    private name: string;\n    public age: number;\n    \n    constructor(name: string, age: number) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    greet(): string {\n        return `Hi, I'm ${this.name}`;\n    }\n}"
                    },
                    {
                        title: "Generics",
                        syntax: "function name<T>(param: T): T {}\ninterface Name<T> { value: T; }",
                        example: "function identity<T>(arg: T): T {\n    return arg;\n}\n\nconst num = identity<number>(42);\nconst str = identity<string>(\"hello\");\n\ninterface Box<T> {\n    value: T;\n}\n\nconst box: Box<number> = { value: 123 };"
                    },
                    {
                        title: "Union & Intersection Types",
                        syntax: "type A = Type1 | Type2;  // union\ntype B = Type1 & Type2;  // intersection",
                        example: "type ID = string | number;\nlet userId: ID = \"abc123\";\nuserId = 12345;\n\ntype Named = { name: string };\ntype Aged = { age: number };\ntype Person = Named & Aged;\n\nconst p: Person = { name: \"Alice\", age: 25 };"
                    },
                    {
                        title: "Async/Await & Promises",
                        syntax: "async function name(): Promise<type> {\n    const result = await promise;\n}",
                        example: "async function fetchData(): Promise<string> {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    return data;\n}\n\nfetchData()\n    .then(data => console.log(data))\n    .catch(err => console.error(err));"
                    },
                    {
                        title: "Type Guards",
                        syntax: "typeof, instanceof, in\nfunction isType(x: any): x is Type {}",
                        example: "function process(value: string | number) {\n    if (typeof value === \"string\") {\n        return value.toUpperCase();\n    }\n    return value * 2;\n}\n\nfunction isFish(pet: Fish | Bird): pet is Fish {\n    return (pet as Fish).swim !== undefined;\n}"
                    },
                    {
                        title: "Utility Types",
                        syntax: "Partial<T>, Required<T>, Readonly<T>\nPick<T, K>, Omit<T, K>, Record<K, T>",
                        example: "interface User {\n    name: string;\n    age: number;\n    email: string;\n}\n\ntype PartialUser = Partial<User>;\ntype NameOnly = Pick<User, 'name'>;\ntype WithoutEmail = Omit<User, 'email'>;\ntype ReadonlyUser = Readonly<User>;"
                    },
                    {
                        title: "Enums",
                        syntax: "enum Name { Value1, Value2 }\nenum Name { Value = 'string' }",
                        example: "enum Direction {\n    Up = \"UP\",\n    Down = \"DOWN\",\n    Left = \"LEFT\",\n    Right = \"RIGHT\"\n}\n\nconst move = Direction.Up;\n\nenum Status { Active, Inactive, Pending }\nconst userStatus: Status = Status.Active;"
                    }
                ]
            }
        ]
    },
    {
        name: "Markup Languages",
        icon: <FileText className="icon" />,
        languages: [
            {
                name: "HTML",
                items: [
                    {
                        title: "Basic Structure",
                        syntax: "<!DOCTYPE html>\n<html>\n<head><title>Title</title></head>\n<body>Content</body>\n</html>",
                        example: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>"
                    },
                    {
                        title: "Headings",
                        syntax: "<h1>Heading 1</h1>\n...\n<h6>Heading 6</h6>",
                        example: "<h1>Main Title</h1>\n<h2>Subtitle</h2>\n<h3>Section</h3>"
                    },
                    {
                        title: "Links & Images",
                        syntax: "<a href=\"url\">text</a>\n<img src=\"url\" alt=\"description\">",
                        example: "<a href=\"https://example.com\">Visit</a>\n<img src=\"logo.png\" alt=\"Logo\">"
                    },
                    {
                        title: "Lists",
                        syntax: "<ul><li>item</li></ul>\n<ol><li>item</li></ol>",
                        example: "<ul>\n    <li>Coffee</li>\n    <li>Tea</li>\n</ul>"
                    },
                    {
                        title: "Forms",
                        syntax: "<form>\n    <input type=\"text\" name=\"field\">\n    <button>Submit</button>\n</form>",
                        example: "<form action=\"/submit\">\n    <input type=\"email\" name=\"email\">\n    <button type=\"submit\">Send</button>\n</form>"
                    }
                ]
            },
            {
                name: "Markdown",
                items: [
                    {
                        title: "Headings",
                        syntax: "# H1\n## H2\n### H3",
                        example: "# Main Title\n## Subtitle\n### Section"
                    },
                    {
                        title: "Emphasis",
                        syntax: "*italic* or _italic_\n**bold** or __bold__",
                        example: "This is *italic* text.\nThis is **bold** text.\nThis is ***bold italic***."
                    },
                    {
                        title: "Links & Images",
                        syntax: "[text](url)\n![alt](image-url)",
                        example: "[Google](https://google.com)\n![Logo](logo.png)"
                    },
                    {
                        title: "Lists",
                        syntax: "- item\n* item\n1. item",
                        example: "- Coffee\n- Tea\n\n1. First\n2. Second"
                    },
                    {
                        title: "Code",
                        syntax: "`inline code`\n```language\ncode block\n```",
                        example: "`const x = 5;`\n\n```javascript\nfunction hello() {\n    console.log(\"Hi\");\n}\n```"
                    }
                ]
            },
            {
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
                        example: "This is *bold* text.\nThis is _italic_ text.\nThis is `monospace`."
                    },
                    {
                        title: "Lists",
                        syntax: "- item\n+ numbered\n  - nested",
                        example: "- Coffee\n- Tea\n  - Green\n  - Black"
                    },
                    {
                        title: "Math",
                        syntax: "$inline$\n$ display $",
                        example: "Einstein's $E = m c^2$\n\n$ integral_0^oo e^(-x) dif x $"
                    },
                    {
                        title: "Functions",
                        syntax: "#function(args)",
                        example: "#text(red)[Error]\n#align(center)[Title]\n#image(\"pic.png\", width: 80%)"
                    }
                ]
            },
            {
                name: "CSS",
                items: [
                    {
                        title: "Selectors",
                        syntax: "element { }\n.class { }\n#id { }",
                        example: "p { color: blue; }\n.title { font-size: 24px; }\n#header { background: #333; }"
                    },
                    {
                        title: "Colors",
                        syntax: "color: value;\nbackground: value;",
                        example: "color: #ff0000;\ncolor: rgb(255, 0, 0);\nbackground: linear-gradient(to right, red, blue);"
                    },
                    {
                        title: "Box Model",
                        syntax: "margin: value;\npadding: value;\nborder: width style color;",
                        example: "margin: 10px 20px;\npadding: 15px;\nborder: 2px solid #333;"
                    },
                    {
                        title: "Flexbox",
                        syntax: "display: flex;\njustify-content: value;\nalign-items: value;",
                        example: "display: flex;\njustify-content: center;\nalign-items: center;\ngap: 10px;"
                    },
                    {
                        title: "Grid",
                        syntax: "display: grid;\ngrid-template-columns: values;",
                        example: "display: grid;\ngrid-template-columns: 1fr 2fr 1fr;\ngap: 20px;"
                    }
                ]
            }
        ]
    },
    {
        name: "Terminal",
        icon: <Terminal className="icon" />,
        languages: [
            {
                name: "Git Commands",
                items: [
                    {
                        title: "Initialize",
                        syntax: "git init\ngit clone <url>",
                        example: "git init\ngit clone https://github.com/user/repo.git"
                    },
                    {
                        title: "Status & Changes",
                        syntax: "git status\ngit diff\ngit log",
                        example: "git status\ngit diff HEAD\ngit log --oneline --graph"
                    },
                    {
                        title: "Staging",
                        syntax: "git add <file>\ngit add .\ngit reset <file>",
                        example: "git add index.html\ngit add .\ngit reset README.md"
                    },
                    {
                        title: "Commit",
                        syntax: "git commit -m \"message\"\ngit commit -am \"message\"",
                        example: "git commit -m \"Add new feature\"\ngit commit --amend"
                    },
                    {
                        title: "Branches",
                        syntax: "git branch <name>\ngit checkout <branch>\ngit merge <branch>",
                        example: "git branch feature\ngit checkout -b feature\ngit merge main"
                    },
                    {
                        title: "Remote",
                        syntax: "git push <remote> <branch>\ngit pull\ngit fetch",
                        example: "git push origin main\ngit pull origin develop\ngit fetch --all"
                    }
                ]
            },
            {
                name: "Linux Commands",
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
                    },
                    {
                        title: "Directory Operations",
                        syntax: "mkdir <name>\nrmdir <name>\nrm -r <directory>",
                        example: "mkdir project\nrmdir empty_folder\nrm -rf old_project"
                    },
                    {
                        title: "File Viewing",
                        syntax: "cat <file>\nless <file>\nhead/tail <file>",
                        example: "cat config.txt\nless log.txt\nhead -n 20 file.txt"
                    },
                    {
                        title: "Permissions",
                        syntax: "chmod <mode> <file>\nchown <user> <file>",
                        example: "chmod 755 script.sh\nchmod +x script.sh\nchown user:group file.txt"
                    },
                    {
                        title: "Process Management",
                        syntax: "ps aux\nkill <pid>\ntop/htop",
                        example: "ps aux | grep python\nkill -9 1234\ntop"
                    }
                ]
            }
        ]
    },
    {
        name: "Mathematics",
        icon: <BookOpen className="icon" />,
        languages: [
            {
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
                    },
                    {
                        title: "Subsets",
                        syntax: "A ⊆ B (subset)\nA ⊂ B (proper subset)\nA ⊇ B (superset)",
                        example: "A = {1, 2}\nB = {1, 2, 3}\nA ⊆ B (true)\nA ⊂ B (true)"
                    },
                    {
                        title: "Cardinality",
                        syntax: "|A| (number of elements)\n|A × B| = |A| × |B|",
                        example: "A = {1, 2, 3}\n|A| = 3\n|∅| = 0\n|P(A)| = 2^|A| = 8"
                    },
                    {
                        title: "Power Set",
                        syntax: "P(A) or 2^A\n(all subsets of A)",
                        example: "A = {1, 2}\nP(A) = {∅, {1}, {2}, {1,2}}\n|P(A)| = 2^|A|"
                    },
                    {
                        title: "Cartesian Product",
                        syntax: "A × B = {(a,b) | a∈A, b∈B}",
                        example: "A = {1, 2}\nB = {x, y}\nA × B = {(1,x), (1,y), (2,x), (2,y)}"
                    }
                ]
            }
        ]
    }
];

const CheatSheetApp: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState<string>("Programming Languages");
    const [theme, setTheme] = useState<'monokai' | 'gruvbox'>('monokai');

    const toggleItem = (id: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const toggleTheme = () => {
        setTheme(theme === 'monokai' ? 'gruvbox' : 'monokai');
    };

    const currentCategory = cheatSheetData.find(cat => cat.name === selectedCategory);

    return (
        <div className={`app ${theme}`}>
            <style>{`


            `}</style>
            <header className="header">
                <div className="header-content">
                    <div>
                        <h1 className="header-title">Dev Cheat Sheets</h1>
                        <p className="header-subtitle">Quick reference for developers</p>
                    </div>
                    <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
                        <Palette className="icon" />
                    </button>
                </div>
            </header>

            <div className="container">
                <aside className="sidebar">
                    <h2 className="sidebar-title">Categories</h2>
                    <nav className="sidebar-nav">
                        {cheatSheetData.map(category => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`nav-button ${selectedCategory === category.name ? 'active' : ''}`}
                            >
                                {category.icon}
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="main-content">
                    <h2 className="category-title">{selectedCategory}</h2>

                    <div className="languages-grid">
                        {currentCategory?.languages.map(language => (
                            <div key={language.name} className="language-card">
                                <div className="language-header">
                                    <h3 className="language-name">{language.name}</h3>
                                </div>

                                <div className="items-list">
                                    {language.items.map((item, idx) => {
                                        const itemId = `${language.name}-${idx}`;
                                        const isExpanded = expandedItems.has(itemId);

                                        return (
                                            <div key={itemId} className="item">
                                                <button
                                                    onClick={() => toggleItem(itemId)}
                                                    className="item-button"
                                                >
                                                    <span>{item.title}</span>
                                                    {isExpanded ? (
                                                        <ChevronDown className="icon chevron" />
                                                    ) : (
                                                        <ChevronRight className="icon chevron" />
                                                    )}
                                                </button>

                                                {isExpanded && (
                                                    <div className="item-content">
                                                        <div className="code-section">
                                                            <div className="code-label">Syntax</div>
                                                            <pre className="code-block">
                                                                <code>{item.syntax}</code>
                                                            </pre>
                                                        </div>

                                                        <div className="code-section">
                                                            <div className="code-label">Example</div>
                                                            <pre className="code-block">
                                                                <code>{item.example}</code>
                                                            </pre>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CheatSheetApp;