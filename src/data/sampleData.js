export const sampleGraphData = {
  nodes: [
    // Department nodes (smaller sizes)
    {
      id: "dept-engineering",
      type: "department",
      name: "Engineering",
      color: "#64ffda",
      size: 12
    },
    {
      id: "dept-design",
      type: "department", 
      name: "Design",
      color: "#ff6b6b",
      size: 12
    },
    {
      id: "dept-product",
      type: "department",
      name: "Product",
      color: "#4ecdc4",
      size: 12
    },
    {
      id: "dept-marketing",
      type: "department",
      name: "Marketing", 
      color: "#45b7d1",
      size: 12
    },
    {
      id: "dept-sales",
      type: "department",
      name: "Sales", 
      color: "#a8e6cf",
      size: 12
    },
    {
      id: "dept-hr",
      type: "department",
      name: "Human Resources", 
      color: "#ffb347",
      size: 12
    },
    {
      id: "dept-finance",
      type: "department",
      name: "Finance", 
      color: "#dda0dd",
      size: 12
    },

    // Engineering Team (expanded)
    {
      id: "person-alice",
      type: "person",
      name: "Alice Chen",
      role: "Senior Engineer",
      department: "Engineering",
      mbti: "INTJ",
      ocean: { openness: 0.85, conscientiousness: 0.78, extraversion: 0.34, agreeableness: 0.62, neuroticism: 0.25 },
      enneagram: "5w4",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-bob",
      type: "person", 
      name: "Bob Martinez",
      role: "Frontend Engineer",
      department: "Engineering",
      mbti: "ENFP",
      ocean: { openness: 0.92, conscientiousness: 0.45, extraversion: 0.81, agreeableness: 0.74, neuroticism: 0.38 },
      enneagram: "7w6",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-frank",
      type: "person",
      name: "Frank Thompson",
      role: "Backend Engineer",
      department: "Engineering",
      mbti: "ISTJ",
      ocean: { openness: 0.45, conscientiousness: 0.94, extraversion: 0.28, agreeableness: 0.67, neuroticism: 0.19 },
      enneagram: "1w9",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-sarah",
      type: "person",
      name: "Sarah Park",
      role: "DevOps Engineer",
      department: "Engineering",
      mbti: "ISTP",
      ocean: { openness: 0.72, conscientiousness: 0.85, extraversion: 0.31, agreeableness: 0.58, neuroticism: 0.21 },
      enneagram: "5w6",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-mike",
      type: "person",
      name: "Mike Johnson",
      role: "Full Stack Engineer",
      department: "Engineering",
      mbti: "ENTP",
      ocean: { openness: 0.89, conscientiousness: 0.52, extraversion: 0.76, agreeableness: 0.64, neuroticism: 0.33 },
      enneagram: "7w8",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-jenny",
      type: "person",
      name: "Jenny Liu",
      role: "Software Architect",
      department: "Engineering",
      mbti: "INTJ",
      ocean: { openness: 0.87, conscientiousness: 0.91, extraversion: 0.29, agreeableness: 0.56, neuroticism: 0.18 },
      enneagram: "5w4",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-ryan",
      type: "person",
      name: "Ryan O'Connor",
      role: "Junior Engineer",
      department: "Engineering",
      mbti: "ISFJ",
      ocean: { openness: 0.61, conscientiousness: 0.83, extraversion: 0.44, agreeableness: 0.86, neuroticism: 0.41 },
      enneagram: "6w5",
      color: "#64ffda",
      size: 4
    },
    {
      id: "person-alex",
      type: "person",
      name: "Alex Patel",
      role: "Mobile Developer",
      department: "Engineering",
      mbti: "INFP",
      ocean: { openness: 0.91, conscientiousness: 0.68, extraversion: 0.37, agreeableness: 0.79, neuroticism: 0.35 },
      enneagram: "4w5",
      color: "#64ffda",
      size: 4
    },

    // Design Team (expanded)
    {
      id: "person-carol",
      type: "person",
      name: "Carol Davis",
      role: "UX Designer",
      department: "Design",
      mbti: "INFP",
      ocean: { openness: 0.94, conscientiousness: 0.67, extraversion: 0.42, agreeableness: 0.89, neuroticism: 0.31 },
      enneagram: "4w5",
      color: "#ff6b6b",
      size: 4
    },
    {
      id: "person-eva",
      type: "person",
      name: "Eva Rodriguez",
      role: "Visual Designer",
      department: "Design", 
      mbti: "ISFP",
      ocean: { openness: 0.88, conscientiousness: 0.71, extraversion: 0.39, agreeableness: 0.82, neuroticism: 0.44 },
      enneagram: "9w1",
      color: "#ff6b6b",
      size: 4
    },
    {
      id: "person-maya",
      type: "person",
      name: "Maya Singh",
      role: "UI Designer",
      department: "Design",
      mbti: "ENFP",
      ocean: { openness: 0.96, conscientiousness: 0.58, extraversion: 0.82, agreeableness: 0.77, neuroticism: 0.29 },
      enneagram: "7w6",
      color: "#ff6b6b",
      size: 4
    },
    {
      id: "person-jordan",
      type: "person",
      name: "Jordan Taylor",
      role: "Design Lead",
      department: "Design",
      mbti: "ENFJ",
      ocean: { openness: 0.85, conscientiousness: 0.79, extraversion: 0.88, agreeableness: 0.91, neuroticism: 0.24 },
      enneagram: "2w3",
      color: "#ff6b6b",
      size: 4
    },
    {
      id: "person-nina",
      type: "person",
      name: "Nina Kowalski",
      role: "Interaction Designer",
      department: "Design",
      mbti: "INFJ",
      ocean: { openness: 0.89, conscientiousness: 0.84, extraversion: 0.41, agreeableness: 0.87, neuroticism: 0.32 },
      enneagram: "4w5",
      color: "#ff6b6b",
      size: 4
    },

    // Product Team
    {
      id: "person-david",
      type: "person",
      name: "David Kim",
      role: "Product Manager",
      department: "Product",
      mbti: "ENTJ",
      ocean: { openness: 0.76, conscientiousness: 0.91, extraversion: 0.78, agreeableness: 0.55, neuroticism: 0.22 },
      enneagram: "8w7",
      color: "#4ecdc4",
      size: 4
    },
    {
      id: "person-lisa",
      type: "person",
      name: "Lisa Zhang",
      role: "Senior Product Manager",
      department: "Product",
      mbti: "ESTJ",
      ocean: { openness: 0.68, conscientiousness: 0.93, extraversion: 0.81, agreeableness: 0.62, neuroticism: 0.19 },
      enneagram: "8w9",
      color: "#4ecdc4",
      size: 4
    },
    {
      id: "person-tom",
      type: "person",
      name: "Tom Anderson",
      role: "Product Analyst",
      department: "Product",
      mbti: "INTP",
      ocean: { openness: 0.84, conscientiousness: 0.73, extraversion: 0.33, agreeableness: 0.59, neuroticism: 0.27 },
      enneagram: "5w6",
      color: "#4ecdc4",
      size: 4
    },
    {
      id: "person-anna",
      type: "person",
      name: "Anna Volkov",
      role: "Product Owner",
      department: "Product",
      mbti: "ESFJ",
      ocean: { openness: 0.71, conscientiousness: 0.87, extraversion: 0.79, agreeableness: 0.88, neuroticism: 0.31 },
      enneagram: "2w1",
      color: "#4ecdc4",
      size: 4
    },

    // Marketing Team
    {
      id: "person-grace",
      type: "person",
      name: "Grace Wilson",
      role: "Content Strategist",
      department: "Marketing",
      mbti: "ESFJ",
      ocean: { openness: 0.73, conscientiousness: 0.82, extraversion: 0.85, agreeableness: 0.91, neuroticism: 0.33 },
      enneagram: "2w3",
      color: "#45b7d1",
      size: 4
    },
    {
      id: "person-carlos",
      type: "person",
      name: "Carlos Mendez",
      role: "Digital Marketing Manager",
      department: "Marketing",
      mbti: "ESTP",
      ocean: { openness: 0.78, conscientiousness: 0.64, extraversion: 0.92, agreeableness: 0.74, neuroticism: 0.28 },
      enneagram: "7w8",
      color: "#45b7d1",
      size: 4
    },
    {
      id: "person-sophie",
      type: "person",
      name: "Sophie Martin",
      role: "Brand Manager",
      department: "Marketing",
      mbti: "ENFP",
      ocean: { openness: 0.93, conscientiousness: 0.61, extraversion: 0.87, agreeableness: 0.81, neuroticism: 0.36 },
      enneagram: "7w6",
      color: "#45b7d1",
      size: 4
    },
    {
      id: "person-raj",
      type: "person",
      name: "Raj Kumar",
      role: "SEO Specialist",
      department: "Marketing",
      mbti: "ISTJ",
      ocean: { openness: 0.56, conscientiousness: 0.91, extraversion: 0.41, agreeableness: 0.72, neuroticism: 0.23 },
      enneagram: "1w9",
      color: "#45b7d1",
      size: 4
    },

    // Sales Team
    {
      id: "person-steve",
      type: "person",
      name: "Steve Roberts",
      role: "Sales Director",
      department: "Sales",
      mbti: "ESTJ",
      ocean: { openness: 0.65, conscientiousness: 0.89, extraversion: 0.94, agreeableness: 0.67, neuroticism: 0.21 },
      enneagram: "8w7",
      color: "#a8e6cf",
      size: 4
    },
    {
      id: "person-maria",
      type: "person",
      name: "Maria Gonzalez",
      role: "Account Executive",
      department: "Sales",
      mbti: "ESFP",
      ocean: { openness: 0.76, conscientiousness: 0.71, extraversion: 0.91, agreeableness: 0.84, neuroticism: 0.32 },
      enneagram: "7w6",
      color: "#a8e6cf",
      size: 4
    },
    {
      id: "person-james",
      type: "person",
      name: "James Wright",
      role: "Sales Representative",
      department: "Sales",
      mbti: "ENFJ",
      ocean: { openness: 0.74, conscientiousness: 0.78, extraversion: 0.89, agreeableness: 0.92, neuroticism: 0.27 },
      enneagram: "2w3",
      color: "#a8e6cf",
      size: 4
    },
    {
      id: "person-kelly",
      type: "person",
      name: "Kelly Brown",
      role: "Business Development",
      department: "Sales",
      mbti: "ENTP",
      ocean: { openness: 0.88, conscientiousness: 0.63, extraversion: 0.86, agreeableness: 0.71, neuroticism: 0.29 },
      enneagram: "7w8",
      color: "#a8e6cf",
      size: 4
    },

    // HR Team
    {
      id: "person-diane",
      type: "person",
      name: "Diane Foster",
      role: "HR Director",
      department: "Human Resources",
      mbti: "ESFJ",
      ocean: { openness: 0.69, conscientiousness: 0.92, extraversion: 0.78, agreeableness: 0.94, neuroticism: 0.26 },
      enneagram: "2w1",
      color: "#ffb347",
      size: 4
    },
    {
      id: "person-michelle",
      type: "person",
      name: "Michelle Lee",
      role: "Recruiter",
      department: "Human Resources",
      mbti: "ENFP",
      ocean: { openness: 0.84, conscientiousness: 0.67, extraversion: 0.88, agreeableness: 0.86, neuroticism: 0.34 },
      enneagram: "7w6",
      color: "#ffb347",
      size: 4
    },
    {
      id: "person-robert",
      type: "person",
      name: "Robert Chen",
      role: "HR Specialist",
      department: "Human Resources",
      mbti: "ISFJ",
      ocean: { openness: 0.58, conscientiousness: 0.87, extraversion: 0.52, agreeableness: 0.91, neuroticism: 0.38 },
      enneagram: "6w5",
      color: "#ffb347",
      size: 4
    },

    // Finance Team
    {
      id: "person-patricia",
      type: "person",
      name: "Patricia Johnson",
      role: "CFO",
      department: "Finance",
      mbti: "ENTJ",
      ocean: { openness: 0.72, conscientiousness: 0.96, extraversion: 0.74, agreeableness: 0.58, neuroticism: 0.19 },
      enneagram: "8w9",
      color: "#dda0dd",
      size: 4
    },
    {
      id: "person-kevin",
      type: "person",
      name: "Kevin Murphy",
      role: "Financial Analyst",
      department: "Finance",
      mbti: "ISTJ",
      ocean: { openness: 0.51, conscientiousness: 0.94, extraversion: 0.36, agreeableness: 0.69, neuroticism: 0.22 },
      enneagram: "1w9",
      color: "#dda0dd",
      size: 4
    },
    {
      id: "person-helen",
      type: "person",
      name: "Helen Davis",
      role: "Accountant",
      department: "Finance",
      mbti: "ISFJ",
      ocean: { openness: 0.47, conscientiousness: 0.91, extraversion: 0.43, agreeableness: 0.83, neuroticism: 0.31 },
      enneagram: "6w5",
      color: "#dda0dd",
      size: 4
    }
  ],
  links: [
    // Department connections - Engineering
    { source: "person-alice", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-bob", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-frank", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-sarah", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-mike", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-jenny", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-ryan", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },
    { source: "person-alex", target: "dept-engineering", relation: "belongs-to", strength: 1.0 },

    // Department connections - Design
    { source: "person-carol", target: "dept-design", relation: "belongs-to", strength: 1.0 },
    { source: "person-eva", target: "dept-design", relation: "belongs-to", strength: 1.0 },
    { source: "person-maya", target: "dept-design", relation: "belongs-to", strength: 1.0 },
    { source: "person-jordan", target: "dept-design", relation: "belongs-to", strength: 1.0 },
    { source: "person-nina", target: "dept-design", relation: "belongs-to", strength: 1.0 },

    // Department connections - Product
    { source: "person-david", target: "dept-product", relation: "belongs-to", strength: 1.0 },
    { source: "person-lisa", target: "dept-product", relation: "belongs-to", strength: 1.0 },
    { source: "person-tom", target: "dept-product", relation: "belongs-to", strength: 1.0 },
    { source: "person-anna", target: "dept-product", relation: "belongs-to", strength: 1.0 },

    // Department connections - Marketing
    { source: "person-grace", target: "dept-marketing", relation: "belongs-to", strength: 1.0 },
    { source: "person-carlos", target: "dept-marketing", relation: "belongs-to", strength: 1.0 },
    { source: "person-sophie", target: "dept-marketing", relation: "belongs-to", strength: 1.0 },
    { source: "person-raj", target: "dept-marketing", relation: "belongs-to", strength: 1.0 },

    // Department connections - Sales
    { source: "person-steve", target: "dept-sales", relation: "belongs-to", strength: 1.0 },
    { source: "person-maria", target: "dept-sales", relation: "belongs-to", strength: 1.0 },
    { source: "person-james", target: "dept-sales", relation: "belongs-to", strength: 1.0 },
    { source: "person-kelly", target: "dept-sales", relation: "belongs-to", strength: 1.0 },

    // Department connections - HR
    { source: "person-diane", target: "dept-hr", relation: "belongs-to", strength: 1.0 },
    { source: "person-michelle", target: "dept-hr", relation: "belongs-to", strength: 1.0 },
    { source: "person-robert", target: "dept-hr", relation: "belongs-to", strength: 1.0 },

    // Department connections - Finance
    { source: "person-patricia", target: "dept-finance", relation: "belongs-to", strength: 1.0 },
    { source: "person-kevin", target: "dept-finance", relation: "belongs-to", strength: 1.0 },
    { source: "person-helen", target: "dept-finance", relation: "belongs-to", strength: 1.0 },

    // Personality-based connections - Introverts
    { source: "person-alice", target: "person-carol", relation: "introvert-connection", strength: 0.8 },
    { source: "person-frank", target: "person-sarah", relation: "introvert-connection", strength: 0.7 },
    { source: "person-jenny", target: "person-nina", relation: "introvert-connection", strength: 0.85 },
    { source: "person-alex", target: "person-tom", relation: "introvert-connection", strength: 0.75 },

    // Personality-based connections - Extroverts  
    { source: "person-bob", target: "person-grace", relation: "extrovert-connection", strength: 0.9 },
    { source: "person-mike", target: "person-carlos", relation: "extrovert-connection", strength: 0.85 },
    { source: "person-maya", target: "person-sophie", relation: "extrovert-connection", strength: 0.8 },
    { source: "person-steve", target: "person-maria", relation: "extrovert-connection", strength: 0.9 },

    // High conscientiousness connections
    { source: "person-alice", target: "person-frank", relation: "high-conscientiousness", strength: 0.7 },
    { source: "person-jenny", target: "person-patricia", relation: "high-conscientiousness", strength: 0.9 },
    { source: "person-lisa", target: "person-kevin", relation: "high-conscientiousness", strength: 0.8 },

    // Creative synergy connections
    { source: "person-carol", target: "person-eva", relation: "creative-synergy", strength: 0.85 },
    { source: "person-maya", target: "person-jordan", relation: "creative-synergy", strength: 0.9 },
    { source: "person-alex", target: "person-nina", relation: "creative-synergy", strength: 0.8 },

    // Openness similarity connections
    { source: "person-bob", target: "person-carol", relation: "openness-similarity", strength: 0.78 },
    { source: "person-mike", target: "person-maya", relation: "openness-similarity", strength: 0.85 },
    { source: "person-sophie", target: "person-kelly", relation: "openness-similarity", strength: 0.8 },

    // Complementary traits connections
    { source: "person-david", target: "person-frank", relation: "complementary-traits", strength: 0.65 },
    { source: "person-lisa", target: "person-ryan", relation: "complementary-traits", strength: 0.7 },
    { source: "person-steve", target: "person-robert", relation: "complementary-traits", strength: 0.75 },

    // Cross-department collaboration - Product & Engineering
    { source: "person-david", target: "person-alice", relation: "collaboration", strength: 0.9 },
    { source: "person-lisa", target: "person-jenny", relation: "collaboration", strength: 0.85 },
    { source: "person-tom", target: "person-sarah", relation: "collaboration", strength: 0.8 },
    { source: "person-anna", target: "person-mike", relation: "collaboration", strength: 0.75 },

    // Cross-department collaboration - Design & Engineering
    { source: "person-carol", target: "person-bob", relation: "collaboration", strength: 0.75 },
    { source: "person-jordan", target: "person-alex", relation: "collaboration", strength: 0.8 },
    { source: "person-maya", target: "person-ryan", relation: "collaboration", strength: 0.7 },

    // Cross-department collaboration - Marketing & Design
    { source: "person-eva", target: "person-grace", relation: "collaboration", strength: 0.6 },
    { source: "person-sophie", target: "person-nina", relation: "collaboration", strength: 0.7 },

    // Cross-department collaboration - Sales & Marketing
    { source: "person-carlos", target: "person-steve", relation: "collaboration", strength: 0.8 },
    { source: "person-maria", target: "person-sophie", relation: "collaboration", strength: 0.75 },

    // Cross-department collaboration - HR & All departments
    { source: "person-diane", target: "person-patricia", relation: "collaboration", strength: 0.7 },
    { source: "person-michelle", target: "person-jenny", relation: "collaboration", strength: 0.65 },
    { source: "person-michelle", target: "person-jordan", relation: "collaboration", strength: 0.6 },

    // Leadership connections
    { source: "person-jenny", target: "person-jordan", relation: "leadership-connection", strength: 0.8 },
    { source: "person-lisa", target: "person-steve", relation: "leadership-connection", strength: 0.75 },
    { source: "person-patricia", target: "person-diane", relation: "leadership-connection", strength: 0.85 },

    // Mentorship connections
    { source: "person-alice", target: "person-ryan", relation: "mentorship", strength: 0.8 },
    { source: "person-jenny", target: "person-alex", relation: "mentorship", strength: 0.75 },
    { source: "person-jordan", target: "person-maya", relation: "mentorship", strength: 0.8 },
    { source: "person-david", target: "person-tom", relation: "mentorship", strength: 0.75 }
  ]
};