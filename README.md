# 🧪 Performance Evaluation of Web Tours Application using Apache JMeter

## 📌 1. Project Overview

This project demonstrates performance testing for the **Web Tours** application using **Apache JMeter**. The goal is to simulate real-world user traffic and assess the system’s performance under various load conditions.

---

## 🧰 2. Tools & Technologies Used

- Apache JMeter 5.6.3
- HTML Report Generation
- Git & GitHub for version control
- Windows OS

---

## 🎯 3. Objectives

1. Simulate multiple users accessing the application.
2. Measure system behavior under load.
3. Analyze performance metrics including:
   - Response Time
   - Throughput
   - Error Rate
4. Generate detailed performance reports.

---

## 📂 4. Project Structure

📁 apache-jmeter-5.6.3
📁 Projects
│ ├── WebToursTestPlan.jmx
│ ├── test-results.jtl
│ ├── report/
│ │ └── index.html (Generated HTML report)
│ └── README.md

yaml
Copy
Edit

---

## 🧪 5. Test Plan Scenario

The JMeter test plan simulates the following user actions:

1. Open the Web Tours homepage.
2. Login with valid credentials.
3. Search for flights.
4. Book a selected flight.
5. Logout.

Each of these steps is implemented using HTTP requests inside a Thread Group.

---

## ⚙️ 6. Execution Steps

1. Open a command prompt and navigate to the JMeter `bin` directory.
2. Run the test plan in **Non-GUI Mode** using the command:
   ```bash
   jmeter -n -t "D:\Courses\Performance Testing\Projects\WebToursTestPlan.jmx" -l "D:\Courses\Performance Testing\Projects\test-results.jtl"
Generate HTML report:

bash
Copy
Edit
jmeter -g "D:\Courses\Performance Testing\Projects\test-results.jtl" -o "D:\Courses\Performance Testing\Projects\report"
📊 7. Result Analysis
The generated HTML report includes:

Summary Dashboard: Overview of total requests, average response time, throughput, and errors.

Response Time Over Time: Visualization of how response time changes during test.

Active Threads Over Time: Tracks how many virtual users were active.

Error %: Displays the percentage of failed requests.

📷 Sample Report Screenshot:


📸 8. Screenshots
JMeter Test Plan Design

Generated HTML Report

🚀 9. Future Enhancements
Add CSV Data Set Config for dynamic user data.

Simulate random user behaviors with timers.

Integrate JMeter with CI/CD tools like Jenkins.

Run distributed performance tests using JMeter server-agent model.

👨‍💻 10. Author
Mohamed Hassan

📧 Email: mh8860157@gmail.com

📞 Phone: 01110460414

💼 LinkedIn: Mohamed Hassan

💻 GitHub: MohamedHassan984

📁 11. Repository Link
GitHub Repo: https://github.com/MohamedHassan984/Performance-Testing