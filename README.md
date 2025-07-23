# 🧪 Web Tours Performance Testing using Apache JMeter

This project performs a performance evaluation for the **Web Tours** application using **Apache JMeter 5.6.3**.

---

## 📋 Overview

The goal of this project is to assess the performance and stability of the Web Tours application under various user loads. The test plan simulates multiple virtual users accessing the website to analyze system behavior in terms of response time, throughput, and error rates.

---

## 🛠 Tools Used

- Apache JMeter 5.6.3
- .JMX Test Plan
- JTL Result File
- HTML Report Generation
- Windows Command Line

---

## 📂 Project Structure

├── webtours-performance-test.jmx # JMeter test plan
├── test-results.jtl # Result file after test execution
├── report/ # Auto-generated HTML report
├── screenshots/ # (Optional) Screenshots from report
└── README.md # Project documentation

yaml
Copy
Edit

---

## ▶️ How to Run the Test

1. Open Apache JMeter.
2. Load the file `webtours-performance-test.jmx`.
3. Run the test and export the results to a `.jtl` file.
4. Generate an HTML report using the command:

jmeter -g test-results.jtl -o report/

yaml
Copy
Edit

5. Open `report/index.html` in your browser to view the full performance report.

---

## 📈 Sample Report (Optional)

You can include screenshots inside the `screenshots/` folder.  
For example:

![Report Summary](screenshots/report-summary.png)

---

## ✅ Summary

| Metric                 | Value          |
|------------------------|----------------|
| Avg. Response Time     | ~ **X ms**     |
| Throughput             | ~ **X req/sec**|
| Error Percentage       | **0%** (or as per result) |
| Number of Threads      | **50** (Example) |
| Duration               | **2 minutes** (Example) |

> Replace the `X` values with actual data from your report if needed.

---

## 📌 Recommendations

- Monitor server-side performance while running the test.
- Optimize slow transactions that show high response time.
- Re-run the test after fixes and compare metrics.

---

## 👨‍💻 Author

**Mohamed Hassan**  
Software Testing Engineer  
📧 mh8860157@gmail.com  
📞 01110460414  
[LinkedIn Profile](https://www.linkedin.com/in/mohamed-hassan-497307330)

---

## 🗂️ Tags

`#PerformanceTesting` `#JMeter` `#WebTours` `#SoftwareTesting` `#LoadTest`