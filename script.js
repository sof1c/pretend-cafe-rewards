The Frictionless Cafe: A Cloud-Based SMS Loyalty Integration for Small Business Retention 

 

Danial Cheslak, Tristan Hock, Sofia Chishti, Tiff Brown 

 

 

APTC 495 7381 Applied Technology Capstone 

Professor Dexter Francis 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

Project description 

The Frictionless Cafe project is a cloud-based loyalty solution designed to help independent small businesses compete with large-scale chains by offering a secure, app-free reward system. To eliminate "app fatigue" and prevent fraudulent check-ins, the system utilizes a Dual-Action Verification model. 

The scope includes a customer-facing portal for generating a static Member ID and a barista-facing tablet interface that validates purchases. By requiring a staff-side scan or "Confirm" action, the system ensures that rewards are only issued upon a verified financial transaction, providing small business owners with high-integrity retention data without the cost of complex POS integrations. 

Use Case Scenario 

1. The Digital Bypass (Pre-Entry) 

Action: While waiting in line, a customer scans a wall-mounted QR code and enters their 10-digit phone number. 

System: The web portal generates a Static Barcode on the customer's phone. 

Barista Action: The barista scans the barcode and taps "Add Visit" on the tablet. 

Result (SMS): The customer instantly receives a text: "Thanks for your purchase! Your visit has been recorded. You are now at 4/10- only 6 more to a free latte!" 

2. The Manual Fallback (On-Site Entry) 

Action: A customer reaches the register without a code. They (or the barista) type their 10-digit phone number into the tablet's keypad. 

System: The tablet identifies the profile and displays "9/10 Visits" to the barista. 

Barista Action: The barista verifies the purchase and taps "Add Visit." 

Result (SMS): The customer instantly receives a reward text: "CONGRATS! You hit 10/10 visits! Show this text to your barista for a free drink on your next visit. [Code: REWARD10]" 

The Staff-Verified Commit (Unified Outcome) 

Logic: In both scenarios, the "Add Visit" button is the trigger. No SMS is sent until the barista physically confirms the transaction. 

Data Integrity: The backend increments the total and triggers the REST API call to the SMS provider  

Final Feedback: The tablet screen flashes a green checkmark, and the customer’s phone buzzes with their updated status before they leave the counter. 

Specific Requirements 

Functional  

Figure 1: Functional Requirements Specifications 

Requirement 

Functionality 

 

Why 

Outcome 

Conditions for Acceptance 

 

Unique User ID 

System must use a 10-digit phone number as the primary identifier. 

Eliminates the need for usernames/passwords 

Accurate tracking of repeat customers without "app fatigue." 

System accepts exactly 10 numeric digits and rejects any entry that is non-numeric or of incorrect length. 

Purchase-Verified Entry (Hybrid) 

Tablet accepts manual keypad entry OR a scan of a mobile Member ID at the counter. 

Ensures points are only added during a live transaction overseen by a barista. 

Prevents "faked" or remote check-ins; works with budget POS systems. 

The visit_total increases only when a valid number/scan is processed through the primary 10-inch POS tablet. 

Automated Visit Counter  

Backend increments visit_total by 1 upon barista confirmation. 

 

Replaces easily lost physical punch cards. 

Provides customers with instant progress updates and gives owners real-time traffic data. 

The database must save the new total and trigger a "Success" signal to the UI in under 500ms. 

SMS Reward Trigger (REST API) 

Calls REST API after every successful visit increment. Once it hits "10," the system must call an API to send a promotional text message. 

Instant gratification and digital "punch" record. 

increased customer retention and satisfaction 

SMS received by customer within 10 seconds of confirmation. Promotional SMS received after 10th verified purchase. 

Mobile QR Portal (Bypass) 

QR sign opens web page to display a static Member ID. 

Prevents bottlenecks at the register during peak hours, allows customers to "check in" while in line, speeding up the transaction at the register. 

 

Improved operational flow for the cafe staff. 

 

