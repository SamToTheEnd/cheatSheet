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
                example: "name = \"Damon\"  # string\nage = 23  # integer\nheight = 5.8  # float\nis_active = True  # boolean\nscores = [90, 85, 88]  # list\npoint = (10, 20)  # tuple\nuser = {'name': 'Damon', 'age': 30}  # dict"
            },
            {
                title: "Array",
                syntax: "import array\n\narr = array.array('i', [1, 2, 3])",
                example: "import array\n\n# 'i' for signed integer\nint_array = array.array('i', [10, 20, 30])\nint_array.append(40)\nprint(int_array[1]) # 20"
            },
            {
                title: "List Methods & Slicing",
                syntax: "my_list.append(item)\nmy_list.pop(index)\nmy_list[start:stop:step]",
                example: "nums = [1, 2, 3]\nnums.append(4)  # [1, 2, 3, 4]\nnums.pop()      # 4 (returns 4, nums is [1, 2, 3])\nnums[0:2]     # [1, 2] (slice)"
            },
            {
                title: "Dictionary Methods",
                syntax: "my_dict.get(key, default)\nmy_dict.keys()\nmy_dict.values()\nmy_dict.items()",
                example: "user = {'name': 'Damon', 'age': 25}\nuser.get('age')      # 25\nuser.get('job', 'N/A') # 'N/A'\nuser.keys()      # ['name', 'age']\nuser.items()     # [('name', 'Damon'), ('age', 25)]"
            },

            {
                title: "Conditionals",
                syntax: "if condition:\n    ...\nelif other_condition:\n    ...\nelse:\n    ...",
                example: "age = 18\nif age < 13:\n    print(\"Child\")\nelif age < 18:\n    print(\"Teenager\")\nelse:\n    print(\"Adult\")"
            },
            {
                title: "Loops (for & while)",
                syntax: "for item in iterable:\n    ...\n\nwhile condition:\n    ...",
                example: "for i in range(5):\n    print(i)\n\ncount = 0\nwhile count < 3:\n    print(f\"Count: {count}\")\n    count += 1"
            },
            {
                title: "Functions & Lambda",
                syntax: "def function_name(parameters):\n    return value\n\nlambda params: expression",
                example: "def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\nsquare = lambda x: x ** 2\nprint(square(5))  # 25"
            },

            {
                title: "Classes & Objects",
                syntax: "class ClassName:\n    def __init__(self, params):\n        self.attr = params\n    def method(self):\n        ...",
                example: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f\"{self.name} says woof!\"\n\nmydog = Dog(\"Buddy\")\nprint(mydog.bark())"
            },
            {
                title: "Modules & Imports",
                syntax: "import module_name\nimport module_name as alias\nfrom module_name import function",
                example: "import math\nprint(math.sqrt(16))  # 4.0\n\nimport numpy as np\narr = np.array([1, 2, 3])\n\nfrom collections import deque\nq = deque()"
            },
            {
                title: "Error Handling",
                syntax: "try:\n    ...\nexcept ExceptionType as e:\n    ...\nfinally:\n    ...",
                example: "try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f\"Error: {e}\")\nfinally:\n    print(\"Operation complete.\")"
            },
            {
                title: "File I/O",
                syntax: "with open(filename, mode) as f:\n    content = f.read()\n    f.write(data)",
                example: "# Write to a file\nwith open(\"test.txt\", \"w\") as f:\n    f.write(\"Hello, world!\")\n\n# Read from a file\nwith open(\"test.txt\", \"r\") as f:\n    content = f.read()\n    print(content)"
            },
        ]
    },

    "Go": {
        name: "Go",
        items: [
            {
                title: "Variables & Constants",
                syntax: "var name type = value\nname := value\nconst NAME = value",
                example: "var name string = \"Damon\"\nage := 25\nvar isActive bool = true\nconst Pi = 3.14159"
            },
            {
                title: "Pointers",
                syntax: "&variable  // Address-of operator\n*pointer   // Dereference operator",
                example: "x := 10\np := &x      // p points to x\nfmt.Println(*p) // 10\n*p = 20       // x is now 20"
            },
            {
                title: "Structs & Methods",
                syntax: "type Name struct {\n    Field type\n}\n\nfunc (n Name) Method() {}",
                example: "type Person struct {\n    Name string\n    Age  int\n}\n\nfunc (p Person) Greet() string {\n    return fmt.Sprintf(\"Hi, I'm %s\", p.Name)\n}"
            },
            {
                title: "Struct Embedding",
                syntax: "type Child struct {\n    Parent\n    Field type\n}",
                example: "type Animal struct { Name string }\nfunc (a Animal) Speak() { ... }\n\ntype Dog struct {\n    Animal // Embeds Animal\n    Breed string\n}\n\nd := Dog{Animal: Animal{Name: \"Buddy\"}}\nd.Speak() // Access embedded method"
            },
            {
                title: "Arrays (fixed size)",
                syntax: "var name [size]type\nname := [size]type{val1, VAl2, ...}",
                example: "var nums [3]int // [0, 0, 0]\n\nscores := [3]int{90, 85, 88}\nfmt.Println(scores[1]) // 85\n\n// Slices are (usually) preferred\ns := []int{1, 2, 3}"
            },
            {
                title: "Slices (make & append)",
                syntax: "s := make([]type, len, cap)\ns = append(s, val1, val2)",
                example: "s := make([]string, 3)\ns[0] = \"a\"\ns = append(s, \"d\", \"e\")\n// s is now [\"a\", \"\", \"\", \"d\", \"e\"]"
            },
            {
                title: "Maps",
                syntax: "m := make(map[keyType]valueType)\nm[key] = value\ndelete(m, key)\nval, ok := m[key]",
                example: "ages := make(map[string]int)\nages[\"Damon\"] = 30\n\nval, ok := ages[\"bob\"]\nif !ok {\n    fmt.Println(\"Graham not found\")\n}"
            },
            {
                title: "Loops (for & for-range)",
                syntax: "for init; cond; post {}\nfor cond {}\nfor i, val := range collection {}",
                example: "for i := 0; i < 5; i++ {\n    // 0 to 4\n}\n\ns := []string{\"a\", \"b\"}\nfor i, v := range s {\n    fmt.Println(i, v)\n}"
            },
            {
                title: "Conditionals (if & switch)",
                syntax: "if condition {\n    ...\n} else if ...\n\nswitch val {\ncase 1:\ncase 2, 3:\n}",
                example: "if err != nil {\n    return err\n}\n\nswitch day {\ncase \"Sat\", \"Sun\":\n    fmt.Println(\"Weekend\")\ndefault:\n    fmt.Println(\"Weekday\")\n}"
            },
            {
                title: "Functions & Multiple Returns",
                syntax: "func name(param type) (returnType, error) {\n    return value, nil\n}",
                example: "func divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New(\"division by zero\")\n    }\n    return a / b, nil\n}"
            },
            {
                title: "`defer` Statement",
                syntax: "defer functionCall()",
                example: "func ReadFile(name string) {\n    f, err := os.Open(name)\n    if err != nil { ... }\n    defer f.Close() // Executes when func returns\n\n    // ... read from f\n}"
            },
            {
                title: "Error Handling",
                syntax: "val, err := func()\nif err != nil {\n    // handle error\n}\nfmt.Errorf(\"msg: %w\", err)",
                example: "f, err := os.Open(\"file.txt\")\nif err != nil {\n    log.Fatal(err)\n}\n\nfunc divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, fmt.Errorf(\"can't divide by zero\")\n    }\n    return a / b, nil\n}"
            },
            {
                title: "Interfaces",
                syntax: "type Name interface {\n    MethodName(params) returnType\n}",
                example: "type Shape interface {\n    Area() float64\n}\n\ntype Rect struct { w, h float64 }\nfunc (r Rect) Area() float64 { return r.w * h }\n\nfunc PrintArea(s Shape) {\n    fmt.Println(s.Area())\n}"
            },
            {
                title: "JSON (Marshal/Unmarshal)",
                syntax: "json.Marshal(v)\njson.Unmarshal(data, &v)",
                example: "type User struct {\n    Name string `json:\"name\"`\n}\nu := User{Name: \"Sam\"}\n\nb, err := json.Marshal(u)\n// b is [{\"name\":\"Alice\"}]\n\nvar u2 User\nerr = json.Unmarshal(b, &u2)"
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
                title: "Variables & Basic Types",
                syntax: "let name: type = value;\n// Types: string, number, boolean, any, null, undefined",
                example: "let name: string = \"Damon\";\nconst age: number = 25;\nlet isStudent: boolean = true;\nlet hobbies: string[] = [\"Reading\", \"Music\"];"
            },
            {
                title: "Interfaces & Types",
                syntax: "interface Name {\n    property: type;\n    optional?: type;\n    readonly read: type;\n}\n\ntype Name = { property: type; }",
                example: "interface Person {\n    name: string;\n    age: number;\n    email?: string;  // optional\n}\n\nconst user: Person = {\n    name: \"Damon\",\n    age: 30\n};"
            },
            {
                title: "Functions",
                syntax: "function name(param: type): returnType {\n    return value;\n}\n\nconst arrowFn = (param: type): returnType => value;",
                example: "function greet(name: string): string {\n    return `Hello, ${name}`;\n}\n\nconst add = (a: number, b: number): number => a + b;"
            },
            {
                title: "Classes",
                syntax: "class Name {\n    property: type;\n    constructor(param: type) {\n        this.property = param;\n    }\n    method(): returnType { ... }\n}",
                example: "class Animal {\n    public name: string;\n    constructor(name: string) {\n        this.name = name;\n    }\n    move(distance: number = 0) {\n        console.log(`${this.name} moved ${distance}m.`);\n    }\n}"
            },
            {
                title: "Enums",
                syntax: "enum Name {\n    Key1 = value1,\n    Key2 = value2,\n}",
                example: "enum Color {\n    Red = 1,\n    Green = 2,\n    Blue = 3,\n}\n\nlet c: Color = Color.Green;\nconsole.log(c); // 2"
            },
            {
                title: "Generics",
                syntax: "function name<T>(arg: T): T {\n    return arg;\n}\n\nclass Name<T> { ... }",
                example: "function identity<T>(arg: T): T {\n    return arg;\n}\n\nlet output = identity<string>(\"myString\");\nlet numOutput = identity<number>(100);"
            },
            {
                title: "Union & Intersection Types",
                syntax: "let var: type1 | type2;\nlet var: type1 & type2;",
                example: "// Union Type\nfunction printId(id: number | string) {\n    console.log(`ID: ${id}`);\n}\n\n// Intersection Type\ntype Draggable = { drag: () => void; };\ntype Resizable = { resize: () => void; };\ntype UIWidget = Draggable & Resizable;"
            },
        ]
    },
    "JavaScript": {
        name: "JavaScript",
        items: [
            {
                title: "Variables (var, let, const)",
                syntax: "var variableName = value; // Function-scoped\nlet blockScopedVar = value; // Block-scoped\nconst constantVar = value; // Block-scoped, read-only",
                example: "var oldVar = 'Old'; // Avoid\nlet age = 30;\nage = 31; // OK\nconst name = 'Damon';\n// name = 'Graham'; // Error: Assignment to constant variable."
            },
            {
                title: "Data Types",
                syntax: "// Primitives: string, number, boolean, null, undefined, symbol, bigint\n// Object: object, array, function",
                example: "let str = 'Hello';\nlet num = 123;\nlet bool = true;\nlet u = undefined;\nlet n = null;\nlet person = { name: 'Bob', age: 25 };\nlet arr = [1, 2, 3];"
            },
            {
                title: "Functions & Arrow Functions",
                syntax: "function funcName(param) {\n    return value;\n}\n\nconst arrowFunc = (param) => {\n    return value;\n};\n\nconst shortArrow = param => value;",
                example: "function greet(name) {\n    return `Hello, ${name}`;\n}\n\nconst square = (x) => {\n    return x * x;\n};\n\nconst add = (a, b) => a + b;"
            },
            {
                title: "Objects",
                syntax: "const obj = {\n    key: value,\n    method() { ... }\n};\nobj.key // access\nobj['key'] // access",
                example: "const person = {\n    firstName: 'Damon',\n    lastName: 'Albarn',\n    greet() {\n        return `Hi, I'm ${this.firstName}`;\n    }\n};\nconsole.log(person.firstName);\nconsole.log(person.greet());"
            },
            {
                title: "Array Methods",
                syntax: "arr.map(callbackFn)\narr.filter(callbackFn)\narr.reduce(callbackFn, initialVal)\narr.forEach(callbackFn)",
                example: "const nums = [1, 2, 3, 4];\nconst squares = nums.map(n => n * n); // [1, 4, 9, 16]\nconst evens = nums.filter(n => n % 2 === 0); // [2, 4]\nconst sum = nums.reduce((acc, n) => acc + n, 0); // 10"
            },
            {
                title: "Async (Promise, async/await)",
                syntax: "new Promise((resolve, reject) => {\n    ...\n    resolve(value);\n});\n\nasync function func() {\n    const value = await promise;\n    return value;\n}",
                example: "const fetchData = () => {\n    return new Promise((res, rej) => {\n        setTimeout(() => res('Data fetched'), 1000);\n    });\n};\n\nasync function displayData() {\n    try {\n        const data = await fetchData();\n        console.log(data);\n    } catch (err) {\n        console.error(err);\n    }\n}\ndisplayData();"
            },

            {
                title: "Classes",
                syntax: "class Name {\n    constructor(param) {\n        this.prop = param;\n    }\n    method() { ... }\n}",
                example: "class Person {\n    constructor(name) {\n        this.name = name;\n    }\n    greet() {\n        console.log(`Hello, ${this.name}`);\n    }\n}\n\nconst p = new Person('Alice');\np.greet(); // Hello, Damon"
            },
        ]
    },
    "Java": {
        name: "Java",
        items: [
            {
                title: "Class & main() Method",
                syntax: "public class ClassName {\n    public static void main(String[] args) {\n        // Code executes here\n    }\n}",
                example: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
            },
            {
                title: "Variables & Data Types",
                syntax: "type variableName = value;\n// Primitives: int, double, boolean, char\n// Objects: String, Array, etc.",
                example: "int age = 25;\ndouble price = 19.99;\nboolean isActive = true;\nchar grade = 'A';\nString name = \"Damon\";"
            },
            {
                title: "Methods",
                syntax: "accessModifier returnType methodName(type param1) {\n    // body\n    return value;\n}",
                example: "public int add(int a, int b) {\n    return a + b;\n}\n\npublic void greet(String name) {\n    System.out.println(\"Hello, \" + name);\n}"
            },
            {
                title: "Classes & Objects",
                syntax: "class Name {\n    type field;\n    Name(type param) {\n        field = param; // constructor\n    }\n    returnType method() { ... }\n}\n\nName obj = new Name(value);",
                example: "class Dog {\n    String name;\n    Dog(String name) {\n        this.name = name;\n    }\n    void bark() {\n        System.out.println(this.name + \" says woof!\");\n    }\n}\n\nDog myDog = new Dog(\"Buddy\");\nmyDog.bark();"
            },
            {
                title: "Conditionals (if/else)",
                syntax: "if (condition) {\n    ...\n} else if (other_condition) {\n    ...\n} else {\n    ...",
                example: "int score = 85;\nif (score >= 90) {\n    System.out.println(\"A\");\n} else if (score >= 80) {\n    System.out.println(\"B\");\n} else {\n    System.out.println(\"C\");\n}"
            },
            {
                title: "Loops (for & while)",
                syntax: "for (init; condition; update) {\n    ...\n}\n\nwhile (condition) {\n    ...\n}",
                example: "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n\nint count = 0;\nwhile (count < 3) {\n    System.out.println(\"Count: \" + count);\n    count++;\n}"
            },
            {
                title: "Arrays",
                syntax: "type[] name = new type[size];\ntype[] name = {val1, val2, ...};",
                example: "int[] numbers = new int[5];\nnumbers[0] = 10;\n\nString[] fruits = {\"Apple\", \"Banana\", \"Orange\"};\nSystem.out.println(fruits[1]); // Banana"
            },
            {
                title: "Error Handling (try/catch)",
                syntax: "try {\n    // code that might throw\n} catch (ExceptionType e) {\n    // handle error\n} finally {\n    // always executes\n}",
                example: "try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero!\");\n} finally {\n    System.out.println(\"Cleanup complete.\");\n}"
            },
        ]
    },
    "C": {
        name: "C",
        items: [
            {
                title: "Basic Structure",
                syntax: "#include <stdio.h>\n\nint main() {\n    // Code here\n    return 0;\n}",
                example: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}"
            },
            {
                title: "Variables & Data Types",
                syntax: "type name = value;\n// Types: int, float, double, char",
                example: "int age = 25;\nfloat pi = 3.14;\ndouble price = 19.99;\nchar grade = 'A';"
            },
            {
                title: "Functions",
                syntax: "return_type name(type param1) {\n    // body\n    return value;\n}",
                example: "int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int sum = add(5, 10);\n    printf(\"Sum: %d\\n\", sum);\n    return 0;\n}"
            },
            {
                title: "Pointers",
                syntax: "type *pointer_name = &variable;\n// *pointer_name (dereference)\n// &variable (address of)",
                example: "int var = 10;\nint *p; // pointer to int\np = &var; // p stores address of var\n\nprintf(\"Value of var: %d\\n\", var);\nprintf(\"Value at address p: %d\\n\", *p);"
            },
            {
                title: "Structs",
                syntax: "struct Name {\n    type member1;\n    type member2;\n};\n\nstruct Name var_name;",
                example: "struct Person {\n    char name[50];\n    int age;\n};\n\nint main() {\n    struct Person p1;\n    strcpy(p1.name, \"Damon\");\n    p1.age = 30;\n    printf(\"%s is %d\\n\", p1.name, p1.age);\n    return 0;\n}"
            },
            {
                title: "Arrays",
                syntax: "type name[size];\ntype name[] = {val1, val2, ...};",
                example: "int numbers[5]; // declare\nnumbers[0] = 10;\n\nint grades[] = {90, 85, 88};\nprintf(\"First grade: %d\\n\", grades[0]);"
            },
            {
                title: "Loops (for & while)",
                syntax: "for (init; cond; update) { ... }\nwhile (cond) { ... }",
                example: "for (int i = 0; i < 5; i++) {\n    printf(\"%d \", i);\n}\n\nint j = 0;\nwhile (j < 3) {\n    printf(\"%d \", j);\n    j++;\n}"
            },
            {
                title: "Conditionals (if/else)",
                syntax: "if (condition) {\n    ...\n} else if (other_cond) {\n    ...\n} else {\n    ...",
                example: "int x = 10;\nif (x > 10) {\n    printf(\"Greater\");\n} else if (x < 10) {\n    printf(\"Less\");\n} else {\n    printf(\"Equal\");\n}"
            },
            {
                title: "Memory (malloc/free)",
                syntax: "#include <stdlib.h>\n\nptr = (type*) malloc(size_in_bytes);\nfree(ptr);",
                example: "#include <stdlib.h>\n\nint main() {\n    int *arr;\n    int n = 5;\n\n    arr = (int*) malloc(n * sizeof(int));\n    if (arr == NULL) {\n        return 1; // Failed\n    }\n\n    for(int i=0; i<n; i++) {\n        arr[i] = i;\n    }\n\n    free(arr);\n    return 0;\n}"
            },
        ]
    },
    "C++": {
        name: "C++",
        items: [
            {
                title: "Basic Structure",
                syntax: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello!\" << std::endl;\n    return 0;\n}",
                example: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}"
            },
            {
                title: "Variables & Types",
                syntax: "type name = value;\n// Types: int, double, float, char, bool, std::string",
                example: "int age = 25;\ndouble pi = 3.14159;\nchar grade = 'A';\nbool is_active = true;\nstd::string name = \"Damon\";"
            },
            {
                title: "Classes & Objects",
                syntax: "class Name {\npublic:\n    Name(); // constructor\n    ~Name(); // destructor\n    void method();\nprivate:\n    type member;\n};\n\nName obj;",
                example: "class Dog {\npublic:\n    std::string name;\n    Dog(std::string n) {\n        name = n;\n    }\n    void bark() {\n        std::cout << name << \" says woof!\" << std::endl;\n    }\n};\n\nint main() {\n    Dog myDog(\"Buddy\");\n    myDog.bark();\n    return 0;\n}"
            },
            {
                title: "std::vector",
                syntax: "#include <vector>\n\nstd::vector<type> name;\nname.push_back(value);\nname[index];",
                example: "#include <vector>\n#include <iostream>\n\nint main() {\n    std::vector<int> nums;\n    nums.push_back(10);\n    nums.push_back(20);\n    std::cout << nums[0] << std::endl; // 10\n    return 0;\n}"
            },
            {
                title: "Loops (for & while)",
                syntax: "for (init; cond; update) { ... }\nwhile (cond) { ... }\nfor (type var : collection) { ... }",
                example: "for (int i = 0; i < 5; i++) {\n    std::cout << i << \" \";\n}\n\nstd::vector<int> v = {1, 2, 3};\nfor (int x : v) {\n    std::cout << x << \" \";\n}"
            },
            {
                title: "Conditionals (if/else)",
                syntax: "if (condition) {\n    ...\n} else if (other_cond) {\n    ...\n} else {\n    ...",
                example: "int x = 10;\nif (x > 10) {\n    std::cout << \"Greater\";\n} else if (x < 10) {\n    std::cout << \"Less\";\n} else {\n    std::cout << \"Equal\";\n}"
            },
            {
                title: "Functions",
                syntax: "return_type name(type param1) {\n    // body\n    return value;\n}",
                example: "int add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int sum = add(5, 10);\n    std::cout << \"Sum: \" << sum << std::endl;\n    return 0;\n}"
            },
            {
                title: "Pointers & References",
                syntax: "type *ptr = &var; // Pointer\ntype &ref = var; // Reference",
                example: "int var = 10;\nint *ptr = &var;\nint &ref = var;\n\n*ptr = 20; // var is now 20\nref = 30; // var is now 30\n\nstd::cout << var << std::endl; // 30"
            },
            {
                title: "Error Handling (try/catch)",
                syntax: "#include <stdexcept>\n\ntry {\n    ...\n    throw std::exception();\n} catch (const std::exception& e) {\n    std::cerr << e.what() << std::endl;\n}",
                example: "double divide(int a, int b) {\n    if (b == 0) {\n        throw std::runtime_error(\"Division by zero!\");\n    }\n    return (double)a / b;\n}\n\ntry {\n    double res = divide(10, 0);\n} catch (const std::runtime_error& e) {\n    std::cerr << \"Error: \" << e.what() << std::endl;\n}"
            },


        ]
    },

    "Naming Conventions": {
        name: "Naming Conventions",
        items: [
            {
                title: "Case Styles",
                syntax: "camelCase: first word lower, next words upper.\nPascalCase: All words upper.\nsnake_case: all words lower, joined by underscore.\nUPPER_SNAKE_CASE: all words upper, joined by underscore.\nkebab-case: all words lower, joined by hyphen.",
                example: "// camelCase(JS/Java/Go vars, functions)\nlet myVariableName = \"Cases\";\n\n// PascalCase (Classes, Components)\nclass MyClassName {}\n\n// snake_case (Python vars, functions)\ndef my_function_name():\n  pass\n\n// UPPER_SNAKE_CASE (Constants)\nconst NUMBER_OF_ALBUMS = 10;\n\n// kebab-case (CSS classes, HTML attributes)\n// <div class=\"my-css-class\"></div>"
            }
        ]
    },

    // Libraries

    "Python: Math": {
        name: "Python: Math (math module)",
        items: [
            {
                title: "Importing",
                syntax: "import math\n\nfrom math import sqrt, pi",
                example: "import math\n\nprint(math.pi) # 3.14159...\n\nfrom math import sqrt\nprint(sqrt(16)) # 4.0"
            },
            {
                title: "Constants",
                syntax: "math.pi\nmath.e\nmath.tau\nmath.inf",
                example: "import math\nprint(f\"Pi: {math.pi}\")\nprint(f\"Euler's number: {math.e}\")\nprint(f\"Tau (2*pi): {math.tau}\")"
            },
            {
                title: "Rounding",
                syntax: "math.ceil(x)   // Round up\nmath.floor(x)  // Round down\nround(x, n)    // Built-in: round to n digits",
                example: "import math\nx = 4.7\nprint(math.ceil(x))  # 5\nprint(math.floor(x)) # 4\n\nprint(round(3.14159, 2)) # 3.14"
            },
            {
                title: "Powers & Logs",
                syntax: "math.sqrt(x)\nmath.pow(x, y)  // x to the power of y (float)\nx ** y          // x to the power of y (native)\nmath.log(x, base)",
                example: "import math\nprint(math.sqrt(64)) # 8.0\nprint(math.pow(2, 5)) # 32.0\nprint(2 ** 5)        # 32\nprint(math.log(100, 10)) # 2.0"
            },
        ]
    },
    "Python: Hashing": {
        name: "Python: Hashing (hashlib)",
        items: [
            {
                title: "SHA-256",
                syntax: "import hashlib\n\nhash_obj = hashlib.sha256()\nhash_obj.update(b'data to hash')\nhex_digest = hash_obj.hexdigest()",
                example: "import hashlib\n\ntext = \"Hello Python\"\n# Data must be bytes\nsha = hashlib.sha256(text.encode('utf-8'))\n\nprint(f\"Hex: {sha.hexdigest()}\")"
            },
            {
                title: "SHA-512",
                syntax: "hash_obj = hashlib.sha512(b'data').hexdigest()",
                example: "import hashlib\n\nsha = hashlib.sha512(b\"A very secure password\")\nprint(sha.hexdigest())"
            },
            {
                title: "MD5",
                syntax: "# WARNING: MD5 is insecure and should not be used for security.\n# Only use for checksums / non-crypto purposes.\nhash_obj = hashlib.md5(b'data').hexdigest()",
                example: "import hashlib\n\nmd5 = hashlib.md5(b\"file_content_for_checksum\").hexdigest()\nprint(md5)"
            },
            {
                title: "Updating Hash (Large Files)",
                syntax: "hash_obj = hashlib.sha256()\nhash_obj.update(b'first chunk')\nhash_obj.update(b'second chunk')\nhash_obj.hexdigest()",
                example: "import hashlib\n\nsha = hashlib.sha256()\nsha.update(b\"Part 1\")\nsha.update(b\"Part 2\")\n\nprint(sha.hexdigest())\n# Same as hashlib.sha256(b\"Part 1Part 2\").hexdigest()"
            },
        ]
    },
    "Go: fmt": {
        name: "Go: fmt (Formatting)",
        items: [
            {
                title: "Printing to Console",
                syntax: "fmt.Print(a ...any)     // Print side-by-side\nfmt.Println(a ...any)   // Print with spaces & newline\nfmt.Printf(format, a ...any) // Print with format string",
                example: "import \"fmt\"\n\nfunc main() {\n    fmt.Print(\"Hello, \")\n    fmt.Print(\"World!\\n\")\n    fmt.Println(\"Hello\", \"World\") // Hello World\n    fmt.Printf(\"User: %s, Age: %d\\n\", \"Damon\", 30)\n}"
            },
            {
                title: "Formatting Verbs (Common)",
                syntax: "%v  // Default format (value)\n%+v // Default format (w/ field names for structs)\n%#v // Go-syntax representation\n%T  // Type of the value\n%d  // Integer (base 10)\n%s  // String\n%f  // Float\n%t  // Boolean",
                example: "import \"fmt\"\n\ntype User struct { Name string }\n\nfunc main() {\n    u := User{Name: \"Damon\"}\n    fmt.Printf(\"Value: %v\\n\", u)      // {Damon}\n    fmt.Printf(\"Value+: %+v\\n\", u)     // {Name:Damon}\n    fmt.Printf(\"Go-Syntax: %#v\\n\", u) // main.User{Name:\"Damon\"}\n    fmt.Printf(\"Type: %T\\n\", u)       // main.User\n}"
            },
            {
                title: "Formatting to String (Sprintf)",
                syntax: "s := fmt.Sprintf(format, a ...any)\n// Returns a formatted string",
                example: "import \"fmt\"\n\nfunc main() {\n    name := \"Damon\"\n    age := 30\n    s := fmt.Sprintf(\"User %s is %d years old.\", name, age)\n    fmt.Println(s)\n    // Output: User Damon is 30 years old.\n}"
            },
            {
                title: "Formatting to Writer (Fprintf)",
                syntax: "fmt.Fprintf(w io.Writer, format, a ...any)\n// Writes formatted string to any io.Writer (e.g., os.Stdout, file)",
                example: "import \"fmt\"\nimport \"os\"\n\nfunc main() {\n    // Write to Standard Error\n    fmt.Fprintf(os.Stderr, \"This is an error message!\\n\")\n\n    // Write to a file (see Go: File I/O)\n    f, _ := os.Create(\"log.txt\")\n    defer f.Close()\n    fmt.Fprintf(f, \"Log entry: %s\\n\", \"Server started\")\n}"
            },
        ]
    },
    "Go: File I/O (os, io)": {
        name: "Go: File I/O (os, io)",
        items: [
            {
                title: "Read File (Modern)",
                syntax: "dat, err := os.ReadFile(filename)\n// Simple, reads entire file into memory.",
                example: "package main\nimport (\n    \"fmt\"\n    \"os\"\n)\nfunc main() {\n    dat, err := os.ReadFile(\"test.txt\")\n    if err != nil {\n        panic(err)\n    }\n    fmt.Print(string(dat))\n}"
            },
            {
                title: "Write File (Modern)",
                syntax: "err := os.WriteFile(filename, data, perm)\n// Simple, writes byte slice to file.\n// perm: e.g., 0644",
                example: "package main\nimport \"os\"\n\nfunc main() {\n    data := []byte(\"Hello, Go File I/O!\")\n    // 0644 = rw-r--r--\n    err := os.WriteFile(\"output.txt\", data, 0644)\n    if err != nil {\n        panic(err)\n    }\n}"
            },
            {
                title: "Open & Read (Streaming)",
                syntax: "f, err := os.Open(filename)\ndefer f.Close()\n\n// Read data in chunks\nb1 := make([]byte, 5)\nn1, err := f.Read(b1)",
                example: "package main\nimport (\n    \"fmt\"\n    \"io\"\n    \"os\"\n)\nfunc main() {\n    f, err := os.Open(\"test.txt\")\n    if err != nil { panic(err) }\n    defer f.Close()\n\n    buf := make([]byte, 1024)\n    for {\n        n, err := f.Read(buf)\n        if err == io.EOF { break }\n        if err != nil { panic(err) }\n        fmt.Print(string(buf[:n]))\n    }\n}"
            },
            {
                title: "Create & Write (Streaming)",
                syntax: "f, err := os.Create(filename)\ndefer f.Close()\n\nn, err := f.WriteString(\"Hello, \")\nn, err = f.Write([]byte(\"World!\"))",
                example: "package main\nimport (\n    \"fmt\"\n    \"os\"\n)\nfunc main() {\n    f, err := os.Create(\"output.txt\")\n    if err != nil { panic(err) }\n    defer f.Close()\n\n    n, err := f.WriteString(\"Writing line by line.\\n\")\n    if err != nil { panic(err) }\n    fmt.Printf(\"Wrote %d bytes\\n\", n)\n\n    f.Sync() // Flush writes to stable storage\n}"
            },
        ]
    },
    "Go: Hashing": {
        name: "Go: Hashing (crypto/*)",
        items: [
            {
                title: "SHA-256 (Simple)",
                syntax: "import \"crypto/sha256\"\nimport \"fmt\"\n\ndata := []byte(\"text\")\nhash := sha256.Sum256(data)\nfmt.Printf(\"%x\", hash)",
                example: "package main\nimport (\n    \"crypto/sha256\"\n    \"fmt\"\n)\n\nfunc main() {\n    s := \"Hello Go\"\n    h := sha256.Sum256([]byte(s))\n    fmt.Printf(\"%x\\n\", h)\n}"
            },
            {
                title: "SHA-512 (Simple)",
                syntax: "import \"crypto/sha512\"\n\ndata := []byte(\"text\")\nhash := sha512.Sum512(data)",
                example: "package main\nimport (\n    \"crypto/sha512\"\n    \"fmt\"\n)\n\nfunc main() {\n    h := sha512.Sum512([]byte(\"secure data\"))\n    fmt.Printf(\"%x\\n\", h)\n}"
            },
            {
                title: "Hashing (Streaming)",
                syntax: "import \"crypto/sha1\"\nimport \"io\"\n\nh := sha1.New()\nio.WriteString(h, \"first chunk\")\nio.WriteString(h, \"second chunk\")\nsum := h.Sum(nil)",
                example: "package main\nimport (\n    \"crypto/sha256\"\n    \"fmt\"\n    \"io\"\n)\n\nfunc main() {\n    h := sha256.New()\n    io.WriteString(h, \"This is \")\n    io.WriteString(h, \"a stream.\")\n    sum := h.Sum(nil)\n    fmt.Printf(\"%x\\n\", sum)\n}"
            },
        ]
    },
    "Go: Crypto (Lattigo)": {
        name: "Go: Lattigo (Homomorphic)",
        items: [
            {
                title: "Homomorphic Encryption",
                syntax: "import \"github.com/tuneinsight/lattigo/v5/core/rlwe\"\n\n// Lattigo is a library for Homomorphic Encryption.\n// It allows computations on encrypted data. Making use of Lattice-based cryptography.",
                example: "// Conceptual: Not runnable without full setup\npackage main\n\nimport (\n    \"github.com/tuneinsight/lattigo/v5/schemes/bfv\"\n    \"log\"\n)\n\nfunc main() {\n    // 1. Get parameters\n    params, err := bfv.NewParametersFromLiteral(bfv.PN12QP109)\n    if err != nil { log.Fatal(err) }\n\n    // 2. Setup (keys, encryptor, evaluator...)\n    // ... (complex setup omitted)\n\n    log.Println(\"Lattigo setup complete.\")\n    // 3. Encrypt, Evaluate, Decrypt...\n}"
            },
            {
                title: "PKE (Public Key Encryption)",
                syntax: "// Lattigo uses PKE schemes (like BFV, CKKS) built on LWE/RLWE.\n// KeyGen -> pk, sk\n// Encrypt(pk, plaintext) -> ciphertext\n// Decrypt(sk, ciphertext) -> plaintext",
                example: "// Conceptual Example (BFV Scheme)\nparams, _ := bfv.NewParametersFromLiteral(bfv.PN12QP109)\nkgen := bfv.NewKeyGenerator(params)\nsk, pk := kgen.GenKeyPair()\n\nencryptor := bfv.NewEncryptor(params, pk)\ndecryptor := bfv.NewDecryptor(params, sk)\n\npt := bfv.NewPlaintext(params, 1)\nct, _ := encryptor.Encrypt(pt)\n\nptOut, _ := decryptor.Decrypt(ct)\n// ptOut.Value[0] == 1"
            },
            {
                title: "LWE (Learning With Errors)",
                syntax: "// Core problem: LWE\n// Given (A, b = As + e), find s.\n// 'A' is a random matrix, 's' is the secret, 'e' is small 'error'.\n// Hard to solve for 's'. This hardness is the basis for security.",
                example: "// Lattigo abstracts this away, but it's the foundation.\n// LWE is used to build PKE schemes.\n// Lattigo schemes (BFV, CKKS) are typically based on\n// RLWE (Ring Learning With Errors), a more efficient\n// variant of LWE that works on polynomials."
            },
            {
                title: "Sampling (Gaussian)",
                syntax: "// Lattigo's security relies on sampling noise (errors)\n// from a specific distribution, usually Gaussian.\nimport \"github.com/tuneinsight/lattigo/v5/utils/sampling\"\n\n// (prng = *utils.KeyedPRNG, params = bfv.Parameters)\ngaussian, _ := sampling.NewGaussianSampler(prng, params)\n// ... use sampler to add noise",
                example: "// This is usually handled internally by Lattigo's\n// encryptors and evaluators.\n\n// e.g., during encryption:\n// ciphertext = pk * u + (plaintext + e1)\n// 'e1' is small error/noise sampled from a\n// Gaussian distribution."
            },
        ]
    },

    // Fraemworks
    "React": {
        name: "React",
        items: [
            {
                title: "Project Initialisation (Vite)",
                syntax: "# Install with npm\nnpm create vite@latest my-react-app -- --template react\n\n# Install with yarn\nyarn create vite my-react-app --template react",
                example: "$ npm create vite@latest my-react-app -- --template react\n$ cd my-react-app\n$ npm install\n$ npm run dev"
            },
            {
                title: "Component with State (useState)",
                syntax: "import React, { useState } from 'react';\n\nfunction MyComponent() {\n    const [count, setCount] = useState(0);\n    return <div onClick={() => setCount(c => c+1)}>{count}</div>\n}",
                example: "import React, { useState } from 'react';\n\nfunction Counter() {\n    // state: count, fn to update: setCount\n    const [count, setCount] = useState(0);\n\n    return (\n        <div>\n            <p>You clicked {count} times</p>\n            <button onClick={() => setCount(count + 1)}>\n                Click me\n            </button>\n        </div>\n    );\n}"
            },
            {
                title: "Side Effects (useEffect)",
                syntax: "import { useEffect } from 'react';\n\nuseEffect(() => {\n    // Runs after every render\n    return () => {\n        // Optional cleanup function\n    }\n}, [dependencyArray]);",
                example: "import React, { useState, useEffect } from 'react';\n\nfunction DocTitleUpdater() {\n    const [count, setCount] = useState(0);\n\n    // Runs only when 'count' changes\n    useEffect(() => {\n        document.title = `Count: ${count}`;\n        console.log('Title updated!');\n    }, [count]);\n\n    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}"
            },
            {
                title: "Props & Composition",
                syntax: "// Parent Component\n<ChildComponent name=\"Damon\" />\n\n// Child Component\nfunction ChildComponent(props) {\n    return <h1>Hello, {props.name}</h1>\n}\n// or with destructuring:\n// function ChildComponent({ name }) { ... }",
                example: "// Child\nfunction Welcome(props) {\n    return <h2>Hello, {props.user}</h2>;\n}\n\n// Parent\nfunction App() {\n    return (\n        <div>\n            <Welcome user=\"Damon\" />\n            <Welcome user=\"Graham\" />\n        </div>\n    );\n}"
            },
            {
                title: "Conditional Rendering",
                syntax: "function MyComponent({ isLoggedIn }) {\n    if (isLoggedIn) {\n        return <AdminPanel />;\n    }\n    return <LoginForm />;\n}\n\n// Or with ternary operator:\n// {isLoggedIn ? <AdminPanel /> : <LoginForm />}",
                example: "import React, { useState } from 'react';\n\nfunction AuthButton() {\n    const [isLoggedIn, setIsLoggedIn] = useState(false);\n\n    const handleClick = () => setIsLoggedIn(!isLoggedIn);\n\n    return (\n        <button onClick={handleClick}>\n            {isLoggedIn ? 'Log Out' : 'Log In'}\n        </button>\n    );\n}"
            },
        ]
    },
    "Python: Flask": {
        name: "Python: Flask",
        items: [
            {
                title: "Project Initialisation (venv)",
                syntax: "# 1. Create a virtual environment\npython -m venv venv\n# 2. Activate it\n# Windows: .\\venv\\Scripts\\activate\n# Unix/Mac: source venv/bin/activate\n# 3. Install Flask\npip install Flask",
                example: "$ python -m venv venv\n$ source venv/bin/activate\n(venv) $ pip install Flask\n(venv) $ echo \"from flask import Flask\napp = Flask(__name__)\n@app.route('/')\ndef h(): return 'Hi'\" > app.py\n(venv) $ flask --app app run"
            },
            {
                title: "Basic App",
                syntax: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello, World!'\n\n# Run: flask --app <filename> run",
                example: "# app.py\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello, Flask!'\n\n# Run in terminal: flask --app app run"
            },
            {
                title: "Routing with Variables",
                syntax: "@app.route('/user/<username>')\ndef profile(username):\n    return f'User: {username}'",
                example: "from flask import escape\n\n@app.route('/post/<int:post_id>')\ndef show_post(post_id):\n    # post_id is automatically an integer\n    return f'Post Number: {post_id}'\n\n@app.route('/path/<path:subpath>')\ndef show_subpath(subpath):\n    # Shows path: /path/hello/world\n    return f'Subpath: {escape(subpath)}'"
            },
            {
                title: "Rendering Templates",
                syntax: "from flask import render_template\n\n@app.route('/hello/')\n@app.route('/hello/<name>')\ndef hello(name=None):\n    return render_template('hello.html', name=name)",
                example: "# app.py\nfrom flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route('/<name>')\ndef index(name):\n    # Looks for 'index.html' in 'templates' folder\n    return render_template('index.html', user_name=name)\n\n# templates/index.html\n# <!DOCTYPE html>\n# <h1>Hello, {{ user_name }}!</h1>"
            },
            {
                title: "Request Object (GET/POST)",
                syntax: "from flask import request\n\n@app.route('/login', methods=['GET', 'POST'])\ndef login():\n    if request.method == 'POST':\n        user = request.form['username']\n        return f'Hello {user}'\n    else:\n        query = request.args.get('q')\n        return f'Searching for {query}'",
                example: "# POST to /login with form data: username=Damon\n# -> Returns 'Hello Damon'\n\n# GET /login?q=test\n# -> Returns 'Searching for test'"
            },
            {
                title: "Returning JSON",
                syntax: "from flask import jsonify\n\n@app.route('/api/user')\ndef get_user():\n    user_data = {'id': 1, 'name': 'Damon'}\n    return jsonify(user_data)\n    # or just: return user_data (Flask auto-jsonifies dicts)",
                example: "@app.route('/api/data')\ndef api_data():\n    return {\n        \"status\": \"ok\",\n        \"items\": [\"a\", \"b\", \"c\"]\n    }\n# Returns HTTP 200 with Content-Type: application/json"
            },
        ]
    },
    "Python: FastAPI": {
        name: "Python: FastAPI",
        items: [
            {
                title: "Project Initialisation (venv)",
                syntax: "# 1. Create a virtual environment\npython -m venv venv\n# 2. Activate it\n# Windows: .\\venv\\Scripts\\activate\n# Unix/Mac: source venv/bin/activate\n# 3. Install FastAPI and a server (uvicorn)\npip install fastapi uvicorn[standard]",
                example: "$ python -m venv venv\n$ source venv/bin/activate\n(venv) $ pip install fastapi uvicorn[standard]\n(venv) $ echo \"from fastapi import FastAPI\napp = FastAPI()\n@app.get('/')\nasync def r(): return {'m':'hi'}\" > main.py\n(venv) $ uvicorn main:app --reload"
            },
            {
                title: "Basic App",
                syntax: "from fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\"/\")\nasync def root():\n    return {\"message\": \"Hello World\"}\n\n# Run: uvicorn <filename>:app --reload",
                example: "# main.py\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/\")\nasync def root():\n    return {\"message\": \"Hello, FastAPI!\"}\n\n# Run in terminal: uvicorn main:app --reload"
            },
            {
                title: "Path Parameters",
                syntax: "@app.get(\"/items/{item_id}\")\nasync def read_item(item_id: int):\n    return {\"item_id\": item_id}",
                example: "# main.py\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\"/users/{user_id}\")\nasync def get_user(user_id: int):\n    # Type hint `int` provides validation\n    # Try /users/abc -> will return error\n    return {\"user_id\": user_id, \"name\": f\"User {user_id}\"}"
            },
            {
                title: "Query Parameters",
                syntax: "@app.get(\"/items/\")\nasync def read_item(skip: int = 0, limit: int = 10):\n    return {\"skip\": skip, \"limit\": limit}",
                example: "# main.py\nfrom fastapi import FastAPI\napp = FastAPI()\n\n# Call with: /search?q=myquery&page=2\n@app.get(\"/search\")\nasync def search(q: str, page: int = 1):\n    return {\"query\": q, \"page_number\": page}"
            },
            {
                title: "Request Body (Pydantic)",
                syntax: "from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n\n@app.post(\"/items/\")\nasync def create_item(item: Item):\n    return item",
                example: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\nclass User(BaseModel):\n    username: str\n    email: str | None = None\n\napp = FastAPI()\n\n@app.post(\"/users/\")\nasync def create_user(user: User):\n    # POST with JSON: {\"username\": \"Damon\"}\n    return {\"status\": \"created\", \"user\": user.username}"
            },
            {
                title: "Status Codes",
                syntax: "from fastapi import status\n\n@app.post(\"/items/\", status_code=status.HTTP_201_CREATED)\nasync def create_item(item: Item):\n    return item",
                example: "from fastapi import FastAPI, status, Response\n\napp = FastAPI()\n\n@app.get(\"/items/{id}\")\nasync def get_item(id: int, response: Response):\n    if id > 100:\n        response.status_code = status.HTTP_404_NOT_FOUND\n        return {\"error\": \"Item not found\"}\n    return {\"id\": id}"
            },
        ]
    },
    "Go: Gin": {
        name: "Go: Gin",
        items: [
            {
                title: "Project Initialisation",
                syntax: "# 1. Create a project directory\nmkdir my-gin-app\ncd my-gin-app\n# 2. Initialize Go module\ngo mod init example.com/my-gin-app\n# 3. Get Gin dependency\ngo get -u github.com/gin-gonic/gin",
                example: "$ mkdir hello-gin\n$ cd hello-gin\n$ go mod init example.com/hello-gin\n$ go get -u github.com/gin-gonic/gin\n# Create main.go with Gin code...\n$ go run main.go"
            },
            {
                title: "Basic App",
                syntax: "import \"github.com/gin-gonic/gin\"\n\nfunc main() {\n    r := gin.Default()\n    r.GET(\"/ping\", func(c *gin.Context) {\n        c.JSON(200, gin.H{\"message\": \"pong\"})\n    })\n    r.Run() // :8080\n}",
                example: "package main\nimport \"github.com/gin-gonic/gin\"\n\nfunc main() {\n    r := gin.Default()\n    r.GET(\"/\", func(c *gin.Context) {\n        c.String(200, \"Hello, Gin!\")\n    })\n    r.Run(\":8080\")\n}"
            },
            {
                title: "Path Parameters",
                syntax: "r.GET(\"/user/:name\", func(c *gin.Context) {\n    name := c.Param(\"name\")\n    c.String(200, \"Hello %s\", name)\n})",
                example: "package main\nimport \"github.com/gin-gonic/gin\"\n\nfunc main() {\n    r := gin.Default()\n    // GET /user/alice\n    r.GET(\"/user/:name\", func(c *gin.Context) {\n        name := c.Param(\"name\")\n        c.JSON(200, gin.H{\n            \"user\": name,\n            \"id\": 123,\n        })\n    })\n    r.Run(\":8080\")\n}"
            },
            {
                title: "Query Parameters",
                syntax: "r.GET(\"/welcome\", func(c *gin.Context) {\n    firstname := c.DefaultQuery(\"firstname\", \"Guest\")\n    lastname := c.Query(\"lastname\")\n    c.String(200, \"Hello %s %s\", firstname, lastname)\n})",
                example: "package main\nimport \"github.com/gin-gonic/gin\"\n\nfunc main() {\n    r := gin.Default()\n    // GET /search?q=books&page=1\n    r.GET(\"/search\", func(c *gin.Context) {\n        query := c.Query(\"q\")\n        page := c.DefaultQuery(\"page\", \"1\")\n\n        c.JSON(200, gin.H{\n            \"query\": query,\n            \"page\": page,\n        })\n    })\n    r.Run(\":8080\")\n}"
            },
            {
                title: "Binding JSON (POST)",
                syntax: "type Login struct {\n    User     string `json:\"user\" binding:\"required\"`\n    Password string `json:\"password\" binding:\"required\"`\n}\n\nr.POST(\"/login\", func(c *gin.Context) {\n    var json Login\n    if err := c.ShouldBindJSON(&json); err != nil {\n        c.JSON(400, gin.H{\"error\": err.Error()})\n        return\n    }\n    c.JSON(200, gin.H{\"status\": \"logged in\"})\n})",
                example: "package main\nimport \"github.com/gin-gonic/gin\"\n\ntype Person struct {\n    Name string `json:\"name\" binding:\"required\"`\n    Age  int    `json:\"age\"`\n}\n\nfunc main() {\n    r := gin.Default()\n    r.POST(\"/users\", func(c *gin.Context) {\n        var p Person\n        if err := c.ShouldBindJSON(&p); err != nil {\n            c.JSON(400, gin.H{\"error\": \"Bad request\"})\n            return\n        }\n        c.JSON(201, gin.H{\"message\": p.Name + \" created\"})\n    })\n    r.Run(\":8080\")\n}"
            },
            {
                title: "Middleware",
                syntax: "r := gin.Default() // Default() includes Logger and Recovery\n\n// Custom middleware\nr.Use(func(c *gin.Context) {\n    fmt.Println(\"Request received!\")\n    c.Next() // Pass control to the next handler\n})",
                example: "package main\nimport (\n    \"fmt\"\n    \"github.com/gin-gonic/gin\"\n    \"time\"\n)\n\nfunc Logger() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        t := time.Now()\n        c.Next()\n        latency := time.Since(t)\n        fmt.Printf(\"%s %s in %v\\n\", c.Request.Method, c.Request.URL.Path, latency)\n    }\n}\n\nfunc main() {\n    r := gin.New() // New() is empty\n    r.Use(Logger()) // Use our custom logger\n    r.GET(\"/ping\", func(c *gin.Context) {\n        c.JSON(200, gin.H{\"message\": \"pong\"})\n    })\n    r.Run(\":8080\")\n}"
            },
        ]
    },
    "Go: Echo": {
        name: "Go: Echo",
        items: [
            {
                title: "Project Initialisation",
                syntax: "# 1. Create a project directory\nmkdir my-echo-app\ncd my-echo-app\n# 2. Initialize Go module\ngo mod init example.com/my-echo-app\n# 3. Get Echo dependency\ngo get -u github.com/labstack/echo/v4",
                example: "$ mkdir hello-echo\n$ cd hello-echo\n$ go mod init example.com/hello-echo\n$ go get -u github.com/labstack/echo/v4\n# Create main.go with Echo code...\n$ go run main.go"
            },
            {
                title: "Basic App",
                syntax: "import (\n    \"net/http\"\n    \"github.com/labstack/echo/v4\"\n)\nfunc main() {\n    e := echo.New()\n    e.GET(\"/\", func(c echo.Context) error {\n        return c.String(http.StatusOK, \"Hello, World!\")\n    })\n    e.Logger.Fatal(e.Start(\":1323\"))\n}",
                example: "package main\nimport (\n    \"net/http\"\n    \"github.com/labstack/echo/v4\"\n)\nfunc main() {\n    e := echo.New()\n    e.GET(\"/\", func(c echo.Context) error {\n        return c.String(http.StatusOK, \"Hello, Echo!\")\n    })\n    e.Logger.Fatal(e.Start(\":1323\"))\n}"
            },
            {
                title: "Path Parameters",
                syntax: "e.GET(\"/users/:id\", getUser)\n\nfunc getUser(c echo.Context) error {\n    id := c.Param(\"id\")\n    return c.String(http.StatusOK, id)\n}",
                example: "package main\nimport (\n    \"net/http\"\n    \"github.com/labstack/echo/v4\"\n)\n// GET /users/alice\nfunc getUser(c echo.Context) error {\n    name := c.Param(\"name\")\n    return c.JSON(http.StatusOK, map[string]string{\n        \"user\": name,\n    })\n}\n\nfunc main() {\n    e := echo.New()\n    e.GET(\"/users/:name\", getUser)\n    e.Logger.Fatal(e.Start(\":1323\"))\n}"
            },
            {
                title: "Query Parameters",
                syntax: "e.GET(\"/show\", show)\n\nfunc show(c echo.Context) error {\n    team := c.QueryParam(\"team\")\n    member := c.QueryParam(\"member\")\n    return c.String(http.StatusOK, \"team:\" + team + \", member:\" + member)\n}",
                example: "package main\nimport (\n    \"net/http\"\n    \"github.com/labstack/echo/v4\"\n)\n// GET /search?q=books\nfunc search(c echo.Context) error {\n    query := c.QueryParam(\"q\")\n    return c.JSON(http.StatusOK, map[string]string{\n        \"searching_for\": query,\n    })\n}\n\nfunc main() {\n    e := echo.New()\n    e.GET(\"/search\", search)\n    e.Logger.Fatal(e.Start(\":1323\"))\n}"
            },
            {
                title: "Binding Data (JSON/Form)",
                syntax: "type User struct {\n    Name  string `json:\"name\" form:\"name\"`\n    Email string `json:\"email\" form:\"email\"`\n}\n\ne.POST(\"/users\", func(c echo.Context) error {\n    u := new(User)\n    if err := c.Bind(u); err != nil {\n        return echo.NewHTTPError(http.StatusBadRequest, err.Error())\n    }\n    return c.JSON(http.StatusCreated, u)\n})",
                example: "package main\nimport (\n    \"net/http\"\n    \"github.com/labstack/echo/v4\"\n)\ntype User struct {\n    Name string `json:\"name\"`\n}\n\nfunc createUser(c echo.Context) error {\n    u := new(User)\n    if err := c.Bind(u); err != nil {\n        return err\n    }\n    return c.JSON(http.StatusCreated, u)\n}\n\nfunc main() {\n    e := echo.New()\n    e.POST(\"/users\", createUser)\n    e.Logger.Fatal(e.Start(\":1323\"))\n}"
            },
            {
                title: "Middleware",
                syntax: "import \"github.com/labstack/echo/v4/middleware\"\n\ne := echo.New()\n// DefaultWithConfig provides simple logging\ne.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{\n    Format: \"method=${method}, uri=${uri}, status=${status}\\n\",\n}))",
                example: "package main\nimport (\n    \"net/http\"\n    \"github.com/labstack/echo/v4\"\n    \"github.com/labstack/echo/v4/middleware\"\n)\n\nfunc main() {\n    e := echo.New()\n    // Use the built-in Logger middleware\n    e.Use(middleware.Logger())\n    // Use the built-in Recover middleware\n    e.Use(middleware.Recover())\n\n    e.GET(\"/\", func(c echo.Context) error {\n        return c.String(http.StatusOK, \"Hello, Echo!\")\n    })\n    e.Logger.Fatal(e.Start(\":1323\"))\n}"
            },
        ]
    },
    "Spring Boot": {
        name: "SpringBoot",
        items: [
            {
                title: "Project Initialisation (Initializr)",
                syntax: "https://start.spring.io\n\n# Dependencies: 'Spring Web', 'Spring Boot DevTools'",
                example: "// 1. Go to start.spring.io\n// 2. Choose Maven or Gradle\n// 3. Add 'Spring Web' dependency\n// 4. Click 'Generate'\n// 5. Unzip and open in your IDE"
            },
            {
                title: "Basic Application",
                syntax: "@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}",
                example: "package com.example.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}"
            },
            {
                title: "REST Controller",
                syntax: "import org.springframework.web.bind.annotation.RestController;\nimport org.springframework.web.bind.annotation.GetMapping;\n\n@RestController\npublic class MyController {\n    @GetMapping(\"/\")\n    public String home() {\n        return \"Hello, Spring!\";\n    }\n}",
                example: "import org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class HelloController {\n    @GetMapping(\"/hello\")\n    public String hello() {\n        return \"Greetings from Spring Boot!\";\n    }\n}"
            },
            {
                title: "Path Parameters (@PathVariable)",
                syntax: "@GetMapping(\"/users/{id}\")\npublic String getUser(@PathVariable Long id) {\n    return \"User ID: \" + id;\n}",
                example: "import org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.PathVariable;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class ProductController {\n    @GetMapping(\"/products/{productId}\")\n    public String getProduct(@PathVariable(\"productId\") String pId) {\n        // GET /products/abc-123\n        return \"Showing product: \" + pId;\n    }\n}"
            },
            {
                title: "Query Parameters (@RequestParam)",
                syntax: "@GetMapping(\"/search\")\npublic String search(@RequestParam String q) {\n    return \"Searching for: \" + q;\n}",
                example: "import org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RequestParam;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class ItemController {\n    @GetMapping(\"/api/items\")\n    public String getItems(\n        @RequestParam(value = \"page\", defaultValue = \"0\") int page\n    ) {\n        // GET /api/items?page=2\n        return \"Fetching items for page: \" + page;\n    }\n}"
            },
            {
                title: "Request Body (@RequestBody)",
                syntax: "// POJO Class\nclass User { public String name; }\n\n@PostMapping(\"/users\")\npublic User createUser(@RequestBody User user) {\n    return user;\n}",
                example: "import org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.RequestBody;\nimport org.springframework.web.bind.annotation.RestController;\n\n// POJO (or record)\nrecord CreateUserRequest(String username, String password) {}\n\n@RestController\npublic class UserController {\n    @PostMapping(\"/api/users\")\n    public String createUser(@RequestBody CreateUserRequest req) {\n        // POST /api/users with JSON body\n        return \"Created user: \" + req.username();\n    }\n}"
            },
            {
                title: "Service & DI (@Service, @Autowired)",
                syntax: "@Service\npublic class MyService { ... }\n\n@RestController\npublic class MyController {\n    @Autowired\n    private MyService myService;\n    // ...\n}",
                example: "import org.springframework.stereotype.Service;\nimport org.springframework.web.bind.annotation.RestController;\nimport org.springframework.beans.factory.annotation.Autowired;\n\n@Service\npublic class UserService {\n    public String findUserById(Long id) {\n        return \"User \" + id;\n    }\n}\n\n@RestController\npublic class UserController {\n    private final UserService userService;\n\n    // Constructor Injection (preferred)\n    @Autowired\n    public UserController(UserService userService) {\n        this.userService = userService;\n    }\n\n    @GetMapping(\"/users/{id}\")\n    public String getUser(@PathVariable Long id) {\n        return userService.findUserById(id);\n    }\n}"
            },
            {
                title: "Configuration (application.properties)",
                syntax: "# src/main/resources/application.properties\n\nserver.port=8080\nspring.application.name=my-app",
                example: "# Set server port\nserver.port=8090\n\n# Set logging level\nlogging.level.org.springframework=DEBUG\nlogging.level.com.example.demo=INFO"
            },
        ]
    },


    // Markup & Styling
    "HTML": {
        name: "HTML",
        items: [
            {
                title: "Basic Structure",
                syntax: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Title</title>\n</head>\n<body>Content</body>\n</html>",
                example: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>"
            },
            {
                title: "Headings & Text",
                syntax: "<h1>H1</h1> <h2>H2</h2> <h3>H3</h3>\n<p>Paragraph</p>\n<strong>Bold</strong>\n<em>Italic</em>",
                example: "<h1>Main Title</h1>\n<p>This is a <strong>very</strong> important paragraph.</p>\n<p>This is <em>emphasized</em> text.</p>"
            },
            {
                title: "Links & Images",
                syntax: "<a href=\"url\">Link Text</a>\n<img src=\"image_url\" alt=\"description\">",
                example: "<a href=\"https://google.com\">Visit Google</a>\n<img src=\"logo.png\" alt=\"Company Logo\">"
            },
            {
                title: "Lists (Unordered & Ordered)",
                syntax: "<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n</ul>\n\n<ol>\n    <li>First</li>\n    <li>Second</li>\n</ol>",
                example: "<h3>Todo:</h3>\n<ul>\n    <li>Buy milk</li>\n    <li>Read book</li>\n</ul>\n<h3>Steps:</h3>\n<ol>\n    <li>Open app</li>\n    <li>Click button</li>\n</ol>"
            },
            {
                "title": "Buttons (`<button>`)",
                "syntax": "<button type=\"button\">Click Me</button>\n\n<button type=\"submit\">Submit</button>\n\n<button type=\"reset\">Reset</button>",
                "example": "<h3>Login Form:</h3>\n<form action=\"/submit-data\">\n    <button type=\"submit\">Login</button>\n    <button type=\"button\">Cancel</button>\n</form>"
            },
            {
                title: "Forms (Basic)",
                syntax: "<form action=\"/submit\">\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" id=\"name\">\n    <button type=\"submit\">Go</button>\n</form>",
                example: "<form action=\"/login\" method=\"post\">\n    <label for=\"user\">Username:</label>\n    <input type=\"text\" id=\"user\" name=\"username\">\n\n    <label for=\"pass\">Password:</label>\n    <input type=\"password\" id=\"pass\" name=\"password\">\n\n    <button type=\"submit\">Log In</button>\n</form>"
            },
            {
                title: "Tables",
                syntax: "<table>\n    <tr>\n        <th>Header 1</th>\n        <th>Header 2</th>\n    </tr>\n    <tr>\n        <td>Data 1</td>\n        <td>Data 2</td>\n    </tr>\n</table>",
                example: "<table>\n    <tr>\n        <th>Name</th>\n        <th>Age</th>\n    </tr>\n    <tr>\n        <td>Alice</td>\n        <td>25</td>\n    </tr>\n    <tr>\n        <td>Bob</td>\n        <td>30</td>\n    </tr>\n</table>"
            },
            {
                title: "Semantic Layout",
                syntax: "<header>...</header>\n<nav>...</nav>\n<main>...</main>\n<section>...</section>\n<article>...</article>\n<aside>...</aside>\n<footer>...</footer>",
                example: "<header>\n    <h1>My Website</h1>\n</header>\n<nav>\n    <a href=\"/\">Home</a>\n</nav>\n<main>\n    <article>\n        <h2>Post Title</h2>\n    </article>\n</main>\n<footer>\n    <p>&copy; 2025</p>\n</footer>"
            },
            {
                title: "Attributes & Comments",
                syntax: "\n<div id=\"unique-id\" class=\"my-class\">...</div>",
                example: "\n<div id=\"header\" class=\"container highlight\">\n    <p>Header content</p>\n</div>"
            },
        ]
    },
    "CSS": {
        name: "CSS",
        items: [
            {
                title: "Selectors (Basic)",
                syntax: "element { ... }\n.class { ... }\n#id { ... }\nselector1, selector2 { ... }",
                example: "p { color: blue; }\n.title { font-size: 24px; }\n#header { background: #333; }\nh1, h2 { font-weight: bold; }"
            },
            {
                title: "Selectors (Advanced)",
                syntax: "parent child { ... }\nparent > child { ... }\nelement:pseudo-class { ... }\nelement::pseudo-element { ... }",
                example: "nav ul { list-style: none; }\nbody > header { margin-bottom: 1rem; }\na:hover { color: red; }\np::first-line { font-weight: bold; }"
            },
            {
                title: "Box Model",
                syntax: "width: value;\nheight: value;\nmargin: value;\npadding: value;\nborder: [width] [style] [color];",
                example: ".box {\n    width: 100px;\n    padding: 10px;\n    margin: 15px;\n    border: 1px solid black;\n}"
            },
            {
                title: "Text & Typography",
                syntax: "font-family: 'Family', sans-serif;\nfont-size: value;\nfont-weight: value;\ncolor: value;\ntext-align: value;",
                example: "body {\n    font-family: 'Arial', sans-serif;\n    font-size: 16px;\n    color: #333;\n}\nh1 { text-align: center; }"
            },
            {
                title: "Flexbox (Container)",
                syntax: "display: flex;\nflex-direction: [row | column];\njustify-content: [value];\nalign-items: [value];\ngap: [value];",
                example: ".container {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n}"
            },
            {
                title: "Flexbox (Items)",
                syntax: "flex-grow: [number];\nflex-shrink: [number];\nflex-basis: [value];\nalign-self: [value];",
                example: ".item-1 { flex-grow: 1; }\n.item-2 { flex-grow: 2; }\n.special { align-self: flex-end; }"
            },
            {
                title: "Grid (Container)",
                syntax: "display: grid;\ngrid-template-columns: [col1] [col2] ...;\ngrid-template-rows: [row1] [row2] ...;\ngrid-gap: [value];",
                example: ".grid-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 1rem;\n}"
            },
            {
                title: "Positioning",
                syntax: "position: [static | relative | absolute | fixed];\ntop: value; right: value;\nbottom: value; left: value;\nz-index: [number];",
                example: ".modal {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 100;\n}"
            },
            {
                title: "Media Queries",
                syntax: "@media (condition) {\n    selector { ... }\n}",
                example: "/* On small screens */\n@media (max-width: 600px) {\n    .container {\n        flex-direction: column;\n    }\n}"
            },
            {
                title: "CSS Variables",
                syntax: ":root {\n    --variable-name: value;\n}\n\nselector {\n    property: var(--variable-name);\n}",
                example: ":root {\n    --main-color: #66d9ef;\n}\n\na {\n    color: var(--main-color);\n}"
            },
        ]
    },
    "Markdown": {
        name: "Markdown",
        items: [
            {
                title: "Headings",
                syntax: "# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6",
                example: "# Main Title\n## Subtitle\n### Section"
            },
            {
                title: "Text Formatting",
                syntax: "*Italic* or _Italic_\n**Bold** or __Bold__\n~~Strikethrough~~\n`Inline code`",
                example: "This text is **bold** and this is _italic_.\nThis is `inline code()`."
            },
            {
                title: "Links & Images",
                syntax: "[Link Text](url)\n![Alt Text](image_url)",
                example: "[Visit Google](https://google.com)\n![blur](blur.jpg)"
            },
            {
                title: "Lists (Unordered)",
                syntax: "* Item 1\n* Item 2\n    * Nested Item\n\n- Item A\n- Item B",
                example: "* Red\n* Green\n* Blue\n    * Light Blue"
            },
            {
                title: "Lists (Ordered)",
                syntax: "1. First\n2. Second\n3. Third\n    1. Nested A\n    2. Nested B",
                example: "1. Wake up\n2. Make coffee\n3. Code"
            },
            {
                title: "Code Blocks",
                syntax: "```language\ncode block\n```",
                example: "```python\ndef hello():\n    print(\"Hello, world!\")\n```"
            },
            {
                title: "Blockquotes",
                syntax: "> Quoted text.\n> > Nested quote.",
                example: "> This is a blockquote.\n> \n> -- Someone"
            },
            {
                title: "Horizontal Rule",
                syntax: "---\n***\n___",
                example: "Section 1\n\n---\n\nSection 2"
            },
            {
                title: "Tables",
                syntax: "| Header 1 | Header 2 |\n| :--- | ---: |\n| Cell 1 | Cell 2 |\n| Cell 3 | Cell 4 |",
                example: "| Align Left | Align Right |\n| :--- | ---: |\n| test | 123 |\n| data | 456 |"
            },
        ]
    },
    "Typst": {
        name: "Typst",
        items: [
            {
                title: "Headings",
                syntax: "= Heading 1\n== Heading 2\n=== Heading 3",
                example: "= Introduction\n== Background\n=== Related Work"
            },
            {
                title: "Text Formatting",
                syntax: "*bold*\n_italic_\n`code`\n#text(color)[content]",
                example: "This is *bold* text.\nThis is _italic_ text.\nThis is `inline code()`.\nThis is #text(red)[red text]."
            },
            {
                title: "Links & Images",
                syntax: "https://url\n@label\n#image(\"path\", width: ..)",
                example: "Visit https://typst.app\n#image(\"logo.png\", width: 40%)"
            },
            {
                title: "Lists (Unordered & Ordered)",
                syntax: "- Item 1\n- Item 2\n\n+ 1. First\n+ 2. Second",
                example: "- Apples\n- Oranges\n\n+ 1. Step One\n+ 2. Step Two"
            },
            {
                title: "Math & Equations",
                syntax: "$inline_math$\n\n$[ \n  block_math \n]$",
                example: "The equation is $E = m c^2$.\n\n$[ \n  f(x) = sum_(i=0)^n x_i \n]$"
            },
            {
                title: "Code Blocks",
                syntax: "```language\ncode block\n```",
                example: "```python\ndef hello():\n    print(\"Hello, world!\")\n```"
            },
            {
                title: "Variables & Imports",
                syntax: "#let var_name = value\n#import \"file.typ\": name",
                example: "#let name = \"Alice\"\nHello, #name!\n\n#import \"template.typ\": my_func"
            },
            {
                title: "Basic Functions",
                syntax: "#rect(width: .., height: ..)[content]\n#align(center)[content]\n#box(..)[content]",
                example: "#rect(width: 100%, fill: gray)[Header]\n\n#align(center)[This is centered.]"
            },
            {
                title: "Show Rules (Styling)",
                syntax: "#show rule: styler\n#show heading: it => ...",
                example: "// Make all links blue\n#show link: it => text(blue, it)\n\n// Center all level 1 headings\n#show heading.where(level: 1): it => {\n  align(center, it)\n}"
            },
        ]
    },

    // Tools
    "Terminal": {
        name: "Terminal",
        items: [
            {
                title: "Navigation",
                syntax: "pwd\nls [options]\ncd <directory>",
                example: "pwd  # /home/user\nls -lah  # List all files with details\ncd documents  # Move into 'documents'\ncd ..  # Move up one level\ncd ~  # Go to home directory"
            },
            {
                title: "File Operations",
                syntax: "touch <file>\nmkdir <dir>\ncp <src> <dest>\nmv <src> <dest>\nrm <file>\nrm -r <dir>",
                example: "touch script.js\nmkdir project\ncp file.txt backup.txt\nmv old.txt new.txt\nrm temp.txt\nrm -r ./project  # Remove directory"
            },
            {
                title: "File Content",
                syntax: "cat <file>\nless <file>\nhead -n <lines> <file>\ntail -n <lines> <file>",
                example: "cat file.txt  # Print content\nless log.txt  # View (q to quit)\nhead -n 5 file.txt  # First 5 lines\ntail -n 10 file.txt  # Last 10 lines"
            },
            {
                title: "Searching",
                syntax: "grep <pattern> <file>\nfind <dir> -name <pattern>",
                example: "grep \"error\" app.log  # Find \"error\" in app.log\nfind . -name \"*.js\"  # Find all .js files in current dir"
            },
            {
                title: "Permissions",
                syntax: "chmod <mode> <file>\nchown <user>:<group> <file>\n# Octal: 755\n# Symbolic: u+x, g-w",
                example: "chmod 755 script.sh  # rwx for user, r-x for group/other\nchmod u+x script.sh  # Add execute for user\nchown damon:users file.txt # Change owner"
            },
            {
                title: "User & System Info",
                syntax: "whoami\nps aux\ntop\ndf -h\ndu -sh <dir>\nclear",
                example: "whoami  # damon\nps aux | grep \"node\"  # Find node processes\ntop  # Monitor processes (q to quit)\ndf -h  # Show disk usage\ndu -sh .  # Show size of current dir\nclear # Clear screen"
            },
            {
                title: "History & Help",
                syntax: "history\nman <command>\n<command> --help",
                example: "history  # Show command history\nman ls  # Show manual for ls\ngit --help  # Show help for git"
            },
            {
                title: "Superuser",
                syntax: "sudo <command>",
                example: "sudo apt update  # Run apt update as root\nsudo rm /var/log/old.log  # Force remove a root-owned file"
            },
            {
                title: "Piping & Redirection",
                syntax: "command1 | command2\ncommand > <file>\ncommand >> <file>",
                example: "ls -l | grep \".txt\"  # Pipe ls output to grep\necho \"Hello\" > file.txt  # Overwrite\necho \"World\" >> file.txt  # Append"
            },
            {
                title: "Networking",
                syntax: "ping <host>\ncurl <url>\nssh <user>@<host>",
                example: "ping google.com\ncurl https://api.example.com/data\nssh user@192.168.1.100"
            },
        ]
    },
    "Git": {
        name: "Git",
        items: [
            {
                title: "Initialise & Clone",
                syntax: "git init\ngit clone <url>",
                example: "git init  # Init in current folder\ngit clone https://github.com/user/repo.git"
            },
            {
                title: "Staging",
                syntax: "git add <file>\ngit add .\ngit reset <file>\ngit status",
                example: "git add index.html\ngit add .\ngit reset README.md  # Unstage\ngit status  # See changes"
            },
            {
                title: "Committing",
                syntax: "git commit -m \"message\"\ngit commit -am \"message\"",
                example: "git commit -m \"Add initial homepage\"\ngit commit -am \"Fix typo\"  # Stages all tracked files & commits"
            },
            {
                title: "Branching",
                syntax: "git branch\ngit branch <name>\ngit checkout <branch>\ngit checkout -b <name>",
                example: "git branch  # List all branches\ngit branch feature/login\ngit checkout feature/login\ngit checkout -b hotfix/bug  # Create & checkout"
            },
            {
                title: "Merging & Rebasing",
                syntax: "git merge <branch>\ngit rebase <branch>",
                example: "git checkout main\ngit merge feature/login  # Merge feature into main\n\ngit checkout feature/login\ngit rebase main  # Re-apply feature on top of main"
            },
            {
                title: "Remotes",
                syntax: "git remote add <name> <url>\ngit pull <remote> <branch>\ngit push <remote> <branch>",
                example: "git remote add origin <url>\ngit pull origin main  # Get changes\ngit push origin feature/login  # Send changes"
            },
            {
                title: "Viewing History",
                syntax: "git log\ngit log --oneline --graph\ngit diff\ngit diff --staged",
                example: "git log\ngit log --oneline --graph --all\ngit diff  # Unstaged changes\ngit diff --staged  # Staged changes"
            },
            {
                title: "Undoing Changes",
                syntax: "git revert <commit_hash>\ngit reset <hash>\ngit reset --hard <hash>",
                example: "git revert HEAD  # Create new commit that undoes last commit\ngit reset HEAD~1  # Move branch back, keep changes (soft)\ngit reset --hard HEAD~1  # DANGER: Discard all changes"
            },
        ]
    },

    // Maths
    "Set Theory": {
        name: "Set Theory",
        items: [
            {
                title: "Set Notation",
                syntax: "A = {elements}\nx ∈ A (x is in A)\nx ∉ A (x is not in A)\n{} or ∅ (Empty Set)",
                example: "A = {1, 2, 3, 4, 5}\n3 ∈ A\n6 ∉ A\nB = {x ∣ x is even} (Set-builder)"
            },
            {
                title: "Union (A ∪ B)",
                syntax: "All elements in A, or B, or both.\nA ∪ B = {x ∣ x ∈ A or x ∈ B}",
                example: "A = {1, 2, 3}\nB = {2, 3, 4}\nA ∪ B = {1, 2, 3, 4}"
            },
            {
                title: "Intersection (A ∩ B)",
                syntax: "Elements in both A and B.\nA ∩ B = {x ∣ x ∈ A and x ∈ B}",
                example: "A = {1, 2, 3}\nB = {2, 3, 4}\nA ∩ B = {2, 3}"
            },
            {
                title: "Difference (A - B)",
                syntax: "Elements in A but not in B.\nA \\ B = {x ∣ x ∈ A and x ∉ B}",
                example: "A = {1, 2, 3}\nB = {2, 3, 4}\nA \\ B = {1}"
            },

            {
                title: "Subsets",
                syntax: "A ⊆ B (A is a subset of B)\nA ⊂ B (A is a proper subset of B)",
                example: "A = {1, 2}\nB = {1, 2, 3}\nA ⊆ B (True)\nA ⊂ B (True)\nB ⊆ A (False)"
            },
            {
                title: "Cardinality (|A|)",
                syntax: "The number of elements in a set A.\nWritten as |A|.",
                example: "A = {a, b, c}\n|A| = 3\nB = {1, 2, 3, 4, 5}\n|B| = 5\n|∅| = 0"
            },

            {
                title: "Power Set (p(A))",
                syntax: "The set of all subsets of A.\nIf |A| = n, then |p(A)| = 2ⁿ.",
                example: "A = {1, 2}\np(A) = {∅, {1}, {2}, {1, 2}}"
            },
            {
                title: "Cartesian Product (A × B)",
                syntax: "The set of all ordered pairs (a, b) where a ∈ A and b ∈ B.",
                example: "A = {1, 2}\nB = {a, b}\nA × B = {(1, a), (1, b), (2, a), (2, b)}"
            }
        ]
    },

    "Logic": {
        name: "Logic",
        items: [
            {
                title: "Truth Tables (Basic)",
                syntax: "P ∧ Q (Conjunction / AND)\nP ∨ Q (Disjunction / OR)\n¬P (Negation / NOT)\nP → Q (Implication)",
                example: "P | Q | P ∧ Q | P ∨ Q | P → Q\n--|---|---|---|---\nT | T |   T   |   T   |   T\nT | F |   F   |   T   |   F\nF | T |   F   |   T   |   T\nF | F |   F   |   F   |   T"
            },
            {
                title: "De Morgan's Laws",
                syntax: "¬(P ∧ Q) ⇔ (¬P ∨ ¬Q)\n¬(P ∨ Q) ⇔ (¬P ∧ ¬Q)",
                example: "// \"Not (A and B)\" is same as \"(Not A) or (Not B)\"\n// \"Not (A or B)\" is same as \"(Not A) and (Not B)\""
            },
            {
                title: "Predicate Logic (Quantifiers)",
                syntax: "∀x P(x) // \"For all x, P(x) is true\"\n∃x P(x) // \"There exists an x, P(x) is true\"",
                example: "// \"All humans are mortal\"\n∀x (Human(x) → Mortal(x))\n\n// \"Some cats are black\"\n∃x (Cat(x) ∧ Black(x))"
            },

        ]
    },

    "Data Structures": {
        name: "Data Structures",
        items: [
            {
                title: "Singly Linked List",
                syntax: "Node(value, next_pointer)\nList(head_pointer)",
                example: "Head -> [A | *] -> [B | *] -> [C | null]"
            },
            {
                title: "Doubly Linked List",
                syntax: "Node(value, next_pointer, prev_pointer)",
                example: "[null | A | *] <-> [* | B | *] <-> [* | C | null]"
            },
            {
                title: "Stack (LIFO)",
                syntax: "push(item) // Add to top\npop() // Remove from top\npeek() // View top",
                example: "| C |  <- Top\n| B |\n| A |\n+---+"
            },
            {
                title: "Queue (FIFO)",
                syntax: "enqueue(item) // Add to rear\ndequeue() // Remove from front\npeek() // View front",
                example: "Front -> [A] -> [B] -> [C] -> Rear"
            },
            {
                title: "Binary Search Tree (BST)",
                syntax: "Node(value, left, right)\nRule: left.value < value < right.value",
                example: "    (10)\n   /    \\\n (5)      (15)\n/   \\    /    \\\n(3) (7)  (12)  (18)"
            },
            {
                title: "Heap (Min-Heap)",
                syntax: "Parent(i) <= Child(i)\n// Stored as array\nLeft(i) = 2*i + 1\nRight(i) = 2*i + 2",
                example: "Array: [10, 15, 20, 17, 25]\n\n    (10)\n   /    \\\n (15)    (20)\n/    \\\n(17)  (25)"
            },
            {
                title: "Hash Table",
                syntax: "hash_function(key) -> index\n// Handles collisions (e.g., Chaining, Probing)",
                example: "Key -> Hash() -> Index\n\"name\" -> 2341 -> 1  | 0 | ... |\n\"age\"  -> 5882 -> 2  | 1 | -> [\"name\", \"Damon\"]\n\"job\"  -> 4199 -> 3  | 2 | -> [\"age\", 25]\n                   | 3 | -> [\"job\", \"Coder\"]\n(Example uses Chaining)"
            },
        ]
    },
};


