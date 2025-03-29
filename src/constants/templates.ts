export const templates = [
    {
      id: "blank",
      label: "Blank Document",
      imageurl: "/blank-document.svg",
      initialContet:""
    },
    {
        id:"software-proposal",
        label:"Software Development Proposal",
        imageurl:"/software-proposal.svg",
         initialContet:`
         <h1>Software Development Project Proposal</h1>
    
    <h2>Project Title: [Software Project Name]</h2>
    
    <h3>Submitted by:</h3>
    <p>[Your Name/Company Name]<br>
       Email: [your.email@example.com]<br>
       Date: [Insert Date]</p>
    
    <h3>Introduction</h3>
    <p>Briefly introduce the software project, its purpose, and the problem it aims to solve.</p>
    
    <h3>Objectives</h3>
    <ul>
        <li>Develop a functional and scalable software solution</li>
        <li>Ensure high performance and security</li>
        <li>Provide an intuitive user experience</li>
    </ul>
    
    <h3>Scope</h3>
    <p>Define the scope of the software development, including key features and functionalities.</p>
    
    <h3>Technology Stack</h3>
    <p>List the technologies, programming languages, and frameworks to be used.</p>
    
    <h3>Development Timeline</h3>
    <p>Provide an estimated timeline for project milestones and completion.</p>
    
    <h3>Budget</h3>
    <p>Estimate the budget required for development, testing, and deployment.</p>
    
    <h3>Conclusion</h3>
    <p>Summarize the importance of the software project and the next steps.</p>`
    },
    {
        id:"project-proposal",
        label:"Project Proposal",
        imageurl:"/project-proposal.svg",
           initialContet:`
           <h1>Project Proposal</h1>
    
    <h2>Project Title: [Your Project Name]</h2>
    
    <h3>Submitted by:</h3>
    <p>[Your Name/Organization]<br>
       Email: [your.email@example.com]<br>
       Date: [Insert Date]</p>
    
    <h3>Introduction</h3>
    <p>Briefly introduce the project and its purpose.</p>
    
    <h3>Objectives</h3>
    <ul>
        <li>Objective 1</li>
        <li>Objective 2</li>
        <li>Objective 3</li>
    </ul>
    
    <h3>Scope</h3>
    <p>Define the scope of the project, including key deliverables.</p>
    
    <h3>Timeline</h3>
    <p>Provide an estimated timeline for project completion.</p>
    
    <h3>Budget</h3>
    <p>Estimate the budget required for the project.</p>
    
    <h3>Conclusion</h3>
    <p>Summarize the importance of the project and next steps.</p>`
    },
    {
        id: "business-letter",
        label: "Business Letter",
        imageurl: "/business-letter.svg",
           initialContet:`
           <p>Sender's Name<br>
       Sender's Address<br>
       City, State, ZIP Code<br>
       Email: sender@example.com<br>
       Date: [Insert Date]</p>

    <p>Recipient's Name<br>
       Recipient's Position<br>
       Company Name<br>
       Company Address<br>
       City, State, ZIP Code</p>

    <p>Dear [Recipient's Name],</p>

    <p>I hope this letter finds you well. I am writing to [state purpose of the letter briefly]. I would appreciate the opportunity to discuss this matter further at your earliest convenience.</p>

    <p>Thank you for your time and consideration. I look forward to your response.</p>

    <p>Sincerely,<br>
       [Your Name]</p>
             `
      },
      {
        id: "resume",
        label: "Resume",
        imageurl: "/resume.svg",
           initialContet:`
           <header>
           <h1>Your Name</h1>
           <p>Email: your.email@example.com | Phone: +123 456 7890</p>
       </header>
       
       <section>
           <h2>Summary</h2>
           <p>A brief summary about yourself, your skills, and experience.</p>
       </section>
       
       <section>
           <h2>Experience</h2>
           <p><strong>Job Title</strong> - Company Name (Year - Year)</p>
           <p>Brief description of your responsibilities and achievements.</p>
       </section>
       
       <section>
           <h2>Education</h2>
           <p><strong>Degree</strong> - University Name (Year)</p>
       </section>
       
       <section>
           <h2>Skills</h2>
           <ul>
               <li>Skill 1</li>
               <li>Skill 2</li>
               <li>Skill 3</li>
           </ul>
       </section>
        `
      },
      {
        id: "cover-letter",
        label: "Cover Letter",
        imageurl: "/cover-letter.svg",
           initialContet:`<header>
        <h1>[Your Full Name]</h1>
        <p>[Your Address]</p>
        <p>[City, State, ZIP]</p>
        <p>Email: <a href="mailto:[Your Email]">[Your Email]</a></p>
        <p>Phone: [Your Phone Number]</p>
        <p>[Date]</p>
    </header>

    <section>
        <p>[Recipient Name]</p>
        <p>[Recipient Title]</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p>[City, State, ZIP]</p>
    </section>

    <section>
        <p>Dear [Recipient Name],</p>

        <p>I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [where you found the job posting]. With my [mention relevant experience, skills, or education], I am confident in my ability to contribute effectively to your team and help [Company Name] achieve its goals.</p>

        <p>In my previous role at [Previous Company], I [briefly describe one or two key accomplishments or responsibilities that relate to the job]. These experiences have helped me develop skills in [mention specific skills relevant to the job], which I believe would be valuable to your team at [Company Name].</p>

        <p>I am particularly drawn to [Company Name] because of [mention something specific about the company, its mission, values, or a project/initiative that excites you]. I would love the opportunity to contribute my skills and experience to your organization and help drive continued success.</p>

        <p>Enclosed is my resume for your consideration. I would welcome the chance to discuss my application in further detail during an interview. Please feel free to contact me at [Your Phone Number] or via email at [Your Email] to arrange a time to meet.</p>

        <p>Thank you for considering my application. I look forward to the possibility of joining your team at [Company Name].</p>

        <p>Sincerely,</p>

        <p>[Your Full Name]</p>
    </section>`
      },
      {
        id: "letter",
        label: "Letter",
        imageurl: "/letter.svg",
           initialContet:`  <header>
        <h1>[Your Full Name]</h1>
        <p>[Your Address]</p>
        <p>[City, State, ZIP]</p>
        <p>Email: <a href="mailto:[Your Email]">[Your Email]</a></p>
        <p>Phone: [Your Phone Number]</p>
        <p>[Date]</p>
    </header>

    <section>
        <p>[Recipient Name]</p>
        <p>[Recipient Title]</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p>[City, State, ZIP]</p>
    </section>

    <section>
        <p>Dear [Recipient Name],</p>

        <p>I hope this letter finds you well. I am writing to [state the purpose of the letter]. [Provide details about the purpose, explaining the situation or request clearly and concisely. If you are writing about an issue, provide context. If it's a request, explain what you're asking for and why.]</p>

        <p>If you require any further details or clarification, please feel free to contact me. I look forward to your prompt response to this matter.</p>

        <p>Thank you for your attention to this issue. I appreciate your time and consideration.</p>

        <p>Sincerely,</p>

        <p>[Your Full Name]</p>
    </section>`
      }
  ];