portal generates a scannable barcode representing the phone number. 

 

 

 

 

 

 

 

 

 

 

 

 

Non-Functional 

Usability: To ensure high adoption, the check-in process, whether via manual entry or QR scan, must be completed in under 5 seconds. This prevents the system from becoming a "bottleneck" during high-traffic shifts. 

Security:To protect PII and maintain trust, all customer data is encrypted at rest and complies with TCPA standards. While the Member ID is static for ease of use, the Staff-Verified Commit acts as the primary security layer  

Reliability: The system maintains 99.9% uptime during café hours.  

Performance: The backend architecture must handle simultaneous entries from the POS tablet and customer-facing QR portals. All database read/write operations must confirm in less than 500ms to eliminate system lag. 

 

Constraints 

Timeline: The project is bound by the academic calendar, meaning the system must be fully designed, developed, and tested by May 2026 to meet graduation requirements. 

Budget: To remain feasible for small businesses, the system exclusively utilizes "Free Tier" cloud services, proving enterprise-grade results are possible with zero overhead. 

Regulatory Policies: All automated messaging functions strictly comply with TCPA. This requires a clear "Opt-In" during enrollment and mandatory "STOP" instructions in the initial SMS. 

Hardware Limitations: The primary physical interface for the system is restricted to a 10-inch tablet (iOS or Android) stationed at the Point of Sale. 

 

External Interface  

User Interface: The system provides two distinct entry paths: a numeric keypad for the 10-inch POS tablet and a lightweight, mobile-responsive web portal for customers using the "line-bypass" QR scan. 

Software Interface: A RESTful API gateway acts as the central hub, bridging the cloud database, the physical tablet, and the SMS provider to ensure synchronized real-time updates across all devices. 

 

System Features 

Input Handling: System automatically strips non-numeric characters (dashes, spaces) from user input, ensuring data consistency across both the tablet and mobile portal. 

Output Handling: Upon a successful check-in, the UI will provide immediate visual feedback. This includes a "Success" message and a visual progress bar indicating the customer's status ("7/10 visits until the next reward"). 

Hybrid Synchronization: Upon a successful check-in, the UI provides immediate digital feedback via SMS ("7/10 visits"), ensuring that both the barista and customer are notified simultaneously. 

Error Handling:  

If a user enters fewer than 10 digits, the system will trigger a red "Invalid Number" alert to prompt immediate correction. Additionally, if the cloud database is unreachable, the system will display a "Service Temporarily Unavailable" message to prevent customer confusion at the register. 

If a phone number is entered that does not exist in the database, the barista can still hit "Confirm," which triggers an automated "Welcome" SMS. This message includes the initial visit credit and the mandatory TCPA "Opt-Out" instructions, effectively enrolling the customer in one step. 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

References/Appendix  

Deloitte. (2025). Reshaping ​loyalty programs in an era of value seeking:​ ​2025 Consumer Loyalty Program Survey. Deloitte Insights. ​ 

​​Federal Communications Commission​. (2003). ​Rules and regulations​ ​implementing the Telephone Consumer Protection Act of 1991 (FCC​ Release No. 03-153). https://www.fcc.gov/sites/default/files/tcpa-rules.pdf 

Focus Digital. (2026). Average Customer Retention Rate by Industry: 2026 Report. Focus Digital Insights. https://focus-digital.co/average-customer-retention-rate-by-industry/ 

​​Forbes. (2025). 10 ways tech integration can boost business outcomes.​ Forbes Technology Council. /sites/forbestechcouncil/2025/01/15//  

Mailchimp. (2025). The Zero-Party Data Advantage: Tailored Marketing Solutions. Mailchimp Resources. https://mailchimp.com/resources/zero-party-data/ 

Hurwitz, D. (2025). How to Use SMS for Customer Retention & Loyalty Programs. Sandhill Digital. https://sandhilldigital.io/2025/02/11/sms-loyalty-programs/ 

 

 