// Navigation
const navigationGroups = [
    {
        title: "Languages",
        subjects: ["Python", "JavaScript", "TypeScript", "Go", "Java", "C", "C++", "Naming Conventions"]
    },
    {
        title: "Libraries",
        subjects: ["Python: Math", "Python: Hashing", "Go: fmt", "Go: File I/O (os, io)", "Go: Hashing", "Go: Crypto (Lattigo)"]
    },
    {
        title: "Frameworks",
        subjects: ["React", "Python: Flask", "Python: FastAPI", "Go: Gin", "Go: Echo", "SpringBoot"]
    },
    {
        title: "Markup & Styling",
        subjects: ["HTML", "CSS", "Markdown", "Typst"]
    },
    {
        title: "Tools",
        subjects: ["Terminal", "Git"]
    },
    {
        title: "Maths",
        subjects: ["Set Theory", "Logic", "Data Structures"]
    }
];


const ThemeToggle: React.FC<{ theme: string; onToggle: () => void }> = ({ theme, onToggle }) => (
    <label className="theme-switch" title="Toggle theme">
        <input
            type="checkbox"
            checked={theme === 'monokai'}
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
    const [theme, setTheme] = useState<'monokai' | 'gruvbox'>('gruvbox');
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

            {currentSubjectData ? (
                <CheatSheetDisplay subject={currentSubjectData} onCardClick={openModal} />
            ) : (
                <main className="main-content">
                    <h2 className="subject-title">No subject selected</h2>
                </main>
            )}

            {modalContent && <Modal item={modalContent} onClose={closeModal} />}
        </div>
    );
};

export default CheatSheetApp;