const studyPlanData = [
    {
      id:0,
      day: "Day1",
      learn: [
        { task: "Review structure of Study Unit", duration: "0:30:00",status: "InProgress" },
        { task: "Get into Learning Mojo", duration: "0:30:00",status: "InProgress" },
        {
          task: "Listen to Definitions, and confidence affirmations while also listening to the Alpha binural beats",
          duration: "0:30:00",
          status: "InProgress"
        },
        { task: "Take Bio Break - Bathroom, Water, High Protein snack", duration: "0:30:00",status: "InProgress" }
      ],
      title: "Review structure of Study Unit"
    },
    {
      id:1,
      day: "Day2",
      learn: [
            {
              task: "Listen to Definitions, and confidence affirmations while also listening to the Alpha binural beats",
              duration: "0:30:00",
              status: "InProgress"
            },
            { task: "Take Bio Break - Bathroom, Water, High Protein snack", duration: "0:30:00",status: "InProgress" },
            { task: "Review Test Taking Strategies", duration: "0:30:00",status: "InProgress" },
            { task: "Do Stretching and Breathing Exercises", duration: "0:30:00",status: "InProgress" }
          ],
      title: "Create Summary Mind Map of Study Unit"
    },
    {
      id:2,
      day: "Day3",
      learn: [
        {
          task: "Skill - Do 30 Practice questions",
          duration: "02:00:00",
          subtasks: [
            {
              task: "Listen to Definitions, and confidence affirmations while also listening to the Alpha binural beats",
              duration: "0:15:00",
              status: "InProgress"
            },
            { task: "Take Bio Break - Bathroom, Water, High Protein snack", duration: "0:05:00",status: "InProgress" },
            { task: "Review Test Taking Strategies", duration: "0:05:00",status: "InProgress" },
            { task: "Do Stretching and Breathing Exercises", duration: "0:05:00",status: "InProgress" }
          ]
        }
      ],
      title: "Learning Mojo - focused concentration binaural beats, hydration, stretching and breathing"
    },
    {
      id:3,
      day: "Day4",
      learn: [
        { task: "Review how you got the correct answers and what you could do to get the correct answers on the questions you missed.", duration: "01:00:00",status: "InProgress" },
        { task: "Review your mind map cards, your summary mind map, your expert story, and your definitions", duration: "01:00:00",status: "InProgress" }
      ],
      title: "Review Tasks"
    },
    {
      id:4,
      day: "Day5",
      learn: [
        {
          task: "In your learning journal, reflect on",
          duration: "02:00:00",

          subtasks: [
            { task: "What happened as you did your study activities?", duration: "0:05:00",status: "InProgress" },
            { task: "How did you feel as you went through the activities?", duration: "0:05:00",status: "InProgress" },
            { task: "What are your learning strengths with this material?", duration: "0:05:00",status: "InProgress" },
            {
              task: "Identify two to three ways you can use your learning strengths to improve your performance with test questions.",
              duration: "0:05:00",
              status: "InProgress"
            },
            { task: "What are you going to do to get better results from your study efforts in the next module?", duration: "0:05:00",status: "InProgress" }
          ]
        }
      ],
      title: "Learning strengths with material provided"
    },
    {
      id:5,
      day: "Day6",
      learn: [
        { task: "Review structure of Study Unit", duration: "0:30:00",status: "InProgress" },
        { task: "Get into Learning Mojo", duration: "0:30:00",status: "InProgress" },
        {
          task: "Listen to Definitions, and confidence affirmations while also listening to the Alpha binural beats",
          duration: "0:30:00",
          status: "InProgress"
        },
        { task: "Take Bio Break - Bathroom, Water, High Protein snack", duration: "0:30:00" ,status: "InProgress"}
      ],
      title: "Review structure of Study Unit"
    },
    {
      id:6,
      day: "Day7",
      learn: [
        { task: "Awareness - Make Mindmap Cards of the Material in the Unit", duration: "0:40:00",status: "InProgress" },
        {
          task: "Knowledge - Integrate material into working knowledge",
          duration:"01:20:00",
          status: "InProgress",
          subtasks: [
            { task: "Create Summary Mind Map of Study Unit", duration: "0:10:00" },
            {
              task: "Set aside 30 minutes to do the practice questions open book (look up the answers)",
              duration: "0:30:00"
            }
          ]
        }
      ],
      title: "Make Mindmap Cards of the Material in the Unit"
    },
    {
      id:7,
      day: "Day8",
      learn: [
            {
              task: "Listen to Definitions, and confidence affirmations while also listening to the Alpha binural beats",
              duration: "0:30:00",
              status: "InProgress"
            },
            { task: "Take Bio Break - Bathroom, Water, High Protein snack", duration: "0:30:00" ,status: "InProgress"},
            { task: "Review Test Taking Strategies", duration: "0:30:00",status: "InProgress"},
            { task: "Do Stretching and Breathing Exercises", duration: "0:30:00",status: "InProgress" }
          ],
      title: "Practice question & Bio Break"
    },
    {
      id:8,
      day: "Day9",
      learn: [
        { task: "Review how you got the correct answers and what you could do to get the correct answers on the questions you missed.", duration: "01:00:00",status: "InProgress" },
        { task: "Review your mind map cards, your summary mind map, your expert story, and your definitions", duration: "01:00:00",status: "InProgress" }
      ],
      title: "Summary Cheat Sheet - create based on major topics"
    },
    {
      id:9,
      day: "Day10",
      learn: [
        {
          task: "In your learning journal, reflect on",
          duration: "02:00:00",
          subtasks: [
            { task: "What happened as you did your study activities?", duration: "0:05:00",status: "InProgress" },
            { task: "How did you feel as you went through the activities?", duration: "0:05:00",status: "InProgress" },
            { task: "What are your learning strengths with this material?", duration: "0:05:00",status: "InProgress" },
            {
              task: "Identify two to three ways you can use your learning strengths to improve your performance with test questions.",
              duration: "0:05:00",
              status: "InProgress"
            },
            { task: "What are you going to do to get better results from your study efforts in the next module?", duration: "0:05:00",status: "InProgress" }
          ]
        }
      ],
      title: "Manage Study Activities"
    }
  ];
  
  export default studyPlanData;
  