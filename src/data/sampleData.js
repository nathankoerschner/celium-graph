export const sampleGraphData = {
  nodes: [
    // Department nodes
    {
      id: "dept-engineering",
      type: "department",
      name: "Engineering",
      color: "#00fff0",
      size: 8,
    },
    {
      id: "dept-design",
      type: "department",
      name: "Design",
      color: "#FFD700",
      size: 8,
    },
    {
      id: "dept-product",
      type: "department",
      name: "Product",
      color: "#00fff0",
      size: 8,
    },
    {
      id: "dept-marketing",
      type: "department",
      name: "Marketing",
      color: "#FFD700",
      size: 8,
    },
    {
      id: "dept-sales",
      type: "department",
      name: "Sales",
      color: "#00fff0",
      size: 8,
    },
    {
      id: "dept-hr",
      type: "department",
      name: "Human Resources",
      color: "#FFD700",
      size: 8,
    },
    {
      id: "dept-finance",
      type: "department",
      name: "Finance",
      color: "#00fff0",
      size: 8,
    },

    // Engineering
    {
      id: "person-alice",
      type: "person",
      name: "Alice",
      role: "Senior Engineer",
      department: "Engineering",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-bob",
      type: "person",
      name: "Bob",
      role: "Frontend Engineer",
      department: "Engineering",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-frank",
      type: "person",
      name: "Frank",
      role: "Backend Engineer",
      department: "Engineering",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-sarah",
      type: "person",
      name: "Sarah",
      role: "DevOps Engineer",
      department: "Engineering",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-tom",
      type: "person",
      name: "Tom",
      role: "QA Engineer",
      department: "Engineering",
      color: "#00fff0",
      size: 4,
    },

    // Design
    {
      id: "person-carol",
      type: "person",
      name: "Carol",
      role: "UX Designer",
      department: "Design",
      color: "#FFD700",
      size: 4,
    },
    {
      id: "person-eva",
      type: "person",
      name: "Eva",
      role: "Visual Designer",
      department: "Design",
      color: "#FFD700",
      size: 4,
    },
    {
      id: "person-maya",
      type: "person",
      name: "Maya",
      role: "UI Designer",
      department: "Design",
      color: "#FFD700",
      size: 4,
    },
    {
      id: "person-ian",
      type: "person",
      name: "Ian",
      role: "Design Intern",
      department: "Design",
      color: "#FFD700",
      size: 3,
    },

    // Product
    {
      id: "person-david",
      type: "person",
      name: "David",
      role: "Product Manager",
      department: "Product",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-lisa",
      type: "person",
      name: "Lisa",
      role: "Senior PM",
      department: "Product",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-oliver",
      type: "person",
      name: "Oliver",
      role: "Business Analyst",
      department: "Product",
      color: "#00fff0",
      size: 4,
    },

    // Marketing
    {
      id: "person-grace",
      type: "person",
      name: "Grace",
      role: "Content Strategist",
      department: "Marketing",
      color: "#FFD700",
      size: 4,
    },
    {
      id: "person-carlos",
      type: "person",
      name: "Carlos",
      role: "Marketing Manager",
      department: "Marketing",
      color: "#FFD700",
      size: 4,
    },
    {
      id: "person-julia",
      type: "person",
      name: "Julia",
      role: "SEO Specialist",
      department: "Marketing",
      color: "#FFD700",
      size: 4,
    },

    // Sales
    {
      id: "person-steve",
      type: "person",
      name: "Steve",
      role: "Sales Director",
      department: "Sales",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-maria",
      type: "person",
      name: "Maria",
      role: "Account Executive",
      department: "Sales",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-nick",
      type: "person",
      name: "Nick",
      role: "Sales Associate",
      department: "Sales",
      color: "#00fff0",
      size: 4,
    },

    // HR
    {
      id: "person-helen",
      type: "person",
      name: "Helen",
      role: "HR Manager",
      department: "Human Resources",
      color: "#FFD700",
      size: 4,
    },
    {
      id: "person-roger",
      type: "person",
      name: "Roger",
      role: "Recruiter",
      department: "Human Resources",
      color: "#FFD700",
      size: 4,
    },

    // Finance
    {
      id: "person-nina",
      type: "person",
      name: "Nina",
      role: "Finance Manager",
      department: "Finance",
      color: "#00fff0",
      size: 4,
    },
    {
      id: "person-omar",
      type: "person",
      name: "Omar",
      role: "Accountant",
      department: "Finance",
      color: "#00fff0",
      size: 4,
    },
  ],
  links: [
    // Department connections
    {
      source: "person-alice",
      target: "dept-engineering",
      relation: "belongs-to",
    },
    {
      source: "person-bob",
      target: "dept-engineering",
      relation: "belongs-to",
    },
    {
      source: "person-frank",
      target: "dept-engineering",
      relation: "belongs-to",
    },
    {
      source: "person-sarah",
      target: "dept-engineering",
      relation: "belongs-to",
    },
    {
      source: "person-tom",
      target: "dept-engineering",
      relation: "belongs-to",
    },

    { source: "person-carol", target: "dept-design", relation: "belongs-to" },
    { source: "person-eva", target: "dept-design", relation: "belongs-to" },
    { source: "person-maya", target: "dept-design", relation: "belongs-to" },
    { source: "person-ian", target: "dept-design", relation: "belongs-to" },

    { source: "person-david", target: "dept-product", relation: "belongs-to" },
    { source: "person-lisa", target: "dept-product", relation: "belongs-to" },
    { source: "person-oliver", target: "dept-product", relation: "belongs-to" },

    {
      source: "person-grace",
      target: "dept-marketing",
      relation: "belongs-to",
    },
    {
      source: "person-carlos",
      target: "dept-marketing",
      relation: "belongs-to",
    },
    {
      source: "person-julia",
      target: "dept-marketing",
      relation: "belongs-to",
    },

    { source: "person-steve", target: "dept-sales", relation: "belongs-to" },
    { source: "person-maria", target: "dept-sales", relation: "belongs-to" },
    { source: "person-nick", target: "dept-sales", relation: "belongs-to" },

    { source: "person-helen", target: "dept-hr", relation: "belongs-to" },
    { source: "person-roger", target: "dept-hr", relation: "belongs-to" },

    { source: "person-nina", target: "dept-finance", relation: "belongs-to" },
    { source: "person-omar", target: "dept-finance", relation: "belongs-to" },

    // Cross-team collaboration (existing + expanded)
    {
      source: "person-alice",
      target: "person-david",
      relation: "collaboration",
    },
    { source: "person-bob", target: "person-carol", relation: "collaboration" },
    {
      source: "person-frank",
      target: "person-lisa",
      relation: "collaboration",
    },
    {
      source: "person-sarah",
      target: "person-oliver",
      relation: "collaboration",
    },
    { source: "person-tom", target: "person-ian", relation: "collaboration" },

    { source: "person-eva", target: "person-grace", relation: "collaboration" },
    {
      source: "person-maya",
      target: "person-carlos",
      relation: "collaboration",
    },
    {
      source: "person-julia",
      target: "person-nick",
      relation: "collaboration",
    },

    {
      source: "person-steve",
      target: "person-grace",
      relation: "collaboration",
    },
    {
      source: "person-maria",
      target: "person-carlos",
      relation: "collaboration",
    },
    {
      source: "person-nick",
      target: "person-julia",
      relation: "collaboration",
    },

    {
      source: "person-helen",
      target: "person-nina",
      relation: "collaboration",
    },
    {
      source: "person-roger",
      target: "person-omar",
      relation: "collaboration",
    },

    // New extra collaborations
    {
      source: "person-alice",
      target: "person-grace",
      relation: "collaboration",
    }, // engineering <> marketing
    { source: "person-bob", target: "person-maria", relation: "collaboration" }, // frontend <> sales
    {
      source: "person-frank",
      target: "person-omar",
      relation: "collaboration",
    }, // backend <> finance
    {
      source: "person-sarah",
      target: "person-helen",
      relation: "collaboration",
    }, // devops <> HR
    {
      source: "person-carol",
      target: "person-david",
      relation: "collaboration",
    }, // UX <> product
    { source: "person-eva", target: "person-steve", relation: "collaboration" }, // visual design <> sales
    {
      source: "person-maya",
      target: "person-oliver",
      relation: "collaboration",
    }, // UI <> analyst
    {
      source: "person-julia",
      target: "person-alice",
      relation: "collaboration",
    }, // SEO <> engineering
    {
      source: "person-nina",
      target: "person-steve",
      relation: "collaboration",
    }, // finance <> sales
    {
      source: "person-omar",
      target: "person-carlos",
      relation: "collaboration",
    }, // accounting <> marketing
  ],
};

