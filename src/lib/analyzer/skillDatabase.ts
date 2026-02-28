// A lightweight database of common skills and related interview questions
// This replaces the need for an AI to "invent" questions.

export const SKILL_DATABASE: Record<string, { patterns: string[], questions: string[], expectedKeywords: string[] }> = {
    "react": {
        patterns: ["react", "react.js", "reactjs", "react native"],
        questions: [
            "Explain the Virtual DOM and how it improves performance.",
            "What is the difference between UseEffect and UseLayoutEffect?",
            "How do you handle state management in complex applications?"
        ],
        expectedKeywords: ["virtual", "diffing", "render", "state", "redux", "context", "hook"]
    },
    "javascript": {
        patterns: ["javascript", "js", "es6", "frontend"],
        questions: [
            "Explain the concept of Closures in JavaScript.",
            "What is the Event Loop and how does it handle asynchronous operations?",
            "Explain the difference between '==' and '==='."
        ],
        expectedKeywords: ["scope", "function", "stack", "queue", "type", "strict"]
    },
    "typescript": {
        patterns: ["typescript", "ts"],
        questions: [
            "What are Generics and when would you use them?",
            "Explain the difference between 'interface' and 'type'.",
            "How does TypeScript help in large scale applications?"
        ],
        expectedKeywords: ["type", "safety", "compile", "static", "checking"]
    },
    "python": {
        patterns: ["python", "django", "flask", "fastapi"],
        questions: [
            "Explain the Global Interpreter Lock (GIL).",
            "How do decorators work in Python?",
            "Difference between list and tuple?"
        ],
        expectedKeywords: ["thread", "memory", "immutable", "mutable", "function"]
    },
    "java": {
        patterns: ["java", "spring", "jvm"],
        questions: [
            "Explain the difference between JDK, JRE, and JVM.",
            "How does Garbage Collection work in Java?",
            "What are the 4 pillars of OOPs?"
        ],
        expectedKeywords: ["object", "memory", "inheritance", "polymorphism", "encapsulation"]
    },
    "node": {
        patterns: ["node", "node.js", "express", "backend"],
        questions: [
            "How does Node.js handle concurrency (Single Threaded Event Loop)?",
            "Explain Middleware in Express.",
            "Difference between process.nextTick() and setImmediate()."
        ],
        expectedKeywords: ["event", "loop", "request", "response", "callback"]
    },
    "html_css": {
        patterns: ["html", "css", "html5", "css3", "tailwind", "bootstrap", "responsive"],
        questions: [
            "Explain the Box Model.",
            "What is the difference between Flexbox and Grid?",
            "What are semantic tags in HTML5?"
        ],
        expectedKeywords: ["margin", "padding", "border", "layout", "seo", "accessibility"]
    },
    "sql": {
        patterns: ["sql", "mysql", "postgres", "database"],
        questions: [
            "Difference between INNER JOIN and OUTER JOIN.",
            "What is normalization and why is it used?",
            "Explain ACID properties."
        ],
        expectedKeywords: ["table", "row", "redundancy", "consistency", "transaction"]
    },
    "default": {
        patterns: [],
        questions: [
            "Describe a challenging technical problem you solved recently.",
            "How do you stay updated with the latest technologies?",
            "How do you handle disagreements in a team?",
            "Explain a time you had to optimize code performance.",
            "How do you approach debugging a complex issue?",
            "What is your preferred development environment setup?",
            "How do you manage technical debt in a project?",
            "Describe your experience with version control systems like Git.",
            "How do you ensure code quality and maintainability?",
            "Explain the importance of testing in software development."
        ],
        expectedKeywords: ["problem", "solution", "team", "learning", "communication"]
    }
};

export const COMMON_SKILLS = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Python",
    "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby",
    "HTML", "CSS", "SQL", "NoSQL", "MongoDB", "PostgreSQL", "AWS", "Azure",
    "Google Cloud", "Docker", "Kubernetes", "Git", "CI/CD", "Agile", "Scrum",
    "Machine Learning", "AI", "Data Analysis", "Project Management", "UI/UX",
    "Figma", "Photoshop", "Communication", "Leadership", "Sales", "Marketing"
];
