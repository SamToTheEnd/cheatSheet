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
                title: "Generators (yield)",
                syntax: "def generator_func():\n    yield value",
                example: "def count_up_to(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\n\nfor num in count_up_to(3):\n    print(num)  # 1, 2, 3"
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
                syntax: "var name [size]type\nname := [size]type{val1, val2, ...}",
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
                example: "type Shape interface {\n    Area() float64\n}\n\ntype Rect struct { w, h float64 }\nfunc (r Rect) Area() float64 { return r.w * r.h }\n\nfunc PrintArea(s Shape) {\n    fmt.Println(s.Area())\n}"
            },
            {
                title: "JSON (Marshal/Unmarshal)",
                syntax: "json.Marshal(v)\njson.Unmarshal(data, &v)",
                example: "type User struct {\n    Name string `json:\"name\"`\n}\nu := User{Name: \"Alice\"}\n\nb, err := json.Marshal(u)\n// b is [{\"name\":\"Alice\"}]\n\nvar u2 User\nerr = json.Unmarshal(b, &u2)"
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
                example: "interface Person {\n    name: string;\n    age: number;\n    email?: string;  // optional\n}\n\nconst user: Person = {\n    name: \"Bob\",\n    age: 30\n};"
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
                example: "class Person {\n    constructor(name) {\n        this.name = name;\n    }\n    greet() {\n        console.log(`Hello, ${this.name}`);\n    }\n}\n\nconst p = new Person('Alice');\np.greet(); // Hello, Alice"
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
                example: "struct Person {\n    char name[50];\n    int age;\n};\n\nint main() {\n    struct Person p1;\n    strcpy(p1.name, \"Alice\");\n    p1.age = 30;\n    printf(\"%s is %d\\n\", p1.name, p1.age);\n    return 0;\n}"
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
                example: "// camelCase(JS/Java/Go vars, functions)\nlet myVariableName = \"Cases\";\n\n// PascalCase (Classes, Components)\nclass MyClassName {}\n\n// snake_case (Python vars, functions)\ndef my_function_name():\n  Cases\n\n// UPPER_SNAKE_CASE (Constants)\nconst NUMBER_OF_ALBUMS = 10;\n\n// kebab-case (CSS classes, HTML attributes)\n// <div class=\"my-css-class\"></div>"
            }
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
                example: "[Visit Google](https://google.com)\n![A cute cat](cat.jpg)"
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
                title: "Code Blocks (Fenced)",
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
                syntax: "chmod <mode> <file>\n# Octal: 755\n# Symbolic: u+x, g-w",
                example: "chmod 755 script.sh  # rwx for user, r-x for group/other\nchmod u+x script.sh  # Add execute for user"
            },
            {
                title: "System & Processes",
                syntax: "ps aux\ntop\ndf -h\ndu -sh <dir>",
                example: "ps aux | grep \"node\"  # Find node processes\ntop  # Monitor processes (q to quit)\ndf -h  # Show disk usage\ndu -sh .  # Show size of current dir"
            },
            {
                title: "Piping & Redirection",
                syntax: "command1 | command2\ncommand > <file>\ncommand >> <file>",
                example: "ls -l | grep \".txt\"  # Pipe ls output to grep\necho \"Hello\" > file.txt  # Overwrite\necho \"World\" >> file.txt  # Append"
            },
            {
                title: "Networking (Basic)",
                syntax: "ping <host>\ncurl <url>",
                example: "ping google.com\ncurl https://api.example.com/data"
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